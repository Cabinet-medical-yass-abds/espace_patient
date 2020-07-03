const router = require('express').Router()
const passport = require('passport');
const User = require('../models/user');


const upload = require('../config/multer_cofig')


//  Signup ====================================================================
router.post('/signup', passport.authenticate('local-signup',  {
	failureRedirect : '/',
	failureFlash : true // allow flash messages
}), function(req, res, next)  {
	res.redirect('/')
});

/* router.post('/signup',upload.single('myfile'),(req,res)=>{
	User.findOne({email : req.body.email},(err,user) =>{

		// check if a user found with this email
		if (user) {
			// fail the signup
			req.flash('error' , 'Déja inscrit !!!')
			res.redirect(301,'/')
			
		}else{
			if(req.body.password != req.body.cpass){
				req.flash('error' , 'mot de passe incorrecte !!')
				res.redirect(301,'/')
			}
		}

		// otherwise store user info in the Database
		new User({
			nom : req.body.nom,
			prenom : req.body.prenom ,
			email: req.body.email,
			password: User.generateHash(req.body.password),
			adress : {
				street : req.body.street,
				city : req.body.city,
				zip : req.body.zip
			},
			numtel : req.body.numtel,
			photo : req.file.filename
		}).save(function(err , user) {
			if (err) {
				console.log(err)
			}else{
				// Success. Pass back savedUser
			passport.serializeUser(function(user, done) {
				done(null, user.id);
			});
			res.redirect('/')
			}
		})
	})
}) */

// Login ====================================================================

router.post('/login', passport.authenticate('local-login' , {
	failureRedirect : '/',
	successRedirect:'/',
	failureFlash : true // allow flash messages
}), function(req, res, next)  {
  res.redirect('/')
});


// LOGOUT ==============================
router.get('/logout', function(req, res, next) {
	req.logout();
	res.redirect('/');
});


module.exports = router;