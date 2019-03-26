var bCrypt = require('bcrypt-nodejs');


module.exports = function(passport, user) {
    var User = user;
    var LocalStrategy = require('passport-local').Strategy;
    passport.serializeUser(function(user, done) {
 
        done(null, user.id);
     
    });

    passport.use('local-signup', new LocalStrategy({
        usernameField: 'email',
        password: 'password',
        passReqToCallback: true
    },function(req, username, password, done) {
        // ...
        console.log("got this far")
        var generatehash = function(password){
            console.log(password);
            return bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);

        }
        console.log("Skraaaaaaa");
        User.findOne({
            where: {
                email: req.body.email
            }
                
        }).then(function(user){
            console.log('GOT THIS FAR TOO');
            if (user){
                console.log('We food');
                    return done(null, false, {
                    message: 'That email is already taken'
                });

            } else {
                var userPassword = generatehash(password);
                console.log(userPassword)
                var data =  {
                    email: req.body.email,
                    password: userPassword,
                    firstname: req.body.firstname,
                    lastname: req.body.lastname,
                    username: req.body.firstname + " " + req.body.lastname
                };

                User.create(data).then(function(newUser, created){
                    if(!newUser){
                        return done(null, false);

                    }
                    else {
                        return done(null, newUser);
                    }
                }, err => {console.log(err)});
            }
        }, err => {
            return done(null, err);
        })
      }
    ));
    passport.use('local-signin', new LocalStrategy(
 
        {
     
            // by default, local strategy uses username and password, we will override with email
     
            usernameField: 'email',
     
            passwordField: 'password',
     
            passReqToCallback: true // allows us to pass back the entire request to the callback
            
        },
     
     
        function(req, email, password, done) {
     
            var User = user;
     
            var isValidPassword = function(userpass, password) {
                console.log(userpass);
                console.log(password);
                return bCrypt.compareSync(password, userpass);
     
            }
            console.log("RIght here");
            User.findOne({
                where: {
                    email: req.body.email
                }
            }).then(function(user) {
                console.log("running");
                if (!user) {
     
                    return done(null, false, {
                        message: 'Email does not exist'
                    });
     
                }
     
                if (!isValidPassword(user.password, password)) {
     
                    return done(null, {
                        message: 'Incorrect password.'
                    });
     
                }
     
     
                var userinfo = user.get();
                return done(null, userinfo);
     
     
            }).catch(function(err) {
     
                console.log("Error:", err);
     
                return done(null, false, {
                    message: 'Something went wrong with your Signin'
                });
     
            });
     
     
        }
     
    ));
    passport.deserializeUser(function(id, done) {
 
        User.findById(id).then(function(user) {
     
            if (user) {
     
                done(null, user.get());
     
            } else {
     
                done(user.errors, null);
     
            }
     
        });
     
    });
}
