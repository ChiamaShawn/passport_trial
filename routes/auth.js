var authController = require('../app/controllers/authcontroller.js');
 
 
module.exports = function(app, passport) {
 
    app.get('/signup', authController.signup);
 
 
    app.get('/signin', authController.signin);
 
    app.get('/dashboard', authController.dashBoard);

    app.post('/signup', passport.authenticate('local-signup', {
            successRedirect: '/signin',
 
            failureRedirect: '/signup',
            failureFlash: true
        }
 
    ));
    app.post('/signin', passport.authenticate('local-signin', {
        successRedirect: '/dashboard',

        failureRedirect: '/signin',
        failureFlash: true
    }

));
 
 
 
}