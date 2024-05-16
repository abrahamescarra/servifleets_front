import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// material-ui
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';

import { Fab, Grid, TextField, Button, FormControl, FormLabel, Select, MenuItem } from '@mui/material';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import { formatDateForTextField } from 'extras/functions';
import { editLoad, getLoad, loadLoads } from 'store/actions/loads';
import { loadTrucks } from 'store/actions/trucks';
import { loadDrivers } from 'store/actions/drivers';
import SubCard from 'ui-component/cards/SubCard';
import { useParams } from 'react-router';
import { useSnackbar } from 'notistack';
import { CLEAN_MODIFIED, RESET_ERRORS } from 'store/actions/types/types_loads';
// ==============================|| CREATE TRUCK ||============================== //

/* initial form values */
const initalFValues = {
    load_number: '',
    broker_name: '',
    pickup: '',
    delivery: '',
    notes: '',
    truck: '',
    driver: '',
    driver_rate: 0,
    rate: 0,
    miles: 0,
    pickup_date: '',
    delivery_date: '',
    confirmation: { name: ' ' },
    bol: { name: ' ' },
    weight: '',
    comodity: ''
};

const ModLoad = () => {
    //Consts
    const dispatch = useDispatch();
    const { id } = useParams();
    const { enqueueSnackbar } = useSnackbar();

    //Selectors
    const edited = useSelector((state) => state.loads.modified);
    const errorsSelect = useSelector((state) => state.loads.editErrors);
    const trucks = useSelector((state) => state.trucks.list);
    const loading_trucks = useSelector((state) => state.trucks.loading);
    const drivers = useSelector((state) => state.drivers.list);
    const loading_drivers = useSelector((state) => state.drivers.loading);
    const load = useSelector((state) => state.loads.load);
    const loading = useSelector((state) => state.loads.loading);
    //States
    const [errors, setErrors] = useState({ ...initalFValues, confirmation: '', bol: '' });
    const [values, setValues] = useState(initalFValues);
    const [listTrucks, setListTrucks] = useState(trucks);
    const [listDrivers, setListDrivers] = useState(drivers);

    //EFECTS
    useEffect(() => {
        dispatch(loadTrucks());
        dispatch(loadDrivers());
        dispatch(getLoad(id));
        dispatch({ type: RESET_ERRORS });
    }, []);
    useEffect(() => {
        setListTrucks(trucks);
    }, [loading_trucks]);
    useEffect(() => {
        setListDrivers(drivers);
    }, [loading_drivers]);
    useEffect(() => {
        if (loading === false && load !== null) {
            setValues({
                ...values,
                load_number: load.load_number,
                broker_name: load.broker_name,
                pickup: load.pickup,
                delivery: load.delivery,
                notes: load.notes,
                truck: load.truck ? load.truck : 'house',
                driver: load.driver,
                driver_rate: load.driver_rate,
                rate: load.rate,
                miles: load.miles,
                pickup_date: formatDateForTextField(new Date(load.pickup_date)),
                weight: load.weight === null ? '' : load.weight,
                comodity: load.comodity === null ? '' : load.comodity,
                delivery_date: formatDateForTextField(new Date(load.delivery_date)),
                confirmation: { name: load.confirmation === null ? '' : load.confirmation },
                bol: { name: load.bol === null ? '' : load.bol }
            });
        }
    }, [loading]);
    useEffect(() => {
        if (edited) {
            enqueueSnackbar('Modified Customer', { variant: 'success' });
            dispatch({
                type: CLEAN_MODIFIED
            });
        }
    }, [edited]);
    useEffect(() => {
        if (errorsSelect !== null) {
            setErrors(errorsSelect);
            if (errorsSelect.truck) enqueueSnackbar(errorsSelect.truck, { variant: 'error' });
            if (errorsSelect.driver) enqueueSnackbar(errorsSelect.driver, { variant: 'error' });
        } else setErrors({ ...initalFValues, confirmation: '', bol: '' });
    }, [errorsSelect]);

    //Handlers
    const handleSubmit = (e) => {
        e.preventDefault();
        if (values.load_number === '') {
            setErrors({ ...errors, load_number: 'This Field is Required' });
            return;
        }
        if (values.broker_name === '') {
            setErrors({ ...errors, broker_name: 'This Field is Required' });
            return;
        }
        if (values.miles === '') {
            setErrors({ ...errors, miles: 'This Field is Required' });
            return;
        }
        if (values.driver_rate === '') {
            setErrors({ ...errors, driver_rate: 'This Field is Required' });
            return;
        }
        if (values.rate === '') {
            setErrors({ ...errors, rate: 'This Field is Required' });
            return;
        }
        if (values.pickup === '') {
            setErrors({ ...errors, pickup: 'This Field is Required' });
            return;
        }
        if (values.delivery === '') {
            setErrors({ ...errors, delivery: 'This Field is Required' });
            return;
        }
        if (values.notes === '') {
            setErrors({ ...errors, notes: 'This Field is Required' });
            return;
        }
        if (values.truck === '') {
            setErrors({ ...errors, truck: 'This Field is Required' });
            return;
        }
        if (values.driver === '') {
            setErrors({ ...errors, driver: 'This Field is Required' });
            return;
        }
        if (values.pickup_date === null || values.pickup_date === '') {
            setErrors({ ...errors, pickup_date: 'This Field is Required' });
            return;
        }
        if (values.delivery_date === null || values.delivery_date === '') {
            setErrors({ ...errors, delivery_date: 'This Field is Required' });
            return;
        }
        let confirmation;
        values.confirmation.name === '' || values.confirmation.name === load.confirmation
            ? (confirmation = null)
            : (confirmation = values.confirmation);
        let bol;
        values.bol.name === '' || values.bol.name === load.bol ? (bol = null) : (bol = values.bol);

        let loadMod;
        if (values.truck === 'house') {
            loadMod = {
                ...values,
                confirmation: confirmation,
                bol: bol,
                truck: '',
                house_driver: true,
                has_invoice: load.has_invoice
            };
        } else {
            loadMod = {
                ...values,
                confirmation: confirmation,
                bol: bol,
                house_driver: false,
                has_invoice: load.has_invoice
            };
        }
        dispatch(editLoad(loadMod, id, false));
    };
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (e.target.files) {
            if (e.target.files.length !== 0)
                setValues({
                    ...values,
                    [name]: e.target.files[0]
                });
        } else {
            setValues({
                ...values,
                [name]: value
            });
        }
        setErrors({
            ...errors,
            [name]: ''
        });
    };
    return (
        <MainCard title="Edit Load">
            <Grid container>
                <Grid item xs={12} lg={6}>
                    <SubCard title="Data">
                        <Grid container>
                            <Grid item xs={12} sm={5} mb={2}>
                                <TextField
                                    fullWidth
                                    disabled
                                    required
                                    variant="outlined"
                                    label="Load Number"
                                    name="load_number"
                                    value={values.load_number}
                                    onChange={handleInputChange}
                                    error={Boolean(errors.load_number)}
                                    helperText={errors.load_number ? errors.load_number : ''}
                                />
                            </Grid>
                            <Grid item xs={2} />
                            <Grid item xs={12} sm={5} mb={2}>
                                <TextField
                                    required
                                    fullWidth
                                    variant="outlined"
                                    label="Broker's Name"
                                    name="broker_name"
                                    value={values.broker_name}
                                    onChange={handleInputChange}
                                    error={Boolean(errors.broker_name)}
                                    helperText={errors.broker_name ? errors.broker_name : ''}
                                />
                            </Grid>
                            <Grid item xs={12} sm={5} mb={2}>
                                <TextField
                                    fullWidth
                                    variant="outlined"
                                    label="Weight"
                                    type="number"
                                    name="weight"
                                    value={values.weight}
                                    onChange={handleInputChange}
                                    error={Boolean(errors.weight)}
                                    helperText={errors.weight ? errors.weight : ''}
                                />
                            </Grid>
                            <Grid item xs={2} />
                            <Grid item xs={12} sm={5} mb={2}>
                                <TextField
                                    fullWidth
                                    variant="outlined"
                                    label="Comodity"
                                    name="comodity"
                                    value={values.comodity}
                                    onChange={handleInputChange}
                                    error={Boolean(errors.comodity)}
                                    helperText={errors.comodity ? errors.comodity : ''}
                                />
                            </Grid>

                            <Grid item xs={12} sm={5} mb={2}>
                                <TextField
                                    required
                                    fullWidth
                                    type="number"
                                    variant="outlined"
                                    label="Driver's Rate"
                                    name="driver_rate"
                                    value={values.driver_rate}
                                    onChange={handleInputChange}
                                    error={Boolean(errors.driver_rate)}
                                    helperText={errors.driver_rate ? errors.driver_rate : ''}
                                />
                            </Grid>
                            <Grid item xs={2} />
                            <Grid item xs={12} sm={4} mb={2}>
                                <TextField
                                    fullWidth
                                    required
                                    variant="outlined"
                                    label="Rate"
                                    type="number"
                                    name="rate"
                                    value={values.rate}
                                    onChange={handleInputChange}
                                    error={Boolean(errors.rate)}
                                    helperText={errors.rate ? errors.rate : ''}
                                />
                            </Grid>

                            <Grid item xs={12} sm={5} mb={2}>
                                <TextField
                                    fullWidth
                                    required
                                    variant="outlined"
                                    label="Pickup Address"
                                    name="pickup"
                                    value={values.pickup}
                                    onChange={handleInputChange}
                                    error={Boolean(errors.pickup)}
                                    helperText={errors.pickup ? errors.pickup : ''}
                                />
                            </Grid>
                            <Grid item xs={2} />
                            <Grid item xs={12} sm={5} mb={2}>
                                <TextField
                                    required
                                    fullWidth
                                    variant="outlined"
                                    label="Delivery Address"
                                    name="delivery"
                                    value={values.delivery}
                                    onChange={handleInputChange}
                                    error={Boolean(errors.delivery)}
                                    helperText={errors.delivery ? errors.delivery : ''}
                                />
                            </Grid>

                            <Grid item xs={5} mb={2}>
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
                            <Grid item xs={2} />
                            <Grid item xs={12} sm={5} mb={2}>
                                <TextField
                                    required
                                    type="number"
                                    fullWidth
                                    variant="outlined"
                                    label="Miles"
                                    name="miles"
                                    value={values.miles}
                                    onChange={handleInputChange}
                                    error={Boolean(errors.miles)}
                                    helperText={errors.miles ? errors.miles : ''}
                                />
                            </Grid>
                        </Grid>
                    </SubCard>
                </Grid>
                <Grid item xs={12} lg={6}>
                    <SubCard title="Others">
                        <Grid container>
                            <Grid item xs={12} sm={5} mb={2}>
                                <FormControl fullWidth required variant="outlined">
                                    <FormLabel>VIN Number</FormLabel>
                                    <Select
                                        error={Boolean(errors.truck)}
                                        name="truck"
                                        value={values.truck}
                                        onChange={handleInputChange}
                                        label="VIN Number"
                                    >
                                        <MenuItem value="house">House Driver</MenuItem>
                                        {listTrucks.map((item) => (
                                            <MenuItem key={item.id} value={item.id}>
                                                {item.vin_number}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={2} />
                            <Grid item xs={12} sm={5} mb={2}>
                                <FormControl fullWidth required variant="outlined">
                                    <FormLabel>Driver's Name</FormLabel>
                                    <Select
                                        error={Boolean(errors.driver)}
                                        name="driver"
                                        value={values.driver}
                                        onChange={handleInputChange}
                                        label="Driver's Name"
                                    >
                                        {listDrivers.map((item) => (
                                            <MenuItem key={item.id} value={item.id}>
                                                {item.full_name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={5} mb={2}>
                                <TextField
                                    error={Boolean(errors.pickup_date)}
                                    helperText={errors.pickup_date ? errors.pickup_date : ''}
                                    name="pickup_date"
                                    fullWidth
                                    required
                                    type="date"
                                    label="Pickup Date"
                                    value={values.pickup_date}
                                    InputLabelProps={{ shrink: true, required: true }}
                                    onChange={handleInputChange}
                                />
                            </Grid>
                            <Grid item xs={2} />
                            <Grid item xs={12} sm={5} mb={2}>
                                <TextField
                                    error={Boolean(errors.delivery_date)}
                                    helperText={errors.delivery_date ? errors.delivery_date : ''}
                                    name="delivery_date"
                                    fullWidth
                                    required
                                    type="date"
                                    label="Delivery Date"
                                    value={values.delivery_date}
                                    InputLabelProps={{ shrink: true, required: true }}
                                    onChange={handleInputChange}
                                />
                            </Grid>

                            <Grid item xs={11} sm={4} mb={2} component="a" target="_blank" href={values.confirmation.name}>
                                <TextField
                                    fullWidth
                                    variant="outlined"
                                    label="Confirmation"
                                    name="confirmation"
                                    contentEditable={false}
                                    error={Boolean(errors.confirmation)}
                                    helperText={errors.confirmation ? errors.confirmation : ''}
                                    value={values.confirmation ? values.confirmation.name : ''}
                                />
                            </Grid>
                            <Grid item container xs={1} sm={1} mb={2} align="center" justifyContent="center" direction="column">
                                <Grid item>
                                    <label htmlFor="confirmation">
                                        <input
                                            onChange={handleInputChange}
                                            style={{ display: 'none' }}
                                            id="confirmation"
                                            name="confirmation"
                                            type="file"
                                        />
                                        <Fab color="primary" size="small" component="span" aria-label="add">
                                            <EditOutlinedIcon />
                                        </Fab>
                                    </label>
                                </Grid>
                            </Grid>
                            <Grid item xs={2} />
                            <Grid item xs={11} sm={4} mb={2} component="a" target="_blank" href={values.bol.name}>
                                <TextField
                                    fullWidth
                                    variant="outlined"
                                    label="BOL"
                                    name="bol"
                                    contentEditable={false}
                                    error={Boolean(errors.bol)}
                                    helperText={errors.bol ? errors.bol : ''}
                                    value={values.bol ? values.bol.name : ''}
                                />
                            </Grid>
                            <Grid item container xs={1} sm={1} mb={2} align="center" justifyContent="center" direction="column">
                                <Grid item>
                                    <label htmlFor="bol">
                                        <input onChange={handleInputChange} style={{ display: 'none' }} id="bol" name="bol" type="file" />
                                        <Fab color="primary" size="small" component="span" aria-label="add">
                                            <EditOutlinedIcon />
                                        </Fab>
                                    </label>
                                </Grid>
                            </Grid>
                            <Grid item mt={1} ml={2} xs={12}>
                                <Button type="submit" variant="contained" onClick={handleSubmit} color="primary" size="large">
                                    Submit
                                </Button>
                            </Grid>
                        </Grid>
                    </SubCard>
                </Grid>
            </Grid>
        </MainCard>
    );
};

export default ModLoad;
