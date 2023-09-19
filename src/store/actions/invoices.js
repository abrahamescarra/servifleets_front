import {
    ADD_INVOICE,
    DELETE_INVOICE,
    EDIT_INVOICE,
    GET_INVOICE,
    LOADING_INVOICES,
    LOAD_INVOICES,
    ERROR_EDiTING_INVOICE,
    ERROR_ADDING_INVOICE,
    CLEAN_MODIFIED_INVOICES,
    SEND_INVOICE,
    ERROR_SENDING_INVOICE,
    GET_ALL_DATA_INVOICE
} from './types/types_invoices';
import { UNAUTHORIZED } from './types/types_auth';

import axios from 'axios';
import { editLoad } from './loads';
const url = 'https://api.servifleets.com/api/invoices/';

export function loadInvoices() {
    return function (dispatch) {
        dispatch({
            type: LOADING_INVOICES
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
                    type: LOAD_INVOICES,
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

export function getInvoice(id) {
    return function (dispatch) {
        dispatch({
            type: LOADING_INVOICES
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
                    type: GET_INVOICE,
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

export function getAllDataInvoice(id) {
    return function (dispatch) {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Token ${localStorage.getItem('token')}`
            }
        };
        axios
            .post(`${url}get_data/`, { id }, config)
            .then((res) => {
                return dispatch({
                    type: GET_ALL_DATA_INVOICE,
                    payload: res.data
                });
            })
            .catch((err) => {
                if (err.status === 401) {
                    return dispatch({ type: UNAUTHORIZED });
                } else {
                    console.log(err);
                }
            });
    };
}

export function sendFactoringInvoice(id) {
    return function (dispatch) {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Token ${localStorage.getItem('token')}`
            }
        };
        axios
            .post(`${url}send_invoice_factoring/`, { id }, config)
            .then((res) => {
                return dispatch({
                    type: SEND_INVOICE,
                    payload: res.data
                });
            })
            .catch((err) => {
                if (err.status === 401) {
                    return dispatch({ type: UNAUTHORIZED });
                } else {
                    console.log(err);
                }
            });
    };
}

export function addInvoice(invoice, load) {
    return function (dispatch) {
        dispatch({
            type: LOADING_INVOICES
        });
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Token ${localStorage.getItem('token')}`
            }
        };
        axios
            .post(url, invoice, config)
            .then((res) => {
                dispatch(
                    editLoad(
                        { ...load, confirmation: null, bol: null, has_invoice: true, truck: load.truck === null ? '' : load.truck },
                        load.id,
                        true
                    )
                );
                return dispatch({
                    type: ADD_INVOICE,
                    payload: res.data
                });
            })
            .catch((err) => {
                if (err.response.status === 401) {
                    return dispatch({ type: UNAUTHORIZED });
                } else {
                    if (err.response.status === 400) {
                        return dispatch({ type: ERROR_ADDING_INVOICE, payload: err.response.data });
                    } else console.log(err);
                }
            });
    };
}

export function editInvoice(invoice, id, bol) {
    return function (dispatch) {
        dispatch({
            type: LOADING_INVOICES
        });
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Token ${localStorage.getItem('token')}`
            }
        };
        axios
            .put(`${url}${id}/`, invoice, config)
            .then((res) => {
                if (bol) {
                    dispatch({
                        type: EDIT_INVOICE,
                        payload: res.data
                    });
                    return dispatch({
                        type: CLEAN_MODIFIED_INVOICES
                    });
                }
                return dispatch({
                    type: EDIT_INVOICE,
                    payload: res.data
                });
            })
            .catch((err) => {
                if (err.response.status === 401) {
                    return dispatch({ type: UNAUTHORIZED });
                } else {
                    if (err.response.status === 400) {
                        return dispatch({ type: ERROR_EDiTING_INVOICE, payload: err.response.data });
                    } else console.log(err);
                }
            });
    };
}

export function deleteInvoice(id, load) {
    return function (dispatch) {
        dispatch({
            type: LOADING_INVOICES
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
                dispatch(
                    editLoad(
                        { ...load, confirmation: null, bol: null, has_invoice: false, truck: load.truck === null ? '' : load.truck },
                        load.id,
                        true
                    )
                );
                return dispatch({
                    type: DELETE_INVOICE,
                    payload: id
                });
            })
            .catch((err) => {
                console.log(err);
            });
    };
}

export function sendInvoice(id, invoice) {
    return function (dispatch) {
        let error = false;
        const uploadData = new FormData();
        uploadData.append('invoice', invoice);
        uploadData.append('id', id);
        fetch(`${url}send_invoice/`, {
            method: 'POST',
            body: uploadData,
            headers: {
                Authorization: `Token ${localStorage.getItem('token')}`
            }
        })
            .then((res) => {
                if (res.status >= 200 && res.status <= 299) {
                    error = false;
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
                    return dispatch({ type: ERROR_SENDING_INVOICE, payload: res });
                } else {
                    return dispatch({
                        type: SEND_INVOICE,
                        payload: res
                    });
                }
            });
    };
}
