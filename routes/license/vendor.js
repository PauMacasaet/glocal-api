const express = require('express');

const router = express.Router();

const queries = require('../../db/queries/license/vendor');

function isValidClient(req, res, next) {
    if (req.params.client) return next();
    next(new Error('Invalid Client'));
}

router.get('/', (req, res) => {
    queries.getAll().then(licenses => {
        res.json(licenses);
        console.log('GETTING ALL LICENSES');
    })
});

router.get('/:client', isValidClient, (req, res) => {
    queries.getOne(req.params.client).then(license => {
        if(license) {
            res.json(license);
            console.log('Getting List by Client License');
        } else {
            next();
        }
    });
});

module.exports = router;