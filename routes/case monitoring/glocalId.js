const express = require('express');
const router = express.Router();

const queries = require('../../db/queries/case monitoring/glocalid');
const searchQuery = require('../../db/queries/case monitoring/search');
const filterQuery = require('../../db/queries/case monitoring/filter');

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

router.get('/', (req, res) => {
    queries.getAll().then(cases => {
        res.json(cases);
        console.log('GETTING ALL CASES');
    });
});

// customer, caseTitle, caseDescription, productName
router.get('/search', (req, res) => {
    searchQuery
        .getOne(req.query.q)
        .then(case_mon => {
            res.json(case_mon);
            console.log('Searching');
    });
});

// filters: customer, case_status, assignedSystemEngineers, severity, vendor, productName, dateRaised
// FIELDS TO SHOW: glocalId, customer, case_status, assignedSystemsEngineer, severity, caseTitle, productName, dateRaised
router.get('/filter', (req,res) => {
    const x = filterQuery.getOne(req.query.filter);

    if (req.query.customer) {
        x.where('customer', req.query.customer);
    } else if (req.query.case_status) {
        x.where('case_status', req.query.case_status);
    } else if (req.query.assignedSystemsEngineer) {
        x.where('activities.assignedSystemsEngineer', req.query.assignedSystemsEngineer);
    } else if (req.query.severity) {
        x.where('severity', req.query.severity);
    } else if (req.query.vendor) {
        x.where('vendor', req.query.vendor);
    } else if (req.query.productName) {
        x.where('productName', req.query.productName);
    } else if (req.query.dateRaised) {
        x.where('dateRaised', req.query.dateRaised);
    } 

    x.then(filters => {
        res.json(filters);
        console.log('Filtering');
    })
    .then(null, err => {
        res.status(500).send(err);
    });
});

// router.get('/filter', (req, res, next) => {
//     const keys = [
//         'customer', 
//         'case_status', 
//         'assignedSystemsEngineer', 
//         'severity',
//         'vendor', 
//         'productName', 
//         'dateRaised' 
//     ];
//     const fields = [];

//     keys.forEach(key => {
//         if (req.body[key]) fields.push(key);
//     });

//     fields.forEach((field) => {
//         filterQuery.getOne(req.query.field).then(filters => {
//             if (filters) {
//                 res.json(filters);
//                 console.log('Getting filtered results');
//             } else {
//                 next(new Error('Not found'));
//             }
//         });
//     });
// });

router.get('/:glocalId', isValidId, (req, res, next) => {
    queries
        .getOne(req.params.glocalId)
        .then(case_mon => {
            if(case_mon) {
                res.json(case_mon);
                console.log('Getting List by GlocalID');
            } else {
                next();
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