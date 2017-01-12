import { fromJS } from 'immutable';
import * as types from 'actions';

const initialState = fromJS([]);

export default (state = initialState, action) => {
    switch (action.type) {
        case types.SAVE_FOREIGN_KEY_RELATION:
            if (action.data !== undefined) {
                return state.push(fromJS({
                    source: action.tableId,
                    target: action.data.on.id
                }));
            }

            return state;
        default:
            return state;
    }
};
