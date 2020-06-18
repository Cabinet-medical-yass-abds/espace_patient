const mongoose = require('mongoose');
const Schema = mongoose.Schema;



const mfileSchema = new Schema({
    id_patient : {
        type: Schema.Types.ObjectId, ref: 'User'
    },
    id_file: [{
        type: Schema.Types.ObjectId, ref: 'file'
    },] 
}, { timestamps: true });



module.exports = mongoose.model('mfile', mfileSchema);