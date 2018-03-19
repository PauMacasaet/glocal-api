const express = require('express');

const router = express.Router();

const queries = require('../../db/queries/case monitoring/caseTitle');

function isValidTitle(req, res, next) {
    if (req.params.caseTitle) return next();
    next(new Error('Invalid Case Title'));
}

router.get('/', (req, res) => {
    queries.getAll().then(cases => {
        res.json(cases);
        console.log('GETTING ALL CASES');
    })
});

router.get('/:caseTitle', isValidTitle, (req, res) => {
    queries.getOne(req.params.caseTitle).then(case_mon => {
        if(case_mon) {
            res.json(case_mon);
            console.log('Getting List by CaseTitle');
        } else {
            next();
        }
    });
});

module.exports = router;