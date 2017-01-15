import { fromJS } from 'immutable';
import * as types from '../actions';

const initialState = fromJS({
    table: {
        showModal: false,
        edit: false,
        editData: {}
    },
    column: {
        showModal: false,
        edit: false,
        editData: {},
        tableId: ''
    }
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
        case types.TOGGLE_COLUMN_MODAL: {
            const show = state.getIn(['column', 'showModal']);

            if (show) {
                // Reset edit data & edit mode before hiding modal
                return state.setIn(['column', 'showModal'], false)
                    .setIn(['column', 'tableId'], '')
                    .setIn(['column', 'edit'], false).setIn(['column', 'editData'], fromJS({}));
            }

            return state.setIn(['column', 'showModal'], true).setIn(['column', 'tableId'], action.tableId);
        }
        case types.ENABLE_COLUMN_EDIT:
            return state.setIn(['column', 'edit'], true).setIn(['column', 'editData'], fromJS(action.data))
                .setIn(['column', 'tableId'], action.tableId);
        default:
            return state;
    }
};
