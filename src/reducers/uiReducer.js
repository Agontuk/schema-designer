import { fromJS } from 'immutable';
import * as types from 'actions';

const initialState = fromJS({
    showTableModal: false,
    showColumnModal: false
});

export default (state = initialState, action) => {
    switch (action.type) {
        case types.TOGGLE_TABLE_MODAL: {
            const show = state.get('showTableModal');
            return state.set('showTableModal', !show);
        }
        default:
            return state;
    }
};
