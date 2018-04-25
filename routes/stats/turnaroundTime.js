const express = require('express');

const router = express.Router();

const queries = require('../../db/queries/stats/turnaroundTime');

router.get('/', (req, res, next) => {
    const {
        customer,
        from, to
    } = req.query;

    queries
        .getTurnaroundAvg({
            customer,
            from, to
        })
        .then(time => {
           // if (time) {
                res.json(time);
                console.log('Getting Turnaround Time');
          //  } else {
          //      next(new Error('Not Existing'));
          //  }
        });
});

module.exports = router;