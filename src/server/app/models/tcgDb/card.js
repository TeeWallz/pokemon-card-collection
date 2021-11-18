module.exports = (sequelize, Sequelize) => {
    const card = sequelize.define("card", {
        id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV1,
            primaryKey: true,
            noUpdate: true,
        },
        name: {
            type: Sequelize.STRING
        }
    });

    return card;
};