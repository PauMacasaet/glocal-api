const express = require('express');

const router = express.Router();

const queries = require('../../db/queries/case monitoring/assignedAccountManager');

function isValidAcctManager(req, res, next) {
    if (req.params.assignedAccountManager) return next();
    next(new Error('Invalid AssignedAccountManager'));
}

router.get('/', (req, res) => {
    queries
        .getAll()
        .then(cases => {
            res.json(cases);
            console.log('GETTING ALL CASES');
    })
});

router.get('/:assignedAccountManager', isValidAcctManager, (req, res) => {
    queries
        .getOne(req.params.assignedAccountManager)
        .then(case_mon => {
            if(case_mon) {
                res.json(case_mon);
                console.log('Getting List by AssignedAccountManager');
            } else {
                next();
            }
    });
});

module.exports = router;