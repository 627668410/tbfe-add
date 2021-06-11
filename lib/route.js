const acorn = require('acorn');
const recast = require('recast');
const espree = require('espree');
const fs = require('fs');
const jsx = require('acorn-jsx');
const classFields = require('acorn-class-fields');
const stage3 = require('acorn-stage3');
const chalk = require('chalk');
const builder = recast.types.builders;

/*
module.exports = function addRoute(routeFile, config) {
  const ast = acorn.Parser.extend(jsx()).extend(stage3).parse(fs.readFileSync(routeFile).toString(), {ecmaVersion: 2020, sourceType: 'module'});
  recast.visit(ast, {
      visitJSXOpeningElement(path) {
        if (path.value.name.name === 'Switch') {
          path.parentPath.value.children.unshift(routeAst(config).body[0].expression);
          path.parentPath.value.children.unshift(builder.jsxText('\n\n'));
        }
        return false;
      }
  })
  const output = recast.print(ast).code
  fs.writeFileSync(routeFile, output);
  console.log(`\n# ${chalk.green('路由注册成功...')}`);
}

function routeAst({moduleName, visitUrl}) {
  return parse(`<Route path='/${visitUrl}' component={asyncComp('${moduleName}')}/>\n\n`);
}

function parse(code) {
	return espree.parse(code, { ecmaVersion: 12, comment: true, sourceType: 'module', ecmaFeatures: { jsx: true } });
}

*/

module.exports = function addRoute(routeFile, config) {
  const content = fs.readFileSync(routeFile).toString();
  const { visitUrl, moduleName } = config;
  const result = content.replace('export default [', () => {
    return `export default [
  {
    url: '${visitUrl}',
    container: '${moduleName}'
  },`});
  // const result = content.replace('<Switch>', () => {
  //   return `<Switch>\n\n<Route path='/${visitUrl}' component={asyncComp('${moduleName}')}/>`;
  // });
  fs.writeFileSync(routeFile, result);
  console.log(`\n# ${chalk.green(config.visitUrl + '路由注册成功...')}`);
}
// module.exports = function addRoute(routeFile, config) {
//   const content = fs.readFileSync(routeFile).toString();
//   const { visitUrl, moduleName } = config;
//   const result = content.replace('<Switch>', () => {
//     return `<Switch>\n\n<Route path='/${visitUrl}' component={asyncComp('${moduleName}')}/>`;
//   });
//   fs.writeFileSync(routeFile, result);
//   console.log(`\n# ${chalk.green(config.visitUrl + '路由注册成功...')}`);
// }
