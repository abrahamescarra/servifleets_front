import {
    ADD_DRIVER,
    DELETE_DRIVER,
    EDIT_DRIVER,
    ADD_RANDOM_TEST,
    DELETE_RANDOM_TEST,
    LOADING_RANDOM_TESTS,
    LOAD_RANDOM_TESTS,
    GET_DRIVER,
    LOADING_DRIVERS,
    LOAD_DRIVERS,
    ERROR_ADDING_DRIVER,
    ERROR_EDiTING_DRIVER
} from './types/types_drivers';
import { UNAUTHORIZED } from './types/types_auth';
import axios from 'axios';
const url = 'https://api.servifleets.com/api/';

export function loadDrivers() {
    return function (dispatch) {
        dispatch({
            type: LOADING_DRIVERS
        });
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Token ${localStorage.getItem('token')}`
            }
        };
        axios
            .get(`${url}drivers`, config)
            .then((res) => {
                return dispatch({
                    type: LOAD_DRIVERS,
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

export function getDriver(id) {
    return function (dispatch) {
        dispatch({
            type: LOADING_DRIVERS
        });
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Token ${localStorage.getItem('token')}`
            }
        };
        axios
            .get(`${url}drivers/${id}/`, config)
            .then((res) => {
                return dispatch({
                    type: GET_DRIVER,
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

export function addDriver(driver, tests) {
    return function (dispatch) {
        dispatch({
            type: LOADING_DRIVERS
        });
        let error = false;
        const uploadData = new FormData();
        uploadData.append('full_name', driver.full_name);
        uploadData.append('license_number', driver.license_number);
        uploadData.append('license_state', driver.license_state);
        uploadData.append('city', driver.city);
        uploadData.append('social_sec', driver.social_sec);
        uploadData.append('address', driver.address);
        uploadData.append('state', driver.state);
        uploadData.append('zip_code', driver.zip_code);
        uploadData.append('legal_status', driver.legal_status);
        uploadData.append('license_exp', driver.license_exp);
        uploadData.append('medcard_exp', driver.medcard_exp);
        uploadData.append('hired_date', driver.hired_date);
        uploadData.append('truck', driver.truck);
        uploadData.append('house_driver', driver.house_driver);
        if (driver.proof_cit != null) uploadData.append('proof_cit', driver.proof_cit);
        if (driver.void_check != null) uploadData.append('void_check', driver.void_check);
        if (driver.mvr != null) uploadData.append('mvr', driver.mvr);
        if (driver.pre_employment != null) uploadData.append('pre_employment', driver.pre_employment);
        if (driver.insuranse_app != null) uploadData.append('insuranse_app', driver.insuranse_app);
        if (driver.medcard != null) uploadData.append('medcard', driver.medcard);
        if (driver.license_file != null) uploadData.append('license_file', driver.license_file);
        if (driver.application != null) uploadData.append('application', driver.application);
        if (driver.w9 != null) uploadData.append('w9', driver.w9);
        if (driver.lic_agreement != null) uploadData.append('lic_agreement', driver.lic_agreement);
        if (driver.ifta != null) uploadData.append('ifta', driver.ifta);
        fetch(`${url}drivers/`, {
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
                    return dispatch({ type: ERROR_ADDING_DRIVER, payload: res });
                } else {
                    if (tests != null)
                        for (let i = 0; i < tests.length; i++) {
                            error = false;
                            const uploadData = new FormData();
                            uploadData.append('test', tests[i]);
                            uploadData.append('driver', res.id);
                            fetch(`${url}random_tests/`, {
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
                                        return dispatch({ type: ERROR_ADDING_DRIVER, payload: res });
                                    }
                                });
                        }
                    return dispatch({
                        type: ADD_DRIVER,
                        payload: res
                    });
                }
            });
    };
}

export function editDriver(driver, id) {
    return function (dispatch) {
        dispatch({
            type: LOADING_DRIVERS
        });
        let error = false;
        const uploadData = new FormData();
        uploadData.append('full_name', driver.full_name);
        uploadData.append('license_number', driver.license_number);
        uploadData.append('license_state', driver.license_state);
        uploadData.append('city', driver.city);
        uploadData.append('social_sec', driver.social_sec);
        uploadData.append('address', driver.address);
        uploadData.append('state', driver.state);
        uploadData.append('zip_code', driver.zip_code);
        uploadData.append('legal_status', driver.legal_status);
        uploadData.append('license_exp', driver.license_exp);
        uploadData.append('medcard_exp', driver.medcard_exp);
        uploadData.append('hired_date', driver.hired_date);
        uploadData.append('truck', driver.truck);
        uploadData.append('house_driver', driver.house_driver);
        if (driver.proof_cit != null) uploadData.append('proof_cit', driver.proof_cit);
        if (driver.void_check != null) uploadData.append('void_check', driver.void_check);
        if (driver.mvr != null) uploadData.append('mvr', driver.mvr);
        if (driver.pre_employment != null) uploadData.append('pre_employment', driver.pre_employment);
        if (driver.insuranse_app != null) uploadData.append('insuranse_app', driver.insuranse_app);
        if (driver.medcard != null) uploadData.append('medcard', driver.medcard);
        if (driver.license_file != null) uploadData.append('license_file', driver.license_file);
        if (driver.application != null) uploadData.append('application', driver.application);
        if (driver.w9 != null) uploadData.append('w9', driver.w9);
        if (driver.lic_agreement != null) uploadData.append('lic_agreement', driver.lic_agreement);
        if (driver.ifta != null) uploadData.append('ifta', driver.ifta);
        fetch(`${url}drivers/${id}/`, {
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
                    return dispatch({ type: ERROR_EDiTING_DRIVER, payload: res });
                } else {
                    return dispatch({
                        type: EDIT_DRIVER,
                        payload: res
                    });
                }
            });
    };
}

export function deleteDriver(id) {
    return function (dispatch) {
        dispatch({
            type: LOADING_DRIVERS
        });
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Token ${localStorage.getItem('token')}`
            }
        };
        axios
            .delete(`${url}drivers/${id}/`, config)
            .then((res) => {
                return dispatch({
                    type: DELETE_DRIVER,
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

export function addRandomTest(random_test, id) {
    return function (dispatch) {
        dispatch({
            type: LOADING_RANDOM_TESTS
        });
        let error = false;
        const uploadData = new FormData();
        uploadData.append('test', random_test);
        uploadData.append('driver', id);
        fetch(`${url}random_tests/`, {
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
                    return dispatch({ type: ERROR_EDiTING_DRIVER, payload: res });
                } else {
                    dispatch({
                        type: ADD_RANDOM_TEST,
                        payload: res
                    });
                }
            });
    };
}

export function loadRandomTests(id) {
    return function (dispatch) {
        dispatch({
            type: LOADING_RANDOM_TESTS
        });
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Token ${localStorage.getItem('token')}`
            }
        };
        axios
            .get(`${url}random_tests/${id}?id=${id}`, config)
            .then((random_tests) => {
                return dispatch({
                    type: LOAD_RANDOM_TESTS,
                    payload: random_tests.data
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
export function deleteRandomTest(id) {
    return function (dispatch) {
        dispatch({
            type: LOADING_RANDOM_TESTS
        });
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Token ${localStorage.getItem('token')}`
            }
        };
        axios
            .delete(`${url}random_tests/${id}/`, config)
            .then((res) => {
                return dispatch({
                    type: DELETE_RANDOM_TEST,
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
