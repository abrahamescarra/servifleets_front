import { LOAD_NOTIFICATIONS, LOADING_NOTIFICATIONS, MARK_READED, MARK_ALL_READED } from 'store/actions/types/types_notifications';
import { UNAUTHORIZED } from './types/types_auth';

import axios from 'axios';
const url = 'https://api.servifleets.com/api/notifications/';
const url2 = 'https://api.servifleets.com/api/mark_read';
const url3 = 'https://api.servifleets.com/api/mark_all_read';

export function loadNotifications() {
    return function (dispatch) {
        dispatch({
            type: LOADING_NOTIFICATIONS
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
                let arr = [];
                for (let i = 0; i < res.data.length; i++) {
                    if (!res.data[i].readed) arr.push(res.data[i]);
                }
                return dispatch({
                    type: LOAD_NOTIFICATIONS,
                    payload: {
                        all: res.data,
                        notReaded: arr
                    }
                });
            })
            .catch((err) => {
                if (err?.response?.status === 401) {
                    return dispatch({ type: UNAUTHORIZED });
                } else {
                    console.log(err);
                }
            });
    };
}

export function markAllReaded() {
    return function (dispatch) {
        dispatch({
            type: LOADING_NOTIFICATIONS
        });
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Token ${localStorage.getItem('token')}`
            }
        };
        axios
            .post(url3, null, config)
            .then((res) => {
                return dispatch({
                    type: MARK_ALL_READED
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

export function markReaded(id) {
    return function (dispatch) {
        dispatch({
            type: LOADING_NOTIFICATIONS
        });
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Token ${localStorage.getItem('token')}`
            }
        };
        axios
            .post(url2, { id: id }, config)
            .then((res) => {
                return dispatch({
                    type: MARK_READED,
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
