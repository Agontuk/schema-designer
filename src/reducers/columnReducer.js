import { fromJS } from 'immutable';
import * as types from 'actions';

const initialState = fromJS({});

export default (state = initialState, action) => {
    switch (action.type) {
        case types.SAVE_COLUMN:
            return state.setIn([action.tableId, action.data.id], fromJS(action.data));
        case types.REMOVE_COLUMN:
            return state.deleteIn([action.tableId, action.columnId]);
        case types.UPDATE_COLUMN:
            return state.setIn([action.tableId, action.data.id], fromJS(action.data));
        default:
            return state;
    }
};
