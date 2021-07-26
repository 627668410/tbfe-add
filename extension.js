const vscode = require("vscode");
const fs = require("fs");
const path = require("path");
const exists = require("fs").existsSync;
const commandsMap = require("./commandsMap.js");
const shell = require("shelljs");
// const findImg = require("./lib/findImg.js");

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
  commandsMap.forEach((item) => {
    const obj = vscode.commands.registerCommand(item.commands, function (uri) {
      try {
        const basePath = uri._fsPath;
        const fileName = path.basename(basePath);
        createFile(basePath, item.method(fileName, item.config));
      } catch (e) {
        vscode.window.showInformationMessage(e);
      }
    });
    context.subscriptions.push(obj);
  });
  // const findImgObj = vscode.commands.registerCommand(
  //   "tbfe-add.tbfe-find-img",
  //   function (uri) {
  //     findImg(uri.path);
  //   }
  // );
  // context.subscriptions.push(findImgObj);
}

function createFile(basePath, content) {
  createCssFile(basePath);
  createJsFile(basePath, content);
}
function createCssFile(basePath) {
  const cssPath = path.join(basePath, "index.cssmodule.styl");

  if (exists(cssPath)) {
    vscode.window.showInformationMessage("index.cssmodule.styl已存在");
  } else {
    fs.writeFileSync(cssPath, "");
  }
}
function createJsFile(basePath, content) {
  const jsPath = `${basePath}/index.js`;

  if (exists(jsPath)) {
    vscode.window.showInformationMessage("index.js已存在");
  } else {
    fs.writeFileSync(jsPath, content);
    // vscode.commands.executeCommand(
    //   "workbench.files.action.showActiveFileInExplorer",
    //   jsPath
    // );
  }
}
function deactivate() {}

module.exports = {
  activate,
  deactivate,
};
