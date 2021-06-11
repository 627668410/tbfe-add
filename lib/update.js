const path = require('path');
const home = require('user-home');
const ora = require('ora');
const config = require('../config');
const simpleGit = require("simple-git");
const { localDir } = config;
const tmplPath = path.join(home, localDir);

const spinner = ora();

module.exports = function updateTmpl () {
  spinner.start('更新模板中......');
  return simpleGit({
    baseDir: tmplPath
  }).pull()
    .then(() => {
      spinner.succeed('更新成功!');
    })
    .catch((err) => {
      console.log(err)
      spinner.fail(`${tmplRepo}模板更新失败：${err.message.trim()}`);
    })
}