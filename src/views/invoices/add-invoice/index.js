import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { FormControl, FormLabel, Grid, TextField, Select, MenuItem, Button } from '@mui/material';
// project imports
import MainCard from 'ui-component/cards/MainCard';
import { stateList } from 'extras/stateList';
import { addInvoice, resetErrors } from 'store/actions/invoices';
import { useSnackbar } from 'notistack';
import { CLEAN_MODIFIED_INVOICES, RESET_ERRORS_INVOICES } from 'store/actions/types/types_invoices';
import { loadCustomers } from 'store/actions/customers';
import { loadLoads } from 'store/actions/loads';
import { convertToDefEventPara, formatDate } from 'extras/functions';

import { useNavigate, useParams } from 'react-router';
// ==============================|| CREATE TRUCK ||============================== //

/* initial form values */
const initalFValues = {
    service_date: '',
    notes: '',
    customer: '',
    load: ''
};

const AddInvoice = () => {
    //Consts
    const { enqueueSnackbar } = useSnackbar();
    const dispatch = useDispatch();
    let { id } = useParams();
    const navigate = useNavigate();

    //Selectors
    const errorsSelect = useSelector((state) => state.invoices.addErrors);
    const added = useSelector((state) => state.invoices.modified);
    const customers = useSelector((state) => state.customers.list);
    const loadingCustomers = useSelector((state) => state.customers.loading);
    const loads = useSelector((state) => state.loads.loads_invoices);
    const loadingLoads = useSelector((state) => state.loads.loading);
    const idInvoice = useSelector((state) => state.invoices.id);

    //States
    const [values, setValues] = useState(initalFValues);
    const [errors, setErrors] = useState(initalFValues);
    const [listCustomers, setListCustomers] = useState(customers);
    const [listLoads, setListLoads] = useState(loads);
    const [load, setLoad] = useState();

    //Handlers
    const handleSubmit = (e) => {
        e.preventDefault();
        if (values.load === '') {
            setErrors({ ...errors, load: 'This Field is Required' });
            return;
        }
        if (values.customer === '') {
            setErrors({ ...errors, customer: 'This Field is Required' });
            return;
        }
        if (values.service_date === '') {
            setErrors({ ...errors, service_date: 'This Field is Required' });
            return;
        }
        if (values.notes === '') {
            setErrors({ ...errors, notes: 'This Field is Required' });
            return;
        }
        dispatch(addInvoice(values, load));
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
        if (name === 'load') {
            for (let i = 0; i < loads.length; i++) {
                if (loads[i].id == value) {
                    setLoad(loads[i]);
                }
            }
        }
    };

    //Effects
    useEffect(() => {
        dispatch({ type: RESET_ERRORS_INVOICES });
        dispatch(loadCustomers());
        dispatch(loadLoads());
    }, []);
    useEffect(() => {
        setListCustomers(customers);
    }, [loadingCustomers]);
    useEffect(() => {
        if (!loadingLoads && loads !== null) {
            setListLoads(loads);
            if (id) {
                for (let i = 0; i < loads.length; i++) {
                    if (loads[i].id == id) {
                        setValues({ ...values, load: loads[i].id });
                        setLoad(loads[i]);
                    }
                }
            }
        }
    }, [loadingLoads]);
    useEffect(() => {
        if (added) {
            enqueueSnackbar('Added Invoice', { variant: 'success' });
            dispatch({
                type: CLEAN_MODIFIED_INVOICES
            });
            if (idInvoice !== null) navigate(`/invoice/${idInvoice}`);
        }
    }, [added]);
    useEffect(() => {
        if (errorsSelect !== null) {
            setErrors(errorsSelect);
            if (errorsSelect.load) enqueueSnackbar(`Load: ${errorsSelect.load}`, { variant: 'error' });
        } else setErrors(initalFValues);
    }, [errorsSelect]);

    return (
        <MainCard title="Add Invoice">
            <Grid container display="flex" justifyContent="center">
                <Grid container item xs={12} md={6}>
                    <Grid item xs={12} sm={5} mb={2}>
                        <FormControl fullWidth required variant="outlined">
                            <FormLabel>Load Number</FormLabel>
                            {id ? (
                                <Select
                                    error={Boolean(errors.load)}
                                    name="load"
                                    disabled
                                    value={values.load}
                                    onChange={handleInputChange}
                                    label="Load Number"
                                >
                                    {listLoads.map((item) => (
                                        <MenuItem key={item.id} value={item.id}>
                                            {item.load_number}
                                        </MenuItem>
                                    ))}
                                </Select>
                            ) : (
                                <Select
                                    error={Boolean(errors.load)}
                                    name="load"
                                    value={values.load}
                                    onChange={handleInputChange}
                                    label="Load Number"
                                >
                                    {listLoads.map((item) => (
                                        <MenuItem key={item.id} value={item.id}>
                                            {item.load_number}
                                        </MenuItem>
                                    ))}
                                </Select>
                            )}
                        </FormControl>
                    </Grid>
                    <Grid item xs={2} />
                    <Grid item xs={12} sm={5} mb={2}>
                        <FormControl fullWidth required variant="outlined">
                            <FormLabel>Customer's Name</FormLabel>
                            <Select
                                error={Boolean(errors.customer)}
                                name="customer"
                                value={values.customer}
                                onChange={handleInputChange}
                                label="Customer's Name"
                            >
                                {listCustomers.map((item) => (
                                    <MenuItem key={item.id} value={item.id}>
                                        {item.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item display="flex" justifyContent="center" mb={2} xs={12}>
                        <TextField
                            error={Boolean(errors.service_date)}
                            helperText={errors.service_date ? errors.service_date : ''}
                            name="service_date"
                            fullWidth
                            required
                            type="date"
                            label="Service Date"
                            value={values.service_date}
                            InputLabelProps={{ shrink: true, required: true }}
                            onChange={handleInputChange}
                        />
                    </Grid>

                    <Grid item xs={12} mb={2}>
                        <TextField
                            fullWidth
                            required
                            multiline
                            variant="outlined"
                            label="Notes"
                            name="notes"
                            value={values.notes}
                            onChange={handleInputChange}
                            error={Boolean(errors.notes)}
                            helperText={errors.notes ? errors.notes : ''}
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

export default AddInvoice;
