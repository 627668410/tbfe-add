const { prompt } = require('inquirer');

const questions = [
  {
    name: 'CSS预处理器',
    type: 'list',
    messsage: '选择CSS处理器',
    choices: [{
      name: 'Stylus',
      value: 'stylus',
      short: 'stylus'
    }, {
      name: 'SCSS',
      value: 'scss',
      short: 'scss'
    }
    ]
  }
]

module.exports = function ask() {
  //return prompt(questions).then(answers => ({...answers, autoInstall: true}));
  return Promise.resolve({autoInstall: true});
}
