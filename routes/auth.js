const router = require('express').Router()
const passport = require('passport');



//  Signup ====================================================================
router.post('/signup', passport.authenticate('local-signup', {
	failureRedirect : '/',
	failureFlash : true // allow flash messages
}), function(req, res, next)  {
	res.redirect('/')
});


// Login ====================================================================

router.post('/login', passport.authenticate('local-login', {
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