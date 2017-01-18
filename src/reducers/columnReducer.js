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
        case types.UPDATE_TABLE: {
            // Update table name in foreign key data for each column
            // which references this table
            const data = {};
            Object.keys(state).forEach((key) => {
                const columns = state[key].map((column) => {
                    const foreignKey = column.foreignKey;

                    if (foreignKey.on.id === action.data.id) {
                        return update(column, {
                            foreignKey: {
                                on: {
                                    name: {
                                        $set: action.data.name
                                    }
                                }
                            }
                        });
                    }

                    return column;
                });

                data[key] = columns;
            });

            return data;
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

                    if (foreignKey.references.id === action.columnData.id) {
                        const { foreign, ...rest } = column; // eslint-disable-line no-unused-vars
                        return rest;
                    }

                    return column;
                });

                data[key] = columns;
            });

            return update(data, {
                [action.tableId]: {
                    $apply: (columns) => (
                        columns.filter((column) => column.id !== action.columnData.id)
                    )
                }
            });
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
