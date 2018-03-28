const express = require('express');

const router = express.Router();

const queries = require('../../db/queries/activities/engactivities');
const authMiddleware = require('../../auth/middleware');


function isValidEngineer(req, res, next) {
    if(req.params.assignedSystemsEngineer) return next();
    next(new Error('Invalid Engineer'));
}

router.get('/', (req, res) => {
    queries
        .getAll()
        .then(engineers => {
            res.json(engineers);
            console.log('GETTING ALL ENGINEER ACTIVITIES');
    });
});

// authMiddleware.allowActivityAccess, 
router.get('/:assignedSystemsEngineer', isValidEngineer, (req, res, next) => {

    if (req.params.assignedSystemsEngineer) {
        queries
          .getOne(req.params.assignedSystemsEngineer)
          .then(user => {
            if (user) {
              delete user.password;
              res.json(user);
            } else {
              next(new Error('User Not Found'));
            }
        });
    } else {
        next(new Error("Invalid User"));
    }
});

module.exports = router;