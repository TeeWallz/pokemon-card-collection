const db = require("../models");
const config = require("../config/auth.config");
const {users: User,
    roles: Role,
    collections: Collection,
    refreshTokens: RefreshToken,
    card: Card,
    collectionCards: CollectionCard
} = db;


const getModelSummary = (filter) => {
    // Return collection promise
    return Collection.findOne({
        where: filter,
        attributes: {
            include: [[db.Sequelize.fn("COUNT", db.Sequelize.col("collectionCards.collectionId")), "totalUniqueCardCount"]]
        },
        include: [{
            model: CollectionCard, attributes: [], as: 'collectionCards', "duplicating":false
        }],
        group: ['collections.id']
    })
};


const things = {
    getModelSummary: getModelSummary
};

module.exports = things;