const db = require("../models");
const {collection:Collection, user:User} = db;


exports.allAccess = (req, res) => {
    res.status(200).send("Public Content.");
};

exports.userBoard = (req, res) => {
    res.status(200).send("User Content.");
};

exports.adminBoard = (req, res) => {
    res.status(200).send("Admin Content.");
};

exports.moderatorBoard = (req, res) => {
    res.status(200).send("Moderator Content.");
};

exports.createCollection = (req, res) => {
    const collection = new Collection({
        name: req.body.name,
        creator: req.user.id,
    });

    collection.save((err, new_collection) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }

        new_collection
            .populate("creator", "username", (err, new_collection_pop) => {
                res.send(new_collection_pop);
            });


        let kek = 1

    })
};
