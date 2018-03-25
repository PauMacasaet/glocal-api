const express = require('express');

const router = express.Router();

const queries = require('../../db/queries/license/onsite');

function isValidSupport(req, res, next) {
    if (req.params.on_site) return next();
    next(new Error('Invalid License'));
}

router.get('/', (req, res) => {
    queries
        .getAll()
        .then(licenses => {
            res.json(licenses);
            console.log('GETTING ALL LICENSES');
    });
});

router.get('/:on_site', isValidSupport, (req, res) => {
    queries
        .getOne(req.params.on_site)
        .then(license => {
            if(license) {
                res.json(license);
                console.log('Getting List by Support Level');
            } else {
                next();
            }
    });
});

module.exports = router;