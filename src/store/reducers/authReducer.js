import {
    LOADING,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGIN_CHANGE,
    UNAUTHORIZED,
    LOGOUT,
    EDIT_PROFILE,
    ERROR_EDITING_PROFILE,
    RESET_ERRORS,
    CLEAN_MODIFIED,
    CHANGE_PASSWORD,
    ERROR_EDITING_PASSWORD
} from '../actions/types/types_auth';

let token = localStorage.getItem('token');
let user = JSON.parse(localStorage.getItem('user'));
const initialState = token
    ? {
          user: user,
          token: token,
          loading: false,
          loggedIn: true,
          logFail: false,
          errors: null,
          modified: false,
          pass_errors: null,
          modified_pass: false
      }
    : {
          user: {},
          token: null,
          loading: false,
          loggedIn: false,
          logFail: false,
          errors: null,
          modified: false,
          pass_errors: null,
          modified_pass: false
      };

function authReducer(state = initialState, action) {
    switch (action.type) {
        case LOGIN_SUCCESS:
            return {
                ...state,
                user: action.payload.user,
                token: action.payload.token,
                loading: false,
                loggedIn: true
            };
        case LOADING:
            return {
                ...state,
                user: {},
                token: null,
                loading: true,
                loggedIn: false
            };
        case UNAUTHORIZED:
        case LOGOUT:
            return {
                ...state,
                user: {},
                token: null,
                loading: false,
                loggedIn: false
            };
        case LOGIN_FAIL:
            return {
                ...state,
                user: {},
                token: null,
                loading: false,
                loggedIn: false,
                logFail: true
            };
        case LOGIN_CHANGE:
            return {
                ...state,
                logFail: false
            };
        case EDIT_PROFILE:
            return {
                ...state,
                user: action.payload,
                modified: true
            };
        case ERROR_EDITING_PROFILE:
            return {
                ...state,
                errors: action.payload
            };
        case ERROR_EDITING_PASSWORD:
            return {
                ...state,
                pass_errors: action.payload
            };
        case RESET_ERRORS: {
            return {
                ...state,
                errors: null,
                pass_errors: null
            };
        }
        case CLEAN_MODIFIED: {
            return {
                ...state,
                modified: false,
                modified_pass: false
            };
        }
        case CHANGE_PASSWORD: {
            return {
                ...state,
                modified_pass: true
            };
        }

        default: {
            return {
                ...state
            };
        }
    }
}

export default authReducer;
