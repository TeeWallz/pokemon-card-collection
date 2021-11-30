const { Op } = require("sequelize");

const db = require("../models");
const config = require("../config/auth.config");
const {users: User,
    roles: Role,
    collections: Collection,
    refreshTokens: RefreshToken,
    card: Card,
    collectionCards: CollectionCard
} = db;

const getCollectionSummary = (filter) => {
    // Return collection promise
    return new Promise((resolve, reject) => {
        Collection.findAll({
            where: filter,
            group: ['collections.id'],
            attributes: [
                'id',
                'name',
                [db.sequelize.fn('COUNT', db.sequelize.col('collectionCards.cardId')), 'totalCards'],
                [db.sequelize.fn('COUNT', db.sequelize.col('collectionCards_alias2.cardId')), 'collectedCardsUnique'],
                // [db.sequelize.fn('SUM', db.sequelize.col('ReceiptPayments.receivedPayment')), 'totalPayment']
            ],
            include: [
                {
                    model: CollectionCard,
                    required: false,
                    attributes: [],
                    as: 'collectionCards_alias2',
                    where: { count : {[Op.gt]: 0,}}
                }
                ,{
                    model: CollectionCard,
                    required: false,
                    attributes: [],
                    as: 'collectionCards',
                    // where: { count : {[Op.gt]: 0,}}
                },
                {
                    model: CollectionCard,
                    required: false,
                    attributes: [],
                    as: 'collectionCards_alias2',
                    where: { count : {[Op.gt]: 0,}}
                },

            ]
        })
            .then(collection => {
                resolve(collection);
            })


            .catch((error) => {
                reject(error)
            })
    });

};

const getCollectionDetail = (filter) => {
    // Return collection promise
    return new Promise((resolve, reject) => {
        Collection.findAll({
            where: filter,

            include: [
                {
                    model: CollectionCard,
                    required: false,
                    as: 'collectionCards',
                },{
                    model: User,
                    required: true,
                    as: 'creator',
                    attributes: ['id', 'username']
                },


            ]

        })
            .then(collection => {
                resolve(collection);-A
            })


            .catch((error) => {
                reject(error)
            })
    });

};

const returnCollectionSummary = (res, filter) => {
    // Return collection promise
    getCollectionSummary(filter)
    .then(collection => {
        if(collection === null){
            res.status(404).send({});
        }
        else{
            const response = JSON.stringify(collection, {}, 2)
            res.status(200).send(response);
        }
    })
        .catch(err => {
            console.log(err)
            res.status(500).send({message: err.message});
        });
};


const things = {
    getCollectionSummary: getCollectionSummary,
    getCollectionDetail: getCollectionDetail,
    returnCollectionSummary: returnCollectionSummary,
};

module.exports = things;