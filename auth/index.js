
const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const router = express.Router();

const User = require('../db/queries/user/user');
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

function setUserIdCookie (req, res, id) {
    const isSecure = req.app.get('env') != 'development';
    res.cookie('user_id', id, {
        httpOnly: true,
        secure: isSecure,
        signed: true
    });
}

router.post('/signup', (req, res, next) => {
    if(validUser(req.body)) {
        User
            .getOneByEmail(req.body.email)
            .then(user => {
                console.log('user', user);
                //if user not found
                if(!user) {
                    //unique email
                    //hash password
                    bcrypt.hash(req.body.password, 10, null, function(hash) {
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
                                setUserIdCookie(req, res, id);
                                res.json({
                                    id,
                                    message: 'User created'
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

router.post('/login', (req, res, next) => {
    if(validLogin(req.body)) {
        // check to see if in db
        User
            .getOneByEmail(req.body.email)
            .then(user => {
                console.log('user', user);
                if(user) {
                    bcrypt.compare(req.body.password, user.password, function(result, next) {
                        if(result) {
                            //setting the set-cookie header
                            setUserIdCookie(req, res, user.id);
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

router.put('/:userid', (req, res, next) => {
    User
        .update(req.params.userid, req.body)
        .then(user => {
            res.json({
                user,
                message: 'Account Updated'
            });
        });
});

module.exports = router;