module.exports = (sequelize, Sequelize) => {
    const Card = sequelize.define("card", {
        id: {
            type: Sequelize.STRING,
            primaryKey: true
        },
        name: {
            type: Sequelize.STRING
        }
    });

    return Card;
};