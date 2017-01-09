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

// Action creators
export const saveDbName = makeActionCreator(SAVE_DB_NAME, 'name');
