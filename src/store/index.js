import { applyMiddleware, compose, createStore } from 'redux';
import createLogger from 'redux-logger';
import Reducers from 'reducers';

const logger = createLogger();
const middleware = [];

let extension = (next) => next;

if (process.env.NODE_ENV !== 'production') {
    middleware.push(logger);
    extension = window.devToolsExtension ? window.devToolsExtension() : extension;
}

export default createStore(Reducers, {}, compose(applyMiddleware(...middleware), extension));
