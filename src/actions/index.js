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

// Action creators
export const saveDbName = makeActionCreator(SAVE_DB_NAME, 'name');
export const toggleTableModal = makeActionCreator(TOGGLE_TABLE_MODAL);
