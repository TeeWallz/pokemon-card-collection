module.exports = {
    HOST: "localhost",
    USER: "postgres",
    // PASSWORD: "root",
    // DB: "pokemon-site",
    DB: "pokemon-site",
    SCHEMA: "",
    dialect: "postgres",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};
