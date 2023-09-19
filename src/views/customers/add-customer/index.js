import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { FormControl, FormLabel, Grid, TextField, Select, MenuItem, Button } from '@mui/material';
// project imports
import MainCard from 'ui-component/cards/MainCard';
import { stateList } from 'extras/stateList';
import { addCustomer, resetErrors } from 'store/actions/customers';
import { useSnackbar } from 'notistack';
import { CLEAN_MODIFIED, RESET_ERRORS } from 'store/actions/types/types_customers';
// ==============================|| CREATE TRUCK ||============================== //

/* initial form values */
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

const AddCustomers = () => {
    //Consts
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const dispatch = useDispatch();

    //States
    const [values, setValues] = useState(initalFValues);
    const [errors, setErrors] = useState(initalFValues);

    //Selectors
    const errorsSelect = useSelector((state) => state.customers.addErrors);
    const added = useSelector((state) => state.customers.modified);

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

        dispatch(addCustomer(values));
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

    //Effects
    useEffect(() => {
        dispatch({ type: RESET_ERRORS });
    }, []);
    useEffect(() => {
        if (added) {
            enqueueSnackbar('Added Customer', { variant: 'success' });
            dispatch({
                type: CLEAN_MODIFIED
            });
        }
    }, [added]);
    useEffect(() => {
        if (errorsSelect !== null) setErrors(errorsSelect);
        else setErrors(initalFValues);
    }, [errorsSelect]);

    return (
        <MainCard title="Add Customer">
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
                        <FormControl fullWidth required variant="outlined">
                            <FormLabel>Terms</FormLabel>
                            <Select
                                name="terms"
                                value={values.terms}
                                error={Boolean(errors.terms)}
                                onChange={handleInputChange}
                                label="Terms"
                            >
                                <MenuItem value="Factoring">Factoring</MenuItem>
                                <MenuItem value="Net15">Net15</MenuItem>
                                <MenuItem value="Net30">Net30</MenuItem>
                                <MenuItem value="Net45">Net45</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={2} />
                    <Grid item xs={12} sm={5} mb={2}>
                        <FormControl fullWidth required variant="outlined">
                            <FormLabel>State</FormLabel>
                            <Select
                                name="state"
                                value={values.state}
                                error={Boolean(errors.state)}
                                onChange={handleInputChange}
                                label="License State"
                            >
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
                    <Grid item display="flex" justifyContent="center" mt={3} xs={12}>
                        <Button type="submit" variant="contained" onClick={handleSubmit} color="primary" size="large">
                            Submit
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
        </MainCard>
    );
};

export default AddCustomers;
