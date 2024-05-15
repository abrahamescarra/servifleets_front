import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// material-ui
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';

import { Fab, Grid, TextField, Button, FormControl, FormLabel, Select, MenuItem } from '@mui/material';

import { DatePicker, LocalizationProvider } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import { convertToDefEventPara, formatDate } from 'extras/functions';
import { addLoad } from 'store/actions/loads';
import { loadTrucks } from 'store/actions/trucks';
import { loadDrivers } from 'store/actions/drivers';
import SubCard from 'ui-component/cards/SubCard';
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
    weight: '',
    comodity: '',
    pickup_date: '',
    delivery_date: '',
    confirmation: { name: ' ' },
    bol: { name: ' ' }
};

const AddLoads = () => {
    //Consts
    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();

    //Selectors
    const added = useSelector((state) => state.loads.modified);
    const errorsSelect = useSelector((state) => state.loads.addErrors);
    const trucks = useSelector((state) => state.trucks.list);
    const loading = useSelector((state) => state.trucks.loading);
    const drivers = useSelector((state) => state.drivers.list);
    const loading2 = useSelector((state) => state.drivers.loading);

    //States
    const [values, setValues] = useState(initalFValues);
    const [list, setList] = useState(trucks);
    const [list2, setList2] = useState(drivers);
    const [errors, setErrors] = useState({ ...initalFValues, confirmation: '', bol: '' });

    //EFECTS
    useEffect(() => {
        dispatch({ type: RESET_ERRORS });
        dispatch(loadTrucks());
        dispatch(loadDrivers());
    }, []);
    useEffect(() => {
        setList(trucks);
    }, [loading]);
    useEffect(() => {
        setList2(drivers);
    }, [loading2]);
    useEffect(() => {
        if (added) {
            enqueueSnackbar('Added Load', { variant: 'success' });
            dispatch({
                type: CLEAN_MODIFIED
            });
        }
    }, [added]);
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
        let bol;
        values.confirmation.name === ' ' ? (confirmation = null) : (confirmation = values.confirmation);
        values.bol.name === ' ' ? (bol = null) : (bol = values.bol);
        let load;
        if (values.truck === 'house') {
            load = {
                ...values,
                confirmation: confirmation,
                bol: bol,
                truck: '',
                house_driver: true,
                pickup_date: formatDate(values.pickup_date),
                delivery_date: formatDate(values.delivery_date)
            };
        } else {
            load = {
                ...values,
                confirmation: confirmation,
                bol: bol,
                house_driver: false,
                pickup_date: formatDate(values.pickup_date),
                delivery_date: formatDate(values.delivery_date)
            };
        }
        dispatch(addLoad(load));
    };
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        e.target.files
            ? setValues({
                  ...values,
                  [name]: e.target.files[0]
              })
            : setValues({
                  ...values,
                  [name]: value
              });
        setErrors({
            ...errors,
            [name]: ''
        });
    };

    return (
        <MainCard title="Add Load">
            <Grid container>
                <Grid item xs={12} lg={6}>
                    <SubCard title="Data">
                        <Grid container>
                            <Grid item xs={12} sm={5} mb={2}>
                                <TextField
                                    fullWidth
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
                            <Grid item xs={12} sm={5} mb={2}>
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
                                        {list.map((item) => (
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
                                        {list2.map((item) => (
                                            <MenuItem key={item.id} value={item.id}>
                                                {item.full_name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={5} mb={2}>
                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <DatePicker
                                        label="Pickup Date"
                                        value={values.pickup_date}
                                        inputFormat="dd/MM/yyyy"
                                        onChange={(date) => handleInputChange(convertToDefEventPara('pickup_date', date))}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                error={Boolean(errors.pickup_date)}
                                                name="pickup_date"
                                                helperText={errors.pickup_date ? errors.pickup_date : ''}
                                                fullWidth
                                                required
                                            />
                                        )}
                                    />
                                </LocalizationProvider>
                            </Grid>
                            <Grid item xs={2} />
                            <Grid item xs={12} sm={5} mb={2}>
                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <DatePicker
                                        label="Delivery Date"
                                        value={values.delivery_date}
                                        inputFormat="dd/MM/yyyy"
                                        onChange={(date) => handleInputChange(convertToDefEventPara('delivery_date', date))}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                error={Boolean(errors.delivery_date)}
                                                name="delivery_date"
                                                helperText={errors.delivery_date ? errors.delivery_date : ''}
                                                fullWidth
                                                required
                                            />
                                        )}
                                    />
                                </LocalizationProvider>
                            </Grid>
                            <Grid item xs={11} sm={4} mb={2}>
                                <TextField
                                    fullWidth
                                    variant="outlined"
                                    label="Confirmation"
                                    name="confirmation"
                                    disabled
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
                                            <AddOutlinedIcon />
                                        </Fab>
                                    </label>
                                </Grid>
                            </Grid>
                            <Grid item xs={2} />
                            <Grid item xs={11} sm={4} mb={2}>
                                <TextField
                                    fullWidth
                                    variant="outlined"
                                    label="BOL"
                                    name="bol"
                                    disabled
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
                                            <AddOutlinedIcon />
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

export default AddLoads;
