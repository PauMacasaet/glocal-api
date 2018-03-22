const express = require('express');

const router = express.Router();

const queries = require('../../db/queries/activities/engactivities');

function isValidEngId(req, res, next) {
    if(req.params.assignedSystemsEngineer) return next();
    next(new Error('Invalid Engineer'));
}

router.get('/', (req, res) => {
    queries.getOne(req.params.assignedSystemsEngineer).then(engineers => {
        res.json(engineers);
        console.log('GETTING ALL ENGINEER ACTIVITIES');
    });
});

// router.get('/:', isValidEngId, (req, res) => {
//     queries.getOne(req.params.engId).then(engineer => {
//         if(engineer) {
//             res.json(engineer);
//             console.log('Getting Engineers by ID');
//         } else {
//             next();
//         }
//     });
// });

module.exports = router;