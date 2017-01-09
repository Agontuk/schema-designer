import { combineReducers } from 'redux';
import databaseReducer from './databaseReducer';

export default combineReducers({
    database: databaseReducer
});
