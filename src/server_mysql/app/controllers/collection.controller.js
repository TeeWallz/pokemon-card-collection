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

const collectionUtils = require("../middleware/collectionUtils")

exports.getAll = (req, res) => {
    const users = Collection.findAll()
        .then(collections => {
            const response = JSON.stringify(collections, null, 2)
            res.status(200).send(response);
        })
        .catch(err => {
            res.status(500).send({message: err.message});
        });
};

exports.getOne = (req, res) => {

    collectionUtils.getModelSummary({id: req.params.collectionId})
        .then(collection => {
            const response = JSON.stringify(collection, null, 2)
            res.status(200).send(response);
        })
        .catch(err => {
            console.log(err)
            res.status(500).send({message: err.message});
        });
};

exports.createCollection = (req, res) => {
    const utils = require("../middleware/utils");

    // Check for missing parameters
    const missingProps = utils.checkPropsExist(req.body, ['name'])
    if (!(missingProps.success)) {
        res.status(422).send({message: "Missing parameters: '" + missingProps.missingString + "'"});
        return
    }

    // Check for empty parameters
    const emptyProps = utils.checkPropsNotEmpty(req.body, ['name'])
    if (!(emptyProps.success)) {
        res.status(422).send({message: "Parameters empty: '" + emptyProps.missingString + "'"});
        return
    }

    let cards = []
    if('cards' in req.body){
        cards = req.body.cards;
    }

    // Save Collection to Database
    Collection.create({
        name: req.body.name,
    })
        .then(collection => {
            collection.setCards(cards)
                .then(haha => {
                    collectionUtils.getModelSummary({id: collection.id})
                    // Collection.findOne({
                    //     where: {id: collection.id}
                    //     // attributes: {
                    //     //     include: [[db.Sequelize.fn("COUNT", db.Sequelize.col("collectionCards.collectionId")), "sensorCount"]]
                    //     // },
                    // })
                        .then(collection => {
                            const response = JSON.stringify(collection, null, 2)
                            res.status(200).send(response);
                        })
                        .catch(err => {
                            console.log(err)
                            res.status(500).send({message: err.message});
                        });
                })
                .catch(err => {
                    res.status(500).send({message: err.message});
                });
        })
        .catch(err => {
            res.status(500).send({message: err.message});
        });
};

exports.updateCollection = (req, res) => {
    const utils = require("../middleware/utils");

    Collection.findOne({
        where: {id: req.params.collectionId}
    })
        .then(collection => {
            let promisesToDo = []

            if('name' in req.body) {
                promisesToDo.push(
                    collection.update({
                        name: req.body.name
                    })
                )
            }


            if('cards' in req.body) {
                const cards = req.body.cards.map(v => ({...v, collectionId: collection.id}))
                promisesToDo.push(
                    CollectionCard.bulkCreate(cards,
                        {
                            fields: ["cardId", "collectionId", "count"],
                            updateOnDuplicate: ["count"]
                        })
                        .catch(err => {
                            res.status(500).send({message: err.message});
                        })
                )
            }


            Promise.all(promisesToDo).then((values) => {
                res.send({message: "OK!"});
            });



        })
        .catch(err => {
            res.status(500).send({message: err.message});
        });



};

