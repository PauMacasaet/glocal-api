const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();

const User = require('../../db/queries/user/user');
const Activity = require('../../db/queries/activities/engactivities');

const authMiddleware = require('../../auth/middleware');

function isValidName(req, res, next) {
  if (req.params.fullName) return next();
  next(new Error('Invalid Name'));
}

function isValidUserId(req, res, next) {
  if(!isNaN(req.params.userid)) return next();
  next(new Error('Invalid User ID'));
}

function validUser(user) {
  const hasFullname = typeof user.fullName == 'string'
      && user.fullName.trim() != '';
  const hasUserName = typeof user.username == 'string' 
      && user.username.trim() != '';
  const hasEmail = typeof user.email == 'string' 
      && user.email.trim() != '';
  const hasNumber = typeof user.contactNumber == 'string'
      && user.contactNumber.trim() != '';
  
  return hasFullname && hasUserName && hasEmail && hasNumber;
}

function validPassword(user) {
  const hasPassword = typeof user.password == 'string' 
        && user.password.trim() != ''
        && user.password.trim().length >= 6;
  
  return hasPassword;
}

function validDirectorUpdate (user) {
  const hasFullname = typeof user.fullName == 'string'
      && user.fullName.trim() != '';
  const hasUserName = typeof user.username == 'string' 
      && user.username.trim() != '';
  const hasEmail = typeof user.email == 'string' 
      && user.email.trim() != '';
  const hasNumber = typeof user.contactNumber == 'string'
      && user.contactNumber.trim() != '';
  const hasPosition = typeof user.position == 'string'
      && user.position.trim() != '';
  const hasActive = typeof user.is_active == 'boolean';
  
  return hasFullname && hasUserName && hasEmail && hasNumber && hasPosition && hasActive;
}

router.get('/', (req, res) => {
    User
        .getAll()
        .then(users => {
            res.json(users);
            console.log('GETTING ALL USERS');
        });
});
//, authMiddleware.allowAccess
//compare id of url to id of cookie
router.get('/:userid', (req, res) => {
  if (!isNaN(req.params.userid)) {
    User.getOne(req.params.userid).then(user => {
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

router.get('/name/:fullName', isValidName, (req, res) => {
  User
    .getOneByName(req.params.fullName)
    .then(user => {
        if(user) {
            res.json(user);
            console.log('Getting user by fullname');
        } else {
            resError(res, 404, 'User Not Found');
        }
  });
});

router.put('/employee/:userid', isValidUserId, authMiddleware.allowIDAccess, (req, res, next) => {
  if(validUser(req.body)) {
        User
          .update(req.params.userid, req.body)
          .then(account => {
            res.json({
              account,
              message: 'Account Updated'
            });
          });
    
  } else {
    next(new Error('Invalid Update'));
  }
}); 

router.put('/password/:userid', isValidUserId, authMiddleware.allowIDAccess, (req, res, next) => {
  if(validPassword(req.body)) {
      bcrypt.hash(req.body.password, 10, function(err, hash) {
        const user = {
          password: hash,
        };
        User
          .update(req.params.userid, user)
          .then(account => {
            res.json({
              account,
              message: 'Password Updated'
            });
          });
      });    
  } else {
    next(new Error('Invalid Update'));
  }
}); 

router.put('/director/:userid', isValidUserId, (req, res, next) => {
  if(validDirectorUpdate(req.body)) {
      User
        .update(req.params.userid, req.body)
        .then(account => {
          res.json({
            account,
            message: 'Account Updated'
        });
      });
  } else {
    next(new Error('Invalid Update'));
  }
});

router.put('/director/password/:userid', isValidUserId, (req, res, next) => {
  if(validPassword(req.body)) {
      bcrypt.hash(req.body.password, 10, function(err, hash) {
        const user = {
          password: hash,
        };
        User
          .update(req.params.userid, user)
          .then(account => {
            res.json({
              account,
              message: 'Password Updated'
            });
          });
      });    
  } else {
    next(new Error('Invalid Update'));
  }
}); 

// prolly take out
router.delete('/:userid', isValidUserId, (req, res, next) => {
  User
      .delete(req.params.userid)
      .then(() => {
      res.json({
          deleted: true,
          message: 'Account deleted'
      });
  });
});

function resError(res, statusCode, message) {
  res.status(statusCode);
  res.json({message});
}

module.exports = router;
