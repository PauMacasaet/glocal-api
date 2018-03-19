const express = require('express');

const router = express.Router();

const queries = require('../../db/queries/case monitoring/dateCreated');

function isValidCreate(req, res, next) {
    if (req.params.dateIdCreated) return next();
    next(new Error('Invalid Date Created'));
}

router.get('/', (req, res) => {
    queries.getAll().then(cases => {
        res.json(cases);
        console.log('GETTING ALL CASES');
    })
});

router.get('/:dateIdCreated', isValidCreate, (req, res) => {
    queries.getOne(req.params.dateIdCreated).then(case_mon => {
        if(case_mon) {
            res.json(case_mon);
            console.log('Getting List by DateIdCreated');
        } else {
            next();
        }
    });
});

module.exports = router;