import * as types from '../actions/constants';

const initialState = {
    name: ''
};

export default (state = initialState, action) => {
    switch (action.type) {
        case types.SAVE_DB_NAME:
            return { name: action.name };
        default:
            return state;
    }
};
