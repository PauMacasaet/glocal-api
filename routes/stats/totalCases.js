const express = require('express');

const router = express.Router();

const queries = require('../../db/queries/stats/totalCases');

function isValidStatus(req, res, next) {
    if (req.params.case_status) return next();
    next(new Error('Invalid Case Status'));
}

router.get('/', (req, res, next) => {
    const {
        case_status,
        customer,
        from, to
    } = req.query;
    queries
        .getAllStatus({
            case_status,
            customer,
            from, to
        })
        .then(stats => {
            //if (stats) {
                res.json(stats);
                console.log('GETTING ALL STATUSES');
           // } else {
           //     next(new Error('Not Existing'));
           // }
    });
});

module.exports = router;