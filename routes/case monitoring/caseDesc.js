const express = require('express');

const router = express.Router();

const queries = require('../../db/queries/case monitoring/caseDesc');

function isValidDesc(req, res, next) {
    if (req.params.caseDescription) return next();
    next(new Error('Invalid Case Description'));
}

router.get('/', (req, res) => {
    queries
        .getAll()
        .then(cases => {
            res.json(cases);
            console.log('GETTING ALL CASES');
    })
});

router.get('/:caseDescription', isValidDesc, (req, res) => {
    queries
        .getOne(req.params.caseDescription)
        .then(case_mon => {
            if(case_mon) {
                res.json(case_mon);
                console.log('Getting List by CaseDescription');
            } else {
                next();
            }
    });
});

module.exports = router;