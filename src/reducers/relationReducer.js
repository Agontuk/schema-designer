import { fromJS } from 'immutable';
import * as types from '../actions';

const initialState = fromJS([]);

export default (state = initialState, action) => {
    switch (action.type) {
        case types.REMOVE_TABLE:
            // Drop all associated relations for this table
            return state.filter((relation) => (relation.get('source') !== action.id &&
                relation.get('target') !== action.id));
        case types.REMOVE_COLUMN: {
            // Drop all associated relations for this column
            const foreignKey = action.columnData.foreignKey;
            const currentTableId = action.tableId;

            if (foreignKey !== undefined) {
                const foreignTableId = foreignKey.on.id;

                return state.filter((relation) => (relation.get('source') !== currentTableId &&
                    relation.get('target') !== foreignTableId));
            }

            // Remove relations which reference this column
            return state.filter((relation) => (relation.getIn(['data', 'on', 'id']) !== currentTableId &&
                    relation.getIn(['data', 'references', 'id']) !== action.columnData.id));
        }
        case types.SAVE_FOREIGN_KEY_RELATION:
            if (action.columnData.foreignKey !== undefined) {
                return state.push(fromJS({
                    source: action.tableId,
                    target: action.columnData.foreignKey.on.id,
                    data: {
                        referrer: action.columnData.id,
                        ...action.columnData.foreignKey
                    }
                }));
            }

            return state;
        case types.UPDATE_FOREIGN_KEY_RELATION: {
            const foreignKey = action.columnData.foreignKey;

            if (foreignKey !== undefined) {
                let matched = false;
                const newState = state.map((relation) => {
                    if (relation.getIn(['data', 'referrer']) === action.columnData.id) {
                        // Relation exists, so update it
                        matched = true;
                        return relation.set('source', action.tableId)
                            .set('target', foreignKey.on.id)
                            .setIn(['data'], fromJS({
                                referrer: action.columnData.id,
                                ...foreignKey
                            }));
                    }

                    return relation;
                });

                if (matched) {
                    return newState;
                }

                return state.push(fromJS({
                    source: action.tableId,
                    target: foreignKey.on.id,
                    data: {
                        referrer: action.columnData.id,
                        ...foreignKey
                    }
                }));
            }

            // Remove any relation referred by the current column
            return state.filter((relation) => (relation.getIn(['data', 'referrer']) !== action.columnData.id));
        }
        default:
            return state;
    }
};
