import update from 'immutability-helper';
import * as types from '../actions/constants';

const initialState = [];

export default (state = initialState, action) => {
    switch (action.type) {
        case types.REMOVE_TABLE: {
            // Drop all associated relations for this table
            const newState = state.filter((relation) => (relation.source.tableId !== action.id) &&
                relation.target.tableId !== action.id);

            if (state.length === newState.length) {
                // No changes, return previous state to prevent re-render
                return state;
            }

            return newState;
        }
        case types.REMOVE_COLUMN: {
            // Drop all associated relations for this column
            const columnId = action.columnData.id;

            const newState = state.filter((relation) => (relation.source.columnId !== columnId &&
                relation.target.columnId !== columnId));

            if (state.length === newState.length) {
                // No changes, return previous state to prevent re-render
                return state;
            }

            return newState;
        }
        case types.SAVE_FOREIGN_KEY_RELATION:
            if (action.columnData.foreignKey.on.id) {
                return update(state, {
                    $push: [{
                        source: {
                            columnId: action.columnData.id,
                            tableId: action.tableId
                        },
                        target: {
                            columnId: action.columnData.foreignKey.references.id,
                            tableId: action.columnData.foreignKey.on.id
                        }
                    }]
                });
            }

            return state;
        case types.UPDATE_FOREIGN_KEY_RELATION: {
            const foreignKey = action.columnData.foreignKey;

            if (foreignKey.on.id) {
                let matched = false;
                const newState = state.map((relation) => {
                    if (relation.source.columnId === action.columnData.id) {
                        // Relation exists, so update it
                        matched = true;
                        return {
                            source: {
                                columnId: action.columnData.id,
                                tableId: action.tableId
                            },
                            target: {
                                columnId: action.columnData.foreignKey.references.id,
                                tableId: action.columnData.foreignKey.on.id
                            }
                        };
                    }

                    return relation;
                });

                if (matched) {
                    return newState;
                }

                return update(state, {
                    $push: [{
                        source: {
                            columnId: action.columnData.id,
                            tableId: action.tableId
                        },
                        target: {
                            columnId: action.columnData.foreignKey.references.id,
                            tableId: action.columnData.foreignKey.on.id
                        }
                    }]
                });
            }

            // No foreign key relation is assigned to the column, so
            // remove any relation referred by the column if exists
            const newState = state.filter((relation) => (relation.source.columnId !== action.columnData.id));

            if (state.length === newState.length) {
                // No changes, return previous state to prevent re-render
                return state;
            }

            return newState;
        }
        default:
            return state;
    }
};
