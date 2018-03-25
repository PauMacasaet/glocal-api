const express = require('express');

const router = express.Router();

const queries = require('../../db/queries/engineer/name');

function isValidName(req, res, next) {
    if (req.params.lastName) return next();
    next(new Error('Invalid Name'));
}

router.get('/', (req, res) => {
    queries
        .getAll()
        .then(engineers => {
            res.json(engineers);
            console.log('GETTING ALL ENGINEERS')
    })
});

router.get('/:lastName', isValidName, (req, res) => {
    queries
        .getOne(req.params.lastName)
        .then(engineer => {
            if(engineer) {
                res.json(engineer);
                console.log('Getting Engineers by Name');
            } else {
                next();
            }
    });
});

module.exports = router;