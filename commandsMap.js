const getBaseContent = require("./fileTypeCreate/base.js");
// const getListContent = require("./fileTypeCreate/list.js");
module.exports = [
  {
    commands: "tbfe-add.tbfe-add-base",
    method: getBaseContent,
  },
  // {
  //   commands: "tbfe-add.tbfe-add-list",
  //   method: getListContent,
  //   config: {
  //     type: "List",
  //   },
  // },
];
