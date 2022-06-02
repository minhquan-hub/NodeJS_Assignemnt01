const {Model} = require('objection');

class Salary extends Model {
    static get tableName() { 
        return 'salary';
    }
}

module.exports = Salary;