const mongoose = require('mongoose');
const Schema = mongoose.Schema;


// doctor Schema
const doctorSchema = new Schema({
    name: String ,
    fname :String,
    email: {type : String , required : true},
    spec: String,
    adress :String ,
    password : String,
    id_secrt : {
        type: Schema.Types.ObjectId, ref: 'secrt'
    }
}, { timestamps: true });



module.exports = mongoose.model('doctor', doctorSchema);