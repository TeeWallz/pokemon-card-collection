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
    Collection.findAll()
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
            if (collection.length === 1){
                res.send(collection[0]);
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
    collectionUtils.returnCollectionSummary(res, req.params.filter)
};


exports.createCollection = (req, res) => {
    // const utils = require("../middleware/utils");
    // Check for missing parameters
    // Check for empty parameters
    let cards = []
    if('cards' in req.body){ cards = req.body.cards; }

    // Save Collection to Database
    Collection.create({
        name: req.body.name,
        creatorId: req.user.id
    })
        .then(collection => {
            collection.setCards(cards)
                .then(() => {
                    collectionUtils.returnCollectionSummary(res, {id:collection.id})
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
                    fields: ["cardId", "collectionId", "count"],
                    updateOnDuplicate: ["count"],
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

    console.log("Loading from API")
    pokemon.card.all({ q: query })
        .then((cards) => {
            console.log("Done!")
            res.send(cards);
        })
        .catch((err) => {
            res.status(500).send(err.message);
        })
};