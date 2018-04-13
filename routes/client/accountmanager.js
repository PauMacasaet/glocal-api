const express = require('express');

const router = express.Router();

const queries = require('../../db/queries/client/accountmanager');

function isValidManager(req, res, next) {
    if (req.params.accountManager) return next();
    next(new Error('Invalid Manager'));
}

router.get('/', (req, res, next) => {
    queries
        .getAll()
        .then(clients => {
            if (clients) {
                res.json(clients);
                console.log('GETTING ALL CLIENTS');
            } else {
                next();
            }
            
    });
});

router.get('/:accountManager', isValidManager, (req, res, next) => {
    queries
        .getOne(req.params.accountManager)
        .then(client => {
            if(client) {
                res.json(client);
                console.log('Getting Clients by Accountmanager');
            } else {
                next(new Error(404));
            }
    });
});

module.exports = router;