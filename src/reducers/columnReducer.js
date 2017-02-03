import update from 'immutability-helper';
import mapValues from 'lodash/mapValues';
import * as types from '../actions/constants';

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
            let needUpdate = false;
            const data = mapValues(state, (columns) => (
                columns.map((column) => {
                    const foreignKey = column.foreignKey;

                    if (foreignKey.on.id === action.data.id) {
                        needUpdate = true;
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
                })
            ));

            if (!needUpdate) {
                // No changes in column data, return previous
                // state to prevent re-render
                return state;
            }

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
            let needUpdate = false;
            const data = mapValues(state, (columns) => (
                columns.map((column) => {
                    const foreignKey = column.foreignKey;

                    if (foreignKey.references.id === action.columnData.id) {
                        needUpdate = true;

                        return {
                            ...column,
                            foreignKey: {
                                references: {
                                    id: '',
                                    name: ''
                                },
                                on: {
                                    id: '',
                                    name: ''
                                }
                            }
                        };
                    }

                    return column;
                })
            ));

            if (!needUpdate) {
                // No changes in other columns, update previous state
                // to prevent re-render in other tables
                return update(state, {
                    [action.tableId]: {
                        $apply: (columns) => (
                            columns.filter((column) => column.id !== action.columnData.id)
                        )
                    }
                });
            }

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
