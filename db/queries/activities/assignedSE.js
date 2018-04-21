const knex = require('../../knex'); // the connection

module.exports = {
    getAll() {
        return knex('activities')
        .join(
            'client',
            'activities.client',
             '=', 'client.accountName'
        )
        .select(
            'activities.activityNo', 
            'activities.trackingNo AS glocalId', 
            'activities.productName', 
            'client.accountName', 
            'activities.addres AS address',
            //'contact_person.personName', 
            'activities.typeOfActivity', 
            'activities.purposeOfVisit', 
            'activities.activityPerformed', 
            'activities.nextActivity', 
            'activities.recommendations', 
            'activities.timeIn', 
            'activities.timeOuts', 
            'activities.assignedSystemsEngineer'
        )
        .groupBy(
            'activities.assignedSystemsEngineer', 
            'activities.activityNo',
            'client.accountName'
            // 'contact_person.client',
            // 'contact_person.personName'
        )
        .orderBy('activities.timeOuts', 'desc');
    },
    getOne(name) {
        return knex('activities')
        .join(
            'client', 
            'activities.client', 
            '=', 'client.accountName'
        )
        .select(
            'activities.activityNo', 
            'activities.trackingNo AS glocalId', 
            'activities.productName', 
            'client.accountName', 
            'activities.addres AS address',
            //'contact_person.personName', 
            'activities.typeOfActivity', 
            'activities.purposeOfVisit', 
            'activities.activityPerformed', 
            'activities.nextActivity', 
            'activities.recommendations', 
            'activities.timeIn', 
            'activities.timeOuts', 
            'activities.assignedSystemsEngineer'
        )
        .groupBy(
            'activities.assignedSystemsEngineer', 
            'activities.activityNo',
            'client.accountName'
            // 'contact_person.client',
            // 'contact_person.personName'
        )
        .where('activities.assignedSystemsEngineer', '@>', name)
        .orderBy('activities.timeOuts', 'desc');
    }
}