const express = require('express');

const router = express.Router();

const queries = require('../../db/queries/case monitoring/assignedSystemsEngineer');

function isValidSE(req, res, next) {
    if (req.params.assignedSystemsEngineer) return next();
    next(new Error('Invalid AssignedSystemsEngineer'));
}

router.get('/', (req, res) => {
    queries.getAll().then(cases => {
        res.json(cases);
        console.log('GETTING ALL CASES');
    })
});

router.get('/:assignedSystemsEngineer', isValidSE, (req, res) => {
    queries.getOne(req.params.assignedSystemsEngineer).then(case_mon => {
        if(case_mon) {
            res.json(case_mon);
            console.log('Getting List by AssignedSystemsEngineer');
        } else {
            next();
        }
    });
});

module.exports = router;