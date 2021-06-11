const superagent = require('superagent');
const semver = require('semver');
const chalk = require('chalk');
const pkgConfig = require('../package.json');

module.exports = (done) => {
  if (!semver.satisfies(process.version, pkgConfig.engines.node)) {
    return console.log(chalk.red(
      `  请升级node.js版本到${pkgConfig.engines.node}.x`
    ));
  }
  superagent('https://registry.npmjs.org/' + pkgConfig.name)
  .end((err, res) => {
    if (!err && res.statusCode === 200) {
      const latestVersion = res.body['dist-tags'].latest;
      const localVersion = pkgConfig.version;
      if (semver.lt(localVersion, latestVersion)) {
        console.log();
        console.log(chalk.yellow(`${pkgConfig.name}发现新的版本`));
        console.log();
        console.log(`最新版:${chalk.green(latestVersion)}`);
        console.log(`目前使用的版本:${chalk.green(localVersion)}`);
        console.log();
      }
    }
    done();
  });
}
