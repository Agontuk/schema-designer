import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import App from './app';

const dom = document.getElementById('root');
render(
    <AppContainer>
        <App />
    </AppContainer>,
    dom
);

if (module.hot) {
    module.hot.accept('./app', () => {
        const NextApp = require('./app').default; // eslint-disable-line global-require
        render(
            <AppContainer>
                <NextApp />
            </AppContainer>,
            dom
        );
    });
}
