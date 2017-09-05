const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    title: {
        type: String,
        required: true
    },
    notes: [{
        note:{
            type: Schema.Types.ObjectId
        },
    }],
    
});

module.exports = mongoose.model('Folder', schema);