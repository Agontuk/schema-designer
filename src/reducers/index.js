import { combineReducers } from 'redux';
import databaseReducer from './databaseReducer';
import uiReducer from './uiReducer';
import tableReducer from './tableReducer';
import columnReducer from './columnReducer';
import relationReducer from './relationReducer';

export default combineReducers({
    database: databaseReducer,
    ui: uiReducer,
    tables: tableReducer,
    columns: columnReducer,
    relations: relationReducer
});
