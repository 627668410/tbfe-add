const fs = require("fs");
const vscode = require("vscode");
module.exports = function findImg(url) {
  readdir(url);
};

function readdir(url) {
  fs.readdir(url, (err, files) => {
    if (err) return;
    for (const file of files) {
      if (file.split(".").length < 2) {
        readdir(`${url}/${file}`);
      } else {
        // 只能调起搜索框，但是不会搜索拿不到搜索结果，pass
        // vscode.commands
        //   .executeCommand("workbench.action.findInFiles", "@images/111")
        //   .then((result) => {
        //     vscode.window.showInformationMessage("命令结果", result);
        //   });
      }
      console.log(file);
    }
  });
}
