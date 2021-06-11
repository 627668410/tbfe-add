const fs = require('fs');
const chalk = require('chalk');
const home = require('user-home');
const path = require('path');
const ora = require('ora');
const tmpl = require('./tmpl.js');
const config = require('../config');
const { localDir } = config;
// const tmplPath = path.join(home, localDir);
const spinner = ora();
const updateTmpl = require('./update')
const shell = require("shelljs");
// 本地调试
const tmplPath = path.join(__dirname, '../../tbfe-tmpl');

module.exports = function addConstant(constantFile, config) {
  const { constantName, count, type } = config;
  // 原来的内容
  const file = fs.readFileSync(constantFile).toString();

  const contentList = new Array(count || 1).fill(0)
  updateTmpl().then(res => {
    const srcPath = path.join(tmplPath, 'page_tmpl/constant.js');
    // 模板内容
    const temContent = fs.readFileSync(srcPath).toString();
    const addContent = tmpl.compile(temContent)({
      constantName,
      contentList,
      array: type === 'Array',
      object: type === 'Object'
    })

  // 输出结果, 换行的话要注意顶格，不然生成的内容也会空格
  const result =`${file} 
${addContent}`
  // 写入文件
  fs.writeFileSync(constantFile, result);
  const data = result.substring(0, result.indexOf(`const ${constantName} =`))
  const lines = data.split(/\r?\n/).length;
  spinner.succeed(`${chalk.green(constantName + '常量注入成功...')}`);
  shell.exec(`code -g ${constantFile}:${lines}`)
  })
}