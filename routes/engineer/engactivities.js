const express = require('express');

const router = express.Router();

const queries = require('../../db/queries/engineer/engactivities');

function isValidEngId(req, res, next) {
    if(!isNaN(req.params.engId)) return next();
    next(new Error('Invalid EngID'));
}

router.get('/', (req, res) => {
    queries.getAll().then(engineers => {
        res.json(engineers);
        console.log('GETTING ALL ENGINEER ACTIVITIES');
    });
});

router.get('/:engId', isValidEngId, (req, res) => {
    queries.getOne(req.params.engId).then(engineer => {
        if(engineer) {
            res.json(engineer);
            console.log('Getting Engineers by ID');
        } else {
            next();
        }
    });
});

module.exports = router;