import update from 'immutability-helper';
import * as types from '../actions/constants';

const initialState = {
    database: {
        showModal: false,
        edit: false
    },
    table: {
        showModal: false,
        edit: false,
        editData: {
            id: '',
            name: '',
            softDelete: false,
            timeStamp: true
        }
    },
    column: {
        showModal: false,
        edit: false,
        editData: {
            id: '',
            name: '',
            type: 'integer',
            length: '',
            defValue: '',
            comment: '',
            autoInc: false,
            nullable: false,
            unique: false,
            index: false,
            unsigned: false,
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
        },
        tableId: ''
    },
    positions: {}
};

export default (state = initialState, action) => {
    switch (action.type) {
        case types.TOGGLE_DB_MODAL: {
            const show = state.database.showModal;

            if (show) {
                return {
                    ...state,
                    database: {
                        showModal: false,
                        edit: false
                    }
                };
            }

            return {
                ...state,
                database: {
                    showModal: true,
                    edit: action.editMode
                }
            };
        }
        case types.TOGGLE_TABLE_MODAL: {
            const show = state.table.showModal;

            if (show) {
                // Reset edit data & edit mode before hiding modal
                return update(state, {
                    table: {
                        showModal: { $set: false },
                        edit: { $set: false },
                        editData: { $set: initialState.table.editData }
                    }
                });
            }

            return update(state, {
                table: {
                    showModal: { $set: true }
                }
            });
        }
        case types.ENABLE_TABLE_EDIT:
            return update(state, {
                table: {
                    edit: { $set: true },
                    editData: { $set: action.data }
                }
            });
        case types.TOGGLE_COLUMN_MODAL: {
            const show = state.column.showModal;

            if (show) {
                // Reset edit data & edit mode before hiding modal
                return update(state, {
                    column: {
                        showModal: { $set: false },
                        tableId: { $set: '' },
                        edit: { $set: false },
                        editData: { $set: initialState.column.editData }
                    }
                });
            }

            return update(state, {
                column: {
                    showModal: { $set: true },
                    tableId: { $set: action.tableId }
                }
            });
        }
        case types.ENABLE_COLUMN_EDIT:
            return update(state, {
                column: {
                    edit: { $set: true },
                    editData: { $set: action.data },
                    tableId: { $set: action.tableId }
                }
            });
        case types.SAVE_TABLE: {
            const length = Object.keys(state.positions).length;
            return update(state, {
                positions: {
                    [action.data.id]: {
                        $set: {
                            x: 0 + (length * 40),
                            y: 0 + (length * 40)
                        }
                    }
                }
            });
        }
        case types.REMOVE_TABLE: {
            return update(state, {
                positions: {
                    $apply: (table) => {
                        const { [action.id]: omit, ...rest } = table; // eslint-disable-line no-unused-vars
                        return rest;
                    }
                }
            });
        }
        case types.STORE_TABLE_POSITION:
            return update(state, {
                positions: {
                    [action.newPos.id]: {
                        $set: {
                            x: action.newPos.x,
                            y: action.newPos.y
                        }
                    }
                }
            });
        default:
            return state;
    }
};
