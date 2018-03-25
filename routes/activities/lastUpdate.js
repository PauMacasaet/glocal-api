const express = require('express');

const router = express.Router();

const queries = require('../../db/queries/activities/lastUpdate');

router.get('/', (req, res) => {
    queries
        .getAll()
        .then(activities => {
            res.json(activities);
            console.log('GETTING LAST UPDATE');
    });
});

module.exports = router;