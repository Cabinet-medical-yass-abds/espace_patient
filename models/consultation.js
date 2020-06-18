const mongoose = require('mongoose');
const Schema = mongoose.Schema;



const consSchema = new Schema({
    id_patient : {
        type: Schema.Types.ObjectId, ref: 'User'
    },
    id_doctor : {
        type: Schema.Types.ObjectId, ref: 'doctor'
    },
    id_appointment : {
        type: Schema.Types.ObjectId, ref: 'appoi'
    },
    date : {type : Date , default: Date.now}
}, { timestamps: true });



module.exports = mongoose.model('consultation', consSchema);