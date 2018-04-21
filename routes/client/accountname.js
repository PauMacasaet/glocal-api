const express = require('express');

const router = express.Router();

const queries = require('../../db/queries/client/client');

function isValidClient(req, res, next) {
    if (req.params.accountName) return next();
    next(new Error('Invalid Client'));
}

function validClient(client) {
    const hasAccoutname = typeof client.accountName == 'string' && client.accountName.trim() != '';
    const hasContact = Array.isArray(client.contact_details); 
    const hasAddress = typeof client.company_address == 'string' && client.company_address.trim() != '';
    const hasManager = typeof client.accountManager == 'string' && client.accountManager.trim() != '';  // FK
    return hasAccoutname && hasContact && hasAddress && hasManager;
}

router.get('/', (req, res, next) => {
    const {
        //SORT  
        // /client?order_client=asc&q=text
        order_client,
        order_address,
        order_manager,

        //SEARCH
        q, //accountName, accountManager
        limit,
        offset
    } = req.query;
    queries
        .getAll({
            //SORT
            order_client,
            order_address,
            order_manager,
    
            //SEARCH
            q,
            limit,
            offset
        }).then(clients => {
            if (clients) {
                res.json(clients);
                console.log('GETTING ALL CLIENTS');
            } else {
                next();
            }        
    });
});


router.get('/:accountName', isValidClient, (req, res, next) => {
    queries
        .getOne(req.params.accountName)
        .then(client => {
            if(client) {
                res.json(client);
                console.log('Getting Clients by Accountname');
            } else {
                next(new Error(404));
            }
    });
});

router.post('/', (req, res, next) => {
    if(validClient(req.body)) {
        queries
            .create(req.body)
            .then(client => {
                if (client) {
                    res.json({
                        client,
                        message: 'client created'
                    }); 
                } else {
                    next(new Error(404));
                }
        });
    } else {
        next(new Error('Invalid Client'));
    }
});

router.put('/:accountName', isValidClient, (req, res, next) => {
    if(validClient(req.body)) {
        queries
            .update(req.params.accountName, req.body)
            .then(client => {
                if (client) {
                    res.json({
                        client,
                        message: 'client updated'
                    }); 
                } else {
                    next(new Error(404));
                }
        });
    } else {
        next(new Error('Invalid Update'));
    }
});

router.delete('/:accountName', isValidClient, (req, res, next) => {
    queries
        .delete(req.params.accountName)
        .then(() => {
            res.json({
                deleted: true,
                message: 'client deleted'
            });
    });
});

module.exports = router;