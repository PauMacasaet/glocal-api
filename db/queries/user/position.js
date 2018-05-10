const knex = require('../../knex'); // the connection

module.exports = {
    getAdmins() {
        return knex('user')
            .select(
                'userid',
                'fullName',
                'username',
                'email',
                'contactNumber',
                'dateCreated',
                'position',
                'is_active'
            )
            .where('position', 'Managing Director')
            .groupBy('userid')
            .orderBy('fullName');
    },
    getOthers() {
        return knex('user')
            .select(
                'userid',
                'fullName',
                'username',
                'email',
                'contactNumber',
                'dateCreated',
                'position',
                'is_active'
            )
            .whereNot('position', 'Managing Director')
            .groupBy('userid')
            .orderBy('fullName');
    },
    getAll() {
        return knex('user')
        .select(
            'userid',
            'fullName',
            'username',
            'email',
            'contactNumber',
            'dateCreated',
            'position',
            'is_active'
        )
        .groupBy('userid')
        .orderBy('userid', 'asc');
    },
    getEngineer() {
        return knex('user')
            .select(
                'userid',
                'fullName',
                'username',
                'email',
                'contactNumber',
                'dateCreated',
                'position',
                'is_active'
            )
            .whereIn('position', [
                'Systems Engineer', 
                'Senior Systems Engineer',
                'Team Lead',
                'Technical Manager'
            ])
            .groupBy('userid')
            .andWhere('is_active', true)
            .orderBy('fullName');
    },
    getOneEngineer(name) {
        return knex('user')
            .select(
                'userid',
                'fullName',
                'username',
                'email',
                'contactNumber',
                'dateCreated',
                'position',
                'is_active'
            )
            .whereIn('position', [
                'Systems Engineer', 
                'Senior Systems Engineer',
                'Team Lead',
                'Technical Manager'
            ])
            .andWhere('is_active', true)
            .andWhere('fullName', name);
    },
    getAM() {
        return knex('user')
        //.join('client', 'client.accountManager', '=', 'user.fullName')
        .select(
            'user.userid',
            'user.fullName',
            'user.username',
            'user.email',
            'user.contactNumber',
            'user.dateCreated',
            'user.position',
            //'client.accountName',
            'is_active'
        )
        .whereIn('user.position', [
            'Account Manager', 
            'Sales Manager',
            'Sales Director',
            'Senior Sales Consultant',
            'Sales Consultant',
            'Senior Account Manager',
            'Product Specialist',
            'Business Development Manager'
        ])
        .andWhere('user.is_active', true)
        .groupBy(
            'user.userid'
        )
        .orderBy('user.fullName');
    },
    getOneAM(name) {
        return knex('user')
        //.join('client', 'client.accountManager', '=', 'user.fullName')
        .select(
            'user.userid',
            'user.fullName',
            'user.username',
            'user.email',
            'user.contactNumber',
            'user.dateCreated',
            'user.position',
            //'client.accountName',
            'is_active'
        )
        .whereIn('user.position', [
            'Account Manager', 
            'Sales Manager',
            'Sales Director',
            'Senior Sales Consultant',
            'Sales Consultant',
            'Senior Account Manager',
            'Product Specialist',
            'Business Development Manager'
        ])
        .andWhere('user.fullName', name);
    } 
}