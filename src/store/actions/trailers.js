import {
    ADD_TRAILER,
    DELETE_TRAILER,
    ADD_TRAILER_MAINTENANCE,
    DELETE_TRAILER_MAINTENANCE,
    LOADING_TRAILER_MAINTENANCES,
    LOAD_TRAILER_MAINTENANCES,
    GET_TRAILER,
    LOADING_TRAILERS,
    LOAD_TRAILERS,
    EDIT_TRAILER,
    ERROR_ADDING_TRAILER,
    ERROR_EDiTING_TRAILER
} from '../actions/types/types_trailers';
import { UNAUTHORIZED } from './types/types_auth';
import axios from 'axios';
const url = 'https://api.servifleets.com/api/';

export function loadTrailers() {
    return function (dispatch) {
        dispatch({
            type: LOADING_TRAILERS
        });
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Token ${localStorage.getItem('token')}`
            }
        };
        axios
            .get(`${url}trailers/`, config)
            .then((res) => {
                return dispatch({
                    type: LOAD_TRAILERS,
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

export function getTrailer(id) {
    return function (dispatch) {
        dispatch({
            type: LOADING_TRAILERS
        });
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Token ${localStorage.getItem('token')}`
            }
        };
        axios
            .get(`${url}trailers/${id}/`, config)
            .then((res) => {
                return dispatch({
                    type: GET_TRAILER,
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

export function addTrailer(trailer, maintenance) {
    return function (dispatch) {
        dispatch({
            type: LOADING_TRAILERS
        });
        let error = false;
        const uploadData = new FormData();
        uploadData.append('number', trailer.number);
        uploadData.append('year', trailer.year);
        uploadData.append('brand', trailer.brand);
        uploadData.append('vin_number', trailer.vin_number);
        uploadData.append('typ', trailer.typ);
        uploadData.append('length', trailer.length);
        if (trailer.registration != null) uploadData.append('registration', trailer.registration);
        if (trailer.annual_inspection != null) uploadData.append('annual_inspection', trailer.annual_inspection);
        uploadData.append('registration_exp', trailer.registration_exp);
        uploadData.append('annual_insp_exp', trailer.annual_insp_exp);
        fetch(`${url}trailers/`, {
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
                    return dispatch({ type: ERROR_ADDING_TRAILER, payload: res });
                } else if (maintenance != null) {
                    for (let i = 0; i < maintenance.length; i++) {
                        error = false;
                        const uploadData = new FormData();
                        uploadData.append('maintenance', maintenance[i]);
                        uploadData.append('trailer', res.id);
                        fetch(`${url}trailers_maintenance/`, {
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
                                    return dispatch({ type: ERROR_ADDING_TRAILER, payload: res });
                                }
                            });
                    }
                }
                return dispatch({
                    type: ADD_TRAILER,
                    payload: res
                });
            });
    };
}

export function editTrailer(trailer, id) {
    return function (dispatch) {
        dispatch({
            type: LOADING_TRAILERS
        });
        let error = false;
        const uploadData = new FormData();
        uploadData.append('number', trailer.number);
        uploadData.append('year', trailer.year);
        uploadData.append('brand', trailer.brand);
        uploadData.append('vin_number', trailer.vin_number);
        uploadData.append('typ', trailer.typ);
        uploadData.append('length', trailer.length);
        if (trailer.registration != null) uploadData.append('registration', trailer.registration);
        if (trailer.annual_inspection != null) uploadData.append('annual_inspection', trailer.annual_inspection);
        uploadData.append('registration_exp', trailer.registration_exp);
        uploadData.append('annual_insp_exp', trailer.annual_insp_exp);

        fetch(`${url}trailers/${id}/`, {
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
                    return dispatch({ type: ERROR_EDiTING_TRAILER, payload: res });
                } else {
                    return dispatch({
                        type: EDIT_TRAILER,
                        payload: res
                    });
                }
            });
    };
}

export function deleteTrailer(id) {
    return function (dispatch) {
        dispatch({
            type: LOADING_TRAILERS
        });
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Token ${localStorage.getItem('token')}`
            }
        };
        axios
            .delete(`${url}trailers/${id}/`, config)
            .then((res) => {
                return dispatch({
                    type: DELETE_TRAILER,
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

export function addMaintenance(maintenance, id) {
    return function (dispatch) {
        dispatch({
            type: LOADING_TRAILER_MAINTENANCES
        });
        let error = false;
        const uploadData = new FormData();
        uploadData.append('maintenance', maintenance);
        uploadData.append('trailer', id);
        fetch(`${url}trailers_maintenance/`, {
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
                    return dispatch({ type: ERROR_EDiTING_TRAILER, payload: res });
                } else {
                    dispatch({
                        type: ADD_TRAILER_MAINTENANCE,
                        payload: res
                    });
                }
            });
    };
}

export function loadMaintenances(id) {
    return function (dispatch) {
        dispatch({
            type: LOADING_TRAILER_MAINTENANCES
        });
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Token ${localStorage.getItem('token')}`
            }
        };
        axios
            .get(`${url}trailers_maintenance/${id}?id=${id}`, config)
            .then((maintenances) => {
                return dispatch({
                    type: LOAD_TRAILER_MAINTENANCES,
                    payload: maintenances.data
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
export function deleteMaintenance(id) {
    return function (dispatch) {
        dispatch({
            type: LOADING_TRAILER_MAINTENANCES
        });
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Token ${localStorage.getItem('token')}`
            }
        };
        axios
            .delete(`${url}trailers_maintenance/${id}/`, config)
            .then((res) => {
                return dispatch({
                    type: DELETE_TRAILER_MAINTENANCE,
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
