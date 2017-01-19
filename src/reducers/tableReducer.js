import update from 'immutability-helper';
import * as types from '../actions';

const initialState = [];

export default (state = initialState, action) => {
    switch (action.type) {
        case types.SAVE_TABLE:
            return update(state, {
                $push: [{
                    ...action.data,
                    position: {
                        // Position each table with some offset
                        x: 0 + (state.length * 40),
                        y: 0 + (state.length * 40)
                    }
                }]
            });
        case types.REMOVE_TABLE:
            return state.filter((table) => table.id !== action.id);
        case types.UPDATE_TABLE:
            return state.map((table) => {
                if (table.id === action.data.id) {
                    return {
                        ...table,
                        ...action.data
                    };
                }

                return table;
            });
        case types.STORE_TABLE_POSITION:
            return state.map((table) => {
                if (table.id === action.newPos.id) {
                    return {
                        ...table,
                        position: {
                            x: action.newPos.x,
                            y: action.newPos.y
                        }
                    };
                }

                return table;
            });
        default:
            return state;
    }
};
