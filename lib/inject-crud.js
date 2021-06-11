const pad = require('pad');
const tmpl = require('./tmpl.js');
const path = require('path');
const fs = require('fs');
const home = require('user-home');
const rm = require('rimraf').sync;
const chalk = require('chalk');
const ora = require('ora');
const config = require('../config');
const simpleGit = require("simple-git");
const git = simpleGit();
const msg = require('./msg')
const _ = require('lodash');
const updateTmpl = require('./update')
const { pageMap, reducerSplit, localDir } = config;
const tmplPath = path.join(home, localDir);
// const tmplPath = path.join(__dirname, '../../tbfe-tmpl');

const spinner = ora();

function injectActions(srcPage, map, config) {
  try {
    const srcPath = tmpl.compile(path.join(tmplPath, config.tmplPath || 'page_tmpl', srcPage))(config)
    const actionContent = fs.readFileSync(srcPath).toString();
  
    // 目前已经有的action/index.js
    const srcActionPath = tmpl.compile(map[srcPage])(config);
    const content = fs.readFileSync(srcActionPath).toString();

    const resultContent = [content, tmpl.compile(actionContent)(config)].join('\n\n')

    fs.writeFileSync(srcActionPath, resultContent);
  } catch (error) {
    msg.error(error.message)
  }
}

function injectIndex(srcPage, map, config) {
  const srcPath = path.join(tmplPath, config.tmplPath || 'page_tmpl', srcPage);
  const indexTmplPath = tmpl.compile(srcPath)(config)

  const indexTmpl = fs.readFileSync(indexTmplPath).toString();
  const content = tmpl.compile(indexTmpl)(config)
  console.log(`
============================================
${content}
============================================`)
}

/**
 * 主要做2件事
 * 1. 把actions 添加到注入到对应的list里'
 * 2. 提供使用入口供复制
 */
module.exports = function injectPage({root, pageMap, ...config}) {
  updateTmpl().then(() => {
    injectActions('action.js', pageMap, config)
    printMessage(root, pageMap, config)
    injectIndex('index.js', pageMap, config)
  })
}

function printMessage(root, listMap, config) {
  const message = `
# ${chalk.green(`成功注入代码！`)}
============================================
${chalk.yellow(`${tmpl.compile(pageMap['action.js'])(config)} 注入了 ${config.listName}相关的CrudAction`)}
============================================
# ${chalk.green(`请复制以下代码，用与操作增删改查:`)}
`;
console.log(message)
}

