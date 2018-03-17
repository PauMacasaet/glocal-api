const express = require('express');

const router = express.Router();

const queries = require('../../db/queries/engineer/department');

function isValidDepartment(req, res, next) {
    if (req.params.department) return next();
    next(new Error('Invalid Department'));
}

router.get('/', (req, res) => {
    queries.getAll().then(engineers => {
        res.json(engineers);
        console.log('GETTING ALL ENGINEERS')
    })
});

router.get('/:department', isValidDepartment, (req, res) => {
    queries.getOne(req.params.department).then(engineer => {
        if(engineer) {
            res.json(engineer);
            console.log('Getting Engineers by Department');
        } else {
            next();
        }
    });
});

module.exports = router;