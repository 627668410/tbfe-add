const config = require("../config");

const { listMap, conditionMap, crudModalMap, crudMap } = config;

const getMap = (type) => {
  return {
    Condition: conditionMap,
    List: listMap,
    CrudModal: crudModalMap,
  }[type];
};
const getTmpl = (type) => {
  return {
    Condition: "page_tmpl/condition",
    List: "page_tmpl/list",
    CrudModal: "page_tmpl/modal",
  }[type];
};

const generatePage = require("../lib/generate-page.js");
const injectList = require("../lib/inject-list.js");
const injectCrud = require("../lib/inject-crud.js");
module.exports = function createListFile(fileName, { type }) {
  const map = getMap(type);
  const tmplPath = getTmpl(type);

  if (tmplPath) {
    const page = generatePage({
      root: rootDir,
      pageMap: map,
      ...answer,
      tmplPath,
    });
    console.log(page);
    return page;
  }
  // if (answer.type === "List") {
  //   injectList({
  //     root: rootDir,
  //     pageMap: listMap,
  //     ...answer,
  //     tmplPath: "page_tmpl/list",
  //   });
  // }
  // if (answer.type === "Crud") {
  //   injectCrud({
  //     root: rootDir,
  //     pageMap: crudMap,
  //     ...answer,
  //     tmplPath: "page_tmpl/crud",
  //   });
  // }
};
