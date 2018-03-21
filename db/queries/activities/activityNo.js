const knex = require('../../knex'); // the connection

module.exports = {
    getAll() {
        return knex('activities')
        .join('engineer', 'engineer.engId', '=', 'activities.engid')
        .select('activities.engid', 'activities.productName', 'activities.typeOfActivity', 'activities.purposeOfVisit', 'activities.activityPerformed', 'activities.nextActivity', 'activities.recommendations', 'activity.timeIn', 'activity.timeOuts', 'engineer.firstName', 'engineer.lastName');
    },
    getOne(activityNo) {
        return knex('activities')
        .join('engineer', 'engineer.engId', '=', 'activities.engid')
        .select('activities.engid', 'activities.productName', 'activities.typeOfActivity', 'activities.purposeOfVisit', 'activities.activityPerformed', 'activities.nextActivity', 'activities.recommendations', 'activity.timeIn', 'activity.timeOuts', 'engineer.firstName', 'engineer.lastName')
        .where('activityNo', activityNo);
    },
    create(activity) {
        return knex('activities').insert(activity, '*');
    },
    update(activityNo, activity) {
        return knex('activities').where('activityNo', activityNo).update(activity);
    }, 
    delete(activityNo) {
        return knex('activities').where('activityNo', activityNo).del();
    }
}