import {
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGIN_CHANGE,
    CHANGE_PASSWORD,
    LOGOUT,
    ERROR_EDITING_PROFILE,
    EDIT_PROFILE,
    ERROR_EDITING_PASSWORD
} from '../actions/types/types_auth';

import axios from 'axios';
import config from '../../config';
const url = config.apiUrl + '/auth/';

export function login(data) {
    return function (dispatch) {
        //if the login form fields changes their values, set error prop to false
        if (data === null) return dispatch({ type: LOGIN_CHANGE });

        //if the sumbit button is called (data !== null) make an api call
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        axios
            .post(`${url}login`, data, config)
            .then((res) => {
                localStorage.setItem('token', res.data.token);
                localStorage.setItem('user', JSON.stringify(res.data.user));

                return dispatch({
                    type: LOGIN_SUCCESS,
                    payload: res.data
                });
            })
            .catch((err) => {
                console.log(err);
                return dispatch({ type: LOGIN_FAIL });
            });
    };
}

export function logout() {
    return function (dispatch) {
        //if the login form fields changes their values, set error prop to false

        //if the sumbit button is called (data !== null) make an api call
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Token ${localStorage.getItem('token')}`
            }
        };
        axios
            .post(`${url}logout`, {}, config)
            .then((res) => {
                localStorage.removeItem('token');
                localStorage.removeItem('user');

                return dispatch({
                    type: LOGOUT
                });
            })
            .catch((err) => {
                console.log(err);
                return dispatch({ type: LOGIN_FAIL });
            });
    };
}

export function editProfile(profile) {
    return function (dispatch) {
        let error = false;
        const uploadData = new FormData();
        if (profile.company_name !== null) uploadData.append('company_name', profile.company_name);
        if (profile.default_message !== null) uploadData.append('default_message', profile.default_message);
        if (profile.logo != null) uploadData.append('logo', profile.logo);
        if (profile.address != null) uploadData.append('address', profile.address);
        uploadData.append('username', profile.username);
        uploadData.append('email', profile.email);
        fetch(`${url}user_update`, {
            method: 'PUT',
            body: uploadData,
            headers: {
                Authorization: `Token ${localStorage.getItem('token')}`
            }
        })
            .then((res) => {
                if (res.status >= 200 && res.status <= 299) {
                    return res.json();
                } else if (res.status === 400) {
                    error = true;
                    return res.json();
                } else {
                    if (res.status === 401) {
                        return dispatch({ type: UNAUTHORIZED });
                    } else {
                        throw Error(res.statusText);
                    }
                }
            })
            .then((res) => {
                if (error) {
                    return dispatch({ type: ERROR_EDITING_PROFILE, payload: res });
                } else {
                    localStorage.setItem('user', JSON.stringify(res));
                    return dispatch({
                        type: EDIT_PROFILE,
                        payload: res
                    });
                }
            });
    };
}

export function changePass(obj) {
    return function (dispatch) {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Token ${localStorage.getItem('token')}`
            }
        };
        axios
            .put(`${url}change_password`, obj, config)
            .then((res) => {
                return dispatch({
                    type: CHANGE_PASSWORD
                });
            })
            .catch((err) => {
                console.log(err);
                return dispatch({ type: ERROR_EDITING_PASSWORD, payload: err.response.data });
            });
    };
}
