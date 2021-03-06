const db = require("../models");
const config = require("../config/auth.config");
const {users: User, roles: Role, collections: Collection, refreshTokens: RefreshToken, cards: Card, collectionCards: CollectionCard} = db;

const { Op } = require("sequelize");

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

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

    // Collection.findAll({
    //     where: {'id': id},
    //     include: [{
    //         model: models.Employee,
    //         required: true,
    //         as: 'employee',
    //         include: [{
    //             model: models.Manager,
    //             required: true,
    //             as: 'manager',
    //             where: { id: managerId },
    //         }],
    //     }]
    // })

    Collection.findOne({
        // include: [{
        //     // model: Artists,
        //     // as: 'Singer',
        // }],
        where: {id: req.params.collectionId},
        include: [{
            model: Card,
            as: 'cards',
        }]
    })
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

    // Save User to Database
    Collection.create({
        name: req.body.name,
        userId: req.user.id,
        cards: [
            {id: 1}
        ]
    })
        .then(collection => {
            collection.setCards([1])
                .catch(err => {
                    res.status(500).send({message: err.message});
                });
            res.send(JSON.stringify(collection));
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

