const fs = require("fs");

function buildStructor() {
  const dirList = ["./src/controllers", "./src/models", "./src/routes", "./src/services"];
  for (var dir of dirList) {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, {
        recursive: true,
      });
    }
  }
}

module.exports = {
    buildStructor
};
