const router = require('express').Router()
const doctor = require('../models/doctor');
const Claim = require('../models/claim');
const Appoi = require('../models/appointement')
const User = require('../models/user');
const secrt = require('../models/secretere');
const message = require('../models/message');
const multer  = require('multer')
const upload = require('../config/multer_cofig');
const consultation = require('../models/consultation');

//details docteur
router.get('/detail/:id',(req,res)=>{
    doctor.findById({_id : req.params.id}).populate('id_secrt').exec((err,doc)=>{
        if(err){console.log(err)}
        else{
            res.render('detail_doc.hbs',{doc : doc})
        }
    })
})


/////////////////////////////////////////////////rv
 //LIST ALL RV           
router.get('/mesRV/:id',(req,res)=>{
    Appoi.find({id_patient : req.params.id , payed : false},(err,rv)=>{
        if(err){
            console.log(err)
        }else{
            var notfound = false 
            if(rv.length == 0){
                notfound = true
            }
            res.render('mes_rendvous.hbs',{ rv , notfound })            
        }
    }).populate('id_doctor')
}) 

//cancel rv
router.get('/cancel/:id',(req,res)=>{
    Appoi.findByIdAndDelete({_id : req.params.id},(err)=>{
        res.redirect('back')
    })
})

//from rv to consult
router.post('/makeconsultation/:id',(req,res)=>{
    Appoi.findByIdAndUpdate({_id : req.params.id},{
        payed : true
    },(err,data)=>{
        if(err){
            console.log(err)
        }else{
            var c = new consultation({
                id_appointment : req.params.id,
                id_patient : data.id_patient,
                id_doctor : data.id_doctor,
                files : []
            }).save((err)=>{})
        }
        res.redirect('/')
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
                   req.flash('succes','Demande de rendez vous envoyée  voir Mes rendez-vous')
                   res.redirect(301,'/')
               }
           })
       }
   })  
})


//////////////////////////////////////////////////////////////////////Reclamation
//post reclamation
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

//LIST ALL CLAIM        
router.get('/mesREC/:id',(req,res)=>{
    Claim.find({id_patient : req.params.id},(err,claim)=>{
        if(err){
            console.log(err)
        }else{
            var notfound = false
            if(claim.length == 0){
               notfound = true ; 
            }
            res.render('mes_reclamation.hbs',{claim ,notfound})
        }
    })
})

//DELETE CLAIM  
router.get('/deleteClaim/:id',(req,res)=>{
    Claim.findByIdAndRemove({_id : req.params.id},(err)=>{
        if(err){
            console.log(err)
        }else{
            res.redirect('back')
        }
    })
})

///////////////////////////////////////////////////////////// consult
router.get('/dossier/:id',(req,res)=>{
    consultation.find({id_patient : req.params.id },(err,data)=>{
        if(err){
            console.log(err)
        }else{
            res.render('mes_dossiers.hbs',{data})
        }
    }).populate('id_appointment').populate('id_doctor')
})






//UPDATE USER INFOS
router.post('/updateUser/:id',upload.single('myfile'),(req,res)=>{
	User.findByIdAndUpdate({_id : req.params.id},{
		nom  :req.body.nom,
		prenom : req.body.prenom,
		numtel : req.body.numtel,
		adress :{
			street : req.body.street,
			city : req.body.city ,
			zip : req.body.zip
        },
        photo : req.file.filename
	},(err,data)=>{
		if(err){console.log(err)}
		else{
			req.flash('succes','Informations modifiées aves succés')
			res.redirect(301,'/')
		}
	})
})


//////////////////////////////////////////////////////////////////////messages
//send messages
router.post('/sendmsg/:id',(req,res)=>{
    message.findOne({id_patient : req.params.id , id_doctor : req.body.id_doctor},(err,data)=>{
        if(err){
            console.log(err)
        }else{
            if (!data){
                var msg = new message({
                    id_patient : req.params.id,
                    id_doctor : req.body.id_doctor,
                    sujet : req.body.sujet,
                    conversation : [{
                        msg : req.body.msg,
                        fromPatient : true

                    }]
                })
                msg.save((err)=>{})
            }else{
                message.findByIdAndUpdate({_id : data.id},{
                    $push : {conversation : {
                        msg : req.body.msg,
                        fromPatient : true
                    }}
                },(err,result)=>{})
            }
        }
        // go to messages
        res.redirect('back')
    })
})

//list message 
router.get('/listmsg/:id',(req,res)=>{
    message.find({id_patient : req.params.id},(err,data)=>{
        var notfound = false
        if(data.length == 0){
            notfound = true
        }
        res.render('messages.hbs',{data , notfound})
    }).populate('id_doctor')
})
module.exports = router;