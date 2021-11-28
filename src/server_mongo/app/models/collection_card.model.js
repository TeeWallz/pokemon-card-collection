const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let collection_card = new Schema({
    card: mongoose.Schema.Types.String,
    collectionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "site_collection"
    },
    count: mongoose.Schema.Types.Number
});

collection_card.index({ "card": 1, "collectionId": 1}, { unique: true });

module.exports = mongoose.model('site_collection_card', collection_card);
