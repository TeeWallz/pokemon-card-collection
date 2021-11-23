module.exports = {
    serverDb: {
        HOST: "localhost",
        USER: "root",
        PASSWORD: "root",
        DB: "pokemon",
        dialect: "mysql",
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        }
    },
    tcgDb: {
        HOST: "localhost",
        USER: "root",
        PASSWORD: "root",
        DB: "pokemon",
        dialect: "mysql",
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        }
    }
};
