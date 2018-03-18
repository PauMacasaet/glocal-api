const express = require('express');

const router = express.Router();

const queries = require('../../db/queries/client/client');

router.get('/', (req, res) => {
    queries.getAll().then(clients => {
        res.json(clients);
        console.log('GETTING ALL CLIENTS');
    })
});

module.exports = router;