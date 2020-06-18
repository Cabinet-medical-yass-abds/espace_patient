const router = require('express').Router()
const doctor = require('../models/doctor');

router.get('/detail/:id',(req,res)=>{
    doctor.findById({_id : req.params.id}).populate('id_secrt').exec((err,doc)=>{
        if(err){console.log(err)}
        else{
            console.log(doc)
            res.render('detail_doc.hbs',{doc : doc})
        }
    })
})



module.exports = router;