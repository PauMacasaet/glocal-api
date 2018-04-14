const express = require('express');

const router = express.Router();

const queries = require('../../db/queries/stats/severityCount');

function isValidSeverity(req, res, next) {
    if (!isNaN(req.params.severity)) return next();
    next(new Error('Invalid Case Status'));
}

router.get('/', (req, res, next) => {
    const {
        customer,
        severity,
        from, to
    } = req.query
    queries
        .getAllSeverity({
            customer,
            severity,
            from, to
        })
        .then(stats => {
            if (stats) {
                res.json(stats);
                console.log('GETTING ALL SEVERITIES');
            } else {
                next();
            }
            
    });
});

module.exports = router;