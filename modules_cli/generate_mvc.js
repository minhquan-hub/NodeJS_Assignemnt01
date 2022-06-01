const fs = require("fs");
var exec = require('child_process').exec,child;

function buildStructor() {
  const dirList = [
    "./src/models",
    "./src/views",
    "./src/controllers",
    "./src/services",
  ];
  for (var dir of dirList) {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, {
        recursive: true,
      });
    }
  }

  fs.writeFileSync(
    "./src/views/home.ejs",
    `<html>
     <head>
         <meta charset='utf-8'>
         <meta http-equiv='X-UA-Compatible' content='IE=edge'>
         <title>MVC</title>
         <meta name='viewport' content='width=device-width, initial-scale=1'>
         <link href="//maxcdn.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css" rel="stylesheet" id="bootstrap-css">
     <script src="//maxcdn.bootstrapcdn.com/bootstrap/4.1.1/js/bootstrap.min.js"></script>
     <script src="//cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
     </head>
     <body><!-- Just an image -->
         <nav class="navbar navbar-light bg-light">
           <a class="navbar-brand" href="#">
             <img src="https://getbootstrap.com/docs/4.0/assets/brand/bootstrap-solid.svg" width="30" height="30" alt="">
           </a>
         </nav>`,
    (err) => {
      if (err) {
        console.error(err);
      }
    }
  );

  fs.writeFileSync(
    "./src/controllers/homeController.js",
    `const homeController = (req, res) => {
      res.render("home", {});
    };
    
    module.exports = {
      homeController,
    };
    `,
    (err) => {
      if (err) {
        console.error(err);
      }
    }
  );

  fs.writeFileSync('./src/routes.js',
   `const express = require('express')
   const { homeController } = require('./controllers/homeController')
   
   const routes = express.Router()
   routes.get('/', homeController)
   
   module.exports = routes`, (err) => {
    if (err) {
      console.error(err);
    }
  });

  fs.writeFileSync('./src/server.js',
   `const express = require("express");
   const dotenv = require("dotenv");
   const path = require("path");
   
   dotenv.config();
   
   app = express();
   const PORT = process.env.PORT || 5000;
   app.set("view engine", "ejs");
   app.set("views", path.join(__dirname, "views"));
   
   app.use("/", require("./routes"));
   
   app.listen(PORT, () => {
     console.log(\`Server listening on http://localhost:\${PORT}\`);
   });
   `, (err) => {
    if (err) {
      console.error(err);
    }
  });

  fs.writeFileSync('./.env', 
  `PORT=8080`, err => {
    if (err) {
      console.error(err);
    }
  });

  fs.writeFileSync('./package.json', 
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
      "dotenv": "^16.0.1",
      "ejs": "^3.1.8",
      "express": "^4.18.1",
      "nodemon": "^2.0.16"
    }
  }
  `, err => {
    if (err) {
      console.error(err);
    }
  });

  child = exec('npm install')
}

module.exports = {
  buildStructor,
};
