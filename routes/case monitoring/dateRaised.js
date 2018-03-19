const express = require('express');

const router = express.Router();

const queries = require('../../db/queries/case monitoring/dateRaised');

function isValidRaise(req, res, next) {
    if (req.params.dateRaised) return next();
    next(new Error('Invalid Date Raised'));
}

router.get('/', (req, res) => {
    queries.getAll().then(cases => {
        res.json(cases);
        console.log('GETTING ALL CASES');
    })
});

router.get('/:dateRaised', isValidRaise, (req, res) => {
    queries.getOne(req.params.dateRaised).then(case_mon => {
        if(case_mon) {
            res.json(case_mon);
            console.log('Getting List by DateRaised');
        } else {
            next();
        }
    });
});

module.exports = router;