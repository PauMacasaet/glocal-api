const knex = require('../../knex'); // the connection

module.exports = {
    getAll() {
        return knex('user').orderBy('userid', 'asc');
    },
    getEngineer(engineer) {
        return knex('user').where('position', engineer);
    },
    getOneEngineer(engineer, name) {
        return knex('user')
            .where('position', engineer)
            .andWhere('fullName', name);
    },
    getAM(manager) {
        return knex('user')
        .join('client', 'client.accountManager', '=', 'user.fullName')
        .select(
            'user.userid',
            'user.fullName',
            'user.username',
            'user.email',
            'user.contactNumber',
            'user.dateCreated',
            'user.position',
            'client.accountName'
        )
        .where('user.position', manager);
    },
    getOneAM(manager, name) {
        return knex('user')
        .join('client', 'client.accountManager', '=', 'user.fullName')
        .select(
            'user.userid',
            'user.fullName',
            'user.username',
            'user.email',
            'user.contactNumber',
            'user.dateCreated',
            'user.position',
            'client.accountName'
        )
        .where('user.position', manager)
        .andWhere('user.fullName', name);
    } 
}