const mongoose = require("mongoose");

const Card = mongoose.model(
    "tcg_card",
    new mongoose.Schema({
        id: {type: String, immutable: true },
    })
);

module.exports = Card;