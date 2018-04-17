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
            'activities.sr_number',
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
        const knexQuery = knex.insert(activity, '*').into('activities')
        // if('activities.typeOfActivity' == 'Remote') {
        //     knexQuery.insert(activity, '*')
        // } else {
        //     knexQuery.insert(
        //         knexQuery.select(
        //             'service_reports.sr_number',
        //             'service_report.trackingNo',
        //             'service_report.timeIn',
        //             'service_report.timeOuts',
        //             'service_reports.productName',
        //             'service_reports.client',
        //             'service_reports.addres',
        //             'service_reports.typeOfActivity',
        //             'service_reports.purposeOfVisit',
        //             'service_reports.activityPerformed',
        //             'service_reports.nextActivity',
        //             'service_reports.recommendation',
        //             'service_reports.assignedSystemsEngineer'
        //         ).from('service_reports').where('service_reports.sr_number', sr_number),
        //         '*'
        //     )
        // }
            
            
        return knexQuery;
    },
    createSR(activity){
        const knexQuery = knex.insert(
            knex.select(
                //'service_reports.sr_number',
                // 'service_reports.trackingNo',
                // 'service_reports.timeIn',
                // 'service_reports.timeOuts',
                // 'service_reports.productName',
                // 'service_reports.client',
                // 'service_reports.addres',
                // 'service_reports.typeOfActivity',
                // 'service_reports.purposeOfVisit',
                // 'service_reports.activityPerformed',
                // 'service_reports.nextActivity',
                // 'service_reports.recommendations',
                // 'service_reports.assignedSystemsEngineer'
                '*'
            ).from('service_reports')
        ).into('activities');

        return knexQuery;
    },
    update(activityNo, activity) {
        return knex('activities').where('activityNo', activityNo).update(activity, '*');
    }, 
    delete(activityNo) {
        return knex('activities').where('activityNo', activityNo).del();
    }
}