import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
    FormControl,
    IconButton,
    FormLabel,
    TextField,
    Select,
    MenuItem,
    Checkbox,
    FormGroup,
    FormControlLabel,
    Button,
    ButtonGroup,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Grid,
    OutlinedInput,
    Tooltip,
    Fab
} from '@mui/material';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useSnackbar } from 'notistack';
import { useNavigate, useParams } from 'react-router';
import { loadCustomers } from 'store/actions/customers';
import { styled } from '@mui/material/styles';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import ForwardToInboxOutlinedIcon from '@mui/icons-material/ForwardToInboxOutlined';
// project imports
import SubCard from 'ui-component/cards/SubCard';
import MainCard from 'ui-component/cards/MainCard';
import { editInvoice, getAllDataInvoice, getInvoice, sendFactoringInvoice, sendInvoice } from 'store/actions/invoices';
import { CLEAN_MODIFIED_INVOICES, RESET_ERRORS_INVOICES } from 'store/actions/types/types_invoices';
import { loadLoads } from 'store/actions/loads';
import { formatDateForTextField } from 'extras/functions';
import { addService, deleteService, loadServices } from 'store/actions/services';
import { CLEAN_MODIFIED, RESET_ERRORS } from 'store/actions/types/types_services';
import { usePDF } from '@react-pdf/renderer';
import Invoice from 'views/invoices/pdf-viewer/components/reports/Invoice';
import { blobToFile } from 'extras/functions';

//STYLES
const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14
    }
}));
const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover
    }
    // hide last border
}));

// ==============================|| Edit Invoice||============================== //

/* initial form values */

const EditInvoice = () => {
    //Consts
    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate();
    let { id } = useParams();
    const initialValuesInvoice = {
        id: '',
        load: '',
        customer: '',
        invoice_date: '',
        service_date: '',
        paid: false,
        notes: ''
    };
    const initialValuesServices = {
        activity_name: '',
        description: '',
        qty: 0,
        rate: 0
    };
    const dispatch = useDispatch();

    //Selectors
    const invoice = useSelector((state) => state.invoices.invoice);
    const all_data = useSelector((state) => state.invoices.all_data);
    const services = useSelector((state) => state.services.list);
    const customers = useSelector((state) => state.customers.list);
    const loads = useSelector((state) => state.loads.list);
    const edited = useSelector((state) => state.invoices.modified);
    const added = useSelector((state) => state.services.modified);
    const sentInvoice = useSelector((state) => state.invoices.sentInvoice);
    const errorsSelect = useSelector((state) => state.invoices.editErrors);
    const errorsSelectServices = useSelector((state) => state.services.addErrors);
    const logo = useSelector((state) => state.auth.user.logo);

    //States
    const [values, setValues] = useState(initialValuesInvoice);
    const [errors, setErrors] = useState(initialValuesInvoice);
    const [valuesServices, setValuesServices] = useState(initialValuesServices);
    const [errorsServices, setErrorsServices] = useState(initialValuesServices);
    const [listCustomers, setListCustomers] = useState(customers);
    const [listLoads, setListLoads] = useState(loads);
    const [listServices, setListServices] = useState(services);
    const [open, setOpen] = useState(false);
    const [idService, setIdService] = useState();
    const [seeForm, setSeeForm] = useState(false);
    const [open2, setOpen2] = useState(false);
    const [data, setData] = useState(null);

    //PDF
    const [instance, update] = usePDF({ document: <Invoice data={{ ...data, logo }} services={listServices} /> });

    //Effects
    useEffect(update, [all_data, services]);
    useEffect(() => {
        dispatch(getAllDataInvoice(id));
        dispatch({ type: RESET_ERRORS_INVOICES });
        dispatch({ type: RESET_ERRORS });
        dispatch(getInvoice(id));
        dispatch(loadServices(id));
        dispatch(loadCustomers());
        dispatch(loadLoads());
    }, []);
    useEffect(() => {
        setListCustomers(customers);
    }, [customers]);
    useEffect(() => {
        setListServices(services);
    }, [services]);
    useEffect(() => {
        setListLoads(loads);
    }, [loads]);
    useEffect(() => {
        if (edited) {
            enqueueSnackbar('Modified Invoice', { variant: 'success' });
            dispatch({
                type: CLEAN_MODIFIED_INVOICES
            });
        }
    }, [edited]);
    useEffect(() => {
        if (added) {
            enqueueSnackbar('Added Service', { variant: 'success' });
            dispatch({
                type: CLEAN_MODIFIED
            });
            setSeeForm(false);
        }
    }, [added]);
    useEffect(() => {
        if (sentInvoice) {
            enqueueSnackbar('Sent Invoice', { variant: 'success' });
            dispatch({
                type: CLEAN_MODIFIED
            });
        }
    }, [sentInvoice]);
    useEffect(() => {
        if (errorsSelect !== null) setErrors(errorsSelect);
        else setErrors(initialValuesInvoice);
    }, [errorsSelect]);
    useEffect(() => {
        if (errorsSelectServices !== null) setErrorsServices(errorsSelectServices);
        else setErrors(initialValuesServices);
    }, [errorsSelectServices]);
    useEffect(() => {
        if (invoice !== null) {
            setValues({
                id: invoice.id,
                load: invoice.load,
                customer: invoice.customer,
                invoice_date: formatDateForTextField(new Date(invoice.invoice_date)),
                service_date: formatDateForTextField(new Date(invoice.service_date)),
                paid: invoice.paid,
                notes: invoice.notes
            });
        }
    }, [invoice]);
    useEffect(() => {
        if (all_data !== null) {
            setData(all_data);
        }
    }, [all_data]);

    //Handlers
    const handleClickSend = () => {
        setOpen2(true);
        let customer;
        for (let i = 0; i < listCustomers.length; i++) {
            if (listCustomers[i].id == values.customer) {
                customer = listCustomers[i];
            }
        }
        if (customer.terms !== 'Factoring') window.open(`/viewInvoicePDF/${id}`, '_blank');
    };
    const handleCloseSend = (bol) => {
        setOpen2(false);
        if (bol) {
            let customer;
            for (let i = 0; i < listCustomers.length; i++) {
                if (listCustomers[i].id == values.customer) {
                    customer = listCustomers[i];
                }
            }
            if (customer.terms !== 'Factoring') {
                let file = blobToFile(instance.blob, 'prueba.pdf');
                dispatch(sendInvoice(id, file));
            } else {
                dispatch(sendFactoringInvoice(id));
            }
        }
    };
    const handleClickDelete = (idSer) => {
        setIdService(idSer);
        setOpen(true);
    };
    const handleCloseDelete = (bol) => {
        setOpen(false);
        if (bol) {
            dispatch(deleteService(idService));
        }
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        if (values.customer === '') {
            setErrors({ ...errors, customer: 'This Field is Required' });
            return;
        }
        if (values.service_date === '' || values.service_date === null) {
            setErrors({ ...errors, service_date: 'This Field is Required' });
            return;
        }
        if (values.notes === '') {
            setErrors({ ...errors, notes: 'This Field is Required' });
            return;
        }
        dispatch(editInvoice(values, invoice.id, false));
    };
    const handleSubmitServices = (e) => {
        e.preventDefault();
        if (valuesServices.activity_name === '') {
            setErrorsServices({ ...errorsServices, activity_name: 'This Field is Required' });
            return;
        }
        if (valuesServices.qty === '' || valuesServices.qty === null) {
            setErrorsServices({ ...errorsServices, qty: 'This Field is Required' });
            return;
        }
        if (valuesServices.rate === '') {
            setErrorsServices({ ...errorsServices, rate: 'This Field is Required' });
            return;
        }
        if (valuesServices.description === '') {
            setErrorsServices({ ...errorsServices, description: 'This Field is Required' });
            return;
        }
        dispatch(addService({ ...valuesServices, invoice: id }));
    };
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name == 'paid') {
            setValues({
                ...values,
                [name]: !values.paid
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
    const handleInputServicesChange = (e) => {
        const { name, value } = e.target;
        setValuesServices({
            ...valuesServices,
            [name]: value
        });
        setErrorsServices({
            ...errorsServices,
            [name]: ''
        });
    };

    return (
        <MainCard title="Edit Invoice">
            <Grid container>
                <Grid item xs={12} lg={6}>
                    <SubCard title="Data">
                        <Grid container>
                            <Grid item xs={12} sm={5} mb={2}>
                                <TextField
                                    fullWidth
                                    required
                                    disabled
                                    variant="outlined"
                                    label="Invoice Number"
                                    name="id"
                                    value={
                                        values.id.toString().length === 1
                                            ? `000${values.id}`
                                            : values.id.toString().length === 2
                                              ? `00${values.id}`
                                              : values.id.toString().length === 3
                                                ? `0${values.id}`
                                                : values.id
                                    }
                                />
                            </Grid>
                            <Grid item xs={2} />
                            <Grid item xs={12} sm={5} mb={2}>
                                <FormGroup>
                                    <FormControlLabel
                                        control={
                                            <Checkbox name="paid" checked={values.paid} onChange={handleInputChange} value={values.paid} />
                                        }
                                        label="Paid"
                                    />
                                </FormGroup>
                            </Grid>
                            <Grid item xs={12} sm={5} mb={2}>
                                <FormControl fullWidth disabled required variant="outlined">
                                    <FormLabel>Load Number</FormLabel>

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
                            <Grid item xs={12} sm={5} mb={2}>
                                <TextField
                                    error={Boolean(errors.invoice_date)}
                                    helperText={errors.invoice_date ? errors.invoice_date : ''}
                                    name="invoice_date"
                                    fullWidth
                                    required
                                    type="date"
                                    label="Invoice Date"
                                    value={values.invoice_date}
                                    InputLabelProps={{ shrink: true, required: true }}
                                    onChange={handleInputChange}
                                />
                            </Grid>

                            <Grid item xs={2} />
                            <Grid item xs={12} sm={5} mb={2}>
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

                            <Grid item display="flex" justifyContent="center" mt={3} xs={6}>
                                <Button type="submit" variant="contained" onClick={handleSubmit} color="primary">
                                    Submit
                                </Button>
                            </Grid>
                            <Grid item display="flex" justifyContent="center" mt={3} xs={6}>
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    onClick={() => {
                                        handleClickSend();
                                    }}
                                    endIcon={<ForwardToInboxOutlinedIcon />}
                                >
                                    Send Mail
                                </Button>
                            </Grid>
                        </Grid>
                        <Dialog
                            open={open2}
                            onClose={() => {
                                handleCloseSend(false);
                            }}
                            aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description"
                        >
                            <DialogTitle style={{ fontSize: 20 }} id="alert-dialog-title">
                                {'Confirm Sending'}
                            </DialogTitle>
                            <DialogContent>
                                <DialogContentText id="alert-dialog-description">
                                    Check the Invoice and Confirm to Send It to the Client
                                </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                                <Button
                                    onClick={() => {
                                        handleCloseSend(false);
                                    }}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    onClick={() => {
                                        handleCloseSend(true);
                                    }}
                                >
                                    Confirm
                                </Button>
                            </DialogActions>
                        </Dialog>
                    </SubCard>
                </Grid>
                {!seeForm ? (
                    <Grid item xs={12} lg={6}>
                        <SubCard title="Services">
                            <TableContainer component={Paper} sx={{ maxHeight: 300 }}>
                                <Table stickyHeader sx={{ minWidth: 400 }} aria-label="customized table">
                                    <TableHead>
                                        <StyledTableRow>
                                            <StyledTableCell>Activity</StyledTableCell>
                                            <StyledTableCell>Amount</StyledTableCell>
                                            <StyledTableCell>Options</StyledTableCell>
                                        </StyledTableRow>
                                    </TableHead>
                                    <TableBody>
                                        {listServices.map((row) => (
                                            <StyledTableRow key={row.id}>
                                                <StyledTableCell>{row.activity_name}</StyledTableCell>
                                                <StyledTableCell>{row.qty * row.rate}</StyledTableCell>
                                                <StyledTableCell size="small">
                                                    <Tooltip title="Delete">
                                                        <IconButton
                                                            onClick={() => {
                                                                handleClickDelete(row.id);
                                                            }}
                                                            color="error"
                                                        >
                                                            <DeleteForeverIcon />
                                                        </IconButton>
                                                    </Tooltip>
                                                </StyledTableCell>
                                            </StyledTableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                            <Grid item xs={12} mt={1} display="flex" justifyContent="center">
                                <Fab
                                    onClick={() => {
                                        setSeeForm(true);
                                    }}
                                    color="primary"
                                    size="small"
                                    component="span"
                                    aria-label="add"
                                >
                                    <AddOutlinedIcon />
                                </Fab>
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
                                    {'Confirm Delete'}
                                </DialogTitle>
                                <DialogContent>
                                    <DialogContentText id="alert-dialog-description">
                                        Are you sure you want to permanently delete this Service?
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
                        </SubCard>
                    </Grid>
                ) : (
                    <Grid item xs={12} lg={6}>
                        <SubCard title="Add Services">
                            <Grid container xs={12}>
                                <Grid item xs={12} sm={8} mb={2}>
                                    <TextField
                                        fullWidth
                                        required
                                        variant="outlined"
                                        label="Activity Name"
                                        name="activity_name"
                                        value={valuesServices.activity_name}
                                        onChange={handleInputServicesChange}
                                        error={Boolean(errorsServices.activity_name)}
                                        helperText={errorsServices.activity_name ? errorsServices.activity_name : ''}
                                    />
                                </Grid>
                                <Grid item xs={2} mb={2}>
                                    <TextField
                                        fullWidth
                                        required
                                        type="number"
                                        variant="outlined"
                                        label="Qty"
                                        name="qty"
                                        value={valuesServices.qty}
                                        onChange={handleInputServicesChange}
                                        error={Boolean(errorsServices.qty)}
                                        helperText={errorsServices.qty ? errorsServices.qty : ''}
                                    />
                                </Grid>
                                <Grid item xs={2} mb={2}>
                                    <TextField
                                        fullWidth
                                        required
                                        type="number"
                                        variant="outlined"
                                        label="Rate"
                                        name="rate"
                                        value={valuesServices.rate}
                                        onChange={handleInputServicesChange}
                                        error={Boolean(errorsServices.rate)}
                                        helperText={errorsServices.rate ? errorsServices.rate : ''}
                                    />
                                </Grid>
                                <Grid item xs={12} mb={2}>
                                    <TextField
                                        fullWidth
                                        required
                                        variant="outlined"
                                        label="Description"
                                        name="description"
                                        value={valuesServices.description}
                                        onChange={handleInputServicesChange}
                                        error={Boolean(errorsServices.description)}
                                        helperText={errorsServices.description ? errorsServices.description : ''}
                                    />
                                </Grid>
                            </Grid>
                            <Grid container xs={12}>
                                <Grid item display="flex" justifyContent="center" mt={3} xs={6}>
                                    <Button
                                        variant="contained"
                                        onClick={() => {
                                            setSeeForm(false);
                                        }}
                                        color="secondary"
                                        size="normal"
                                    >
                                        Cancel
                                    </Button>
                                </Grid>
                                <Grid item display="flex" justifyContent="center" mt={3} xs={6}>
                                    <Button type="submit" variant="contained" onClick={handleSubmitServices} color="primary" size="normal">
                                        Submit
                                    </Button>
                                </Grid>
                            </Grid>
                        </SubCard>
                    </Grid>
                )}
            </Grid>
        </MainCard>
    );
};

export default EditInvoice;
