const express = require('express');

const router = express.Router();

const queries = require('../../db/queries/user/position');

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

router.get('/systemEngineer/:fullName', (req, res, next) => {
    queries
        .getOneEngineer('System Engineer', req.params.fullName)
        .then(engineer => {
            if(engineer) {
                res.json(engineer);
                console.log('Getting System Engineer Individually');
            } else {
                next();
            }
    });
});

router.get('/manager', (req, res, next) => {
    queries
        .getAM('Account Manager')
        .then(manager => {
            if(manager) {
                res.json(manager);
                console.log('Getting Managers');
            } else {
                next();
            }
    });
});

router.get('/manager/:fullName', (req, res, next) => {
    queries
        .getOneAM('Account Manager', req.params.fullName)
        .then(manager => {
            if(manager) {
                res.json(manager);
                console.log('Getting Manager Individually');
            } else {
                next();
            }
    });
});

module.exports = router;