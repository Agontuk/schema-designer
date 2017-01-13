import { fromJS } from 'immutable';
import * as types from 'actions';

const initialState = fromJS({});

export default (state = initialState, action) => {
    switch (action.type) {
        case types.REMOVE_TABLE:
            // Drop all columns for this table
            return state.deleteIn([action.id]);
        case types.SAVE_COLUMN:
            return state.setIn([action.tableId, action.data.id], fromJS(action.data));
        case types.REMOVE_COLUMN: {
            // Update all columns which reference this column as a foreign key
            const newState = state.map((table) => {
                return table.map((column) => {
                    const referenceId = column.getIn(['foreignKey', 'references', 'id']);

                    if (referenceId === action.columnData.id) {
                        return column.delete('foreignKey');
                    }

                    return column;
                });
            });

            return newState.deleteIn([action.tableId, action.columnData.id]);
        }
        case types.UPDATE_COLUMN:
            return state.setIn([action.tableId, action.data.id], fromJS(action.data));
        default:
            return state;
    }
};
