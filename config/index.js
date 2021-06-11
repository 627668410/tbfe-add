module.exports = {
  tmplRepo: "git@git.threatbook-inc.cn:fe/tbfe-tmpl.git",
  localDir: ".tbfe-tmpl",
  routeEntry: "src/route/main.js",
  pageMap: {
    "container.js": "src/containers/{{moduleName}}.js",
    "component.js": "src/components/{{moduleName}}/index.js",
    "action.js": "src/actions/{{moduleName}}/index.js",
    "reducer.js": "src/reducers/{{moduleName}}/index.js",
    "comp.styl": "src/components/{{moduleName}}/index.cssmodule.styl",
  },
  listMap: {
    "component.js":
      "src/components/{{moduleName}}/{{% capitalize listName}}/index.js",
    "action.js": "src/actions/{{moduleName}}/{{listName}}.js",
    "comp.styl":
      "src/components/{{moduleName}}/{{listName}}/index.cssmodule.styl",
  },
  crudMap: {
    "action.js": "src/actions/{{moduleName}}/{{listName}}.js",
  },
  crudModalMap: {
    "component.js":
      "src/components/{{moduleName}}/{{% capitalize modalName}}/index.js",
    "comp.styl":
      "src/components/{{moduleName}}/{{% capitalize modalName}}/index.cssmodule.styl",
  },
  conditionMap: {
    "component.js": "src/components/{{moduleName}}/Condition/index.js",
    "comp.styl": "src/components/{{moduleName}}/Condition/index.cssmodule.styl",
  },
  reducerSplit: "export default combinceReducer(\n  {",
};
