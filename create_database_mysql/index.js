const setupDb = require("./db/db-setup");
const express = require("express");
const user = require("./db/models/user");

// set up database with objection and knex
setupDb();

const app = express();
app.use(express.json());
async function test() {
  const findUser = await user.query().findById(1);
  return findUser
}

test().then((value) => {
        console.log(value)
})
console.log("ok ok ok");
