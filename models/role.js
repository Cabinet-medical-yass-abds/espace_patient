const mongoose = require('mongoose');
const Schema = mongoose.Schema;



const roleSchema = new Schema({
    id_patient : {
        type: Schema.Types.ObjectId, ref: 'User'
    },
    id_doctor : {
        type: Schema.Types.ObjectId, ref: 'doctor'
    },
    id_secrt : {
        type: Schema.Types.ObjectId, ref: 'secrt'
    },
    roleName : String ,
    roleId : Number
}, { timestamps: true });



module.exports = mongoose.model('role', roleSchema);