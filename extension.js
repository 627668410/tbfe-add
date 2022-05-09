const vscode = require('vscode');
const fs = require('fs');
const path = require('path');
const exists = require('fs').existsSync;
const commandsMap = require('./commandsMap.js');
const _ = require('lodash');

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
  commandsMap.forEach((item) => {
    const obj = vscode.commands.registerCommand(item.commands, function (uri) {
      try {
        // 执行命令的项目路径
        const folderPath = vscode.workspace.workspaceFolders[0].uri.fsPath;
        // 执行命令的文件夹路径
        const basePath = uri._fsPath;
        const fileName = path.basename(basePath);
        // 获取命令的模板配置路径
        const settings = vscode.workspace.getConfiguration(item.commands);
        const readPath = settings.path;
        readFileDir({
          readPath: path.join(folderPath, readPath),
          fileName,
          writePath: basePath,
          isRoot: true,
        });
        const quickOpen = settings.quickOpen;
        if (quickOpen) {
          const uri = vscode.Uri.file(path.join(basePath, quickOpen));
          vscode.window.showTextDocument(uri);
        }
      } catch (e) {
        vscode.window.showInformationMessage(e);
      }
    });
    context.subscriptions.push(obj);
  });
}
function messgae(msg) {
  vscode.window.showInformationMessage(msg);
}
function readFileDir({readPath, fileName, writePath, isRoot}) {
  const stats = fs.statSync(readPath);
  var isFile = stats.isFile(); //是文件
  var isDir = stats.isDirectory(); //是文件夹
  if (isFile) {
    createFile({readPath, fileName, writePath});
  }
  if (isDir) {
    if (!isRoot && !exists(writePath)) {
      fs.mkdirSync(writePath);
    }
    const files = fs.readdirSync(readPath);
    files.forEach((file) =>
      readFileDir({
        readPath: path.join(readPath, file),
        fileName,
        writePath: path.join(writePath, file),
        isRoot: false,
      })
    );
  }
}

const hanldeFileName = {
  TbfeAddFileName: (name) => _.upperFirst(_.camelCase(name)),
  tbfeAddFileName: (name) => _.camelCase(name),
  tbfeaddfilename: (name) => _.toLower(name),
  TBFEADDFILENAME: (name) => _.toUpper(name),
  'tbfe-add-file-name': (name) => _.kebabCase(name),
  tbfe_add_file_name: (name) => _.snakeCase(name),
};
function createFile({readPath, fileName, writePath}) {
  let content = fs.readFileSync(readPath).toString();
  Object.keys(hanldeFileName).forEach((key) => {
    const reg = new RegExp(key, 'g');
    content = content.replace(reg, hanldeFileName[key](fileName));
  });

  if (exists(writePath)) {
    messgae(`${writePath}文件已存在`);
  } else {
    fs.writeFileSync(writePath, content);
  }
}
function deactivate() {}

module.exports = {
  activate,
  deactivate,
};
