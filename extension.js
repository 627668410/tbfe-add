const vscode = require("vscode");
const fs = require("fs");
const exists = require("fs").existsSync;
const commandsMap = require("./commandsMap.js");

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
  commandsMap.forEach((item) => {
    const obj = vscode.commands.registerCommand(item.commands, function (uri) {
      const basePath = uri.path;
      const fileNameArr = basePath.split("/");
      const fileName = fileNameArr[fileNameArr.length - 1];
      createFile(basePath, item.method(fileName));
    });
    context.subscriptions.push(obj);
  });
}
function createFile(basePath, content) {
  createCssFile(basePath);
  createJsFile(basePath, content);
}
function createCssFile(basePath) {
  const cssPath = `${basePath}/index.cssmodule.styl`;

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
  }
}
function deactivate() {}

module.exports = {
  activate,
  deactivate,
};
