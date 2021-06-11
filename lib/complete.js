const spawn = require('child_process').spawn;
const chalk = require('chalk');
const path = require('path');

module.exports = function complete(data) {
  const cwd = path.join(process.cwd(), data.inPlace ? '' : data.destDirName);
  if (data.git) {
    initGit(cwd).then(() => {
      if (data.autoInstall) {
        npmInstall(cwd).then(() => buildDll(cwd)).then(() => {
          printMessage(data);
        }).catch(e => {
          console.log(chalk.red('Error:'), e);
        })
      } else {
        printMessage(data);
      }
    }).catch(e => {
      console.log(chalk.red('Error:'), e);
    })
  } else if (data.autoInstall) {
    npmInstall(cwd).then(() => buildDll(cwd)).then(() => {
      printMessage(data);
    }).catch(e => {
      console.log(chalk.red('Error:'), e);
    })
  } else {
    printMessage(data);
  }
}

function initGit(cwd, executable = 'git') {
  return runCommand(executable, ['init'], {
    cwd
  });
}

function npmInstall(cwd, executable = 'npm') {
  console.log(`\n# ${chalk.green('Installing project dependencies ...')}`)
  console.log('# ========================\n')
  return runCommand(executable, ['install'], {
    cwd
  });
}

function buildDll(cwd, executable = 'npm') {
  console.log(`\n# ${chalk.green('构建DLL文件 ...')}`)
  console.log('# ========================\n')
  return runCommand(executable, ['run', 'dll'], {
    cwd
  });
}

function runCommand(cmd, args, options) {
  return new Promise((resolve, reject) => {
    const spn = spawn(
      cmd,
      args,
      Object.assign({
        cwd: process.cwd(),
        stdio: 'inherit',
        shell: true
      }, options)
    )
    spn.on('exit', () => {
      resolve();
    })
  });
}

function printMessage(data) {
  const message = `
    # ${chalk.green('项目初始化完成!')}
    # ================================

    启动项目命令:
    ${chalk.yellow(
      `${data.inPlace ? '' : `cd ${data.destDirName}\n`} ${installMessage(data)} npm run serve:dev`
    )}
  `
  console.log(message);
}

function installMessage(data) {
  return !data.autoInstall ? 'npm install\n  ' : ''
}
