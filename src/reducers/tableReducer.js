import update from 'immutability-helper';
import * as types from '../actions/constants';

const initialState = [];

export default (state = initialState, action) => {
    switch (action.type) {
        case types.SAVE_TABLE:
            return update(state, {
                $push: [action.data]
            });
        case types.REMOVE_TABLE:
            return state.filter((table) => table.id !== action.id);
        case types.UPDATE_TABLE:
            return state.map((table) => {
                if (table.id === action.data.id) {
                    return action.data;
                }

                return table;
            });
        default:
            return state;
    }
};
