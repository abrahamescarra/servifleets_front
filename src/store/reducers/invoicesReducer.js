import {
    LOAD_INVOICES,
    LOADING_INVOICES,
    GET_INVOICE,
    ADD_INVOICE,
    DELETE_INVOICE,
    EDIT_INVOICE,
    ERROR_ADDING_INVOICE,
    ERROR_EDiTING_INVOICE,
    RESET_ERRORS_INVOICES,
    CLEAN_MODIFIED_INVOICES,
    GET_ALL_DATA_INVOICE,
    SEND_INVOICE
} from 'store/actions/types/types_invoices';

const initialState = {
    list: [],
    loading: false,
    invoice: null,
    addErrors: null,
    editErrors: null,
    modified: false,
    all_data: null,
    sentInvoice: false,
    id: null
};

function invoices(state = initialState, action) {
    switch (action.type) {
        case LOAD_INVOICES: {
            return {
                ...state,
                list: action.payload,
                loading: false
            };
        }

        case GET_INVOICE: {
            return {
                ...state,
                loading: false,
                invoice: action.payload
            };
        }
        case SEND_INVOICE: {
            return {
                ...state,
                sentInvoice: true
            };
        }
        case LOADING_INVOICES: {
            return {
                ...state,
                loading: true
            };
        }
        case DELETE_INVOICE: {
            return {
                ...state,
                loading: false,
                list: state.list.filter((invoice) => invoice.id !== action.payload)
            };
        }
        case ADD_INVOICE: {
            return {
                ...state,
                loading: false,
                list: [...state.list, action.payload],
                modified: true,
                addErrors: null,
                id: action.payload.id
            };
        }
        case EDIT_INVOICE: {
            return {
                ...state,
                loading: false,
                invoice: action.payload,
                list: [...state.list.filter((invoice) => invoice.id !== action.payload.id), action.payload].sort((a, b) => a.id - b.id),
                modified: true
            };
        }
        case ERROR_ADDING_INVOICE: {
            return {
                ...state,
                addErrors: action.payload,
                loading: false
            };
        }
        case ERROR_EDiTING_INVOICE: {
            return {
                ...state,
                editErrors: action.payload,
                loading: false
            };
        }
        case RESET_ERRORS_INVOICES: {
            return {
                ...state,
                editErrors: null,
                addErrors: null
            };
        }
        case CLEAN_MODIFIED_INVOICES: {
            return {
                ...state,
                modified: false,
                sentInvoice: false
            };
        }
        case GET_ALL_DATA_INVOICE: {
            return {
                ...state,
                all_data: action.payload
            };
        }
        default: {
            return {
                ...state
            };
        }
    }
}

export default invoices;
