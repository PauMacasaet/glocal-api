const express = require('express');
const router = express.Router();

const User = require('../../db/queries/user/user');
const Activity = require('../../db/queries/activities/engactivities');

const authMiddleware = require('../../auth/middleware');

function isValidName(req, res, next) {
  if (req.params.fullName) return next();
  next(new Error('Invalid Name'));
}

function isValidUserId(req, res, next) {
  if(!isNan(req.params.userid)) return next();
  next(new Error('Invalid User ID'));
}

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

router.get('/', (req, res) => {
    User
        .getAll()
        .then(users => {
            res.json(users);
            //res.cookie(users);
            console.log('GETTING ALL USERS');
        });
});
//, authMiddleware.allowAccess
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
            next();
        }
  });
});


//not yet done
router.get('/:assignedSystemsEngineer/engActivities', authMiddleware.allowActivityAccess, (req,res) =>{
  if (req.params.assignedSystemsEngineer) {
    Activity
      .getOne(req.params.assignedSystemsEngineer)
      .then(user => {
        if (user) {
          delete user.password;
          res.json(user);
        } else {
          resError(res, 404, 'User Not Found');
        }
    });
  } else {
    resError(res, 500, "Invalid User");
  }
});

router.put('/:userid', isValidUserId, (req, res, next) => {
  if(validUser(req.body)) {
    User
        .update(req.params.userid, req.body)
        .then(user => {
            res.json({
                user,
                message: 'Account Updated'
            });
    });
  } else {
    next(new Error('Invalid Update'));
  }
    
});

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
