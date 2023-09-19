import {
    LOAD_TRUCKS,
    LOADING_TRUCK_MAINTENANCES,
    LOAD_TRUCK_MAINTENANCES,
    ADD_TRUCK_MAINTENANCE,
    DELETE_TRUCK_MAINTENANCE,
    LOADING_TRUCKS,
    GET_TRUCK,
    ADD_TRUCK,
    DELETE_TRUCK,
    EDIT_TRUCK,
    ERROR_ADDING_TRUCK,
    ERROR_EDiTING_TRUCK,
    RESET_ERRORS,
    CLEAN_MODIFIED
} from 'store/actions/types/types_trucks';

const initialState = {
    list: [],
    loading: false,
    loading_maintenances: false,
    truck: null,
    maintenances: [],
    addErrors: null,
    editErrors: null,
    modified: false
};

function trucks(state = initialState, action) {
    switch (action.type) {
        case LOAD_TRUCKS: {
            return {
                ...state,
                list: action.payload,
                loading: false
            };
        }
        case LOAD_TRUCK_MAINTENANCES: {
            return {
                ...state,
                maintenances: action.payload,
                loading_maintenances: false
            };
        }
        case GET_TRUCK: {
            return {
                ...state,
                loading: false,
                truck: action.payload
            };
        }
        case LOADING_TRUCK_MAINTENANCES: {
            return {
                ...state,
                loading_maintenances: true
            };
        }
        case LOADING_TRUCKS: {
            return {
                ...state,
                loading: true
            };
        }
        case DELETE_TRUCK: {
            return {
                ...state,
                loading: false,
                list: state.list.filter((truck) => truck.id !== action.payload)
            };
        }
        case DELETE_TRUCK_MAINTENANCE: {
            return {
                ...state,
                loading_maintenances: false,
                maintenances: state.maintenances.filter((maintenance) => maintenance.id !== action.payload)
            };
        }
        case ADD_TRUCK: {
            return {
                ...state,
                loading: false,
                list: [...state.list, action.payload],
                modified: true
            };
        }
        case ADD_TRUCK_MAINTENANCE: {
            return {
                ...state,
                loading_maintenances: false,
                maintenances: [...state.maintenances, action.payload]
            };
        }
        case EDIT_TRUCK: {
            return {
                ...state,
                loading: false,
                truck: action.payload,
                list: [...state.list.filter((truck) => truck.id !== action.payload), action.payload],
                modified: true
            };
        }
        case ERROR_ADDING_TRUCK: {
            return {
                ...state,
                addErrors: action.payload,
                loading: false
            };
        }
        case ERROR_EDiTING_TRUCK: {
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

export default trucks;
