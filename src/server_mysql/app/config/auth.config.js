module.exports = {
    secret: "bezkoder-secret-key",
    // jwtExpiration: 3600,           // 1 hour
    // jwtRefreshExpiration: 86400,   // 24 hours

    // /* for test */
    // jwtExpiration: 60,          // 1 minute
    // jwtRefreshExpiration: 120,  // 2 minutes

    jwtExpiration:          60 * 60 * 24 * 7,    // 1 week
    jwtRefreshExpiration:   60 * 60 * 24 * 30,   // 1 month
};