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
const { localDir } = config;
const tmplPath = path.join(home, localDir);
const updateTmpl = require('./update')
// const tmplPath = path.join(__dirname, '../../tbfe-tmpl');

const spinner = ora();

function generateItem(srcPage, destPageTpl, meta) {
  try {
    const srcPath = path.join(tmplPath, meta.tmplPath || 'page_tmpl', srcPage);
    const content = fs.readFileSync(srcPath).toString();
    const destPath = tmpl.compile(destPageTpl)(meta);
    fs.writeFileSync(destPath, tmpl.compile(content)(meta));
  } catch (error) {
    msg.error(error.message)
  }
}

module.exports = function generatePage({root, pageMap, ...config}) {
  return updateTmpl().then(res => {
    Object.keys(pageMap).forEach((srcPage) => {
      const destPage = pageMap[srcPage];
      generateItem(srcPage, destPage, config)
    })
    printMessage(root, pageMap, config)
    return config;
  })
}

function printMessage(root, pageMap, config) {
  const message = `
# ${chalk.green('新页面创建成功!')}
============================================
${Object.keys(pageMap).map((srcPage) => {
  return chalk.yellow(tmpl.compile(pageMap[srcPage])(config));
}).join('\n')}
============================================
  `;
  console.log(message);
}
