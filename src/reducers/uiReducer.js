import { fromJS } from 'immutable';
import * as types from 'actions';

const initialState = fromJS({
    table: {
        showModal: false,
        edit: false,
        editData: {}
    },
    showColumnModal: false
});

export default (state = initialState, action) => {
    switch (action.type) {
        case types.TOGGLE_TABLE_MODAL: {
            const show = state.getIn(['table', 'showModal']);

            if (show) {
                // Reset edit data & edit mode before hiding modal
                return state.setIn(['table', 'showModal'], false)
                    .setIn(['table', 'edit'], false).setIn(['table', 'editData'], fromJS({}));
            }

            return state.setIn(['table', 'showModal'], true);
        }
        case types.ENABLE_TABLE_EDIT:
            return state.setIn(['table', 'edit'], true).setIn(['table', 'editData'], fromJS(action.data));
        default:
            return state;
    }
};
