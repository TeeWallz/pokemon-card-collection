const { Op } = require("sequelize");
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

const db = require("../models");
const config = require("../config/auth.config");
const {users: User,
    roles: Role,
    collections: Collection,
    refreshTokens: RefreshToken,
    card: Card,
    collectionCards: CollectionCard,
    set: tcgSet,
    set_localisation: SetLocalisation,
    card_localisation: CardLocalisation,
} = db;

const collectionUtils = require("../middleware/collectionUtils");
const pokemon = require('pokemontcgsdk');

pokemon.configure({apiKey: '4440c304-d5c0-4939-b533-5befa084795c'})

exports.getAll = (req, res) => {
    Collection.findAll({where:{isDeleted: false}})
        .then(collections => {
            const response = JSON.stringify(collections, null, 2)
            res.send(response);
        })
        .catch(err => {
            res.status(500).send({message: err.message});
        });
};

exports.getCollectionCards = (req, res) => {
    let collectionFilter = {};

    if('collectionId' in req.query){
        collectionFilter = req.query
    }


    CollectionCard.findAll({
        where: collectionFilter,
        order: [
            // will return `name`
            [db.Sequelize.literal('"collection"."name" ')],
            ['orderNumber'],
        ],
        include: [
            {
                model: Collection,
                required: false,
                as: 'collection',
                attributes: [],
            },
            {
                model: Card,
                required: false,
                as: 'card',
                attributes: [],
                include: [
                    {
                        model: tcgSet,
                        required: true,
                        as: 'cardSet',
                        include: [
                            {
                                model: SetLocalisation,
                                required: true,
                                as: 'set_localisations',
                                attributes: [],
                            }
                        ]
                    },
                    {
                        model: CardLocalisation,
                        required: true,
                        as: 'card_localisations',
                        attributes: [],
                    }
                 ]
            }
        ],
        attributes: [
            [db.Sequelize.literal('CONCAT("collectionCards"."collectionId", \'/\', "collectionCards"."cardId")'), 'cardKey'],
            'collection_card_key',
            'cardId',
            'collectionId',
            [db.Sequelize.literal('"collection"."name" '), 'collectionName'],
            [db.Sequelize.literal('"card"."number" '), 'number'],
            [db.Sequelize.literal('"card"."number" || \'/\' || "card->cardSet"."printedTotal"'), 'numberFull'],
            'orderNumber',
            'count',
            'purchased',
            [db.Sequelize.literal('(((coalesce("collectionCards"."orderNumber", 0)/18)-(1/18))+1)'), 'binderPageNo'],
            [db.Sequelize.literal('CASE WHEN "collectionCards"."orderNumber" % 18 = 0 THEN 18 ELSE "collectionCards"."orderNumber" % 18 END'), 'binderSlotNo'],
            [db.Sequelize.literal('"card->card_localisations"."name"'), 'name'],
            [db.Sequelize.literal('"card"."supertype"'), 'supertype'],
            [db.Sequelize.literal('"card"."rarity"'), 'rarity'],
            [db.Sequelize.literal('"card->cardSet"."series"'), 'setSeries'],
            [db.Sequelize.literal('"card->cardSet"."printedTotal"'), 'setPrintedTotal'],
            [db.Sequelize.literal('"card->cardSet"."total"'), 'setTotal'],
            [db.Sequelize.literal('"card->cardSet"."releaseDate"'), 'setReleaseDate'],
            [db.Sequelize.literal('"card->cardSet->set_localisations"."name"'), 'setName'],
        ]
    })
        .then((collectionCards) => {
            res.send(collectionCards)
        })
        .catch((error) =>{
            console.log(error);
            res.status(500).send(error.message)
        })


}

exports.getOne = (req, res) => {
    collectionUtils.getCollectionDetail({id: req.params.collectionId})
        .then((collection) => {
            if(!(collection.length) ){
                res.status(404).send({});
                return;
            }
            var collection = (collection.length === 1) ? (collection[0].toJSON()) : {};

            collection.collectionCards = collection.collectionCards.map((card) => {
                card.fullCardNumber = card.card.number + "/" + card.card.cardSet.printedTotal
                return card;
            })

            if ('id' in collection){
                res.send(collection);
            }
            else{
                res.status(404).send({});
            }

        })
        .catch((err) => {
            res.status(500).send(err.message);
        })

};

exports.getFilter = (req, res) => {
    let filter = {};
    if(!(req.params.filter === undefined)){
        filter = req.params.filter
    }
    filter.isDeleted = false;

    collectionUtils.returnCollectionSummary(res, filter)
};


exports.createCollection = (req, res) => {
    // const utils = require("../middleware/utils");
    // Check for missing parameters
    // Check for empty parameters
    let cards = {}
    if('cards' in req.body){ cards = req.body.cards; }

    // Save Collection to Database
    Collection.create({
        name: req.body.name,
        creatorId: req.user.id,
        isDeleted: false,
        filter: req.body.filter,
    })
        .then(collection => {

            cards = cards.map((card, index) => {
                card.orderNumber = index;
                card.cardId = card.id;
                card.collectionId = collection.id;
                return card;
            })


            CollectionCard.bulkCreate(cards)
                .then(() => {
                    collectionUtils.returnCollectionDetail(res, {id:collection.id})
                })
        })
        .catch(err => {
            res.status(500).send({message: err.message});
        });
};

// PUT operation is idempotent. This means we will make a clean slate (i.e.e delete cards) and insert what's in our query.
//    A PATCH would be an upsert
async function putCollectionRollback(req, res) {
    const collection = await Collection.findOne({ where: {id: req.params.collectionId} })

    // Open a transaction as we are deleting before reinserting, allowing a rollback
    const transaction = await db.sequelize.transaction();

    try {
        // Update name is present
        if ('name' in req.body) {
            await collection.update(
                { name: req.body.name },
                {transaction: transaction});
        }

        // Clear and write cards if present
        if ('cards' in req.body) {
            // Add collection ID into input parameters
            const cards = req.body.cards.map(v => ({...v, collectionId: collection.id}))

            // Delete current state
            await CollectionCard.destroy(
                {where: {collectionId: req.params.collectionId},
                transaction: transaction
            })

            //Insert current status
            await CollectionCard.bulkCreate(cards,
                {
                    fields: ["cardId", "collectionId", "count", "orderNumber"],
                    updateOnDuplicate: ["count", "orderNumber"],
                    transaction: transaction
                });
        }
        await transaction.commit();
        collectionUtils.returnCollectionDetail(res, {id:collection.id})

    }
    catch(err){
        await transaction.rollback();
        console.log(err.message);
        res.status(500).send({message: err.message});
    }

};
exports.putCollectionRollback = putCollectionRollback;


exports.getFromTcgApiFilter = (req, res) => {
    const query = req.query.query;

    if(query == null || query === ""){
        res.status(500).send({message:"Empty Query"});
        return;
    }

    console.log("Loading from API. Query: " + query)
    pokemon.card.all({ q: query })
        .then((cards) => {
            console.log("Done!")

            // Rollup nested fields for tables that suck at nested values
            let cards_enriched = cards.map((card) => {
                card.setReleaseDate = card.set.releaseDate;
                card.fullCardNumber = card.number + "/" + card.set.printedTotal;
                card.setName = card.set.name;
                return card;
            })

            // Sort by releaseDate by default
            cards_enriched = cards_enriched.sort((a, b) => (a.setReleaseDate > b.setReleaseDate ? 1 : -1));

            res.send(cards_enriched);
        })
        .catch((err) => {
            res.status(500).send(err.message);
        })
};

exports.deleteOne = (req, res) => {
    if(!('collectionId' in req.params)){
        res.status(500).send({message: "Missing parameter collectionId"});
    }

    Collection.update(
        { isDeleted: true},
        { where: { id: req.params.collectionId } }
    )
        .then(result => {
                res.status(200).send("")
            }
        )
        .catch(err => {
                res.status(500).send(err.message)
            }
        )


};

exports.patchCollectionCards = (req, res) => {
    if(!('collectionCards' in req.body)){
        res.status(500).send({message: "Missing parameter collectionCards"});
        return;
    }

    const cards = req.body.collectionCards;

    CollectionCard.bulkCreate(cards,
        {
            fields: ["cardId", "collectionId", "count", "orderNumber"],
            updateOnDuplicate: ["count", "orderNumber"],
        })
        .then((cardsReturn) => {
            res.status(200).send("")
        })
        .catch((err) => {
            res.status(500).send(err.message)
        })


};