const express = require('express');
const router = express.Router();

const User = require('../../db/queries/user/user');
const Activity = require('../../db/queries/activities/activityPerformed');

const authMiddleware = require('../../auth/middleware');

function isValidName(req, res, next) {
  if (req.params.fullName) return next();
  next(new Error('Invalid Name'));
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
router.get('/:userid', authMiddleware.allowAccess, (req, res) => {
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
router.get('/:assignedSystemsEngineer/activityPerformed', authMiddleware.allowAccess, (req,res)=>{
  if (req.params.assignedSystemsEngineer) {
    Activity
      .getByUser(req.params.assignedSystemsEngineer)
      .then(activities => {
        res.json(activities);
    });
  } else {
    resError(res, 500, "Invalid User");
  }
});

function resError(res, statusCode, message) {
  res.status(statusCode);
  res.json({message});
}

module.exports = router;
