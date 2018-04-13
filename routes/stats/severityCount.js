const express = require('express');

const router = express.Router();

const queries = require('../../db/queries/stats/severityCount');

function isValidSeverity(req, res, next) {
    if (!isNaN(req.params.severity)) return next();
    next(new Error('Invalid Case Status'));
}

router.get('/', (req, res) => {
    queries
        .getAll()
        .then(stats => {
            res.json(stats);
            console.log('GETTING ALL SEVERITIES');
    })
});

router.get('/:severity', isValidSeverity, (req, res) => {
    queries
        .getOne(req.params.severity)
        .then(status => {
            if(status) {
                res.json(status);
                console.log('Getting Case Count by Severity');
            } else {
                next(new Error(404));
            }
    });
});

module.exports = router;