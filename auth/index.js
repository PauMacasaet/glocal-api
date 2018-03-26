const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();

const User = require('../db/queries/login/user');
// route paths are prepended 

router.get('/', (req, res) => {
    User
        .getAll()
        .then(users => {
            res.json(users);
            console.log('GETTING ALL USERS');
        });
});

router.get('/:id', (req, res) => {
    if (!isNaN(req.params.id)) {
      User.getOne(req.params.id).then(user => {
        if (user) {
          delete user.password;
          res.json(user);
        } else {
          resError(res, 404, "User Not Found");
        }
      });
    } else {
      resError(res, 500, "Invalid ID");
    }
});

function validUser(user) {
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
    
    return hasUserName && hasEmail && hasPassword && hasNumber && hasPosition;
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
                                res.cookie('user_id', user.id, {
                                    httpOnly: true,
                                    secure: isSecure,
                                    signed: true
                                });
                                res.json({
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

module.exports = router;