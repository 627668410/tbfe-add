module.exports = function getBaseContent(fileName) {
  const jsContent = `import {compose} from 'lodash/fp';
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
  return jsContent;
};
