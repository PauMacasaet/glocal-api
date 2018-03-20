const express = require('express');
const router = express.Router();

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
    const hasAccountManager = typeof case_mon.assignedAccountManager == 'string';
    const hasSE = Array.isArray(case_mon.assignedSystemsEngineer);
    const hasLeads = typeof case_mon.leads == 'string' && case_mon.leads.trim() != ''; 
    const hasStatus = typeof case_mon.case_status == 'string' && case_mon.case_status.trim() != '';
    return hasDateCreated && hasDateRaised && hasTitle && hasDescription && hasSeverity && hasVendor && hasCustomer && hasProductName && hasSELead && hasAccountManager && hasSE && hasLeads && hasStatus;
}

router.get('/', (req, res) => {
    queries.getAll().then(cases => {
        res.json(cases);
        console.log('GETTING ALL CASES');
    });
});

router.get('/search', (req, res) => {
    res.json(req.query.q);
});

router.get('/filter', (req,res) => {
    res.json(req.query);
});

router.get('/:glocalId', isValidId, (req, res) => {
    queries.getOne(req.params.glocalId).then(case_mon => {
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
        queries.create(req.body).then(case_mon => {
            res.json({
                'create case_monitoring': 'case_monitoring created'
            }); //malabo error
            res.json(case_mon[0]);
        });
    } else {
        next(new Error('Invalid Case'));
    }
});

router.put('/:glocalId', (req, res, next) => {
    queries.update(req.params.glocalId, req.body).then(case_mon => {
        res.json({
            'update case_monitoring': 'case_monitoring updated'
        });
        res.json(case_mon[0]);
    });
});

router.delete('/:glocalId', isValidId, (req, res, next) => {
    queries.delete(req.params.glocalId).then(() => {
        res.json({
            'delete case_monitoring': 'case_monitoring deleted'
        });
        res.json({
            deleted: true
        });
    });
});

module.exports = router;