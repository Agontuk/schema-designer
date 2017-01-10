import { fromJS } from 'immutable';
import * as types from 'actions';

const initialState = fromJS({
    table: {
        showModal: false,
        edit: false,
        editId: ''
    },
    showColumnModal: false
});

export default (state = initialState, action) => {
    switch (action.type) {
        case types.TOGGLE_TABLE_MODAL: {
            const show = state.getIn(['table', 'showModal']);
            console.log(show);
            return state.setIn(['table', 'showModal'], !show);
        }
        default:
            return state;
    }
};
