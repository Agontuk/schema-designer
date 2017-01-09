import { fromJS } from 'immutable';
// import * as types from 'actions';

const initialState = fromJS({
    name: ''
});

export default (state = initialState, action) => {
    switch (action.type) {
        default:
            return state;
    }
};
