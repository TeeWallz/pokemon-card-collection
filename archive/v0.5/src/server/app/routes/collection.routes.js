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

    app.get("/api/collection/all", controller.getAll);

    app.post(
        "/api/collection/create",
        [authJwt.verifyToken],
        controller.createCollection
    );

    app.get(
        "/api/collection/:collectionId",
        controller.getOne
    );

    app.put(
        "/api/collection/:collectionId",
        controller.updateCollection
    );

    //
    // app.get(
    //     "/api/test/mod",
    //     [authJwt.verifyToken, authJwt.isModerator],
    //     controller.moderatorBoard
    // );
    //
    // app.get(
    //     "/api/test/admin",
    //     [authJwt.verifyToken, authJwt.isAdmin],
    //     controller.adminBoard
    // );
};