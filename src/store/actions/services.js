import {
    ADD_SERVICE,
    DELETE_SERVICE,
    EDIT_SERVICE,
    GET_SERVICE,
    LOADING_SERVICES,
    LOAD_SERVICES,
    ERROR_EDiTING_SERVICE,
    ERROR_ADDING_SERVICE,
    RESET_ERRORS
} from './types/types_services';
import { UNAUTHORIZED } from './types/types_auth';

import axios from 'axios';
const url = 'https://api.servifleets.com/api/services/';

export function loadServices(id) {
    return function (dispatch) {
        dispatch({
            type: LOADING_SERVICES
        });
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Token ${localStorage.getItem('token')}`
            }
        };
        axios
            .get(`${url}${id}?id=${id}`, config)
            .then((res) => {
                return dispatch({
                    type: LOAD_SERVICES,
                    payload: res.data
                });
            })
            .catch((err) => {
                if (err.response.status === 401) {
                    return dispatch({ type: UNAUTHORIZED });
                } else {
                    console.log(err);
                }
            });
    };
}

export function addService(service) {
    return function (dispatch) {
        dispatch({
            type: LOADING_SERVICES
        });
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Token ${localStorage.getItem('token')}`
            }
        };
        axios
            .post(url, service, config)
            .then((res) => {
                return dispatch({
                    type: ADD_SERVICE,
                    payload: res.data
                });
            })
            .catch((err) => {
                if (err.response.status === 401) {
                    return dispatch({ type: UNAUTHORIZED });
                } else {
                    if (err.response.status === 400) {
                        return dispatch({ type: ERROR_ADDING_SERVICE, payload: err.response.data });
                    } else console.log(err);
                }
            });
    };
}

export function deleteService(id) {
    return function (dispatch) {
        dispatch({
            type: LOADING_SERVICES
        });
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Token ${localStorage.getItem('token')}`
            }
        };
        axios
            .delete(`${url}${id}/`, config)
            .then((res) => {
                return dispatch({
                    type: DELETE_SERVICE,
                    payload: id
                });
            })
            .catch((err) => {
                if (err.response.status === 401) {
                    return dispatch({ type: UNAUTHORIZED });
                } else {
                    console.log(err);
                }
            });
    };
}
