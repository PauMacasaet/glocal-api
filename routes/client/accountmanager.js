const express = require('express');

const router = express.Router();

const queries = require('../../db/queries/client/accountmanager');

function isValidManager(req, res, next) {
    if (req.params.accountManager) return next();
    next(new Error('Invalid Manager'));
}

router.get('/', (req, res) => {
    queries.getAll().then(clients => {
        res.json(clients);
        console.log('GETTING ALL CLIENTS');
    })
});

router.get('/:accountManager', isValidManager, (req, res) => {
    queries.getOne(req.params.accountManager).then(client => {
        if(client) {
            res.json(client);
            console.log('Getting Clients by Accountmanager');
        } else {
            next();
        }
    });
});

module.exports = router;