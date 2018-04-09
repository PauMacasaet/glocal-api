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
  const hasPassword = typeof user.password == 'string' 
      && user.password.trim() != ''
      && user.password.trim().length >= 6;
  const hasNumber = typeof user.contactNumber == 'string'
      && user.contactNumber.trim() != '';
  const hasActive = typeof user.is_active == 'boolean';
  
  return hasFullname && hasUserName && hasEmail && hasPassword && hasNumber && hasPosition && hasActive;
}

function validDirectorUpdate (user) {
  const hasPosition = typeof user.position == 'string'
    && user.position.trim() != '';
  const hasActive = typeof user.is_active == 'boolean';
  return hasPosition && hasActive;
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
router.get('/:userid', authMiddleware.allowIDAccess, (req, res) => {
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

// router.put(':/userid', isValidUserId, (req, res, next) => {
//   if(validDirectorUpdate(req.body)) {
//     User  
//       .getOneByEmail(req.body.email)
//       .then(user => {
//         if(!user) {
//           bcrypt.hash(req.body.password, 10, function(err, hash) {
//             const user = { 
//               position: req.body.position,
//               is_active: req.body.is_active
//             };
//             User
//               .update(req.params.userid, req.body)
//               .then(user => {
//                 res.json({
//                   user,
//                   message: 'Account Updated'
//                 });
//               });
//           });
//         } else {
//           next(new Error('Email in use'));
//         }
//       })
//   } else {
//     next(new Error('Invalid User'));
//   }
// });

router.put('/:userid', isValidUserId, (req, res, next) => {
  if(validDirectorUpdate(req.body)) {
  
//     User
//       .then(user => {
//         console.log('user', user);

//         if(!user) {
//           //unique email
//           //hash password
          
//           bcrypt.hash(req.body.password, 10, function(err, hash) {
//               const user = { 
//                   fullName: req.body.fullName,
//                   username: req.body.username,
//                   email: req.body.email,
//                   password: hash,
//                   contactNumber: req.body.contactNumber,
//                   dateCreated: new Date(),
//                   is_active: req.body.is_active
//               };
//               User
//                 .update(req.params.userid, req.body)
//                 .then(user => {
//                     res.json({
//                         user,
//                         message: 'Account Updated'
//                     });
//                 });
//               });
//         } else {
//             // email in use
//             next(new Error('Email in use'));
//         }
//       });
//   } else {
//     next(new Error('Invalid Update'));
//   }
  
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
