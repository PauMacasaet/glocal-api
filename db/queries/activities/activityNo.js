const knex = require('../../knex'); // the connection

module.exports = {
    getAll() {
        return knex('activities')
        .join(
            'contact_person',
            'activities.client',
             '=', 'contact_person.client'
        )
        .select(
            'activities.activityNo', 
            'activities.trackingNo AS glocalId', 
            'activities.sr_no',
            'activities.productName', 
            'contact_person.client', 
            'activities.addres AS address',
            'contact_person.personName', 
            'activities.typeOfActivity',
            'activities.purposeOfVisit', 
            'activities.activityPerformed', 
            'activities.nextActivity', 
            'activities.recommendations', 
            'activities.timeIn', 
            'activities.timeOuts', 
            'activities.assignedSystemsEngineer'
        )
        .orderBy('activities.activityNo', 'desc');
    },
    getOne(activityNo) {
        return knex('activities')
        .join(
            'contact_person', 
            'activities.client', 
            '=', 'contact_person.client'
        )
        .select(
            'activities.activityNo', 
            'activities.trackingNo AS glocalId', 
            'activities.productName', 
            'contact_person.client', 
            'activities.addres AS address',
            'contact_person.personName', 
            'activities.typeOfActivity',
            'activities.purposeOfVisit', 
            'activities.activityPerformed', 
            'activities.nextActivity', 
            'activities.recommendations', 
            'activities.timeIn', 
            'activities.timeOuts', 
            'activities.assignedSystemsEngineer'
        )
        .where('activityNo', activityNo)
        .orderBy('activities.activityNo', 'asc');
    },
    create(activity) {
        const knexQuery = knex('activities')
            .insert(activity, '*')
        
            
        return knexQuery;
    },
    update(activityNo, activity) {
        return knex('activities').where('activityNo', activityNo).update(activity, '*');
    }, 
    delete(activityNo) {
        return knex('activities').where('activityNo', activityNo).del();
    }
}