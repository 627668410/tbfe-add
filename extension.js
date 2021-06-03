const vscode = require("vscode");
const fs = require("fs");
/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
  let disposable = vscode.commands.registerCommand(
    "tbfe-add.helloWorld",
    function (uri) {
      const basePath = uri.path;
      const jsPath = `${basePath}/index.js`;
      const cssPath = `${basePath}/index.cssmodule.styl`;
      fs.writeFileSync(jsPath, "");
      fs.writeFileSync(cssPath, "");
    }
  );

  context.subscriptions.push(disposable);
}

function deactivate() {}

module.exports = {
  activate,
  deactivate,
};
