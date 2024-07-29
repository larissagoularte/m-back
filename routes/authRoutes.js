const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
const User = require('../models/userModel');

router.get('/register', (req, res) => res.send('Register page'));

router.post('/register', (req, res) => {
    const {username, password, password2 } = req.body;
    let errors = [];

    if (!username || !password || !password2) {
        errors.push({ msg: 'Please fill in all fields' });
    }

    if (password !== password2) {
        errors.push({ msg: 'Passwords do not match' });
    }

    if (password.length < 6) {
        errors.push({ msg: 'Password should be at least 6 characters long.' });
    }

    if (errors.length >0) {
        res.send({ errors, username, password, password2 });
    } else {
        User.findOne({ username: username })
            .then(user => {
                if (user) {
                    errors.push({ msg: 'User already registered.' });
                    res.send({ errors, username, password, password2 });
                } else {
                    const newUser = new User({
                        username,
                        password
                    });

                    bcrypt.genSalt(10, (err, salt) =>
                        bcrypt.hash(newUser.password, salt, (err, hash) => {
                            if (err) throw err;
                            newUser.password = hash;
                            newUser.save()
                                .then(user => {
                                    res.send('You are registered and can login.')
                                })
                                .catch(err => console.log(err));
                        }));
                }
            });
    }
});

router.get('/login', (req, res) => res.send('Login page'));

router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/auth/login',
        failureFlash: true
    })(req, res, next);
});

router.get('/logout', (req, res) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        res.send('You are logged out.');
    });
});

module.exports = router;
