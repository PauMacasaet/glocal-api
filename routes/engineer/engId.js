const express = require('express');

const router = express.Router();

const queries = require('../../db/queries/engineer/engId');

function isValidEngId(req, res, next) {
    if(!isNaN(req.params.engId)) return next();
    next(new Error('Invalid EngID'));
}

function validEngineer(engineer) {
    const hasDepartment = typeof engineer.department == 'string' && engineer.department.trim() != '';
    const hasFirst = typeof engineer.firstName == 'string' && engineer.firstName.trim() != '';
    const hasLast = typeof engineer.lastName == 'string' && engineer.lastName.trim() != '';
    const hasLead = typeof engineer.isLead == 'boolean';
    return hasDepartment && hasFirst && hasLast && hasLead;
}

router.get('/', (req, res) => {
    queries.getAll().then(engineers => {
        res.json(engineers);
        console.log('GETTING ALL ENGINEERS');
    })
});

router.get('/:engId', isValidEngId, (req, res) => {
    queries.getOne(req.params.engId).then(engineer => {
        if(engineer) {
            res.json(engineer);
            console.log('Getting Engineers by ID');
        } else {
            next();
        }
    });
});

router.post('/', (req, res, next) => {
    if(validEngineer(req.body)) {
        queries.create(req.body).then(engineer => {
            res.json({
                'create engineer': 'engineer created'
            }); //malabo error
            res.json(engineer[0]);
        });
    } else {
        next(new Error('Invalid Engineer'));
    }
});

router.put('/:engId', (req, res, next) => {
    queries.update(req.params.engId, req.body).then(engineer => {
        res.json({
            'update engineer': 'engineer updated'
        });
        res.json(engineer[0]);
    });
});

router.delete('/:engId', isValidEngId, (req, res, next) => {
    queries.delete(req.params.engId).then(() => {
        res.json({
            'delete engineer': 'engineer deleted'
        });
        res.json({
            deleted: true
        });
    });
});

module.exports = router;