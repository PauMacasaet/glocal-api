const knex = require('../../knex'); // the connection

module.exports = {
    getAll() {
        return knex('case_monitoring');
    },
    getOne(systemsEngineerLead) {
        return knex('case_monitoring')
        .where('systemsEngineerLead', systemsEngineerLead);
    }
}