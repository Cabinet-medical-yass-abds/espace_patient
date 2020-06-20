const router = require('express').Router()
const doctor = require('../models/doctor');
const Claim = require('../models/claim');
const Appoi = require('../models/appointement')

router.get('/detail/:id',(req,res)=>{
    doctor.findById({_id : req.params.id}).populate('id_secrt').exec((err,doc)=>{
        if(err){console.log(err)}
        else{
            res.render('detail_doc.hbs',{doc : doc})
        }
    })
})

router.get('/profile',(req,res)=>{
    res.render('profile.hbs',{})
})

router.get('/reclamation',(req,res)=>{
    res.render('reclamationForm.hbs',{})
})

router.post('/postClaim/:id',(req,res)=>{
    var claim = new Claim({
        id_patient : req.params.id,
        objectif : req.body.objectif,
        description : req.body.description
    })
    claim.save((err)=>{
        if(err){
            console.log(err)
        }else{
            req.flash('succes','Réclamation envoyée avec succée ')
            res.redirect(301,'/')
        }
    })
})


//rendez vous 
router.post('/rendezVous/:id',(req,res)=>{
     Appoi.findOne({id_patient : req.user.id , id_doctor : req.params.id ,statue : false},(err,data)=>{
        
        var appoi = new Appoi({
            id_patient : req.user.id ,
            id_doctor : req.params.id,
        })
       
        if (data != null){
            req.flash('error','rendez vous déja approuvé')
            res.redirect(301,'/')
        }else{
            appoi.save((err)=>{
                if(err){
                    console.log(err)
                }else{
                    req.flash('succes','Votre rendez vous est en cours de traitement. Consulter /Mes rendez vous/ pour plus de details !')
                    res.redirect(301,'/')
                }
            })
        }
    })  
})

module.exports = router;