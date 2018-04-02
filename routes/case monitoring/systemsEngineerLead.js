const express = require('express');

const router = express.Router();

const queries = require('../../db/queries/case monitoring/systemsEngineerLead');

function isValidSELead(req, res, next) {
    if (req.params.systemsEngineerLead) return next();
    next(new Error('Invalid SystemsEngineerLead'));
}

router.get('/', (req, res) => {
    queries
        .getAll()
        .then(cases => {
            res.json(cases);
            console.log('GETTING ALL CASES');
    });
});

router.get('/:systemsEngineerLead', isValidSELead, (req, res) => {
    queries
        .getOne(req.params.systemsEngineerLead)
        .then(case_mon => {
            if(case_mon) {
                res.json(case_mon);
                console.log('Getting List by SystemsEngineerLead');
            } else {
                next(new Error(404));
            }
    });
});

module.exports = router;