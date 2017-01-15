import update from 'immutability-helper';
import * as types from '../actions';

const initialState = {};

export default (state = initialState, action) => {
    switch (action.type) {
        case types.SAVE_TABLE:
            // Push new key for storing columns for this table
            return update(state, {
                [action.data.id]: { $set: [] }
            });
        case types.REMOVE_TABLE: {
            // Drop all columns for this table
            const { [action.id]: omit, ...rest } = state; // eslint-disable-line no-unused-vars
            return rest;
        }
        case types.SAVE_COLUMN:
            return update(state, {
                [action.tableId]: {
                    $push: [action.data]
                }
            });
        case types.REMOVE_COLUMN: {
            // Update all columns which reference this column as a foreign key
            const data = {};
            Object.keys(state).forEach((key) => {
                const columns = state[key].map((column) => {
                    const foreignKey = column.foreignKey;

                    if (foreignKey && foreignKey.references.id === action.columnData.id) {
                        const { foreign, ...rest } = column; // eslint-disable-line no-unused-vars
                        return rest;
                    }

                    return column;
                });

                data[key] = columns;
            });

            return data;
            // const newState = state.map((table) => table.map((column) => {
            //     const referenceId = column.getIn(['foreignKey', 'references', 'id']);
            //
            //     if (referenceId === action.columnData.id) {
            //         return column.delete('foreignKey');
            //     }
            //
            //     return column;
            // }));
            //
            // return newState.deleteIn([action.tableId, action.columnData.id]);
        }
        case types.UPDATE_COLUMN: {
            const data = state[action.tableId].map((column) => {
                if (column.id === action.data.id) {
                    return action.data;
                }

                return column;
            });

            return update(state, {
                [action.tableId]: { $set: data }
            });
        }
        default:
            return state;
    }
};
