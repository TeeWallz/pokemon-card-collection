const mongoose = require("mongoose");

const Collection = mongoose.model(
    "site_collection",
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