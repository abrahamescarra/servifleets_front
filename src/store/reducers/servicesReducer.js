import {
    LOAD_SERVICES,
    LOADING_SERVICES,
    GET_SERVICE,
    ADD_SERVICE,
    DELETE_SERVICE,
    EDIT_SERVICE,
    ERROR_ADDING_SERVICE,
    ERROR_EDiTING_SERVICE,
    RESET_ERRORS,
    CLEAN_MODIFIED
} from 'store/actions/types/types_services';

const initialState = {
    list: [],
    loading: false,
    service: null,
    addErrors: null,
    editErrors: null,
    modified: false
};

function services(state = initialState, action) {
    switch (action.type) {
        case LOAD_SERVICES: {
            return {
                ...state,
                list: action.payload,
                loading: false
            };
        }
        case GET_SERVICE: {
            return {
                ...state,
                loading: false,
                service: action.payload
            };
        }
        case LOADING_SERVICES: {
            return {
                ...state,
                loading: true
            };
        }
        case DELETE_SERVICE: {
            return {
                ...state,
                loading: false,
                list: state.list.filter((service) => service.id !== action.payload)
            };
        }
        case ADD_SERVICE: {
            return {
                ...state,
                loading: false,
                list: [...state.list, action.payload],
                modified: true,
                addErrors: null
            };
        }
        case EDIT_SERVICE: {
            return {
                ...state,
                loading: false,
                service: action.payload,
                list: [...state.list.filter((service) => service.id !== action.payload), action.payload],
                modified: true
            };
        }
        case ERROR_ADDING_SERVICE: {
            return {
                ...state,
                addErrors: action.payload,
                loading: false
            };
        }
        case ERROR_EDiTING_SERVICE: {
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

export default services;
