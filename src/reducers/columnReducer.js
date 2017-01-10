import { fromJS } from 'immutable';
// import * as types from 'actions';

const initialState = fromJS([]);

export default (state = initialState, action) => {
    switch (action.type) {
        // case types.SAVE_TABLE:
        //     return state.push(fromJS(action.data));
        // case types.REMOVE_TABLE:
        //     return state.filter((table) => {
        //         return table.get('id') !== action.id;
        //     });
        // case types.UPDATE_TABLE:
        //     return state.map((table) => {
        //         if (table.get('id') === action.data.id) {
        //             return fromJS(action.data);
        //         }
        //
        //         return table;
        //     });
        default:
            return state;
    }
};
