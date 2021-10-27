const vscode = require('vscode');
const path = require('path');
const fs = require('fs');
module.exports = function getBaseContent({fileName, uri}) {
  const settings = new Settings();
  const defaultContent = settings.getDefaultContent({fileName});
  const defineContent = settings.getContent({fileName, uri});
  return defineContent || defaultContent;
};
class Settings {
  // settings = vscode.workspace.getConfiguration('tbfe-add');
  getContent({fileName, uri}) {
    const configFilePath = uri._fsPath.replace(fileName, 'tbfe-add.js');
    if (fs.existsSync(configFilePath)) {
      const reg = new RegExp('TbfeAddFileName', 'g');
      return fs.readFileSync(configFilePath).toString().replace(reg, fileName);
    }
    return '';
  }
  getDefaultContent({fileName}) {
    return `import {compose} from 'lodash/fp';
import React, {memo} from 'react';

import {connect} from '@common/easy';
import {errorDecorator} from '@common/ErrorBoundary';
import './index.cssmodule.styl';

function ${fileName}() {
  return <div></div>
}
export default compose(
  errorDecorator(),
  connect(
    (state, mapState) => ({}),
    (dispatch, mapActions) => mapActions({})
  ),
  memo
)(${fileName});`;
  }
}
