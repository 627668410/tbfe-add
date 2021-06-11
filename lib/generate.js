const Metalsmith = require('metalsmith');
const exists = require('fs').existsSync;
const tmpl = require('./tmpl.js');
const path = require('path');
const rm = require('rimraf').sync;
const ora = require('ora');

const complete = require('./complete');

const spinner = ora();

module.exports = function generate({name, src, dest, answers}) {
  spinner.start('生成模板中......');
  if (exists(dest)) {
    rm(dest);
  }
  Metalsmith(path.join(src))
    .metadata(answers)
    .ignore(path.join(src, 'page_tmpl'))
    .clean(false)
    .source('.')
    .destination(dest)
    .use((files, metalsmith, done) => {
      const metadata = metalsmith.metadata();
      const keys = Object.keys(files);
      keys.forEach(fileName => {
        const str = files[fileName].contents.toString();
        if (!/{{%([^{}]+)%}}/g.test(str)) {
          return;
        }
        files[fileName].contents = Buffer.from(tmpl.compile(str)(metadata));
      })
      done();
    })
    .build((err, files) => {
      if (err) {
        spinner.fail(`模板创建失败:${err.message.trim()}`)
      } else {
        new Promise((resolve, reject) => {
          setTimeout(() => {
            spinner.succeed('模板创建成功!');
            resolve();
          }, 3000);
        }).then(() => {
          const data = { ...answers, ...{
            destDirName: name,
            inPlace: dest === process.cwd()
          }}
          complete(data);
        })
      }
    })
}
