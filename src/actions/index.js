const makeActionCreator = (type, ...argNames) => ((...args) => {
    const action = { type };

    argNames.forEach((arg, index) => {
        action[argNames[index]] = args[index];
    });

    return action;
});

// Action Constants
export const TOGGLE_DB_MODAL = 'TOGGLE_DB_MODAL';
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
export const UPDATE_FOREIGN_KEY_RELATION = 'UPDATE_FOREIGN_KEY_RELATION';
export const STORE_TABLE_POSITION = 'STORE_TABLE_POSITION';

// Action creators
export const toggleDbModal = makeActionCreator(TOGGLE_DB_MODAL, 'editMode');
export const saveDbName = makeActionCreator(SAVE_DB_NAME, 'name');
export const toggleTableModal = makeActionCreator(TOGGLE_TABLE_MODAL);
export const saveTable = makeActionCreator(SAVE_TABLE, 'data');
export const removeTable = makeActionCreator(REMOVE_TABLE, 'id');
export const enableTableEdit = makeActionCreator(ENABLE_TABLE_EDIT, 'data');
export const updateTable = makeActionCreator(UPDATE_TABLE, 'data');
export const toggleColumnModal = makeActionCreator(TOGGLE_COLUMN_MODAL, 'tableId');
export const saveColumn = makeActionCreator(SAVE_COLUMN, 'data', 'tableId');
export const removeColumn = makeActionCreator(REMOVE_COLUMN, 'columnData', 'tableId');
export const enableColumnEdit = makeActionCreator(ENABLE_COLUMN_EDIT, 'data', 'tableId');
export const updateColumn = makeActionCreator(UPDATE_COLUMN, 'data', 'tableId');
export const saveForeignKeyRelation = makeActionCreator(SAVE_FOREIGN_KEY_RELATION, 'columnData', 'tableId');
export const updateForeignKeyRelation = makeActionCreator(UPDATE_FOREIGN_KEY_RELATION, 'columnData', 'tableId');
export const storeTablePosition = makeActionCreator(STORE_TABLE_POSITION, 'newPos');
