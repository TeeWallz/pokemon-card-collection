const mongoose = require('mongoose');
const CollectionSchema = new mongoose.Schema({
    name: String,
    description: String,
    query: String,
});
module.exports = mongoose.model('Collections', CollectionSchema);
