const express = require('express');

const router = express.Router();

const queries = require('../../db/queries/engineer/position');

router.get('/', (req, res) => {
    queries
        .getAll()
        .then(users => {
            res.json(users);
            console.log('GETTING ALL ENGINEERS')
    });
});

router.get('/systemEngineer', (req, res, next) => {
    queries
        .getEngineer('System Engineer')
        .then(engineer => {
            if(engineer) {
                res.json(engineer);
                console.log('Getting Engineers');
            } else {
                next();
            }
    });
});

router.get('/manager', (req, res, next) => {
    queries
        .getEngineer('Account Manager')
        .then(manager => {
            if(manager) {
                res.json(manager);
                console.log('Getting Managers');
            } else {
                next();
            }
    });
});

module.exports = router;