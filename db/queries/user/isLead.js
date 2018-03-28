const knex = require('../../knex'); // the connection

module.exports = {
    getAll(position) {
        return knex('user')
            .join(
                'case_monitoring', 
                'user.fullName',
                '=', 'case_monitoring.systemsEngineerLead'
            )
            .select(
                'case_monitoring.glocalId',
                'user.fullName',
                'user.email',
                'user.contactNumber',
                'case_monitoring.caseTitle',
                'case_monitoring.caseDescription',
                'case_monitoring.case_status'
            )
            .where('user.position', position);
    },
    getOne(position, name) {
        return knex('user')
            .join(
                'case_monitoring', 
                'user.fullName',
                '=', 'case_monitoring.systemsEngineerLead'
            )
            .select(
                'case_monitoring.glocalId',
                'user.fullName',
                'user.email',
                'user.contactNumber',
                'case_monitoring.caseTitle',
                'case_monitoring.caseDescription',
                'case_monitoring.case_status'
            )
            .where('user.position', position)
            .andWhere('user.fullName', name);
    }
}