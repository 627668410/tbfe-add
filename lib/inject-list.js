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

function injectActions(destPageTpl, meta) {
  const actionContent = `export * from './{{listName}}.js'`

  try {
    // 目前已经有的action/index.js
    const srcActionPath = tmpl.compile(pageMap["action.js"])(meta);
    const content = fs.readFileSync(srcActionPath).toString();

    const resultContent = [content, tmpl.compile(actionContent)(meta)].join('\n')

    fs.writeFileSync(srcActionPath, resultContent);
  } catch (error) {
    msg.error(error.message)
  }
}

function injectReducer(srcPage, meta) {
  try {
    const srcPath = path.join(tmplPath, meta.tmplPath || 'page_tmpl', srcPage);
    const reducerTmplPath = tmpl.compile(srcPath)(meta)
    const srcReducerPath = tmpl.compile(pageMap["reducer.js"])(meta);
    const content = fs.readFileSync(srcReducerPath).toString();

    const reducerTmpl = fs.readFileSync(reducerTmplPath).toString();
    const reducerContent = tmpl.compile(reducerTmpl)(meta)
    // 将对应的reducer放在对应的export default combinceReducer(之前
    const injectContent = [reducerContent, reducerSplit, `    ${meta.listName},`].join('\n')

    const resultContent = _.replace(content, reducerSplit, injectContent)

    fs.writeFileSync(srcReducerPath, resultContent);
  } catch (error) {
    msg.error(error.message)
  }
}

/**
 * 主要做两件事
 * 1. 把actions 添加到index.js export * from './{{listName}}.js'
 * 2. 注入list 的reducer
 */
module.exports = function injectPage({root, pageMap, ...config}) {
  updateTmpl().then(() => {
    injectActions('action.js', config)
    injectReducer('reducer.js', config)
    printMessage(root, pageMap, config)
  })
}

function printMessage(root, listMap, config) {
  const message = `
# ${chalk.green(`成功注入代码！`)}
============================================
${chalk.yellow(`${tmpl.compile(pageMap['reducer.js'])(config)}注入了${config.listName}`)}
${chalk.yellow(`${tmpl.compile(pageMap['action.js'])(config)}引入了${config.listName}相关的action`)}
============================================
`;
console.log(message)
}

