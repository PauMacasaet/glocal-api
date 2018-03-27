const express = require('express');
const router = express.Router();

const User = require('../db/queries/login/user');
const Activity = require('../db/queries/activities/activityPerformed');

const authMiddleware = require('../auth/middleware');

router.get('/', (req, res) => {
    User
        .getAll()
        .then(users => {
            res.json(users);
            console.log('GETTING ALL USERS');
        });
});

router.get('/:id', authMiddleware.allowAccess, (req, res) => {
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


//not yet done
router.get('/:assignedSystemsEngineer/activityPerformed', authMiddleware.allowAccess, (req,res)=>{
  if ((req.params.assignedSystemsEngineer)) {
    Activity
      .getByUser(req.params.assignedSystemsEngineer)
      .then(activities => {
        res.json(activities);
    });
  } else {
    resError(res, 500, "Invalid User");
  }
})

function resError(res, statusCode, message) {
  res.status(statusCode);
  res.json({message});
}

module.exports = router;
