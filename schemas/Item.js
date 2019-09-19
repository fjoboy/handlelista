const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create schema

const ItemSchema = new Schema({
    item_name : {
        type: String,
        required: true
    },
    date : {
        type: Date,
        default: Date.now
    }
});

module.exports = Item = mongoose.model('item', ItemSchema);