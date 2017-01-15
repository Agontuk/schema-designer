import { applyMiddleware, compose, createStore } from 'redux';
import createLogger from 'redux-logger';
import Reducers from '../reducers';

const logger = createLogger();
const middleware = [];

let extension = (next) => next;

if (process.env.NODE_ENV !== 'production') {
    middleware.push(logger);
    extension = window.devToolsExtension ? window.devToolsExtension() : extension;
}

const store = createStore(Reducers, {}, compose(applyMiddleware(...middleware), extension));

if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
        const nextRootReducer = require('../reducers/index').default; // eslint-disable-line global-require
        store.replaceReducer(nextRootReducer);
    });
}

export default store;
