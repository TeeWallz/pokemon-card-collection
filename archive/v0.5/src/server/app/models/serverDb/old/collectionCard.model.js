module.exports = (sequelize, Sequelize) => {
    const CollectionCard = sequelize.define('collectionCard', {
        // id: {
        //     type: Sequelize.UUID,
        //     defaultValue: Sequelize.UUIDV1,
        //     primaryKey: true,
        //     allowNull: false
        // },
        orderNumber: {
            type: Sequelize.INTEGER,
            defaultValue: 0
        },
        count: {
            type: Sequelize.INTEGER,
            defaultValue: 0
        },
    }, { timestamps: false });

    return CollectionCard;
};