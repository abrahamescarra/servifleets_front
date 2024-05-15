import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// material-ui
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';

import {
    Fab,
    FormControl,
    FormControlLabel,
    FormLabel,
    Grid,
    Radio,
    RadioGroup,
    TextField,
    Select,
    MenuItem,
    Button,
    List,
    Dialog,
    DialogTitle,
    DialogContent,
    IconButton,
    DialogContentText,
    DialogActions,
    ListItem,
    ListItemText,
    ListItemSecondaryAction
} from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import SubCard from 'ui-component/cards/SubCard';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import { stateList } from 'extras/stateList';
import { convertToDefEventPara, formatDate } from 'extras/functions';
import { addRandomTest, deleteRandomTest, editDriver, getDriver, loadRandomTests } from 'store/actions/drivers';
import { loadTrucks } from 'store/actions/trucks';
import { useTheme } from '@emotion/react';
import { useParams } from 'react-router';
import { useSnackbar } from 'notistack';
import { CLEAN_MODIFIED, RESET_ERRORS } from 'store/actions/types/types_drivers';

// ==============================|| EDIT DRIVER ||============================== //

/* initial form values */
const initalFValues = {
    full_name: '',
    license_number: '',
    license_state: '',
    social_sec: '',
    address: '',
    city: '',
    state: '',
    zip_code: '',
    legal_status: '',
    truck: '',
    hired_date: '',
    license_exp: '',
    medcard_exp: '',
    proof_cit: { name: ' ' },
    void_check: { name: ' ' },
    mvr: { name: ' ' },
    pre_employment: { name: ' ' },
    insuranse_app: { name: ' ' },
    medcard: { name: ' ' },
    license_file: { name: ' ' },
    application: { name: ' ' },
    w9: { name: ' ' },
    lic_agreement: { name: ' ' },
    ifta: { name: ' ' },
    test: []
};

const EditDriver = () => {
    //Consts
    const theme = useTheme();
    const { id } = useParams();
    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();

    //Selectors
    const edited = useSelector((state) => state.drivers.modified);
    const errorsSelect = useSelector((state) => state.drivers.editErrors);
    const driver = useSelector((state) => state.drivers.driver);
    const loading = useSelector((state) => state.drivers.loading);
    const test = useSelector((state) => state.drivers.random_tests);
    const loading_tests = useSelector((state) => state.drivers.loading_random_tests);
    const loading_trucks = useSelector((state) => state.trucks.loading);
    const trucks = useSelector((state) => state.trucks.list);
    //States
    const [errors, setErrors] = useState({
        ...initalFValues,
        license_file: '',
        application: '',
        proof_cit: '',
        void_check: '',
        mvr: '',
        pre_employment: '',
        insuranse_app: '',
        medcard: '',
        w9: '',
        lic_agreement: '',
        ifta: '',
        test: ''
    });
    const [values, setValues] = useState(initalFValues);
    const [showFiles, setShowFiles] = useState(false);
    const [idMaint, setIdMaint] = useState();
    const [open, setOpen] = useState(false);
    const [listTrucks, setListTrucks] = useState(trucks);

    //EFECTS
    useEffect(() => {
        dispatch(loadTrucks());
        dispatch(loadRandomTests(id));
        dispatch(getDriver(id));
        dispatch({ type: RESET_ERRORS });
    }, []);

    useEffect(() => {
        if (loading === false && driver !== null) {
            let hired_date = new Date(driver.hired_date);
            hired_date.setDate(hired_date.getDate() + 1);
            let license_exp = new Date(driver.license_exp);
            license_exp.setDate(license_exp.getDate() + 1);
            let medcard_exp = new Date(driver.medcard_exp);
            medcard_exp.setDate(medcard_exp.getDate() + 1);
            setValues({
                ...values,
                full_name: driver.full_name,
                license_number: driver.license_number,
                license_state: driver.license_state,
                social_sec: driver.social_sec,
                address: driver.address,
                city: driver.city,
                state: driver.state,
                zip_code: driver.zip_code,
                legal_status: driver.legal_status,
                truck: driver.truck ? driver.truck : 'house',
                hired_date: hired_date,
                license_exp: license_exp,
                medcard_exp: medcard_exp,
                proof_cit: { name: driver.proof_cit === null ? '' : driver.proof_cit },
                void_check: { name: driver.void_check === null ? '' : driver.void_check },
                mvr: { name: driver.mvr === null ? '' : driver.mvr },
                pre_employment: { name: driver.pre_employment === null ? '' : driver.pre_employment },
                insuranse_app: { name: driver.insuranse_app === null ? '' : driver.insuranse_app },
                medcard: { name: driver.medcard === null ? '' : driver.medcard },
                license_file: { name: driver.license_file === null ? '' : driver.license_file },
                application: { name: driver.application === null ? '' : driver.application },
                w9: { name: driver.w9 === null ? '' : driver.w9 },
                lic_agreement: { name: driver.lic_agreement === null ? '' : driver.lic_agreement },
                ifta: { name: driver.ifta === null ? '' : driver.ifta }
            });
        }
    }, [loading]);
    useEffect(() => {
        if (loading_tests === false && test !== null)
            setValues({
                ...values,
                test: test
            });
    }, [loading_tests]);
    useEffect(() => {
        setListTrucks(trucks);
    }, [loading_trucks]);

    useEffect(() => {
        if (edited) {
            enqueueSnackbar('Edited Driver', { variant: 'success' });
            dispatch({
                type: CLEAN_MODIFIED
            });
        }
    }, [edited]);
    useEffect(() => {
        if (errorsSelect !== null) {
            setErrors(errorsSelect);
            if (errorsSelect.test) {
                enqueueSnackbar(errorsSelect.test, { variant: 'error' });
            }
        } else
            setErrors({
                ...initalFValues,
                license_file: '',
                application: '',
                proof_cit: '',
                void_check: '',
                mvr: '',
                pre_employment: '',
                insuranse_app: '',
                medcard: '',
                w9: '',
                lic_agreement: '',
                ifta: '',
                test: ''
            });
    }, [errorsSelect]);

    //Handlers
    const handleClickDelete = (id) => {
        setIdMaint(id);
        setOpen(true);
    };
    const handleCloseDelete = (bol) => {
        setOpen(false);
        if (bol) {
            dispatch(deleteRandomTest(idMaint));
        }
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        if (values.full_name === '') {
            setErrors({ ...errors, full_name: 'This Field is Required' });
            return;
        }
        if (values.social_sec === '') {
            setErrors({ ...errors, social_sec: 'This Field is Required' });
            return;
        }
        if (values.license_number === '') {
            setErrors({ ...errors, license_number: 'This Field is Required' });
            return;
        }
        if (values.city === '') {
            setErrors({ ...errors, city: 'This Field is Required' });
            return;
        }
        if (values.zip_code === '') {
            setErrors({ ...errors, zip_code: 'This Field is Required' });
            return;
        }
        if (values.legal_status === '') {
            setErrors({ ...errors, legal_status: 'This Field is Required' });
            return;
        }
        if (values.state === '') {
            setErrors({ ...errors, state: 'This Field is Required' });
            return;
        }
        if (values.license_state === '') {
            setErrors({ ...errors, license_state: 'This Field is Required' });
            return;
        }
        if (values.truck === '') {
            setErrors({ ...errors, truck: 'This Field is Required' });
            return;
        }
        if (values.hired_date === null || values.hired_date === '') {
            setErrors({ ...errors, hired_date: 'This Field is Required' });
            return;
        }
        if (values.license_exp === null || values.license_exp === '') {
            setErrors({ ...errors, license_exp: 'This Field is Required' });
            return;
        }
        if (values.medcard_exp === null || values.medcard_exp === '') {
            setErrors({ ...errors, medcard_exp: 'This Field is Required' });
            return;
        }
        if (values.address === '') {
            setErrors({ ...errors, address: 'This Field is Required' });
            return;
        }
        let proof_cit;
        let void_check;
        let mvr;
        let pre_employment;
        let insuranse_app;
        let medcard;
        let license_file;
        let application;
        let w9;
        let lic_agreement;
        let ifta;
        values.proof_cit.name === '' || values.proof_cit.name === driver.proof_cit ? (proof_cit = null) : (proof_cit = values.proof_cit);
        values.void_check.name === '' || values.void_check.name === driver.void_check
            ? (void_check = null)
            : (void_check = values.void_check);
        values.mvr.name === '' || values.mvr.name === driver.mvr ? (mvr = null) : (mvr = values.mvr);
        values.pre_employment.name === '' || values.pre_employment.name === driver.pre_employment
            ? (pre_employment = null)
            : (pre_employment = values.pre_employment);
        values.insuranse_app.name === '' || values.insuranse_app.name === driver.insuranse_app
            ? (insuranse_app = null)
            : (insuranse_app = values.insuranse_app);
        values.medcard.name === '' || values.medcard.name === driver.medcard ? (medcard = null) : (medcard = values.medcard);
        values.license_file.name === '' || values.license_file.name === driver.license_file
            ? (license_file = null)
            : (license_file = values.license_file);
        values.application.name === '' || values.application.name === driver.application
            ? (application = null)
            : (application = values.application);
        values.w9.name === '' || values.w9.name === driver.w9 ? (w9 = null) : (w9 = values.w9);
        values.lic_agreement.name === '' || values.lic_agreement.name === driver.lic_agreement
            ? (lic_agreement = null)
            : (lic_agreement = values.lic_agreement);
        values.ifta.name === '' || values.ifta.name === driver.ifta ? (ifta = null) : (ifta = values.ifta);

        let driverMod;
        if (values.truck === 'house') {
            driverMod = {
                ...values,
                truck: '',
                house_driver: true,
                proof_cit: proof_cit,
                void_check: void_check,
                mvr: mvr,
                pre_employment: pre_employment,
                insuranse_app: insuranse_app,
                medcard: medcard,
                license_file: license_file,
                application: application,
                w9: w9,
                lic_agreement: lic_agreement,
                ifta: ifta,
                license_exp: formatDate(values.license_exp),
                medcard_exp: formatDate(values.medcard_exp),
                hired_date: formatDate(values.hired_date)
            };
        } else {
            driverMod = {
                ...values,
                house_driver: false,
                proof_cit: proof_cit,
                void_check: void_check,
                mvr: mvr,
                pre_employment: pre_employment,
                insuranse_app: insuranse_app,
                medcard: medcard,
                license_file: license_file,
                application: application,
                w9: w9,
                lic_agreement: lic_agreement,
                ifta: ifta,
                license_exp: formatDate(values.license_exp),
                medcard_exp: formatDate(values.medcard_exp),
                hired_date: formatDate(values.hired_date)
            };
        }
        dispatch(editDriver(driverMod, id));
    };
    const handleInputChange = (e) => {
        const { name, value } = e.target;

        if (e.target.name === 'test') {
            if (e.target.files.length !== 0) dispatch(addRandomTest(e.target.files[0], id));
        } else {
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
        }
        setErrors({
            ...errors,
            [name]: ''
        });
    };

    return (
        <MainCard title="Edit Driver">
            <Grid container>
                <Grid item xs={12} lg={6}>
                    <SubCard title="Data">
                        <Grid container>
                            <Grid item xs={12} mb={2}>
                                <TextField
                                    fullWidth
                                    required
                                    variant="outlined"
                                    label="Full Name"
                                    name="full_name"
                                    value={values.full_name}
                                    onChange={handleInputChange}
                                    error={Boolean(errors.full_name)}
                                    helperText={errors.full_name ? errors.full_name : ''}
                                />
                            </Grid>
                            <Grid item xs={12} sm={5} mb={2}>
                                <TextField
                                    required
                                    fullWidth
                                    variant="outlined"
                                    label="Social Security"
                                    name="social_sec"
                                    value={values.social_sec}
                                    onChange={handleInputChange}
                                    error={Boolean(errors.social_sec)}
                                    helperText={errors.social_sec ? errors.social_sec : ''}
                                />
                            </Grid>
                            <Grid item xs={2} />
                            <Grid item xs={12} sm={5} mb={2}>
                                <TextField
                                    fullWidth
                                    required
                                    variant="outlined"
                                    label="License Number"
                                    name="license_number"
                                    value={values.license_number}
                                    onChange={handleInputChange}
                                    error={Boolean(errors.license_number)}
                                    helperText={errors.license_number ? errors.license_number : ''}
                                />
                            </Grid>
                            <Grid item xs={12} sm={5} mb={2}>
                                <TextField
                                    required
                                    fullWidth
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
                            <Grid item xs={12} sm={5} mb={2}>
                                <FormControl error={Boolean(errors.legal_status)} required>
                                    <FormLabel>Legal Status</FormLabel>
                                    <RadioGroup row name="legal_status" value={values.legal_status} onChange={handleInputChange}>
                                        <FormControlLabel value="resident" control={<Radio />} label="Resident" />
                                        <FormControlLabel value="citizen" control={<Radio />} label="U.S. Citizen" />
                                    </RadioGroup>
                                </FormControl>
                            </Grid>
                            <Grid item xs={2} />
                            <Grid item xs={12} sm={5} mb={2}>
                                <FormControl error={Boolean(errors.state)} fullWidth required variant="outlined">
                                    <FormLabel>State</FormLabel>
                                    <Select name="state" value={values.state} onChange={handleInputChange} label="License State">
                                        {stateList.map((item, index) => (
                                            <MenuItem key={index} value={item}>
                                                {item}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={5} mb={2}>
                                <FormControl error={Boolean(errors.license_state)} fullWidth required variant="outlined">
                                    <FormLabel>License State</FormLabel>
                                    <Select
                                        name="license_state"
                                        value={values.license_state}
                                        onChange={handleInputChange}
                                        label="License State"
                                    >
                                        {stateList.map((item, index) => (
                                            <MenuItem key={index} value={item}>
                                                {item}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={2} />
                            <Grid item xs={12} sm={5} mb={2}>
                                <FormControl error={Boolean(errors.truck)} fullWidth required variant="outlined">
                                    <FormLabel>VIN Number</FormLabel>
                                    <Select name="truck" value={values.truck} onChange={handleInputChange} label="VIN Number">
                                        <MenuItem value="house">House Driver</MenuItem>
                                        {listTrucks.map((item) => (
                                            <MenuItem key={item.id} value={item.id}>
                                                {item.vin_number}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={4} mb={2}>
                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <DatePicker
                                        inputFormat="dd/MM/yyyy"
                                        label="Hired Date"
                                        value={values.hired_date}
                                        onChange={(date) => handleInputChange(convertToDefEventPara('hired_date', date))}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                error={Boolean(errors.hired_date)}
                                                helperText={errors.hired_date ? errors.hired_date : ''}
                                                name="hired_date"
                                                fullWidth
                                                required
                                            />
                                        )}
                                    />
                                </LocalizationProvider>
                            </Grid>
                            <Grid item xs={12} sm={4} mb={2}>
                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <DatePicker
                                        inputFormat="dd/MM/yyyy"
                                        label="License Expiration"
                                        value={values.license_exp}
                                        onChange={(date) => handleInputChange(convertToDefEventPara('license_exp', date))}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                error={Boolean(errors.license_exp)}
                                                helperText={errors.license_exp ? errors.license_exp : ''}
                                                name="license_exp"
                                                fullWidth
                                                required
                                            />
                                        )}
                                    />
                                </LocalizationProvider>
                            </Grid>
                            <Grid item xs={12} sm={4} mb={2}>
                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <DatePicker
                                        inputFormat="dd/MM/yyyy"
                                        label="Medcard Expiration"
                                        value={values.medcard_exp}
                                        onChange={(date) => handleInputChange(convertToDefEventPara('medcard_exp', date))}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                error={Boolean(errors.medcard_exp)}
                                                helperText={errors.medcard_exp ? errors.medcard_exp : ''}
                                                name="medcard_exp"
                                                fullWidth
                                                required
                                            />
                                        )}
                                    />
                                </LocalizationProvider>
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
                        </Grid>
                    </SubCard>
                </Grid>
                {showFiles ? (
                    <Grid item xs={12} lg={6}>
                        <SubCard title="Files">
                            <Grid container>
                                <Grid item xs={11} mb={2} sm={4} component="a" target="_blank" href={values.license_file.name}>
                                    <TextField
                                        fullWidth
                                        variant="outlined"
                                        label="License"
                                        name="license_file"
                                        contentEditable={false}
                                        error={Boolean(errors.license_file)}
                                        helperText={errors.license_file ? errors.license_file : ''}
                                        value={values.license_file ? values.license_file.name : ''}
                                    />
                                </Grid>
                                <Grid item container xs={1} sm={1} mb={2} align="center" justifyContent="center" direction="column">
                                    <Grid item>
                                        <label htmlFor="license_file">
                                            <input
                                                onChange={handleInputChange}
                                                style={{ display: 'none' }}
                                                id="license_file"
                                                name="license_file"
                                                type="file"
                                            />
                                            <Fab color="primary" size="small" component="span" aria-label="add">
                                                <EditOutlinedIcon />
                                            </Fab>
                                        </label>
                                    </Grid>
                                </Grid>
                                <Grid item xs={2} />
                                <Grid item xs={11} mb={2} sm={4} component="a" target="_blank" href={values.application.name}>
                                    <TextField
                                        fullWidth
                                        variant="outlined"
                                        label="Application"
                                        name="application"
                                        contentEditable={false}
                                        error={Boolean(errors.application)}
                                        helperText={errors.application ? errors.application : ''}
                                        value={values.application ? values.application.name : ''}
                                    />
                                </Grid>
                                <Grid item container xs={1} sm={1} mb={2} align="center" justifyContent="center" direction="column">
                                    <Grid item>
                                        <label htmlFor="application">
                                            <input
                                                onChange={handleInputChange}
                                                style={{ display: 'none' }}
                                                id="application"
                                                name="application"
                                                type="file"
                                            />
                                            <Fab color="primary" size="small" component="span" aria-label="add">
                                                <EditOutlinedIcon />
                                            </Fab>
                                        </label>
                                    </Grid>
                                </Grid>
                                <Grid item xs={11} mb={2} sm={4} component="a" target="_blank" href={values.proof_cit.name}>
                                    <TextField
                                        fullWidth
                                        variant="outlined"
                                        label="Proof of Citizienship"
                                        name="proof_cit"
                                        contentEditable={false}
                                        error={Boolean(errors.proof_cit)}
                                        helperText={errors.proof_cit ? errors.proof_cit : ''}
                                        value={values.proof_cit ? values.proof_cit.name : ''}
                                    />
                                </Grid>
                                <Grid item container xs={1} sm={1} mb={2} align="center" justifyContent="center" direction="column">
                                    <Grid item>
                                        <label htmlFor="proof_cit">
                                            <input
                                                onChange={handleInputChange}
                                                style={{ display: 'none' }}
                                                id="proof_cit"
                                                name="proof_cit"
                                                type="file"
                                            />
                                            <Fab color="primary" size="small" component="span" aria-label="add">
                                                <EditOutlinedIcon />
                                            </Fab>
                                        </label>
                                    </Grid>
                                </Grid>
                                <Grid item xs={2} />
                                <Grid item xs={11} mb={2} sm={4} component="a" target="_blank" href={values.void_check.name}>
                                    <TextField
                                        fullWidth
                                        variant="outlined"
                                        label="Void Check"
                                        name="void_check"
                                        contentEditable={false}
                                        error={Boolean(errors.void_check)}
                                        helperText={errors.void_check ? errors.void_check : ''}
                                        value={values.void_check ? values.void_check.name : ''}
                                    />
                                </Grid>
                                <Grid item container xs={1} sm={1} mb={2} align="center" justifyContent="center" direction="column">
                                    <Grid item>
                                        <label htmlFor="void_check">
                                            <input
                                                onChange={handleInputChange}
                                                style={{ display: 'none' }}
                                                id="void_check"
                                                name="void_check"
                                                type="file"
                                            />
                                            <Fab color="primary" size="small" component="span" aria-label="add">
                                                <EditOutlinedIcon />
                                            </Fab>
                                        </label>
                                    </Grid>
                                </Grid>
                                <Grid item xs={11} mb={2} sm={4} component="a" target="_blank" href={values.mvr.name}>
                                    <TextField
                                        fullWidth
                                        variant="outlined"
                                        label="MVR"
                                        name="mvr"
                                        contentEditable={false}
                                        error={Boolean(errors.mvr)}
                                        helperText={errors.mvr ? errors.mvr : ''}
                                        value={values.mvr ? values.mvr.name : ''}
                                    />
                                </Grid>
                                <Grid item container xs={1} sm={1} mb={2} align="center" justifyContent="center" direction="column">
                                    <Grid item>
                                        <label htmlFor="mvr">
                                            <input
                                                onChange={handleInputChange}
                                                style={{ display: 'none' }}
                                                id="mvr"
                                                name="mvr"
                                                type="file"
                                            />
                                            <Fab color="primary" size="small" component="span" aria-label="add">
                                                <EditOutlinedIcon />
                                            </Fab>
                                        </label>
                                    </Grid>
                                </Grid>
                                <Grid item xs={2} />
                                <Grid item xs={11} mb={2} sm={4} component="a" target="_blank" href={values.pre_employment.name}>
                                    <TextField
                                        fullWidth
                                        variant="outlined"
                                        label="Pre-Employment Test"
                                        name="pre_employment"
                                        contentEditable={false}
                                        error={Boolean(errors.pre_employment)}
                                        helperText={errors.pre_employment ? errors.pre_employment : ''}
                                        value={values.pre_employment ? values.pre_employment.name : ''}
                                    />
                                </Grid>
                                <Grid item container xs={1} sm={1} mb={2} align="center" justifyContent="center" direction="column">
                                    <Grid item>
                                        <label htmlFor="pre_employment">
                                            <input
                                                onChange={handleInputChange}
                                                style={{ display: 'none' }}
                                                id="pre_employment"
                                                name="pre_employment"
                                                type="file"
                                            />
                                            <Fab color="primary" size="small" component="span" aria-label="add">
                                                <EditOutlinedIcon />
                                            </Fab>
                                        </label>
                                    </Grid>
                                </Grid>
                                <Grid item xs={11} mb={2} sm={4} component="a" target="_blank" href={values.insuranse_app.name}>
                                    <TextField
                                        fullWidth
                                        variant="outlined"
                                        label="Insuranse Approval"
                                        name="insuranse_app"
                                        contentEditable={false}
                                        error={Boolean(errors.insuranse_app)}
                                        helperText={errors.insuranse_app ? errors.insuranse_app : ''}
                                        value={values.insuranse_app ? values.insuranse_app.name : ''}
                                    />
                                </Grid>
                                <Grid item container xs={1} sm={1} mb={2} align="center" justifyContent="center" direction="column">
                                    <Grid item>
                                        <label htmlFor="insuranse_app">
                                            <input
                                                onChange={handleInputChange}
                                                style={{ display: 'none' }}
                                                id="insuranse_app"
                                                name="insuranse_app"
                                                type="file"
                                            />
                                            <Fab color="primary" size="small" component="span" aria-label="add">
                                                <EditOutlinedIcon />
                                            </Fab>
                                        </label>
                                    </Grid>
                                </Grid>
                                <Grid item xs={2} />
                                <Grid item xs={11} mb={2} sm={4} component="a" target="_blank" href={values.medcard.name}>
                                    <TextField
                                        fullWidth
                                        variant="outlined"
                                        label="Med Card"
                                        name="medcard"
                                        contentEditable={false}
                                        error={Boolean(errors.medcard)}
                                        helperText={errors.medcard ? errors.medcard : ''}
                                        value={values.medcard ? values.medcard.name : ''}
                                    />
                                </Grid>
                                <Grid item container xs={1} sm={1} mb={2} align="center" justifyContent="center" direction="column">
                                    <Grid item>
                                        <label htmlFor="medcard">
                                            <input
                                                onChange={handleInputChange}
                                                style={{ display: 'none' }}
                                                id="medcard"
                                                name="medcard"
                                                type="file"
                                            />
                                            <Fab color="primary" size="small" component="span" aria-label="add">
                                                <EditOutlinedIcon />
                                            </Fab>
                                        </label>
                                    </Grid>
                                </Grid>
                                <Grid item xs={11} mb={2} sm={4} component="a" target="_blank" href={values.w9.name}>
                                    <TextField
                                        fullWidth
                                        variant="outlined"
                                        label="W9"
                                        name="w9"
                                        contentEditable={false}
                                        error={Boolean(errors.w9)}
                                        helperText={errors.w9 ? errors.w9 : ''}
                                        value={values.w9 ? values.w9.name : ''}
                                    />
                                </Grid>
                                <Grid item container xs={1} sm={1} mb={2} align="center" justifyContent="center" direction="column">
                                    <Grid item>
                                        <label htmlFor="w9">
                                            <input onChange={handleInputChange} style={{ display: 'none' }} id="w9" name="w9" type="file" />
                                            <Fab color="primary" size="small" component="span" aria-label="add">
                                                <EditOutlinedIcon />
                                            </Fab>
                                        </label>
                                    </Grid>
                                </Grid>
                                <Grid item xs={2} />
                                <Grid item xs={11} mb={2} sm={4} component="a" target="_blank" href={values.lic_agreement.name}>
                                    <TextField
                                        fullWidth
                                        variant="outlined"
                                        label="License Agreements"
                                        name="lic_agreement"
                                        contentEditable={false}
                                        value={values.lic_agreement.name}
                                    />
                                </Grid>
                                <Grid item container xs={1} sm={1} mb={2} align="center" justifyContent="center" direction="column">
                                    <Grid item>
                                        <label htmlFor="lic_agreement">
                                            <input
                                                onChange={handleInputChange}
                                                style={{ display: 'none' }}
                                                id="lic_agreement"
                                                name="lic_agreement"
                                                type="file"
                                            />
                                            <Fab color="primary" size="small" component="span" aria-label="add">
                                                <EditOutlinedIcon />
                                            </Fab>
                                        </label>
                                    </Grid>
                                </Grid>
                                <Grid item xs={11} mb={2} sm={4} component="a" target="_blank" href={values.ifta.name}>
                                    <TextField
                                        fullWidth
                                        variant="outlined"
                                        label="IFTA"
                                        name="ifta"
                                        contentEditable={false}
                                        error={Boolean(errors.ifta)}
                                        helperText={errors.ifta ? errors.ifta : ''}
                                        value={values.ifta ? values.ifta.name : ''}
                                    />
                                </Grid>
                                <Grid item container xs={1} sm={1} mb={2} align="center" justifyContent="center" direction="column">
                                    <Grid item>
                                        <label htmlFor="ifta">
                                            <input
                                                onChange={handleInputChange}
                                                style={{ display: 'none' }}
                                                id="ifta"
                                                name="ifta"
                                                type="file"
                                            />
                                            <Fab color="primary" size="small" component="span" aria-label="add">
                                                <EditOutlinedIcon />
                                            </Fab>
                                        </label>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </SubCard>
                        <Grid container>
                            <Grid item display="flex" justifyContent="center" mt={3} xs={6}>
                                <Button type="submit" variant="contained" onClick={handleSubmit} color="primary" size="large">
                                    Submit
                                </Button>
                            </Grid>
                            <Grid item display="flex" justifyContent="center" mt={3} xs={6}>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    onClick={() => {
                                        setShowFiles(false);
                                    }}
                                    color="secondary"
                                    size="large"
                                >
                                    Edit RandomTests
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                ) : (
                    <Grid item xs={12} lg={6}>
                        <SubCard title="Random Tests">
                            <Grid
                                item
                                xs={12}
                                sx={{
                                    bgcolor: theme.palette.grey[100]
                                }}
                            >
                                <List dense sx={{ maxHeight: 300, overflow: 'auto' }}>
                                    {values.test.map((item) => (
                                        <ListItem key={item.id} component="a" target="_blank" href={item.test}>
                                            <ListItemText primary={item.test} />
                                            <ListItemSecondaryAction>
                                                <IconButton
                                                    edge="end"
                                                    aria-label="delete"
                                                    onClick={() => {
                                                        handleClickDelete(item.id);
                                                    }}
                                                >
                                                    <DeleteOutlineOutlinedIcon color="primary" />
                                                </IconButton>
                                            </ListItemSecondaryAction>
                                        </ListItem>
                                    ))}
                                </List>
                            </Grid>
                            <Grid item xs={12} mt={1} display="flex" justifyContent="center">
                                <label htmlFor="test">
                                    <input onChange={handleInputChange} style={{ display: 'none' }} id="test" name="test" type="file" />
                                    <Fab color="primary" size="small" component="span" aria-label="add">
                                        <AddOutlinedIcon />
                                    </Fab>
                                </label>
                            </Grid>
                        </SubCard>
                        <Grid item ml={5} mt={3} xs={12}>
                            <Button
                                type="submit"
                                variant="contained"
                                onClick={() => {
                                    setShowFiles(true);
                                }}
                                color="secondary"
                                size="large"
                            >
                                Edit Files
                            </Button>
                        </Grid>
                    </Grid>
                )}
            </Grid>
            <Dialog
                open={open}
                onClose={() => {
                    handleCloseDelete(false);
                }}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle style={{ fontSize: 20 }} id="alert-dialog-title">
                    {'Confirmar Eliminar'}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure you want to permanently delete this File?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={() => {
                            handleCloseDelete(false);
                        }}
                    >
                        No
                    </Button>
                    <Button
                        onClick={() => {
                            handleCloseDelete(true);
                        }}
                    >
                        Yes
                    </Button>
                </DialogActions>
            </Dialog>
        </MainCard>
    );
};

export default EditDriver;
