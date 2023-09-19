import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { FormControl, FormLabel, Grid, TextField, Select, MenuItem, Button } from '@mui/material';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import { stateList } from 'extras/stateList';
import { editCustomer, getCustomer, resetErrors } from 'store/actions/customers';
import { useNavigate, useParams } from 'react-router';
import { CLEAN_MODIFIED, RESET_ERRORS } from 'store/actions/types/types_customers';
import { useSnackbar } from 'notistack';

// ==============================|| CREATE TRUCK ||============================== //

/* initial form values */

const EditCustomer = () => {
    //Consts
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const navigate = useNavigate();
    let { id } = useParams();
    const initalFValues = {
        name: '',
        address: '',
        city: '',
        state: '',
        zip_code: '',
        phone: '',
        email: '',
        terms: ''
    };
    const dispatch = useDispatch();

    //Selectors
    const customer = useSelector((state) => state.customers.customer);
    const loading = useSelector((state) => state.customers.loading);
    const edited = useSelector((state) => state.customers.modified);
    const errorsSelect = useSelector((state) => state.customers.editErrors);

    //States
    const [values, setValues] = useState(initalFValues);
    const [errors, setErrors] = useState(initalFValues);

    //Effects
    useEffect(() => {
        dispatch({ type: RESET_ERRORS });
        dispatch(getCustomer(id));
    }, []);
    useEffect(() => {
        if (edited) {
            enqueueSnackbar('Modified Customer', { variant: 'success' });
            dispatch({
                type: CLEAN_MODIFIED
            });
        }
    }, [edited]);
    useEffect(() => {
        if (errorsSelect !== null) setErrors(errorsSelect);
        else setErrors(initalFValues);
    }, [errorsSelect]);
    useEffect(() => {
        if (loading === false && customer !== null)
            setValues({
                name: customer.name,
                address: customer.address,
                city: customer.city,
                state: customer.state,
                zip_code: customer.zip_code,
                phone: customer.phone,
                email: customer.email,
                terms: customer.terms
            });
    }, [loading]);

    //Handlers
    const handleSubmit = (e) => {
        e.preventDefault();
        if (values.name === '') {
            setErrors({ ...errors, name: 'This Field is Required' });
            return;
        }
        if (values.phone === '') {
            setErrors({ ...errors, phone: 'This Field is Required' });
            return;
        }
        if (values.city === '') {
            setErrors({ ...errors, city: 'This Field is Required' });
            return;
        }
        if (values.email === '') {
            setErrors({ ...errors, email: 'This Field is Required' });
            return;
        }
        if (values.terms === '') {
            setErrors({ ...errors, terms: 'This Field is Required' });
            return;
        }
        if (values.state === '') {
            setErrors({ ...errors, state: 'This Field is Required' });
            return;
        }
        if (values.address === '') {
            setErrors({ ...errors, address: 'This Field is Required' });
            return;
        }

        if (values.zip_code === '') {
            setErrors({ ...errors, zip_code: 'This Field is Required' });
            return;
        }
        dispatch(editCustomer(values, customer.id));
    };
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setValues({
            ...values,
            [name]: value
        });
        setErrors({
            ...errors,
            [name]: ''
        });
    };

    return (
        <MainCard title="Edit Customer">
            <Grid container display="flex" justifyContent="center">
                <Grid container item xs={12} md={6}>
                    <Grid item xs={12} sm={5} mb={2}>
                        <TextField
                            fullWidth
                            required
                            variant="outlined"
                            label="Name"
                            name="name"
                            value={values.name}
                            onChange={handleInputChange}
                            error={Boolean(errors.name)}
                            helperText={errors.name ? errors.name : ''}
                        />
                    </Grid>
                    <Grid item xs={2} />
                    <Grid item xs={12} sm={5} mb={2}>
                        <TextField
                            required
                            fullWidth
                            variant="outlined"
                            label="Phone"
                            name="phone"
                            value={values.phone}
                            onChange={handleInputChange}
                            error={Boolean(errors.phone)}
                            helperText={errors.phone ? errors.phone : ''}
                        />
                    </Grid>
                    <Grid item xs={12} sm={5} mb={2}>
                        <TextField
                            fullWidth
                            required
                            variant="outlined"
                            label="City"
                            name="city"
                            value={values.city}
                            onChange={handleInputChange}
                            error={Boolean(errors.city)}
                            helperText={errors.city ? errors.city : ''}
                        />
                    </Grid>
                    <Grid item xs={2} />
                    <Grid item xs={12} sm={5} mb={2}>
                        <TextField
                            fullWidth
                            required
                            variant="outlined"
                            label="Email"
                            type="email"
                            name="email"
                            value={values.email}
                            onChange={handleInputChange}
                            error={Boolean(errors.email)}
                            helperText={errors.email ? errors.email : ''}
                        />
                    </Grid>
                    <Grid item xs={12} sm={5} mb={2}>
                        <FormControl fullWidth error={Boolean(errors.terms)} required variant="outlined">
                            <FormLabel>Terms</FormLabel>
                            <Select name="terms" value={values.terms} onChange={handleInputChange} label="Terms">
                                <MenuItem value="Factoring">Factoring</MenuItem>
                                <MenuItem value="Net15">Net15</MenuItem>
                                <MenuItem value="Net30">Net30</MenuItem>
                                <MenuItem value="Net45">Net45</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={2} />
                    <Grid item xs={12} sm={5} mb={2}>
                        <FormControl error={Boolean(errors.state)} fullWidth required variant="outlined">
                            <FormLabel>State</FormLabel>
                            <Select name="state" value={values.state} onChange={handleInputChange} label="License State">
                                <MenuItem value="">None</MenuItem>
                                {stateList.map((item, index) => (
                                    <MenuItem key={index} value={item}>
                                        {item}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={9} mb={2}>
                        <TextField
                            required
                            fullWidth
                            variant="outlined"
                            label="Address"
                            name="address"
                            value={values.address}
                            onChange={handleInputChange}
                            error={Boolean(errors.address)}
                            helperText={errors.address ? errors.address : ''}
                        />
                    </Grid>
                    <Grid item xs={1} />
                    <Grid item xs={12} sm={2} mb={2}>
                        <TextField
                            required
                            fullWidth
                            variant="outlined"
                            label="Zip"
                            type="number"
                            name="zip_code"
                            value={values.zip_code}
                            onChange={handleInputChange}
                            error={Boolean(errors.zip_code)}
                            helperText={errors.zip_code ? errors.zip_code : ''}
                        />
                    </Grid>
                    <Grid item display="flex" justifyContent="center" mt={3} xs={6}>
                        <Button
                            type="submit"
                            variant="contained"
                            onClick={() => {
                                navigate('/customers');
                            }}
                            color="secondary"
                            size="large"
                        >
                            Go Back
                        </Button>
                    </Grid>
                    <Grid item display="flex" justifyContent="center" mt={3} xs={6}>
                        <Button type="submit" variant="contained" onClick={handleSubmit} color="primary" size="large">
                            Submit
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
        </MainCard>
    );
};

export default EditCustomer;
