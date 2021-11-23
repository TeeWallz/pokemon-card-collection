module.exports = (sequelize, Sequelize) => {
    const Collection = sequelize.define("collections", {
        id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV1,
            primaryKey: true
        },
        name: {
            type: Sequelize.STRING
        }
    });

    return Collection;
};