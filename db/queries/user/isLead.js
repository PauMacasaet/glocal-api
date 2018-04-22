const knex = require('../../knex'); // the connection

module.exports = {
    getAll() {
        return knex('user')
            .join(
                'case_monitoring', 
                'user.fullName',
                '=', 'case_monitoring.systemsEngineerLead'
            )
            .select(
                'case_monitoring.systemsEngineerLead',
                'user.email',
            )
            .whereIn('user.position', [
                'Systems Engineer',
                'Senior Systems Engineer',
                'Team Lead', 
                'Technical Manager'
            ])
            .andWhere('user.is_active', true)
            .groupBy(
                'case_monitoring.systemsEngineerLead', 
                'user.email',
            )
            .orderBy('case_monitoring.systemsEngineerLead');
    },
    getOne(name) {
        return knex('user')
            .join(
                'case_monitoring', 
                'user.fullName',
                '=', 'case_monitoring.systemsEngineerLead'
            )
            .select(
                'case_monitoring.systemsEngineerLead',
                'user.email',
            )
            .whereIn('user.position', [
                'Systems Engineer',
                'Senior Systems Engineer',
                'Team Lead', 
                'Technical Manager'
            ])
            .andWhere('user.is_active', true)
            .andWhere('user.fullName', name);
    }
}