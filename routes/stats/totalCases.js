const express = require('express');

const router = express.Router();

const queries = require('../../db/queries/stats/totalCases');

function isValidStatus(req, res, next) {
    if (req.params.case_status) return next();
    next(new Error('Invalid Case Status'));
}

router.get('/', (req, res, next) => {
    const {
        case_status
    } = req.query;
    queries
        .getAllStatus({
            case_status
        })
        .then(stats => {
            if (stats) {
                res.json(stats);
                console.log('GETTING ALL STATUSES');
            } else {
                next();
            }
    });
});

module.exports = router;