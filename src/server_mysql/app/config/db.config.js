module.exports = {
    HOST: "docker.tomekwaller.com",
    PORT: 54322,
    USER: "postgres",
    PASSWORD: "EurGSFYsmNQFW6x4s3S4uFmR8Nr9QZbQ",
    DB: "pokemon-site",
    SCHEMA: "site_data",
    dialect: "postgres",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};
