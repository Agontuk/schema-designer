/**
 * @flow
 */
import * as types from './constants';
import type { ColumnType, TablePositionType, TableType } from '../utils/flowtypes';

export function toggleDbModal(editMode?: boolean) {
    return {
        type: types.TOGGLE_DB_MODAL,
        editMode
    };
}

export function saveDbName(name: string) {
    return {
        type: types.SAVE_DB_NAME,
        name
    };
}

export function toggleTableModal() {
    return {
        type: types.TOGGLE_TABLE_MODAL
    };
}

export function saveTable(data: TableType) {
    return {
        type: types.SAVE_TABLE,
        data
    };
}

export function removeTable(id: string) {
    return {
        type: types.REMOVE_TABLE,
        id
    };
}

export function enableTableEdit(data: TableType) {
    return {
        type: types.ENABLE_TABLE_EDIT,
        data
    };
}

export function updateTable(data: TableType) {
    return {
        type: types.UPDATE_TABLE,
        data
    };
}

export function toggleColumnModal(tableId?: string) {
    return {
        type: types.TOGGLE_COLUMN_MODAL,
        tableId
    };
}

export function saveColumn(data: ColumnType, tableId: string) {
    return {
        type: types.SAVE_COLUMN,
        data,
        tableId
    };
}

export function removeColumn(columnData: ColumnType, tableId: string) {
    return {
        type: types.REMOVE_COLUMN,
        columnData,
        tableId
    };
}

export function enableColumnEdit(data: ColumnType, tableId: string) {
    return {
        type: types.ENABLE_COLUMN_EDIT,
        data,
        tableId
    };
}

export function updateColumn(data: ColumnType, tableId: string) {
    return {
        type: types.UPDATE_COLUMN,
        data,
        tableId
    };
}

export function saveForeignKeyRelation(columnData: ColumnType, tableId: string) {
    return {
        type: types.SAVE_FOREIGN_KEY_RELATION,
        columnData,
        tableId
    };
}

export function updateForeignKeyRelation(columnData: ColumnType, tableId: string) {
    return {
        type: types.UPDATE_FOREIGN_KEY_RELATION,
        columnData,
        tableId
    };
}

export function storeTablePosition(newPos: TablePositionType) {
    return {
        type: types.STORE_TABLE_POSITION,
        newPos
    };
}
