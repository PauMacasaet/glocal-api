const express = require('express');

const router = express.Router();

const queries = require('../../db/queries/contact person/contactc');

function isValidClient(req, res, next) {
    if (req.params.client) return next();
    next(new Error('Invalid Client'));
}

router.get('/', (req, res) => {
    queries.getAll().then(contacts => {
        res.json(contacts);
        console.log('GETTING ALL CONTACTS');
    });    
});

router.get('/:client', isValidClient, (req, res) => {
    queries.getOne(req.params.client).then(contact => {
        if(contact) {
            res.json(contact);
            console.log('Getting Contacts by Client');
        } else {
            next();
        }
    });
});

module.exports = router;