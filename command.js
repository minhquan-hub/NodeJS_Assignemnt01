#!/usr/bin/env node
const readline = require("readline");
var exec = require("child_process").exec,
  child;
const generateMVC = require("./modules_cli/generate_mvc");

const {
  generateDatabaseMySQL,
} = require("./modules_cli/generate_database/generate_mysql");
const { generateDatabaseMongodb } = require("./modules_cli/generate_database/gererate_mongodb")

const inquirer = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

switch (process.argv[2]) {
  case "mvc":
    generateMVC.buildStructor();
    inquirer.close();
    break;
  case "cre-db":
    inquirer.question(
      "What do you want to database [mysql/mongodb]? ",
      (database) => {
        if (database === "mysql") {
          generateDatabaseMySQL();
        } else if (database === "mongodb") {
          generateDatabaseMongodb();
        } else {
          console.error("The database name is wrong. Please choose agian!");
        }
        inquirer.close();
      }
    );
    break;
  case "mysql-migration":
    const suffixName = process.argv[3];
    child = exec(
      `npx knex migrate:make ${suffixName} --knexfile ./src/db/knexfile.js`
    );
    inquirer.close();
    break;
  case "mysql-add-migration":
    child = exec("npx knex migrate:latest --knexfile ./src/db/knexfile.js");
    inquirer.close();
    break;
  case "mysql-seed":
    child = exec('npx knex seed:run --knexfile ./src/db/knexfile.js')
    inquirer.close();
    break;
  case "mongodb-seed": 
      child = exec('node ./src/db/seeds/seed_datab.js');
  case "help":
    console.log(`
      Options:
          mvc                         Create MVC project
          cre-db                      Create file config database [mysql or mongodb]
          mysql-migration <filename>  Add migration file database mysql
          mysql-add-migration         Run migration file upload database mysql
          mysql-seed                  Seed data mysql
          mongodb-seed                Seed data mongodb 
      `);
      inquirer.close();
    break;
  default:
    console.error("Systax is wrong. Please enter again!");
    inquirer.close();
}
