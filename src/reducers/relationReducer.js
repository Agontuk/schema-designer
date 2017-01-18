import update from 'immutability-helper';
import * as types from '../actions';

const initialState = [];

export default (state = initialState, action) => {
    switch (action.type) {
        case types.REMOVE_TABLE:
            // Drop all associated relations for this table
            return state.filter((relation) => (relation.source !== action.id &&
                relation.target !== action.id));
        case types.UPDATE_TABLE: {
            // Update table name in foreign key data for each relation
            // which references this table
            return state.map((relation) => {
                const foreignKey = relation.data;

                if (foreignKey.on.id === action.data.id) {
                    return update(relation, {
                        data: {
                            on: {
                                name: {
                                    $set: action.data.name
                                }
                            }
                        }
                    });
                }

                return relation;
            });
        }
        case types.REMOVE_COLUMN: {
            // Drop all associated relations for this column
            const foreignKey = action.columnData.foreignKey;
            const currentTableId = action.tableId;
            const foreignTableId = foreignKey.on.id;

            if (foreignTableId) {
                return state.filter((relation) => (relation.source !== currentTableId &&
                    relation.target !== foreignTableId));
            }

            // Remove relations which reference this column
            return state.filter((relation) => (relation.data.on.id !== currentTableId &&
                    relation.data.references.id !== action.columnData.id));
        }
        case types.UPDATE_COLUMN: {
            // Update column name in foreign key data for each relation
            // which references this column
            return state.map((relation) => {
                const foreignKey = relation.data;

                if (foreignKey.references.id === action.data.id) {
                    return update(relation, {
                        data: {
                            references: {
                                name: {
                                    $set: action.data.name
                                }
                            }
                        }
                    });
                }

                return relation;
            });
        }
        case types.SAVE_FOREIGN_KEY_RELATION:
            if (action.columnData.foreignKey.on.id) {
                return update(state, {
                    $push: [{
                        source: action.tableId,
                        target: action.columnData.foreignKey.on.id,
                        data: {
                            referrer: action.columnData.id,
                            ...action.columnData.foreignKey
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
                    if (relation.data.referrer === action.columnData.id) {
                        // Relation exists, so update it
                        matched = true;
                        return {
                            ...relation,
                            source: action.tableId,
                            target: foreignKey.on.id,
                            data: {
                                referrer: action.columnData.id,
                                ...foreignKey
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
                        source: action.tableId,
                        target: foreignKey.on.id,
                        data: {
                            referrer: action.columnData.id,
                            ...foreignKey
                        }
                    }]
                });
            }

            // Remove any relation referred by the current column
            return state.filter((relation) => (relation.data.referrer !== action.columnData.id));
        }
        default:
            return state;
    }
};
