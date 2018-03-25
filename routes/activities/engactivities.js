const express = require('express');

const router = express.Router();

const queries = require('../../db/queries/activities/engactivities');

function isValidEngId(req, res, next) {
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

router.get('/:assignedSystemsEngineer', isValidEngId, (req, res) => {
    queries
        .getOne(req.params.assignedSystemsEngineer)
        .then(engineer => {
            if(engineer) {
                res.json(engineer);
                console.log('Getting Activities By Assigned Engineer');
            } else {
                next();
            }
    });
});

module.exports = router;