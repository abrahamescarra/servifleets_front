import {
    EDIT_FACTORING,
    GET_FACTORING,
    LOADING_FACTORING,
    CLEAN_MODIFIED,
    ERROR_EDiTING_FACTORING,
    RESET_ERRORS
} from '../actions/types/types_factoring';

const initialState = {
    loading: false,
    factoring: null,
    editErrors: null,
    modified: false
};

function factoring(state = initialState, action) {
    switch (action.type) {
        case GET_FACTORING: {
            return {
                ...state,
                loading: false,
                factoring: action.payload
            };
        }
        case LOADING_FACTORING: {
            return {
                ...state,
                loading: true
            };
        }
        case EDIT_FACTORING: {
            return {
                ...state,
                loading: false,
                factoring: action.payload,
                modified: true
            };
        }
        case ERROR_EDiTING_FACTORING: {
            return {
                ...state,
                editErrors: action.payload,
                loading: false
            };
        }
        case RESET_ERRORS: {
            return {
                ...state,
                editErrors: null,
                addErrors: null
            };
        }
        case CLEAN_MODIFIED: {
            return {
                ...state,
                modified: false
            };
        }
        default: {
            return {
                ...state
            };
        }
    }
}

export default factoring;
