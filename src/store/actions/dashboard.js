import { GET_DASHBOARD_DATA } from '../actions/types/types_dashboard';
import { UNAUTHORIZED } from './types/types_auth';
import axios from 'axios';
import config from '../../config';
const url = config.apiUrl + '/api/dashboard_data';
export function loadDashBoardData() {
    return function (dispatch) {
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
                    type: GET_DASHBOARD_DATA,
                    payload: res.data
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
