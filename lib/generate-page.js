const tmpl = require("./tmpl.js");
const path = require("path");
const fs = require("fs");
const home = require("user-home");
const config = require("../config");
const msg = require("./msg");
const { localDir } = config;
const tmplPath = path.join(home, localDir);
const updateTmpl = require("./update");

function generateItem(srcPage, destPageTpl, meta) {
  try {
    const srcPath = path.join(tmplPath, meta.tmplPath || "page_tmpl", srcPage);
    const content = fs.readFileSync(srcPath).toString();
    const destPath = tmpl.compile(destPageTpl)(meta);
    fs.writeFileSync(destPath, tmpl.compile(content)(meta));
  } catch (error) {
    msg.error(error.message);
  }
}

module.exports = function generatePage({ root, pageMap, ...config }) {
  return updateTmpl().then((res) => {
    Object.keys(pageMap).forEach((srcPage) => {
      const destPage = pageMap[srcPage];
      generateItem(srcPage, destPage, config);
    });
    return config;
  });
};
