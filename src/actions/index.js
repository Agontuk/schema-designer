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
export const INCREMENT = 'INCREMENT';

// Action creators
export const increment = makeActionCreator(INCREMENT);
