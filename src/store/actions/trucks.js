import {
    ADD_TRUCK,
    DELETE_TRUCK,
    EDIT_TRUCK,
    GET_TRUCK,
    LOADING_TRUCKS,
    LOAD_TRUCKS,
    ADD_TRUCK_MAINTENANCE,
    DELETE_TRUCK_MAINTENANCE,
    LOADING_TRUCK_MAINTENANCES,
    LOAD_TRUCK_MAINTENANCES,
    ERROR_ADDING_TRUCK,
    ERROR_EDiTING_TRUCK
} from '../actions/types/types_trucks';
import { UNAUTHORIZED } from './types/types_auth';

import axios from 'axios';
const url = 'https://api.servifleets.com/api/';

export function loadTrucks() {
    return function (dispatch) {
        dispatch({
            type: LOADING_TRUCKS
        });
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Token ${localStorage.getItem('token')}`
            }
        };
        axios
            .get(`${url}trucks/`, config)
            .then((res) => {
                return dispatch({
                    type: LOAD_TRUCKS,
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

export function getTruck(id) {
    return function (dispatch) {
        dispatch({
            type: LOADING_TRUCKS
        });
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Token ${localStorage.getItem('token')}`
            }
        };
        axios
            .get(`${url}trucks/${id}/`, config)
            .then((res) => {
                return dispatch({
                    type: GET_TRUCK,
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

export function deleteTruck(id) {
    return function (dispatch) {
        dispatch({
            type: LOADING_TRUCKS
        });
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Token ${localStorage.getItem('token')}`
            }
        };
        axios
            .delete(`${url}trucks/${id}/`, config)
            .then((res) => {
                return dispatch({
                    type: DELETE_TRUCK,
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

export function addTruck(truck, maintenance) {
    return function (dispatch) {
        dispatch({
            type: LOADING_TRUCKS
        });
        let error = false;
        const uploadData = new FormData();
        uploadData.append('number', truck.number);
        uploadData.append('year', truck.year);
        uploadData.append('brand', truck.brand);
        uploadData.append('vin_number', truck.vin_number);
        if (truck.registration != null) uploadData.append('registration', truck.registration);
        if (truck.annual_inspection != null) uploadData.append('annual_inspection', truck.annual_inspection);
        uploadData.append('registration_exp', truck.registration_exp);
        uploadData.append('annual_insp_exp', truck.annual_insp_exp);
        fetch(`${url}trucks/`, {
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
                    return dispatch({ type: ERROR_ADDING_TRUCK, payload: res });
                } else {
                    if (maintenance != null)
                        for (let i = 0; i < maintenance.length; i++) {
                            error = false;
                            const uploadData = new FormData();
                            uploadData.append('maintenance', maintenance[i]);
                            uploadData.append('truck', res.id);
                            fetch(`${url}trucks_maintenance/`, {
                                method: 'POST',
                                body: uploadData,
                                headers: {
                                    Authorization: `Token ${localStorage.getItem('token')}`
                                }
                            })
                                .then((res) => {
                                    if (res.status >= 200 && res.status <= 299) {
                                        error = false;
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
                                        return dispatch({ type: ERROR_ADDING_TRUCK, payload: res });
                                    }
                                });
                        }
                    return dispatch({
                        type: ADD_TRUCK,
                        payload: res
                    });
                }
            });
    };
}
export function editTruck(truck, id) {
    return function (dispatch) {
        dispatch({
            type: LOADING_TRUCKS
        });
        let error = false;
        const uploadData = new FormData();
        uploadData.append('number', truck.number);
        uploadData.append('year', truck.year);
        uploadData.append('brand', truck.brand);
        uploadData.append('vin_number', truck.vin_number);
        if (truck.registration != null) uploadData.append('registration', truck.registration);
        if (truck.annual_inspection != null) uploadData.append('annual_inspection', truck.annual_inspection);
        uploadData.append('registration_exp', truck.registration_exp);
        uploadData.append('annual_insp_exp', truck.annual_insp_exp);

        fetch(`${url}trucks/${id}/`, {
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
                    return dispatch({ type: ERROR_EDiTING_TRUCK, payload: res });
                } else {
                    return dispatch({
                        type: EDIT_TRUCK,
                        payload: res
                    });
                }
            });
    };
}

export function addMaintenance(maintenance, id) {
    return function (dispatch) {
        dispatch({
            type: LOADING_TRUCK_MAINTENANCES
        });
        let error = false;
        const uploadData = new FormData();
        uploadData.append('maintenance', maintenance);
        uploadData.append('truck', id);
        fetch(`${url}trucks_maintenance/`, {
            method: 'POST',
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
                    return dispatch({ type: ERROR_EDiTING_TRUCK, payload: res });
                } else {
                    dispatch({
                        type: ADD_TRUCK_MAINTENANCE,
                        payload: res
                    });
                }
            });
    };
}

export function loadMaintenances(id) {
    return function (dispatch) {
        dispatch({
            type: LOADING_TRUCK_MAINTENANCES
        });
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Token ${localStorage.getItem('token')}`
            }
        };
        axios
            .get(`${url}trucks_maintenance/${id}?id=${id}`, config)
            .then((maintenances) => {
                return dispatch({
                    type: LOAD_TRUCK_MAINTENANCES,
                    payload: maintenances.data
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
export function deleteMaintenance(id) {
    return function (dispatch) {
        dispatch({
            type: LOADING_TRUCK_MAINTENANCES
        });
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Token ${localStorage.getItem('token')}`
            }
        };
        axios
            .delete(`${url}trucks_maintenance/${id}/`, config)
            .then((res) => {
                return dispatch({
                    type: DELETE_TRUCK_MAINTENANCE,
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
