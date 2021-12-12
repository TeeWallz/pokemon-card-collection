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
        "/api/collection",
        [authJwt.verifyToken],
        controller.createCollection
    );

    app.get(
        "/api/collection/:collectionId",
        controller.getOne
    );

    app.delete(
        "/api/collection/:collectionId",
        controller.deleteOne
    );

    app.get(
        "/api/collection",
        controller.getFilter
    );
    app.get(
        '/api/epic',
        controller.getCollectionCards
    )



    // app.put(
    //     "/api/collection/:collectionId",
    //     controller.putCollection
    // );

    app.put("/api/collection/:collectionId", async (req, res) => {
        let ass = req.params.collectionId;
        controller.putCollectionRollback(req, res)
    })

    app.get(
        "/api/tcgApiQuery",
        controller.getFromTcgApiFilter
    );

    app.put(
        "/api/collectionCards",
        controller.patchCollectionCards
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