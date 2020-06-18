const mongoose = require('mongoose');
const Schema = mongoose.Schema;


// doctor Schema
const doctorSchema = new Schema({
    name: String ,
    fname :String,
    email: {type : String , required : true},
    spec: String,
    adress : {
        street : String ,
        city : String ,
        zip : String
    } ,
    password : String,
    man : {type:Boolean, required : true },
    bio : String,
    id_secrt : {
        type: Schema.Types.ObjectId, ref: 'secrt'
    }
}, { timestamps: true });



module.exports = mongoose.model('doctor', doctorSchema);