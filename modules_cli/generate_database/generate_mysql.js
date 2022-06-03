const fs = require("fs");
var exec = require("child_process").exec,
  child;

function generateDatabaseMySQL() {
  const dirList = ["./src/db/migrations", "./src/db/seeds", "./src/models"];
  const dbsetupFile = "./src/db/db-setup.js";
  const knexFile = "./src/db/knexFile.js";
  const seeddataFile = "./src/db/seeds/seed_data.js";
  const taxModelFile = "./src/models/tax.js";
  const insuranceModelFile = "./src/models/insurance.js";
  const packageFile = "./package.json";

  for (var dir of dirList) {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, {
        recursive: true,
      });
    }
  }

  fs.writeFileSync(
    dbsetupFile,
    `const knex = require('knex');
    const knexFile = require('./knexfile');
    const { Model } =  require('objection');
    
    function setupDb() {
        const db = knex(knexFile.development);
    
        // plug db config into objection
        Model.knex(db);
    }
    
    module.exports = setupDb;`,
    (err) => {
      if (err) {
        console.error(err);
      }
    }
  );

  fs.writeFileSync(
    knexFile,
    `// Update with your config settings.
    const { knexSnakeCaseMappers } = require('objection')
    const setupDb = require("./db-setup");
    
    setupDb()
    /**
     * @type { Object.<string, import("knex").Knex.Config> }
     */
    module.exports = {
    
      development: {
        client: 'mysql',
        connection: {
          host: 'localhost',
          port: 32769,
          database: 'test_nodejs',
          user:     'root',
          password: 'root'
        },
        pool: {
          min: 2,
          max: 10
        },
        migrations: {
          tableName: 'knex_migrations'
        },
        seeds: {
          directory: './seeds'
        },
        ...knexSnakeCaseMappers()
      },
    };`,
    (err) => {
      if (err) {
        console.error(err);
      }
    }
  );

  fs.writeFileSync(
    seeddataFile,
    `/**
    * @param { import("knex").Knex } knex
    * @returns { Promise<void> } 
    */
   exports.seed = async function(knex) {
     // truncate all existing tables
     await knex.raw('TRUNCATE TABLE yourtable');
   
     // Deletes ALL existing entries
     await knex('yourtable').insert([
       {
         
       }
     ]);
   
     await knex('yourtable').insert([
       {
         
       }
     ]);
   
   };
   `,
    (err) => {
      if (err) {
        console.error(err);
      }
    }
  );

  fs.writeFileSync(
    taxModelFile,
    `const {Model} = require('objection');

    class Tax extends Model {
        static get tableName() { 
            return 'tax';
        }
    }
    
    module.exports = Tax;`,
    (err) => {
      if (err) {
        console.error(err);
      }
    }
  );

  fs.writeFileSync(
    insuranceModelFile,
    `const {Model} = require('objection');

    class Insurance extends Model {
        static get tableName() { 
            return 'insurance';
        }
    }
    
    module.exports = Insurance;`,
    (err) => {
      if (err) {
        console.error(err);
      }
    }
  );

  if (!fs.existsSync(packageFile)) {
    fs.writeFileSync(
      packageFile,
      `{
        "name": "convert-salary",
        "version": "1.0.0",
        "description": "convert salary",
        "main": "server.js",
        "scripts": {
          "start": "nodemon ./src/server.js"
        },
        "author": "user",
        "license": "ISC",
        "dependencies": {
        }
      }`,
      (err) => {
        if (err) {
          console.error(err);
        }
      }
    );
  }

  child = exec("npm install knex mysql objection");
}

module.exports = {
  generateDatabaseMySQL,
};
