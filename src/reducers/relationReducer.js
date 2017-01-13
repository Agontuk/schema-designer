import { fromJS } from 'immutable';
import * as types from 'actions';

const initialState = fromJS([]);

export default (state = initialState, action) => {
    switch (action.type) {
        case types.REMOVE_TABLE:
            // Drop all associated relations for this table
            return state.filter((relation) => {
                return relation.get('source') !== action.id && relation.get('target') !== action.id;
            });
        case types.REMOVE_COLUMN: {
            // Drop all associated relations for this column
            const foreignKey = action.columnData.foreignKey;

            if (foreignKey !== undefined) {
                const currentTable = action.tableId;
                const foreignTableId = foreignKey.references.id;

                return state.filter((relation) => {
                    return relation.get('source') !== currentTable && relation.get('target') !== foreignTableId;
                });
            }

            return state;
        }
        case types.SAVE_FOREIGN_KEY_RELATION:
            if (action.data !== undefined) {
                return state.push(fromJS({
                    source: action.tableId,
                    target: action.data.on.id
                }));
            }

            return state;
        default:
            return state;
    }
};
