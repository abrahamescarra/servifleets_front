import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Grid, TextField, Button } from '@mui/material';
// project imports
import MainCard from 'ui-component/cards/MainCard';
import { editFactoring, getFactoring, setFactoring } from 'store/actions/factoring';
import { useSnackbar } from 'notistack';
import { CLEAN_MODIFIED, RESET_ERRORS } from 'store/actions/types/types_factoring';
import factoring from 'store/reducers/factoringReducer';
// ==============================|| CREATE TRUCK ||============================== //

/* initial form values */
const initalFValues = {
    name: '',
    address: '',
    pay_to: '',
    phone: '',
    email: ''
};

const Factoring = () => {
    //Consts
    const { enqueueSnackbar } = useSnackbar();
    const dispatch = useDispatch();

    //Selectors
    const errorsSelect = useSelector((state) => state.factoring.editErrors);
    const edited = useSelector((state) => state.factoring.modified);
    const factoring = useSelector((state) => state.factoring.factoring);
    const loading = useSelector((state) => state.factoring.loading);

    //States
    const [values, setValues] = useState(initalFValues);
    const [errors, setErrors] = useState(initalFValues);

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
        if (values.pay_to === '') {
            setErrors({ ...errors, pay_to: 'This Field is Required' });
            return;
        }
        if (values.address === '') {
            setErrors({ ...errors, address: 'This Field is Required' });
            return;
        }
        if (values.email === '') {
            setErrors({ ...errors, email: 'This Field is Required' });
            return;
        }

        dispatch(setFactoring(values, factoring.id));
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
        dispatch(getFactoring());
        dispatch({ type: RESET_ERRORS });
    }, []);
    useEffect(() => {
        if (edited) {
            enqueueSnackbar('Edited Factoring Information', { variant: 'success' });
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
        if (loading === false && factoring)
            setValues({
                name: factoring.name === 'Empty' ? '' : factoring.name,
                address: factoring.address === 'Empty' ? '' : factoring.address,
                phone: factoring.phone === 'Empty' ? '' : factoring.phone,
                pay_to: factoring.pay_to === 'Empty' ? '' : factoring.pay_to,
                email: factoring.email === 'Empty' ? '' : factoring.email
            });
    }, [loading]);

    return (
        <MainCard title="Manage Factoring Information">
            <Grid container display="flex" justifyContent="center">
                <Grid container item xs={12} md={6}>
                    <Grid item xs={12} mb={2}>
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
                    <Grid item xs={12} mb={2}>
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
                    <Grid item xs={12} mb={2}>
                        <TextField
                            fullWidth
                            required
                            variant="outlined"
                            label="Pay To"
                            name="pay_to"
                            value={values.pay_to}
                            onChange={handleInputChange}
                            error={Boolean(errors.pay_to)}
                            helperText={errors.pay_to ? errors.pay_to : ''}
                        />
                    </Grid>
                    <Grid item xs={12} mb={2}>
                        <TextField
                            required
                            fullWidth
                            type="email"
                            variant="outlined"
                            label="Email"
                            name="email"
                            value={values.email}
                            onChange={handleInputChange}
                            error={Boolean(errors.email)}
                            helperText={errors.email ? errors.email : ''}
                        />
                    </Grid>
                    <Grid item xs={12} mb={2}>
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

export default Factoring;
