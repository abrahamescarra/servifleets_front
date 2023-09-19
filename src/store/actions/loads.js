import {
    ADD_LOAD,
    DELETE_LOAD,
    EDIT_LOAD,
    EDIT_LOAD_INVOICE,
    ERROR_ADDING_LOAD,
    ERROR_EDiTING_LOAD,
    GET_LOAD,
    LOADING_LOADS,
    LOAD_LOADS,
    LOAD_LOAD_INVOICES
} from '../actions/types/types_loads';
import { UNAUTHORIZED } from './types/types_auth';
import axios from 'axios';
const url = 'https://api.servifleets.com/api/loads/';

export function loadLoads() {
    return function (dispatch) {
        dispatch({
            type: LOADING_LOADS
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
                let non_invoices = [];
                for (let i = 0; i < res.data.length; i++) {
                    if (!res.data[i].has_invoice) non_invoices.push(res.data[i]);
                }
                dispatch({
                    type: LOAD_LOAD_INVOICES,
                    payload: non_invoices
                });
                return dispatch({
                    type: LOAD_LOADS,
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

export function getLoad(id) {
    return function (dispatch) {
        dispatch({
            type: LOADING_LOADS
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
                    type: GET_LOAD,
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

export function addLoad(load) {
    return function (dispatch) {
        dispatch({
            type: LOADING_LOADS
        });
        let error = false;
        const uploadData = new FormData();
        uploadData.append('load_number', load.load_number);
        uploadData.append('broker_name', load.broker_name);
        uploadData.append('pickup', load.pickup);
        uploadData.append('delivery', load.delivery);
        uploadData.append('delivery', load.delivery);
        uploadData.append('notes', load.notes);
        uploadData.append('driver_rate', load.driver_rate);
        uploadData.append('rate', load.rate);
        uploadData.append('miles', load.miles);
        if (load.confirmation != null) uploadData.append('confirmation', load.confirmation);
        if (load.bol != null) uploadData.append('bol', load.bol);
        uploadData.append('pickup_date', load.pickup_date);
        uploadData.append('delivery_date', load.delivery_date);
        uploadData.append('driver', load.driver);
        uploadData.append('truck', load.truck);
        uploadData.append('house_driver', load.house_driver);
        uploadData.append('weight', load.weight);
        uploadData.append('comodity', load.comodity);
        fetch(url, {
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
                    return dispatch({ type: ERROR_ADDING_LOAD, payload: res });
                } else {
                    return dispatch({
                        type: ADD_LOAD,
                        payload: res
                    });
                }
            });
    };
}

export function editLoad(load, id, inv) {
    return function (dispatch) {
        dispatch({
            type: LOADING_LOADS
        });
        let error = false;
        const uploadData = new FormData();
        uploadData.append('load_number', load.load_number);
        uploadData.append('broker_name', load.broker_name);
        uploadData.append('pickup', load.pickup);
        uploadData.append('delivery', load.delivery);
        uploadData.append('delivery', load.delivery);
        uploadData.append('notes', load.notes);
        uploadData.append('driver_rate', load.driver_rate);
        uploadData.append('rate', load.rate);
        uploadData.append('miles', load.miles);
        if (load.confirmation != null) uploadData.append('confirmation', load.confirmation);
        if (load.bol != null) uploadData.append('bol', load.bol);
        uploadData.append('pickup_date', load.pickup_date);
        uploadData.append('delivery_date', load.delivery_date);
        uploadData.append('driver', load.driver);
        uploadData.append('truck', load.truck);
        uploadData.append('house_driver', load.house_driver);
        uploadData.append('has_invoice', load.has_invoice ? true : false);
        if (load.weight != null) uploadData.append('weight', load.weight);
        if (load.comodity != null) uploadData.append('comodity', load.comodity);
        fetch(`${url}${id}/`, {
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
                    return dispatch({ type: ERROR_EDiTING_LOAD, payload: res });
                } else {
                    if (!inv)
                        return dispatch({
                            type: EDIT_LOAD,
                            payload: res
                        });
                    else {
                        return dispatch({
                            type: EDIT_LOAD_INVOICE,
                            payload: res
                        });
                    }
                }
            });
    };
}
// export function loadLoadsInvoices() {
//     return function (dispatch) {
//         dispatch({
//             type: LOADING_LOADS
//         });
//         const config = {
//             headers: {
//                 'Content-Type': 'application/json',
//                 Authorization: `Token ${localStorage.getItem('token')}`
//             }
//         };
//         axios
//             .get('https://api.servifleets.com/api/non_invoice_loads', config)
//             .then((res) => {
//                 return dispatch({
//                     type: LOAD_LOAD_INVOICES,
//                     payload: res.data
//                 });
//             })
//             .catch((err) => {
//                 if (err.response.status === 401) {
//                     return dispatch({ type: UNAUTHORIZED });
//                 } else {
//                     console.log(err);
//                 }
//             });
//     };
// }

export function deleteLoad(id) {
    return function (dispatch) {
        dispatch({
            type: LOADING_LOADS
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
                    type: DELETE_LOAD,
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
