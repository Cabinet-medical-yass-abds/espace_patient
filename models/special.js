const mongoose = require('mongoose');
const schema = mongoose.Schema ;

const specialSchema = new schema({
    speciality : String
})

module.exports =  mongoose.model('special', specialSchema);