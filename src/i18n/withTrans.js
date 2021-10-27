import React, { Component } from 'react';
import { I18nextProvider, withTranslation } from 'react-i18next';

import i18next from './config';

export function withTrans(WrappedComponent) {
    WrappedComponent = withTranslation()(WrappedComponent);

    // eslint-disable-next-line react/display-name
    return class extends Component {
      render() {
        return (
          <I18nextProvider i18n={i18next}>
            <WrappedComponent {...this.props} language={i18next.language} />
          </I18nextProvider>
        );
      }
    }
}