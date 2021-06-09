const vscode = require("vscode");
const fs = require("fs");
const exists = require("fs").existsSync;
/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
  let disposable = vscode.commands.registerCommand(
    "tbfe-add.tbfe-add",
    function (uri) {
      const basePath = uri.path;
      createFile(basePath);
    }
  );

  context.subscriptions.push(disposable);
}
function createFile(basePath) {
  const jsPath = `${basePath}/index.js`;
  const cssPath = `${basePath}/index.cssmodule.styl`;

  if (exists(jsPath)) {
    vscode.window.showInformationMessage("index.js已存在");
  } else {
    const fileNameArr = basePath.split("/");
    const fileName = fileNameArr[fileNameArr.length - 1];
    const jsContent = `import {compose} from 'lodash/fp';
import React, {memo} from 'react';

import {connect} from '@common/easy';
import {errorDecorator} from '@common/ErrorBoundary';
import './index.cssmodule.styl';

function ${fileName}() {
  return <div></div>
}
export default compose(
  errorDecorator(),
  connect(
    (state, mapState) => ({}),
    (dispatch, mapActions) => mapActions({})
  ),
  memo
)(${fileName});`;
    fs.writeFileSync(jsPath, jsContent);
  }
  if (exists(cssPath)) {
    vscode.window.showInformationMessage("index.cssmodule.styl已存在");
  } else {
    fs.writeFileSync(cssPath, "");
  }
}
function deactivate() {}

module.exports = {
  activate,
  deactivate,
};
