import { combineReducers } from 'redux';
import databaseReducer from './databaseReducer';
import uiReducer from './uiReducer';

export default combineReducers({
    database: databaseReducer,
    ui: uiReducer
});
