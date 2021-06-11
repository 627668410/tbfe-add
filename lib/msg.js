const chalk = require('chalk');

exports.error = function error(msg) {
  return console.log(chalk.red(msg.trim()));
}