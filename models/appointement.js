const mongoose = require('mongoose');
const Schema = mongoose.Schema;



const appoiSchema = new Schema({
    id_patient : {
        type: Schema.Types.ObjectId, ref: 'User'
    },
    id_doctor : {
        type: Schema.Types.ObjectId, ref: 'doctor'
    },
    date : {type : Date , default: Date.now},
    cancel : { type : Boolean , default : false},
    statue : Boolean
    
}, { timestamps: true });



module.exports = mongoose.model('appoi', appoiSchema);

