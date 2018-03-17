const express = require('express');

const router = express.Router();

const queries = require('../../db/queries/engineer/isLead');

function isValidLead(req, res, next) {
    if (req.params.isLead) return next();
    next(new Error('Invalid SE LEAD'));
}

router.get('/', (req, res) => {
    queries.getAll().then(engineers => {
        res.json(engineers);
        console.log('GETTING ALL ENGINEERS')
    })
});

router.get('/:isLead', isValidLead, (req, res) => {
    queries.getOne(req.params.isLead).then(engineer => {
        if(engineer) {
            res.json(engineer);
            console.log('Getting Engineers by SE Lead');
        } else {
            next();
        }
    });
});

module.exports = router;