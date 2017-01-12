const makeActionCreator =  (type, ...argNames) => {
    return (...args) => {
        let action = { type };

        argNames.forEach((arg, index) => {
            action[argNames[index]] = args[index];
        });

        return action;
    };
};

// Action Constants
export const SAVE_DB_NAME = 'SAVE_DB_NAME';
export const TOGGLE_TABLE_MODAL = 'TOGGLE_TABLE_MODAL';
export const SAVE_TABLE = 'SAVE_TABLE';
export const REMOVE_TABLE = 'REMOVE_TABLE';
export const ENABLE_TABLE_EDIT = 'ENABLE_TABLE_EDIT';
export const UPDATE_TABLE = 'UPDATE_TABLE';
export const TOGGLE_COLUMN_MODAL = 'TOGGLE_COLUMN_MODAL';
export const SAVE_COLUMN = 'SAVE_COLUMN';
export const REMOVE_COLUMN = 'REMOVE_COLUMN';
export const ENABLE_COLUMN_EDIT = 'ENABLE_COLUMN_EDIT';
export const UPDATE_COLUMN = 'UPDATE_COLUMN';
export const SAVE_FOREIGN_KEY_RELATION = 'SAVE_FOREIGN_KEY_RELATION';

// Action creators
export const saveDbName = makeActionCreator(SAVE_DB_NAME, 'name');
export const toggleTableModal = makeActionCreator(TOGGLE_TABLE_MODAL);
export const saveTable = makeActionCreator(SAVE_TABLE, 'data');
export const removeTable = makeActionCreator(REMOVE_TABLE, 'id');
export const enableTableEdit = makeActionCreator(ENABLE_TABLE_EDIT, 'data');
export const updateTable = makeActionCreator(UPDATE_TABLE, 'data');
export const toggleColumnModal = makeActionCreator(TOGGLE_COLUMN_MODAL, 'tableId');
export const saveColumn = makeActionCreator(SAVE_COLUMN, 'data', 'tableId');
export const removeColumn = makeActionCreator(REMOVE_COLUMN, 'columnId', 'tableId');
export const enableColumnEdit = makeActionCreator(ENABLE_COLUMN_EDIT, 'data', 'tableId');
export const updateColumn = makeActionCreator(UPDATE_COLUMN, 'data', 'tableId');
export const saveForeignKeyRelation = makeActionCreator(SAVE_FOREIGN_KEY_RELATION, 'data', 'tableId');
