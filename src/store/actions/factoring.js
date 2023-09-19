import { EDIT_FACTORING, GET_FACTORING, LOADING_FACTORING, ERROR_EDiTING_FACTORING, RESET_ERRORS } from '../actions/types/types_factoring';

import { UNAUTHORIZED } from './types/types_auth';

import axios from 'axios';
const url = 'https://api.servifleets.com/api/factoring/';

export function getFactoring() {
    return function (dispatch) {
        dispatch({
            type: LOADING_FACTORING
        });
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Token ${localStorage.getItem('token')}`
            }
        };
        axios
            .get(`${url}`, config)
            .then((res) => {
                return dispatch({
                    type: GET_FACTORING,
                    payload: res.data[0]
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

export function setFactoring(factoring, id) {
    return function (dispatch) {
        dispatch({
            type: LOADING_FACTORING
        });
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Token ${localStorage.getItem('token')}`
            }
        };
        axios
            .put(`${url}${id}/`, factoring, config)
            .then((res) => {
                return dispatch({
                    type: EDIT_FACTORING,
                    payload: res.data
                });
            })
            .catch((err) => {
                if (err.response.status === 401) {
                    return dispatch({ type: UNAUTHORIZED });
                } else {
                    if (err.response.status === 400) {
                        return dispatch({ type: ERROR_EDiTING_FACTORING, payload: err.response.data });
                    } else console.log(err);
                }
            });
    };
}
