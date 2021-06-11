const exists = require('fs').existsSync;
const path = require('path');

function getSrc() {
  const cwd = process.cwd();
  if (exists(path.join(cwd, 'src'))) {
    return path.join(cwd, 'src');
  } else if (cwd.includes('src')) {
    return cwd;
  } else {
    throw new Error('请在项目根目录或src目录下执行此命令');
  }
}

module.exports = {
  getSrc
}