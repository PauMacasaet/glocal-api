const express = require('express');
const router = express.Router();
const knex = require('../../db/knex');

const queries = require('../../db/queries/case monitoring/glocalid');

function isValidUser(req, res, next) {
    if (req.query.user) return next();
    next(new Error('Invalid Route'));
}

router.get('/', isValidUser, (req, res, next) => {
    const {
        order_id,
        order_customer, 
        order_status,
        order_severity,
        order_title,
        order_product,
        order_update,
        order_raised,

        //required query
        user,
        
        //filters
        customer, 
        case_status, 
        systemsEngineerLead,
        severity, 
        vendor, 
        productName, 
        dateRaised,
        limit,
        offset
    } = req.query
    queries
        .getUserSE({ 
            order_id,
            order_customer, 
            order_status,
            order_severity,
            order_title,
            order_product,
            order_update,
            order_raised,

            //required query
            user,
            
            //filters
            customer, 
            case_status, 
            systemsEngineerLead,
            severity, 
            vendor, 
            productName, 
            dateRaised,
            limit,
            offset
         })
        .then(case_mon => {
            if(case_mon) {
                res.json(case_mon);
                console.log('Getting Cases by AssignedSE');
            } else {
                next(new Error(404));
            }
        }); 
});

module.exports = router;