import { GET_COLLECTIONS } from '../actions/collection';

const initialState = {
    collections: [],
};

export default (state = initialState, action = {}) => {
    switch (action.type) {
        case GET_COLLECTIONS:
            return {
                ...state,
                collections: action.status?state.collections:action.result,
            };
        default:
            return state;
    }
}
