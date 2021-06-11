/**
 * 模板引擎
 */
const Handlebars = require('handlebars');
const delimiters = require('handlebars-delimiters');
const _ = require('lodash')

Handlebars.registerHelper('if_eq', function(a, b, opts) {
  return a === b ? opts.fn(this) : opts.inverse(this);
})

Handlebars.registerHelper('unless_eq', function(a, b, options) {
  return a === b ? opts.inverse(this) : opts.fn(this);
});

Handlebars.registerHelper('toLowerCase', function(str) {
  return str.toLowerCase();
});

Handlebars.registerHelper('capitalize', function(str) {
  return _.upperFirst(str)
});

delimiters(Handlebars, ['{{%', '}}']);

module.exports = Handlebars;

