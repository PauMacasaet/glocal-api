const express = require('express');

const router = express.Router();

const queries = require('../../db/queries/contact person/contactp');

function isValidContact(req, res, next) {
    if (req.params.personName) return next();
    next(new Error('Invalid Contact'));
}

function validContact(contact) {
    const hasClient = typeof contact.client == 'string' && contact.client.trim() != '';
    const hasPerson = typeof contact.personName == 'string' && contact.client.trim() != '';
    return hasClient && hasPerson; 
}

router.get('/', (req, res) => {
    queries.getAll().then(contacts => {
        res.json(contacts);
        console.log('GETTING ALL CONTACTS');
    });    
});

router.get('/:personName', isValidContact, (req, res) => {
    queries.getOne(req.params.personName).then(contact => {
        if(contact) {
            res.json(contact);
            console.log('Getting Contacts by Personname');
        } else {
            next();
        }
    });
});

router.post('/', (req, res, next) => {
    if(validContact(req.body)) {
        queries.create(req.body).then(contact => {
            res.json({
                'create contact': 'contact created'
            }); //malabo error
            res.json(contact[0]);
        });
    } else {
        next(new Error('Invalid Contact'));
    }
});

router.put('/:personName', (req, res, next) => {
    queries.update(req.params.personName, req.body).then(contact => {
        res.json({
            'update contact': 'contact updated'
        });
        res.json(contact[0]);
    });
});

router.delete('/:personName', isValidContact, (req, res, next) => {
    queries.delete(req.params.personName).then(() => {
        res.json({
            'delete contact': 'contact deleted'
        });
        res.json({
            deleted: true
        });
    });
});

module.exports = router;