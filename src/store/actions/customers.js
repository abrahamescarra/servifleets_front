import {
    ADD_CUSTOMER,
    DELETE_CUSTOMER,
    EDIT_CUSTOMER,
    GET_CUSTOMER,
    LOADING_CUSTOMERS,
    LOAD_CUSTOMERS,
    ERROR_EDiTING_CUSTOMER,
    ERROR_ADDING_CUSTOMER,
    RESET_ERRORS
} from '../actions/types/types_customers';
import { UNAUTHORIZED } from './types/types_auth';

import axios from 'axios';
import config from '../../config';
const url = config.apiUrl + '/api/customers/';

export function loadCustomers() {
    return function (dispatch) {
        dispatch({
            type: LOADING_CUSTOMERS
        });
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Token ${localStorage.getItem('token')}`
            }
        };
        axios
            .get(url, config)
            .then((res) => {
                return dispatch({
                    type: LOAD_CUSTOMERS,
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

export function getCustomer(id) {
    return function (dispatch) {
        dispatch({
            type: LOADING_CUSTOMERS
        });
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Token ${localStorage.getItem('token')}`
            }
        };
        axios
            .get(`${url}${id}/`, config)
            .then((res) => {
                return dispatch({
                    type: GET_CUSTOMER,
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

export function addCustomer(customer) {
    return function (dispatch) {
        dispatch({
            type: LOADING_CUSTOMERS
        });
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Token ${localStorage.getItem('token')}`
            }
        };
        axios
            .post(url, customer, config)
            .then((res) => {
                return dispatch({
                    type: ADD_CUSTOMER,
                    payload: res.data
                });
            })
            .catch((err) => {
                if (err.response.status === 401) {
                    return dispatch({ type: UNAUTHORIZED });
                } else {
                    if (err.response.status === 400) {
                        return dispatch({ type: ERROR_ADDING_CUSTOMER, payload: err.response.data });
                    } else console.log(err);
                }
            });
    };
}

export function editCustomer(customer, id) {
    return function (dispatch) {
        dispatch({
            type: LOADING_CUSTOMERS
        });
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Token ${localStorage.getItem('token')}`
            }
        };
        axios
            .put(`${url}${id}/`, customer, config)
            .then((res) => {
                return dispatch({
                    type: EDIT_CUSTOMER,
                    payload: res.data
                });
            })
            .catch((err) => {
                if (err.response.status === 401) {
                    return dispatch({ type: UNAUTHORIZED });
                } else {
                    if (err.response.status === 400) {
                        return dispatch({ type: ERROR_EDiTING_CUSTOMER, payload: err.response.data });
                    } else console.log(err);
                }
            });
    };
}

export function deleteCustomer(id) {
    return function (dispatch) {
        dispatch({
            type: LOADING_CUSTOMERS
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
                    type: DELETE_CUSTOMER,
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
