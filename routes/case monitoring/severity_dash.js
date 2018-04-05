const express = require('express');
const router = express.Router();
const knex = require('../../db/knex');

const queries = require('../../db/queries/case monitoring/severity_dash');

function isValidSeverity(req, res, next) {
    if (req.query.severity) return next();
    next(new Error('Invalid Route'));
}

router.get('/', isValidSeverity, (req, res, next) => {
    const {
        order_id,
        order_customer, 
        order_status,
        order_type,
        order_purpose,
        order_update,

        //required query
        severity,
        limit,
        offset
    } = req.query;
    queries
        .getSeverity({
            order_id,
            order_customer, 
            order_status,
            order_type,
            order_purpose,
            order_update,
    
            //required query
            severity,
            limit,
            offset
        })
        .then(case_mon => {
            if(case_mon) {
                res.json(case_mon);
                console.log('Getting Cases by Severity');
            } else {
                next(new Error(404));
            }
        }); 
});

module.exports = router;