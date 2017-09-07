const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    title: {
        type: String,
        required: true
    },
    contens: {
        type: String
    },
});

module.exports = mongoose.model('Note', schema);