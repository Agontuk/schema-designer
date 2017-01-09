import { fromJS } from 'immutable';
import * as types from 'actions';

const initialState = fromJS({
    name: ''
});

export default (state = initialState, action) => {
    switch (action.type) {
        case types.SAVE_DB_NAME:
            return state.set('name', action.name);
        default:
            return state;
    }
};
