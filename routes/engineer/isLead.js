const express = require('express');

const router = express.Router();

const queries = require('../../db/queries/engineer/isLead');

function isValidLead(req, res, next) {
    if (req.params.isLead) return next();
    next(new Error('Invalid SE LEAD'));
}

router.get('/', (req, res) => {
    queries
        .getAll('System Engineer')
        .then(engineers => {
            res.json(engineers);
            console.log('GETTING ALL SE Leads');
    });
});

module.exports = router;