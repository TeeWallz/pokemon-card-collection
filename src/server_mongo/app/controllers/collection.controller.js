var async = require('async');
const db = require("../models");
const {collection:Collection, user:User, card:Card, collection_card:Collection_card} = db;


exports.createCollection = (req, res) => {
    const collection = new Collection({
        name: req.body.name,
        creator: req.user.id,
    });

    collection.save((err, new_collection) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }

        const cardz = [
            {card: 'bw6-1', collectionId:new_collection, count: 1,},
            {card: 'bw6-2', collectionId:new_collection, count: 2,},
            {card: 'bw6-3', collectionId:new_collection, count: 3,},
        ]

        if(!('cards' in req.body)){
            req.body.cards = []
        }

        async.each(req.body.cards, function(cardItem, callback){
            Collection_card.findOneAndUpdate({'card': cardItem.card, 'collectionId':new_collection}, cardItem, {upsert:true}, function(err, doc){
                if(err){
                    return callback(err);
                }
                return callback();
            });
        }, function(err){
            if(err){
                res.status(500).send({ message: err });
            }
            else{
                console.log("All pool items have been upserted!")
                res.send(new_collection);
            }
        });

    })
};

exports.getCollection = (req, res) => {
    Collection.findById(req.params.collectionId).exec((err, collection) => {
        if (err) {
            res.status(404).send({message: 'Collection error'});
            return;
        }

        Collection.aggregate(
            [
                {    $match:{}     },
                // {
                //     $facet:{
                //         'info':[
                //             {
                //                 '$project': {
                //                     // '_id': 0,
                //                     'collectionName': '$name',
                //                     'creator': '$creator',
                //                 }
                //             }
                //         ],
                //         "stats":
                //             [
                //                 {
                //                     '$lookup': {
                //                         'from': 'site_collection_cards',
                //                         'localField': '_id',
                //                         'foreignField': 'collectionId',
                //                         'as': 'cards'
                //                     }
                //                 }, {
                //                 '$project': {
                //                     '_id': 0,
                //                     'collectionName': '$name',
                //                     'creator': '$creator',
                //                     'numOfCardsToCollect': {
                //                         '$size': '$cards'
                //                     }
                //                 }
                //             }
                //             ]
                //     }
                // }



            ]
        ).exec((err, locations) => {
            if (err) throw err;
            res.send(locations);
        })



        // collection.aggregate(yeet, (cmdErr, result) => {
        //     if(cmdErr){
        //         res.status(500).send({message: cmdErr});
        //         return;
        //     }
        //     else{
        //         // res.send({message: collection.name});
        //         res.send(result);
        //     }
        //
        // });
    })
}

exports.getCollections = (req, res) => {
    Collection.findById(req.params.collectionId).exec((err, collection) => {
        if (err) {
            res.status(404).send({message: 'Collection error'});
            return;
        }

        Collection.aggregate(
            [
                {    $match:{}     },
                {
                    $facet:{
                        'info':[
                            {
                                '$project': {
                                    // '_id': 0,
                                    'collectionName': '$name',
                                    'creator': '$creator',
                                }
                            }
                        ],
                        "stats":
                            [
                                {
                                    '$lookup': {
                                        'from': 'site_collection_cards',
                                        'localField': '_id',
                                        'foreignField': 'collectionId',
                                        'as': 'cards'
                                    }
                                }, {
                                '$project': {
                                    '_id': 0,
                                    'collectionName': '$name',
                                    'creator': '$creator',
                                    'numOfCardsToCollect': {
                                        '$size': '$cards'
                                    }
                                }
                            }
                            ]
                    }
                }



            ]
        ).exec((err, locations) => {
            if (err) throw err;
            res.send(locations);
        })



        // collection.aggregate(yeet, (cmdErr, result) => {
        //     if(cmdErr){
        //         res.status(500).send({message: cmdErr});
        //         return;
        //     }
        //     else{
        //         // res.send({message: collection.name});
        //         res.send(result);
        //     }
        //
        // });
    })
}

exports.getCollectionCards = (req, res) => {
    Collection_card.find({ collectionId: req.params.collectionId }).exec((err, cards) => {
        if (err) {
            res.status(404).send({message: 'Collection error'});
            return;
        }
        res.send(cards);
    })
}






// exports.updateCollection = (req, res) => {
//     const utils = require("../middleware/utils");
//
//     Collection.findOne({
//         where: {id: req.params.collectionId}
//     })
//         .then(collection => {
//             let promisesToDo = []
//
//             if('name' in req.body) {
//                 promisesToDo.push(
//                     collection.update({
//                         name: req.body.name
//                     })
//                 )
//             }
//
//
//             if('cards' in req.body) {
//                 const cards = req.body.cards.map(v => ({...v, collectionId: collection.id}))
//                 promisesToDo.push(
//                     CollectionCard.bulkCreate(cards,
//                         {
//                             fields: ["cardId", "collectionId", "count"],
//                             updateOnDuplicate: ["count"]
//                         })
//                         .catch(err => {
//                             res.status(500).send({message: err.message});
//                         })
//                 )
//             }
//
//
//             Promise.all(promisesToDo).then((values) => {
//                 res.send({message: "OK!"});
//             });
//
//
//
//         })
//         .catch(err => {
//             res.status(500).send({message: err.message});
//         });
//
//
//
// };