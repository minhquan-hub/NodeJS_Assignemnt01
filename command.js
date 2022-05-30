#!/usr/bin/env node
// const program = require('commander')
// const { prompt } = require('inquirer')
const readline = require('readline')
const generateMVC = require('./modules_cli/generate_mvc')
const generateDatabase = require('./modules_cli/generate_database')

const inquirer = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  switch (process.argv[2]) {
    case "mvc":
      generateMVC.buildStructor();
      break;
    case "cre-data":
      generateDatabase.createConnectData();
      break;
    case "help":
      console.log(process.argv);
      console.log(`
      Options:
          mvc           Create MVC project
          cre-data      Create file config database (mysql or mongodb)
      `);
      break;
    default:
  }

// program
//     .version('1.0.0')
//     .description('Build CLI')

// program
//     .command('model-view-controller')
//     .alias('mvc')
//     .description('Generate structor for MVC')
//     .action(() => {generateMVC.buildStructor()})

// program
//     .command('create-database')
//     .alias('cre-data')
//     .description('Generate structor for database')
//     .action(() => {
//         inquirer.question("What do you want to database (mysql/mongodb)? ", database => {
//             generateDatabase.createConnectData(database)
//             inquirer.close()
//         });
//     })

// program
//     .help(`
//   Function                  Alias        Description
//   version                   v            To check the version of the customer-cli
//   client-cli add            a            To add new customes in the database
//   client-cli list           l            To check all the customes in the database
//   client-cli update [_ID]   u            To update details for specific customes in the database
//   client-cli remove [_ID]   r            To remove details for specific customes in the database
//   client-cli find [NAME]    f            To find a specific customes in the database
//   `)


// program.parse(process.argv)