import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// material-ui
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';

import { Grid, TextField, Button, Fab } from '@mui/material';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import { convertToDefEventPara, formatDate } from 'extras/functions';
import { addTrailer } from 'store/actions/trailers';
import { useSnackbar } from 'notistack';
import { CLEAN_MODIFIED, RESET_ERRORS } from 'store/actions/types/types_trailers';

// ==============================|| CREATE TRUCK ||============================== //

/* initial form values */
const initalFValues = {
    number: '',
    year: '',
    brand: '',
    vin_number: '',
    typ: '',
    length: '',
    registration_exp: '',
    annual_insp_exp: '',
    registration: { name: ' ' },
    annual_inspection: { name: ' ' },
    maintenance: []
};

const AddTrailers = () => {
    //Consts
    const { enqueueSnackbar } = useSnackbar();
    const dispatch = useDispatch();

    //Selectors
    const added = useSelector((state) => state.trailers.modified);
    const errorsSelect = useSelector((state) => state.trailers.addErrors);

    //States
    const [values, setValues] = useState(initalFValues);
    const [errors, setErrors] = useState({ ...initalFValues, registration: '', annual_inspection: '' });

    //Handlers
    const handleSubmit = (e) => {
        e.preventDefault();
        if (values.number === '') {
            setErrors({ ...errors, number: 'This Field is Required' });
            return;
        }
        if (values.year === null || values.year === '') {
            setErrors({ ...errors, year: 'This Field is Required' });
            return;
        }

        if (values.vin_number === '') {
            setErrors({ ...errors, vin_number: 'This Field is Required' });
            return;
        }
        if (values.brand === '') {
            setErrors({ ...errors, brand: 'This Field is Required' });
            return;
        }
        if (values.typ === '') {
            setErrors({ ...errors, typ: 'This Field is Required' });
            return;
        }
        if (values.length === '') {
            setErrors({ ...errors, length: 'This Field is Required' });
            return;
        }
        if (values.annual_insp_exp === null || values.annual_insp_exp === '') {
            setErrors({ ...errors, annual_insp_exp: 'This Field is Required' });
            return;
        }
        if (values.registration_exp === null || values.registration_exp === '') {
            setErrors({ ...errors, registration_exp: 'This Field is Required' });
            return;
        }
        let regist_exp;
        let ann_inspect;
        let maint;
        values.registration.name === ' ' ? (regist_exp = null) : (regist_exp = values.registration);
        values.annual_inspection.name === ' ' ? (ann_inspect = null) : (ann_inspect = values.annual_inspection);
        values.maintenance.length === 0 ? (maint = null) : (maint = values.maintenance);

        const trailer = {
            number: values.number,
            year: values.year,
            brand: values.brand,
            vin_number: values.vin_number,
            typ: values.typ,
            length: values.length,
            registration: regist_exp,
            annual_inspection: ann_inspect,
            registration_exp: formatDate(values.registration_exp),
            annual_insp_exp: formatDate(values.annual_insp_exp)
        };
        dispatch(addTrailer(trailer, maint));
    };
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (e.target.name === 'maintenance') {
            setValues({
                ...values,
                [name]: e.target.files
            });
        } else {
            e.target.files
                ? setValues({
                      ...values,
                      [name]: e.target.files[0]
                  })
                : setValues({
                      ...values,
                      [name]: value
                  });
        }
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
            enqueueSnackbar('Added Trailer', { variant: 'success' });
            dispatch({
                type: CLEAN_MODIFIED
            });
        }
    }, [added]);
    useEffect(() => {
        if (errorsSelect !== null) {
            setErrors(errorsSelect);
            if (errorsSelect.maintenance) {
                enqueueSnackbar(errorsSelect.maintenance, { variant: 'error' });
            }
        } else setErrors({ ...initalFValues, registration: '', annual_inspection: '', maintenance: '' });
    }, [errorsSelect]);

    return (
        <MainCard title="Add Trailer">
            <Grid container display="flex" justifyContent="center">
                <Grid container item xs={12} md={6}>
                    <Grid item xs={12} sm={5} mb={2}>
                        <TextField
                            fullWidth
                            required
                            variant="outlined"
                            label="Number"
                            name="number"
                            value={values.number}
                            onChange={handleInputChange}
                            error={Boolean(errors.number)}
                            helperText={errors.number ? errors.number : ''}
                        />
                    </Grid>
                    <Grid item xs={2} />
                    <Grid item xs={12} sm={5} mb={2}>
                        <TextField
                            required
                            fullWidth
                            inputProps={{
                                maxLength: 4
                            }}
                            variant="outlined"
                            label="Year"
                            name="year"
                            value={values.year}
                            onChange={handleInputChange}
                            error={Boolean(errors.year)}
                            helperText={errors.year ? errors.year : ''}
                        />
                    </Grid>
                    <Grid item xs={12} sm={5} mb={2}>
                        <TextField
                            required
                            fullWidth
                            variant="outlined"
                            label="VIN Number"
                            name="vin_number"
                            value={values.vin_number}
                            onChange={handleInputChange}
                            error={Boolean(errors.vin_number)}
                            helperText={errors.vin_number ? errors.vin_number : ''}
                        />
                    </Grid>
                    <Grid item xs={2} />
                    <Grid item xs={12} sm={5} mb={2}>
                        <TextField
                            fullWidth
                            required
                            variant="outlined"
                            label="Brand"
                            name="brand"
                            value={values.brand}
                            onChange={handleInputChange}
                            error={Boolean(errors.brand)}
                            helperText={errors.brand ? errors.brand : ''}
                        />
                    </Grid>
                    <Grid item xs={12} sm={5} mb={2}>
                        <TextField
                            required
                            fullWidth
                            variant="outlined"
                            label="Type"
                            name="typ"
                            value={values.typ}
                            onChange={handleInputChange}
                            error={Boolean(errors.typ)}
                            helperText={errors.typ ? errors.typ : ''}
                        />
                    </Grid>
                    <Grid item xs={2} />
                    <Grid item xs={12} sm={5} mb={2}>
                        <TextField
                            fullWidth
                            required
                            variant="outlined"
                            label="Length"
                            name="length"
                            value={values.length}
                            onChange={handleInputChange}
                            error={Boolean(errors.length)}
                            helperText={errors.length ? errors.length : ''}
                        />
                    </Grid>
                    <Grid item xs={12} sm={5} mb={2}>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DatePicker
                                label="Annual Inspection Expiration"
                                value={values.annual_insp_exp}
                                inputFormat="dd/MM/yyyy"
                                onChange={(date) => handleInputChange(convertToDefEventPara('annual_insp_exp', date))}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        error={Boolean(errors.annual_insp_exp)}
                                        name="annual_insp_exp"
                                        helperText={errors.annual_insp_exp ? errors.annual_insp_exp : ''}
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
                                label="Registration Expiration"
                                value={values.registration_exp}
                                inputFormat="dd/MM/yyyy"
                                onChange={(date) => handleInputChange(convertToDefEventPara('registration_exp', date))}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        error={Boolean(errors.registration_exp)}
                                        name="registration_exp"
                                        helperText={errors.registration_exp ? errors.registration_exp : ''}
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
                            label="Registration"
                            name="registration"
                            disabled
                            error={Boolean(errors.registration)}
                            helperText={errors.registration ? errors.registration : ''}
                            value={values.registration ? values.registration.name : ''}
                        />
                    </Grid>
                    <Grid item container xs={1} sm={1} mb={2} align="center" justifyContent="center" direction="column">
                        <Grid item>
                            <label htmlFor="registration">
                                <input
                                    onChange={handleInputChange}
                                    style={{ display: 'none' }}
                                    id="registration"
                                    name="registration"
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
                            label="Annual Inspection"
                            name="annual_inspection"
                            disabled
                            error={Boolean(errors.annual_inspection)}
                            helperText={errors.annual_inspection ? errors.annual_inspection : ''}
                            value={values.annual_inspection ? values.annual_inspection.name : ''}
                        />
                    </Grid>
                    <Grid item container xs={1} sm={1} mb={2} align="center" justifyContent="center" direction="column">
                        <Grid item>
                            <label htmlFor="annual_inspection">
                                <input
                                    onChange={handleInputChange}
                                    style={{ display: 'none' }}
                                    id="annual_inspection"
                                    name="annual_inspection"
                                    type="file"
                                />
                                <Fab color="primary" size="small" component="span" aria-label="add">
                                    <AddOutlinedIcon />
                                </Fab>
                            </label>
                        </Grid>
                    </Grid>
                    <Grid item xs={11} mb={2}>
                        <TextField
                            fullWidth
                            variant="outlined"
                            label="Maintenance"
                            name="maintenance"
                            disabled
                            error={Boolean(errors.maintenance)}
                            helperText={errors.maintenance ? errors.maintenance : ''}
                            value={
                                values.maintenance
                                    ? `${values.maintenance.length} files selected`
                                    : `${values.maintenance.length} files selected`
                            }
                        />
                    </Grid>
                    <Grid item container xs={1} sm={1} mb={2} align="center" justifyContent="center" direction="column">
                        <Grid item>
                            <label htmlFor="maintenance">
                                <input
                                    onChange={handleInputChange}
                                    style={{ display: 'none' }}
                                    id="maintenance"
                                    name="maintenance"
                                    type="file"
                                    multiple
                                />
                                <Fab color="primary" size="small" component="span" aria-label="add">
                                    <AddOutlinedIcon />
                                </Fab>
                            </label>
                        </Grid>
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

export default AddTrailers;
