import {
    LOAD_DRIVERS,
    LOADING_DRIVERS,
    LOADING_RANDOM_TESTS,
    LOAD_RANDOM_TESTS,
    ADD_RANDOM_TEST,
    DELETE_RANDOM_TEST,
    GET_DRIVER,
    ADD_DRIVER,
    DELETE_DRIVER,
    EDIT_DRIVER,
    ERROR_ADDING_DRIVER,
    ERROR_EDiTING_DRIVER,
    RESET_ERRORS,
    CLEAN_MODIFIED
} from 'store/actions/types/types_drivers';

const initialState = {
    list: [],
    loading: false,
    driver: null,
    loading_random_tests: false,
    random_tests: [],
    addErrors: null,
    editErrors: null,
    modified: false
};

function drivers(state = initialState, action) {
    switch (action.type) {
        case LOAD_DRIVERS: {
            return {
                ...state,
                list: action.payload,
                loading: false
            };
        }
        case GET_DRIVER: {
            return {
                ...state,
                loading: false,
                driver: action.payload
            };
        }
        case LOADING_DRIVERS: {
            return {
                ...state,
                loading: true
            };
        }
        case DELETE_DRIVER: {
            return {
                ...state,
                loading: false,
                list: state.list.filter((driver) => driver.id !== action.payload)
            };
        }
        case ADD_DRIVER: {
            return {
                ...state,
                loading: false,
                list: [...state.list, action.payload],
                modified: true
            };
        }
        case EDIT_DRIVER: {
            return {
                ...state,
                loading: false,
                driver: action.payload,
                list: [...state.list.filter((driver) => driver.id !== action.payload), action.payload],
                modified: true
            };
        }
        case LOAD_RANDOM_TESTS: {
            return {
                ...state,
                random_tests: action.payload,
                loading_random_tests: false
            };
        }
        case LOADING_RANDOM_TESTS: {
            return {
                ...state,
                loading_random_tests: true
            };
        }
        case DELETE_RANDOM_TEST: {
            return {
                ...state,
                loading_random_tests: false,
                random_tests: state.random_tests.filter((random_test) => random_test.id !== action.payload)
            };
        }
        case ADD_RANDOM_TEST: {
            return {
                ...state,
                loading_random_tests: false,
                random_tests: [...state.random_tests, action.payload]
            };
        }
        case ERROR_ADDING_DRIVER: {
            return {
                ...state,
                addErrors: action.payload,
                loading: false
            };
        }
        case ERROR_EDiTING_DRIVER: {
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

export default drivers;
