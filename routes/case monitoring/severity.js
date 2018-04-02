const express = require('express');

const router = express.Router();

const queries = require('../../db/queries/case monitoring/severity');

function isValidSeverity(req, res, next) {
    if (req.params.severity) return next();
    next(new Error('Invalid Severity'));
}

router.get('/', (req, res) => {
    queries
        .getAll()
        .then(cases => {
            res.json(cases);
            console.log('GETTING ALL CASES');
    });
});

router.get('/:severity', isValidSeverity, (req, res) => {
    queries
        .getOne(req.params.severity)
        .then(case_mon => {
            if(case_mon) {
                res.json(case_mon);
                console.log('Getting List by Severity');
            } else {
                next(new Error(404));
            }
    });
});

module.exports = router;