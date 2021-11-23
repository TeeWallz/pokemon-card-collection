const mongoose = require("mongoose");

const Collection = mongoose.model(
    "Collection",
    new mongoose.Schema({
        name: String,
        creator:
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User"
            }

    })
);

module.exports = Collection;