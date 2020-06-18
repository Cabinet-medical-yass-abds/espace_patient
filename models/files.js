const mongoose = require('mongoose');
const Schema = mongoose.Schema;


// files Schema
const fileSchema = new Schema({
    fileName :String,
    filePath :String
}, { timestamps: true });



module.exports = mongoose.model('file', fileSchema);