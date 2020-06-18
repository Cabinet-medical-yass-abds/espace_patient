const mongoose = require('mongoose');
const Schema = mongoose.Schema;



const secretSchema = new Schema({
    name: String,
    fname: String,
    email: { type: String, required: true },
    password: String,
    id_doctor: {
        type: Schema.Types.ObjectId,
        ref: 'doctor'
    }
}, { timestamps: true });



module.exports = mongoose.model('secrt', secretSchema);