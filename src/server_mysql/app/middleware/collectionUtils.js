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

        Collection.findAll({
            where: filter,
            group: ['collections.id', 'creator.id'],
            order: db.Sequelize.literal('"collections"."name" asc'),
            attributes: [
                'id',
                'name',
                'filter',
                [db.Sequelize.literal('COUNT("collectionCards"."cardId")'), 'totalCards'],
                [db.Sequelize.literal('SUM(LEAST("collectionCards".count, 1))'), 'collectedCardsUnique'],
                [db.Sequelize.literal('SUM("collectionCards".count)'), 'collectedCardsTotal'],
                [db.sequelize.literal('CASE WHEN COUNT("collectionCards"."cardId") > 0 THEN CEILING(((SUM(LEAST("collectionCards".count, 1))::decimal/COUNT("collectionCards"."cardId")) * 100)) ELSE 69 END'), 'status'],
                [db.sequelize.literal('CASE WHEN COUNT("collectionCards"."cardId") > 0 THEN ROUND(((SUM(LEAST("collectionCards".count, 1))::decimal/COUNT("collectionCards"."cardId")) * 100), 2) ELSE 69 END'), 'statusDecimal'],
                [db.sequelize.literal('CONCAT((CASE WHEN COUNT("collectionCards"."cardId") > 0 THEN ROUND(((SUM(LEAST("collectionCards".count, 1))::decimal/COUNT("collectionCards"."cardId")) * 100), 2) ELSE 69 END)::varchar(255), \'%\')'), 'statusString'],
                // [db.sequelize.fn('SUM', db.sequelize.col('ReceiptPayments.receivedPayment')), 'totalPayment']
            ],
            include: [
                // {
                //     model: CollectionCard,
                //     required: false,
                //     attributes: [],
                //     as: 'collectionCards_alias2',
                //     where: { count : {[Op.gt]: 0,}}
                // }
                {
                    model: CollectionCard,
                    required: false,
                    attributes: [],
                    as: 'collectionCards',
                    // where: { count : {[Op.gt]: 0,}}
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
                        [db.Sequelize.literal('"collectionCards->card"."card_number_int"'), 'card_number_int'],
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