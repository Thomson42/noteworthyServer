const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    title: {
        type: String,
        required: true
    },
    children: [{
        folder: {
            type: Schema.Types.ObjectId,
            ref: 'Folder'
        },
    }],
    notes: [{
        note:{
            type: Schema.Types.ObjectId,
            ref:'Note'
        },
    }],
    parent: {
        type: Schema.Types.ObjectId,
        ref: 'Folder'
    }
});

module.exports = mongoose.model('Folder', schema);