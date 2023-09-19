import {
    LOAD_CUSTOMERS,
    LOADING_CUSTOMERS,
    GET_CUSTOMER,
    ADD_CUSTOMER,
    DELETE_CUSTOMER,
    EDIT_CUSTOMER,
    ERROR_ADDING_CUSTOMER,
    ERROR_EDiTING_CUSTOMER,
    RESET_ERRORS,
    CLEAN_MODIFIED
} from 'store/actions/types/types_customers';

const initialState = {
    list: [],
    loading: false,
    customer: null,
    addErrors: null,
    editErrors: null,
    modified: false
};

function customers(state = initialState, action) {
    switch (action.type) {
        case LOAD_CUSTOMERS: {
            return {
                ...state,
                list: action.payload,
                loading: false
            };
        }
        case GET_CUSTOMER: {
            return {
                ...state,
                loading: false,
                customer: action.payload
            };
        }
        case LOADING_CUSTOMERS: {
            return {
                ...state,
                loading: true
            };
        }
        case DELETE_CUSTOMER: {
            return {
                ...state,
                loading: false,
                list: state.list.filter((customer) => customer.id !== action.payload)
            };
        }
        case ADD_CUSTOMER: {
            return {
                ...state,
                loading: false,
                list: [...state.list, action.payload],
                modified: true,
                addErrors: null
            };
        }
        case EDIT_CUSTOMER: {
            return {
                ...state,
                loading: false,
                customer: action.payload,
                list: [...state.list.filter((customer) => customer.id !== action.payload), action.payload],
                modified: true
            };
        }
        case ERROR_ADDING_CUSTOMER: {
            return {
                ...state,
                addErrors: action.payload,
                loading: false
            };
        }
        case ERROR_EDiTING_CUSTOMER: {
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

export default customers;
