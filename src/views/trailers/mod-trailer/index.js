import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// material-ui
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import {
    Fab,
    Grid,
    TextField,
    Button,
    List,
    ListItem,
    IconButton,
    ListItemText,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    ListItemSecondaryAction
} from '@mui/material';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';

// project imports
import SubCard from 'ui-component/cards/SubCard';
import MainCard from 'ui-component/cards/MainCard';
import { addMaintenance, deleteMaintenance, editTrailer, getTrailer, loadMaintenances } from 'store/actions/trailers';
import { useNavigate, useParams } from 'react-router';
import { useTheme } from '@emotion/react';
import { useSnackbar } from 'notistack';
import { CLEAN_MODIFIED, RESET_ERRORS } from 'store/actions/types/types_trailers';
import { formatDateForTextField } from 'extras/functions';

// ==============================|| EDIT TRAILER ||============================== //

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

const ModTrailers = () => {
    //Consts
    const { enqueueSnackbar } = useSnackbar();
    const theme = useTheme();
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    //Selectors
    const edited = useSelector((state) => state.trailers.modified);
    const errorsSelect = useSelector((state) => state.trailers.editErrors);
    const trailer = useSelector((state) => state.trailers.trailer);
    const maintenances = useSelector((state) => state.trailers.maintenances);
    const loading = useSelector((state) => state.trailers.loading);
    const loading_maintenances = useSelector((state) => state.trailers.loading_maintenances);

    //States
    const [errors, setErrors] = useState({ ...initalFValues, registration: '', annual_inspection: '', maintenance: '' });
    const [values, setValues] = useState(initalFValues);
    const [idMaint, setIdMaint] = useState();
    const [open, setOpen] = useState(false);

    //Effects
    useEffect(() => {
        dispatch(loadMaintenances(id));
        dispatch(getTrailer(id));
        dispatch({ type: RESET_ERRORS });
    }, []);
    useEffect(() => {
        if (loading === false && trailer !== null) {
            setValues({
                ...values,
                number: trailer.number,
                year: trailer.year,
                brand: trailer.brand,
                typ: trailer.typ,
                length: trailer.length,
                vin_number: trailer.vin_number,
                registration_exp: formatDateForTextField(new Date(trailer.registration_exp)),
                annual_insp_exp: formatDateForTextField(new Date(trailer.annual_insp_exp)),
                annual_inspection: { name: trailer.annual_inspection === null ? '' : trailer.annual_inspection },
                registration: { name: trailer.registration === null ? '' : trailer.registration }
            });
        }
    }, [loading]);
    useEffect(() => {
        if (loading_maintenances === false && maintenances !== null)
            setValues({
                ...values,
                maintenance: maintenances
            });
    }, [loading_maintenances]);
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
            if (errorsSelect.maintenance) {
                enqueueSnackbar(errorsSelect.maintenance, { variant: 'error' });
            }
        } else setErrors({ ...initalFValues, registration: '', annual_inspection: '', maintenance: '' });
    }, [errorsSelect]);

    //Handlers
    const handleClickDelete = (id) => {
        setIdMaint(id);
        setOpen(true);
    };
    const handleCloseDelete = (bol) => {
        setOpen(false);
        if (bol) {
            dispatch(deleteMaintenance(idMaint));
        }
    };
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
        values.registration.name === '' || values.registration.name === trailer.registration
            ? (regist_exp = null)
            : (regist_exp = values.registration);
        values.annual_inspection.name === '' || values.annual_inspection.name === trailer.annual_inspection
            ? (ann_inspect = null)
            : (ann_inspect = values.annual_inspection);

        const trailerObj = {
            number: values.number,
            year: values.year,
            brand: values.brand,
            typ: values.typ,
            length: values.length,
            vin_number: values.vin_number,
            registration: regist_exp,
            annual_inspection: ann_inspect,
            registration_exp: values.registration_exp,
            annual_insp_exp: values.annual_insp_exp
        };
        dispatch(editTrailer(trailerObj, trailer.id));
    };
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (e.target.name === 'maintenance') {
            if (e.target.files.length !== 0) dispatch(addMaintenance(e.target.files[0], id));
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
        <MainCard title="Edit Trailer">
            <Grid container>
                <Grid item xs={12} lg={6}>
                    <SubCard title="Data">
                        <Grid container>
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
                                <TextField
                                    error={Boolean(errors.annual_insp_exp)}
                                    helperText={errors.annual_insp_exp ? errors.annual_insp_exp : ''}
                                    name="annual_insp_exp"
                                    fullWidth
                                    required
                                    type="date"
                                    label="Annual Inspection Expiration"
                                    value={values.annual_insp_exp}
                                    InputLabelProps={{ shrink: true, required: true }}
                                    onChange={handleInputChange}
                                />
                            </Grid>
                            <Grid item xs={2} />
                            <Grid item xs={12} sm={5} mb={2}>
                                <TextField
                                    error={Boolean(errors.registration_exp)}
                                    helperText={errors.registration_exp ? errors.registration_exp : ''}
                                    name="registration_exp"
                                    fullWidth
                                    required
                                    type="date"
                                    label="Registration Expiration"
                                    value={values.registration_exp}
                                    InputLabelProps={{ shrink: true, required: true }}
                                    onChange={handleInputChange}
                                />
                            </Grid>
                            <Grid item xs={11} sm={4} mb={2} component="a" target="_blank" href={values.registration}>
                                <TextField
                                    fullWidth
                                    variant="outlined"
                                    label="Registration"
                                    name="registration"
                                    contentEditable={false}
                                    value={values.registration.name}
                                    error={Boolean(errors.registration)}
                                    helperText={errors.registration ? errors.registration : ''}
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
                                            <EditOutlinedIcon />
                                        </Fab>
                                    </label>
                                </Grid>
                            </Grid>
                            <Grid item xs={2} />
                            <Grid item xs={11} sm={4} mb={2} component="a" target="_blank" href={values.annual_inspection}>
                                <TextField
                                    fullWidth
                                    variant="outlined"
                                    label="Annual Inspection"
                                    name="annual_inspection"
                                    contentEditable={false}
                                    value={values.annual_inspection.name}
                                    error={Boolean(errors.annual_inspection)}
                                    helperText={errors.annual_inspection ? errors.annual_inspection : ''}
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
                                            <EditOutlinedIcon />
                                        </Fab>
                                    </label>
                                </Grid>
                            </Grid>
                            <Grid item display="flex" justifyContent="center" mt={1} xs={6}>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    onClick={() => {
                                        navigate('/trailers');
                                    }}
                                    color="secondary"
                                    size="large"
                                >
                                    Go Back
                                </Button>
                            </Grid>
                            <Grid item display="flex" justifyContent="center" mt={1} xs={6}>
                                <Button type="submit" variant="contained" onClick={handleSubmit} color="primary" size="large">
                                    Submit
                                </Button>
                            </Grid>
                        </Grid>
                    </SubCard>
                </Grid>
                <Grid item xs={12} lg={6}>
                    <SubCard title="Maintenance">
                        <Grid
                            item
                            xs={12}
                            sx={{
                                bgcolor: theme.palette.grey[100]
                            }}
                        >
                            <List dense sx={{ maxHeight: 300, overflow: 'auto' }}>
                                {values.maintenance.map((item) => (
                                    <ListItem key={item.id} component="a" target="_blank" href={item.maintenance}>
                                        <ListItemText primary={item.maintenance} />
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
                            <label htmlFor="maintenance">
                                <input
                                    onChange={handleInputChange}
                                    style={{ display: 'none' }}
                                    id="maintenance"
                                    name="maintenance"
                                    type="file"
                                />
                                <Fab color="primary" size="small" component="span" aria-label="add">
                                    <AddOutlinedIcon />
                                </Fab>
                            </label>
                        </Grid>
                    </SubCard>
                </Grid>
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

export default ModTrailers;
