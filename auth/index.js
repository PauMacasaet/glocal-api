const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const router = express.Router();

const User = require('../db/queries/login/user');
// route paths are prepended 

function validUser(user) {
    const hasFullname = typeof user.fullName == 'string'
        && user.fullName.trim() != '';
    const hasUserName = typeof user.username == 'string' 
        && user.username.trim() != '';
    const hasEmail = typeof user.email == 'string' 
        && user.email.trim() != '';
    const hasPassword = typeof user.password == 'string' 
        && user.password.trim() != ''
        && user.password.trim().length >= 6;
    const hasNumber = typeof user.contactNumber == 'string'
        && user.contactNumber.trim() != '';
    const hasPosition = typeof user.position == 'string'
        && user.position.trim() != '';
    
    return hasFullname && hasUserName && hasEmail && hasPassword && hasNumber && hasPosition;
}

function validLogin(user) {
    const hasEmail = typeof user.email == 'string' 
        && user.email.trim() != '';
    const hasPassword = typeof user.password == 'string' 
        && user.password.trim() != ''
        && user.password.trim().length >= 6;
    return hasEmail && hasPassword;
}

router.post('/signup', (req, res, next) => {
    if(validUser(req.body)) {
        User
            .getOneByEmail(req.body.email)
            .then(user => {
                console.log('users', user);
                //if user not found
                if(!user) {
                    //unique email
                    //hash password
                    bcrypt.hash(req.body.password, 10)
                        .then((hash) => {
                            // Store hash in your password DB.
                            const user = {
                                fullName: req.body.fullName,
                                username: req.body.username,
                                email: req.body.email,
                                password: hash,
                                contactNumber: req.body.contactNumber,
                                dateCreated: new Date(),
                                position: req.body.position
                            };

                            User
                                .create(user)
                                .then(id => {
                                    setUserCookie(req, res, id);
                                    res.json({
                                        id,
                                        message: 'check'
                                    });
                                });
                            // redirect
                        }); 
                } else {
                    // email in use
                    next(new Error('Email in use'));
                }
        });
    } else {
        next(new Error('Invalid User'));
    }
});

function setUserIdCookie (req, res, id) {
    const isSecure = req.app.get('env') != 'development';
    res.cookie('user_id', id, {
        httpOnly: true,
        secure: isSecure,
        signed: true
    });
}

router.post('/login', (req, res, next) => {
    if(validLogin(req.body)) {
        // check to see if in db
        User
            .getOneByEmail(req.body.email)
            .then(user => {
                console.log('users', user);
                if(user) {
                    //compare password with hash password
                    bcrypt
                        .compare(req.body.password, user.password)
                        .then((result) => {
                        // is passwords matched
                            if(result) {
                                //setting the set-cookie header
                                const isSecure = req.app.get('env') != 'development';
                                res.json({
                                    id: user.id,
                                    message: 'Logged in'
                                });
                            } else {
                                next(new Error('Invalid Login'));
                            }
                    });
                    
                } else {
                    next(new Error('Invalid Login'));
                }
            });
    } else {
        next(new Error('Invalid Login'));
    }
});

router.get('/logout', (req, res) => {
    res.clearCookie('user_id');
    res.json({
        message: 'logged out'
    });
});

module.exports = router;