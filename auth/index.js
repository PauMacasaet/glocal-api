
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

function setPositionCookie (req, res, pos) {
    const isSecure = req.app.get('env') != 'development';
    const jsonValue = JSON.stringify({
        user_pos: pos.position
    });

    res.cookie('user_pos', jsonValue, {
        httpOnly: true,
        secure: isSecure,
        signed: true
    });
}

function setFullnameCookie (req, res, name) {
    const isSecure = req.app.get('env') != 'development';
    const jsonValue = JSON.stringify({
        user_name: name.fullName
    });

    res.cookie('user_name', jsonValue, {
        httpOnly: true,
        secure: isSecure,
        signed: true
    });
}

function createCookie(req, res, user) {
    const isSecure = req.app.get('env') != 'development';
    const jsonValue = JSON.stringify({
        user_id: user.userid,
        user_fullname: user.fullName,
        user_pos: user.position
    });

    res.cookie('userCookie', jsonValue, {
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
                            .then((account) => {
                                setUserIdCookie (req, res, account);
                                setPositionCookie (req, res, account);
                                //setFullnameCookie (req, res, account);
                                //createCookie(req, res, account);
                                res.json({
                                    account,
                                    hash,
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
                    //conmpare password with hashed password
                    bcrypt.compare(req.body.password, user.password, function(result, next) {
                        if(result) {
                            //setting the set-cookie header
                            
                            setUserIdCookie(req, res, user.userid);
                            setPositionCookie(req, res, user.position);
                            //setFullnameCookie(req, res, user.fullName);
                            
                            res.json({
                                id: user.userid,
                                fullName: user.fullName,
                                position: user.position,
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
    res.clearCookie(['user_id']);
    res.json({
        message: 'logged out'
    });
});

module.exports = router;