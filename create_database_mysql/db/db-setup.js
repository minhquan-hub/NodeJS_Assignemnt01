const knex = require('knex');
const knexFile = require('./knexfile');
const { Model } =  require('objection');

function setupDb() {
    const db = knex(knexFile.development);

    // plug db config into objection
    Model.knex(db);
}

module.exports = setupDb;