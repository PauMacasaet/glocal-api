const express = require('express');
const router = express.Router();
const knex = require('../../db/knex');

const queries = require('../../db/queries/case monitoring/glocalid');

function isValidId(req, res, next) {
    if (req.params.glocalId) return next();
    next(new Error('Invalid ID'));
}

function validCase(case_mon) {
    const hasDateCreated = typeof case_mon.dateIdCreated == 'string';
    const hasDateRaised = typeof case_mon.dateRaised == 'string' && case_mon.dateRaised.trim() != '';
    const hasTitle = typeof case_mon.caseTitle == 'string' && case_mon.caseTitle.trim() != '';
    const hasDescription = typeof case_mon.caseDescription == 'string' && case_mon.caseDescription.trim() != '';
    const hasSeverity = !isNaN(case_mon.severity);
    const hasVendor = typeof case_mon.vendor == 'string' && case_mon.vendor.trim() != '';
    const hasCustomer = typeof case_mon.customer == 'string' && case_mon.customer.trim() != '';
    const hasProductName = typeof case_mon.productName == 'string' && case_mon.productName.trim() != '';
    const hasSELead = typeof case_mon.systemsEngineerLead == 'string';
    const hasStatus = typeof case_mon.case_status == 'string' && case_mon.case_status.trim() != '';
    return hasDateCreated && hasDateRaised && hasTitle && hasDescription && hasSeverity && hasVendor && hasCustomer && hasProductName && hasSELead && hasStatus;
}

router.get('/', (req, res, next) => {
    const { 
        //SORT  
        // /glocalId?order_id=(asc or desc)&q=text   OR 
        // /glocalId?order_id=(asc or desc)?customer=BPI
        // order_id,
        // order_customer, 
        // order_status,
        // order_se,
        // order_severity,
        // order_title,
        // order_product,
        // order_update,
        // order_raised,
        // search
        //q, //customer, productName, caseTitle, caseDescription

        //filters
        customer, 
        case_status, 
        assignedSystemsEngineer, 
        severity, 
        vendor, 
        productName, 
        dateRaised,
        limit,
        offset } = req.query.values;
    queries.getAll({ 
        //SORT
        order_id,
        order_customer, 
        order_status,
        order_se,
        order_severity,
        order_title,
        order_product,
        order_update,
        order_raised,
        // search and filters
        q,
        customer, 
        case_status, 
        assignedSystemsEngineer, 
        severity, 
        vendor, 
        productName, 
        dateRaised,
        limit,
        offset }).then(cases => {
        if (cases) {
            res.json(cases);
            console.log('GETTING ALL CASES');
        } else {
            next();
        }
    });
});

router.get('/:glocalId', isValidId, (req, res, next) => {
    queries
        .getOne(req.params.glocalId)
        .then(case_mon => {
            if(case_mon) {
                res.json(case_mon);
                console.log('Getting List by GlocalID');
            } else {
                next(new Error(404));
            }
    });
});

router.post('/', (req, res, next) => {
    if(validCase(req.body)) {
        queries
            .create(req.body)
            .then(case_mon => {
            res.json({
                case_mon,
                message: 'case_monitoring created'
            }); //malabo error
        });
    } else {
        next(new Error('Invalid Case'));
    }
});

router.put('/:glocalId', isValidId, (req, res, next) => {
    if(validCase(req.body)) {
        queries
            .update(req.params.glocalId, req.body)
            .then(case_mon => {
                res.json({
                    case_mon,
                    message: 'Case Monitoring updated'
                });
        });
    } else {
        next(new Error('Invalid Update'));
    }
});

router.delete('/:glocalId', isValidId, (req, res, next) => {
    queries
        .delete(req.params.glocalId)
        .then(() => {
        res.json({
            deleted: true,
            message: 'case_monitoring deleted'
        });
    });
});

module.exports = router;