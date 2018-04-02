const express = require('express');

const router = express.Router();

const queries = require('../../db/queries/case monitoring/case_status');

function isValidStatus(req, res, next) {
    if (req.params.case_status) return next();
    next(new Error('Invalid Case Status'));
}

router.get('/', (req, res) => {
    queries
        .getAll()
        .then(cases => {
            res.json(cases);
            console.log('GETTING ALL CASES');
    })
});

router.get('/:case_status', isValidStatus, (req, res) => {
    queries
        .getOne(req.params.case_status)
        .then(case_mon => {
            if(case_mon) {
                res.json(case_mon);
                console.log('Getting List by Case Status');
            } else {
                next(new Error(404));
            }
    });
});

module.exports = router;