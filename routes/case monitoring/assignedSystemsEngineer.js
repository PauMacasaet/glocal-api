const express = require('express');

const router = express.Router();

const queries = require('../../db/queries/case monitoring/assignedSystemsEngineer');

function isValidSE(req, res, next) {
    if (req.params.assignedSystemsEngineer) return next();
    next(new Error('Invalid AssignedSystemsEngineer'));
}

router.get('/:assignedSystemsEngineer', isValidSE, (req, res) => {
    queries
        .getOne(req.params.assignedSystemsEngineer)
        .then(case_mon => {
            if(case_mon) {
                res.json(case_mon);
                console.log('Getting List by AssignedSystemsEngineer');
            } else {
                next(new Error(404));
            }
    });
});

module.exports = router;