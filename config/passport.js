var passport = require('passport');
var User = require('../models/user');
var LocalStrategy = require('passport-local').Strategy;

//Tells how to store the user in this session
passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        done(err, user);
    });
});

//Sign up strategy
passport.use('local.signup', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, function (req, email, password, done) {
    //Validators
    req.check('email', 'Invalid email').notEmpty().isEmail();
    req.check('password', 'Invalid password').notEmpty().isLength({ min: 4 });
    //Catch Errors
    var errors = req.validationErrors();
    if (errors) {
        var messages = [];
        errors.forEach(function (error) {
            console.log(error);
            messages.push(error.msg);
        });
        //Throw error to the view with flash middleware
        return done(null, false, req.flash('error', messages));
    }

    User.findOne({ 'email': email }, function (err, user) {
        if (err) {
            return done(err);
        }
        if (user) {
            return done(null, false, { message: 'Email alredy used.' });
        }
        var newUser = new User();
        newUser.email = email;
        newUser.password = newUser.encryptPassword(password);
        newUser.save(function (err, result) {
            if (err) {
                return done(err);
            }
            return done(null, newUser);
        });
    });
}));

//Sign in strategy
passport.use('local.signin', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, function (req, email, password, done) {
    //Validators
    req.check('email', 'Invalid email').notEmpty().isEmail();
    req.check('password', 'Invalid password').notEmpty();
    //Catch Errors
    var errors = req.validationErrors();
    var messages = [];
    if (errors) {
        errors.forEach(function (error) {
            messages.push(error.msg);
        });
        //Throw error to the view with flash middleware
        return done(null, false, req.flash('error', messages));
    }
    User.findOne({ 'email': email }, function (err, user) {
        if (err) {
            console.log(err);
            return done(err);
        }
        if (!user) {
            messages.push('No user found.');
            return done(null, false, req.flash('error', messages));
        }
        if (!user.validPassword(password)) {
            messages.push('Wrong password.');
            return done(null, false, req.flash('error', messages));
        }

       return done(null, user);
    });
}));
