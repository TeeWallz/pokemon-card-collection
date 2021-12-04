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
    collectionCards: CollectionCard
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

exports.getOne = (req, res) => {
    collectionUtils.getCollectionDetail({id: req.params.collectionId})
        .then((collection) => {
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