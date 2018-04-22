const express = require('express');

const router = express.Router();

const queries = require('../../db/queries/client/client');

function isValidClient(req, res, next) {
    if (req.params.accountName) return next();
    next(new Error('Invalid Client'));
}

router.get('/', (req, res, next) => {
    queries
        .getAllContacts()
        .then(clients => {
            if (clients) {
                res.json(clients);
                console.log('GETTING ALL CLIENTS');
            } else {
                next();
            }
            
    });
});

router.get('/:accountName', isValidClient, (req, res, next) => {
    queries
        .getContact(req.params.accountName)
        .then(client => {
            if(client) {
                res.json(client);
                console.log('Getting Clients by AccountName');
            } else {
                next(new Error(404));
            }
    });
});

module.exports = router;