const { Op } = require("sequelize");

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

const getCollectionSummary = (filter) => {
    // Return collection promise
    return new Promise((resolve, reject) => {
        let status_query =  'CONCAT((CASE WHEN totalCards > 0 THEN ((collectedCardsUnique/totalCards) * 100) ELSE 0 END)::varchar(255), \'%\')';
        status_query = status_query.replaceAll('totalCards', 'COUNT("collectionCards"."cardId")');
        status_query = status_query.replaceAll('collectedCardsUnique', 'COUNT("collectionCards_alias2"."cardId")');

        Collection.findAll({
            where: filter,
            group: ['collections.id', 'creator.id'],
            attributes: [
                'id',
                'name',
                'filter',
                [db.sequelize.fn('COUNT', db.sequelize.col('collectionCards.cardId')), 'totalCards'],
                [db.sequelize.fn('COUNT', db.sequelize.col('collectionCards_alias2.cardId')), 'collectedCardsUnique'],
                [db.sequelize.literal(status_query), 'status'],
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
                {
                    model: User,
                    required: true,
                    as: 'creator',
                    attributes: ['id', 'username']
                }

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


const getCollectionDetail = (filter) => {
    // Return collection promise
    return new Promise((resolve, reject) => {
        Collection.findAll({
            where: filter,
            // order: [ //
            //     'orderNumber', 'DESC'
            // ],
            order: db.Sequelize.literal('"collectionCards"."orderNumber" asc'),
            include: [
                {
                    model: CollectionCard,
                    required: false,
                    as: 'collectionCards',
                    include: [
                        {
                            model: Card,
                            required: true,
                            as: 'card',
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
                                        }
                                    ]
                                },
                                {
                                    model: CardLocalisation,
                                    required: true,
                                    as: 'card_localisations',
                                }
                            ],
                        }
                    ],
                    attributes: [
                        'cardId',
                        'collectionId',
                        'orderNumber',
                        'count',
                        [db.Sequelize.literal('(((coalesce("collectionCards"."orderNumber", 0)/18)-(1/18))+1)'), 'binderPageNo'],
                        [db.Sequelize.literal('CASE WHEN "collectionCards"."orderNumber" % 18 = 0 THEN 18 ELSE "collectionCards"."orderNumber" % 18 END'), 'binderSlotNo'],
                        [db.Sequelize.literal('"collectionCards->card->card_localisations"."name"'), 'name'],
                        [db.Sequelize.literal('"collectionCards->card"."supertype"'), 'supertype'],
                        [db.Sequelize.literal('"collectionCards->card"."rarity"'), 'rarity'],
                        [db.Sequelize.literal('"collectionCards->card->cardSet"."series"'), 'setSeries'],
                        [db.Sequelize.literal('"collectionCards->card->cardSet"."printedTotal"'), 'setPrintedTotal'],
                        [db.Sequelize.literal('"collectionCards->card->cardSet"."total"'), 'setTotal'],
                        [db.Sequelize.literal('"collectionCards->card->cardSet"."releaseDate"'), 'setReleaseDate'],
                        [db.Sequelize.literal('"collectionCards->card->cardSet->set_localisations"."name"'), 'setName'],
                        // [db.Sequelize.literal('"cardSet"."printedTotal"'), 'setPrintedTotal'],
                    ],

                },{
                    model: User,
                    required: true,
                    as: 'creator',
                    attributes: ['id', 'username']
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
const returnCollectionDetail = (res, filter) => {
    getCollectionDetail(filter)
        .then((collection) => {
            if (collection.length === 1) {
                res.send(collection[0]);
            } else {
                res.status(404).send({});
            }

        })
}




const things = {
    getCollectionSummary: getCollectionSummary,
    returnCollectionSummary: returnCollectionSummary,
    getCollectionDetail: getCollectionDetail,
    returnCollectionDetail: returnCollectionDetail,
};

module.exports = things;