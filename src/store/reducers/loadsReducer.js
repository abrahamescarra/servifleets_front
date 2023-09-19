import {
    LOAD_LOADS,
    LOADING_LOADS,
    GET_LOAD,
    ADD_LOAD,
    DELETE_LOAD,
    EDIT_LOAD,
    ERROR_ADDING_LOAD,
    ERROR_EDiTING_LOAD,
    RESET_ERRORS,
    CLEAN_MODIFIED,
    LOAD_LOAD_INVOICES,
    EDIT_LOAD_INVOICE
} from 'store/actions/types/types_loads';

const initialState = {
    list: [],
    loading: false,
    load: null,
    addErrors: null,
    editErrors: null,
    modified: false,
    loads_invoices: []
};

function loads(state = initialState, action) {
    switch (action.type) {
        case LOAD_LOADS: {
            return {
                ...state,
                list: action.payload,
                loading: false
            };
        }
        case GET_LOAD: {
            return {
                ...state,
                loading: false,
                load: action.payload
            };
        }
        case LOAD_LOAD_INVOICES: {
            return {
                ...state,
                loads_invoices: action.payload
            };
        }
        case LOADING_LOADS: {
            return {
                ...state,
                loading: true
            };
        }
        case DELETE_LOAD: {
            return {
                ...state,
                loading: false,
                list: state.list.filter((load) => load.id !== action.payload)
            };
        }
        case ADD_LOAD: {
            return {
                ...state,
                loading: false,
                list: [...state.list, action.payload],
                modified: true
            };
        }
        case EDIT_LOAD: {
            return {
                ...state,
                loading: false,
                load: action.payload,
                list: [...state.list.filter((load) => load.id !== action.payload.id), action.payload],
                modified: true
            };
        }
        case EDIT_LOAD_INVOICE: {
            return {
                ...state,
                loading: false,
                loads_invoices: [...state.loads_invoices.filter((load) => load.id !== action.payload.id), action.payload]
            };
        }
        case ERROR_ADDING_LOAD: {
            return {
                ...state,
                addErrors: action.payload,
                loading: false
            };
        }
        case ERROR_EDiTING_LOAD: {
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

export default loads;
