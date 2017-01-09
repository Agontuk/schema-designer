import { combineReducers } from 'redux';
import databaseReducer from './databaseReducer';
import uiReducer from './uiReducer';
import tableReducer from './tableReducer';

export default combineReducers({
    database: databaseReducer,
    ui: uiReducer,
    tables: tableReducer
});
