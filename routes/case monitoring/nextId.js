const express = require('express');

const router = express.Router();

const queries = require('../../db/queries/case monitoring/nextId');

router.get('/', (req, res) => {
    queries.getAll().then(cases => {
        res.json(cases);
        console.log('GETTING NEXT GlocalID');
    })
});

module.exports = router;