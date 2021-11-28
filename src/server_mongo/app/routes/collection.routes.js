const { authJwt } = require("../middleware");
const controller = require("../controllers/collection.controller");

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

   app.post(
        "/api/collection",
        [authJwt.verifyToken],
        controller.createCollection
    );

    app.get(
        "/api/collection/:collectionId",
        [authJwt.verifyToken],
        controller.getCollection
    );

    app.get(
        "/api/collection",
        [authJwt.verifyToken],
        controller.getCollections
    );

    app.get(
        "/api/collection/:collectionId/cards",
        [authJwt.verifyToken],
        controller.getCollectionCards
    );

};

