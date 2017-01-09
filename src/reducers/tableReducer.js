import { fromJS } from 'immutable';
import * as types from 'actions';

const initialState = fromJS([]);

export default (state = initialState, action) => {
    switch (action.type) {
        case types.SAVE_TABLE:
            return state.push(action.data);
        default:
            return state;
    }
};
