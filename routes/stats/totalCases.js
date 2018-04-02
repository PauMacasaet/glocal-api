const express = require('express');

const router = express.Router();

const queries = require('../../db/queries/stats/totalCases');

function isValidStatus(req, res, next) {
    if (req.params.case_status) return next();
    next(new Error('Invalid Case Status'));
}

router.get('/', (req, res) => {
    queries
        .getAll()
        .then(stats => {
            res.json(stats);
            console.log('GETTING ALL STATUSES');
    })
});

router.get('/:case_status', isValidStatus, (req, res) => {
    queries
        .getOne(req.params.case_status)
        .then(status => {
            if(status) {
                res.json(status);
                console.log('Getting Vendors by Principal');
            } else {
                next(new Error(404));
            }
    });
});

module.exports = router;