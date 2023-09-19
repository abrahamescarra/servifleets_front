import {
    LOAD_TRAILERS,
    LOADING_TRAILERS,
    LOADING_TRAILER_MAINTENANCES,
    LOAD_TRAILER_MAINTENANCES,
    ADD_TRAILER_MAINTENANCE,
    DELETE_TRAILER_MAINTENANCE,
    GET_TRAILER,
    ADD_TRAILER,
    DELETE_TRAILER,
    EDIT_TRAILER,
    ERROR_ADDING_TRAILER,
    ERROR_EDiTING_TRAILER,
    RESET_ERRORS,
    CLEAN_MODIFIED
} from 'store/actions/types/types_trailers';

const initialState = {
    list: [],
    loading: false,
    trailer: null,
    maintenances: [],
    loading_maintenances: false,
    addErrors: null,
    editErrors: null,
    modified: false
};

function trailers(state = initialState, action) {
    switch (action.type) {
        case LOAD_TRAILERS: {
            return {
                ...state,
                list: action.payload,
                loading: false
            };
        }
        case GET_TRAILER: {
            return {
                ...state,
                loading: false,
                trailer: action.payload
            };
        }
        case LOADING_TRAILERS: {
            return {
                ...state,
                loading: true
            };
        }
        case DELETE_TRAILER: {
            return {
                ...state,
                loading: false,
                list: state.list.filter((trailer) => trailer.id !== action.payload)
            };
        }
        case ADD_TRAILER: {
            return {
                ...state,
                loading: false,
                list: [...state.list, action.payload],
                modified: true
            };
        }
        case LOAD_TRAILER_MAINTENANCES: {
            return {
                ...state,
                maintenances: action.payload,
                loading_maintenances: false
            };
        }
        case LOADING_TRAILER_MAINTENANCES: {
            return {
                ...state,
                loading_maintenances: true
            };
        }
        case DELETE_TRAILER_MAINTENANCE: {
            return {
                ...state,
                loading_maintenances: false,
                maintenances: state.maintenances.filter((maintenance) => maintenance.id !== action.payload)
            };
        }
        case ADD_TRAILER_MAINTENANCE: {
            return {
                ...state,
                loading_maintenances: false,
                maintenances: [...state.maintenances, action.payload]
            };
        }
        case EDIT_TRAILER: {
            return {
                ...state,
                loading: false,
                trailer: action.payload,
                list: [...state.list.filter((trailer) => trailer.id !== action.payload), action.payload],
                modified: true
            };
        }
        case ERROR_ADDING_TRAILER: {
            return {
                ...state,
                addErrors: action.payload,
                loading: false
            };
        }
        case ERROR_EDiTING_TRAILER: {
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

export default trailers;
