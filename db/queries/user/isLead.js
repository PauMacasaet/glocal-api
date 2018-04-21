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
                //'case_monitoring.glocalId',
                'case_monitoring.systemsEngineerLead',
                'user.email',
                'user.contactNumber',
                // 'case_monitoring.caseTitle',
                // 'case_monitoring.caseDescription',
                // 'case_monitoring.case_status'
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
                //'case_monitoring.glocalId',
                'user.email',
                'user.contactNumber'
            )
            //.orWhere('user.position', 'Technical Manager');
    },
    getOne(name) {
        return knex('user')
            .join(
                'case_monitoring', 
                'user.fullName',
                '=', 'case_monitoring.systemsEngineerLead'
            )
            .select(
                //'case_monitoring.glocalId',
                'case_monitoring.systemsEngineerLead',
                'user.email',
                'user.contactNumber',
                // 'case_monitoring.caseTitle',
                // 'case_monitoring.caseDescription',
                // 'case_monitoring.case_status'
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