import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import MainCard from 'ui-component/cards/MainCard';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import '../../../assets/button_export.css';
import ReactToExcel from 'react-html-table-to-excel';
import {
    Button,
    ButtonGroup,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Grid,
    IconButton,
    InputAdornment,
    OutlinedInput
} from '@mui/material';
import { IconSearch } from '@tabler/icons';
import { shouldForwardProp } from '@mui/system';
import { useTheme } from '@emotion/react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteInvoice, editInvoice, loadInvoices, sendInvoice } from 'store/actions/invoices';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import RemoveRedEyeSharpIcon from '@mui/icons-material/RemoveRedEyeSharp';
import { useNavigate } from 'react-router';
import AssignmentTurnedInOutlinedIcon from '@mui/icons-material/AssignmentTurnedInOutlined';
import { loadLoads } from 'store/actions/loads';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';

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
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0
    }
}));
const LightTooltip = styled(({ className, ...props }) => <Tooltip {...props} classes={{ popper: className }} />)(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
        backgroundColor: theme.palette.common.white,
        color: 'rgba(0, 0, 0, 0.87)',
        boxShadow: theme.shadows[1],
        fontSize: 11
    }
}));

const OutlineInputStyle = styled(OutlinedInput, { shouldForwardProp })(({ theme }) => ({
    width: 434,
    marginLeft: 16,
    paddingLeft: 16,
    paddingRight: 16,
    marginTop: 0,
    '& input': {
        background: 'transparent !important',
        paddingLeft: '4px !important'
    },
    [theme.breakpoints.down('lg')]: {
        width: 250
    },
    [theme.breakpoints.down('md')]: {
        width: '100%',
        marginLeft: 4,
        background: '#fff'
    }
}));
//

//COMPONENT
const InvoicesView = () => {
    //CONSTS
    const theme = useTheme();
    const [id, setId] = useState();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    //SELECTORS
    const invoices = useSelector((state) => state.invoices.list);
    const loads = useSelector((state) => state.loads.list);

    //STATES
    const [searched, setSearched] = useState('');
    const [open, setOpen] = useState(false);
    const [listLoads, setListLoads] = useState(loads);
    const [list, setList] = useState(invoices);

    //EFECTS
    useEffect(() => {
        dispatch(loadInvoices());
        dispatch(loadLoads());
    }, []);
    useEffect(() => {
        setList(invoices);
    }, [invoices]);
    useEffect(() => {
        setListLoads(loads);
    }, [loads]);
    //HANDLERS
    const handleClickDelete = (id) => {
        setId(id);
        setOpen(true);
    };

    const handleCloseDelete = (bol) => {
        let invoice;
        let load;
        for (let i = 0; i < list.length; i++) {
            if (list[i].id == id) invoice = list[i];
        }
        for (let i = 0; i < listLoads.length; i++) {
            if (listLoads[i].id == invoice.load) load = listLoads[i];
        }
        setOpen(false);
        if (bol) {
            dispatch(deleteInvoice(id, load));
        }
    };

    const handleClickView = (id) => {
        return navigate(`/invoice/${id}/`);
    };

    //FUNCTIONS
    const requestSearch = (e) => {
        setSearched(e.target.value);
        const filteredRows = invoices.filter((row) => {
            return row.id.toString().toLowerCase().includes(e.target.value.toLowerCase());
        });
        setList(filteredRows);
    };

    //RETURN
    return (
        <MainCard title="Manage Invoices">
            <Grid pt={0} container mb={1} mt={0} justifyContent="flex-end">
                <Grid item mt={0.5} mb={0.5}>
                    <ReactToExcel
                        table="table_invoices"
                        filename="invoices"
                        className={theme.palette.mode == 'dark' ? 'button_dark' : 'button_light'}
                        sheet="sheet 1"
                        buttonText="Export Data"
                    />
                </Grid>
                <OutlineInputStyle
                    id="input-search-header"
                    value={searched}
                    onChange={requestSearch}
                    placeholder="Search"
                    startAdornment={
                        <InputAdornment position="start">
                            <IconSearch stroke={1.5} size="1rem" color={theme.palette.grey[500]} />
                        </InputAdornment>
                    }
                    aria-describedby="search-helper-text"
                    inputProps={{ 'aria-label': 'weight' }}
                />
            </Grid>
            <TableContainer component={Paper} sx={{ maxHeight: 440 }}>
                <Table id="table_invoices" stickyHeader sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>Number</StyledTableCell>
                            <StyledTableCell>Service Date</StyledTableCell>
                            <StyledTableCell>Invoice Date</StyledTableCell>
                            {/* <StyledTableCell>Load</StyledTableCell>
                            <StyledTableCell>Customer</StyledTableCell> */}
                            <StyledTableCell>Paid</StyledTableCell>
                            <StyledTableCell>Options</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {list.map((row) => (
                            <StyledTableRow key={row.id}>
                                <StyledTableCell component="th" scope="row">
                                    {row.id.toString().length === 1
                                        ? '000'
                                        : row.id.toString().length === 2
                                        ? '00'
                                        : row.id.toString().length === 3
                                        ? '0'
                                        : ''}
                                    {row.id}
                                </StyledTableCell>
                                <StyledTableCell>{row.service_date}</StyledTableCell>
                                <StyledTableCell>{row.invoice_date}</StyledTableCell>
                                {/* <StyledTableCell>{row.load.load_number}</StyledTableCell>
                                <StyledTableCell>{row.customer}</StyledTableCell> */}
                                <StyledTableCell>{row.paid ? 'Yes' : 'No'}</StyledTableCell>
                                <StyledTableCell>
                                    {theme.palette.mode == 'dark' ? (
                                        <ButtonGroup variant="outlined" color="secondary">
                                            {row.paid ? (
                                                <LightTooltip title="Already Paid">
                                                    <span>
                                                        <IconButton disabled color="success">
                                                            <AssignmentTurnedInOutlinedIcon />
                                                        </IconButton>
                                                    </span>
                                                </LightTooltip>
                                            ) : (
                                                <LightTooltip title="Set Paid">
                                                    <IconButton
                                                        onClick={() => {
                                                            dispatch(editInvoice({ ...row, paid: true }, row.id, true));
                                                        }}
                                                        color="success"
                                                    >
                                                        <AssignmentTurnedInOutlinedIcon />
                                                    </IconButton>
                                                </LightTooltip>
                                            )}
                                            <LightTooltip title="View/Edit">
                                                <IconButton
                                                    onClick={() => {
                                                        handleClickView(row.id);
                                                    }}
                                                    color="primary"
                                                >
                                                    <RemoveRedEyeSharpIcon />
                                                </IconButton>
                                            </LightTooltip>
                                            <LightTooltip title="Delete">
                                                <IconButton
                                                    onClick={() => {
                                                        handleClickDelete(row.id);
                                                    }}
                                                    color="error"
                                                >
                                                    <DeleteForeverIcon />
                                                </IconButton>
                                            </LightTooltip>
                                        </ButtonGroup>
                                    ) : (
                                        <ButtonGroup variant="outlined" color="secondary">
                                            {row.paid ? (
                                                <Tooltip title="Already Paid">
                                                    <span>
                                                        <IconButton disabled color="success">
                                                            <AssignmentTurnedInOutlinedIcon />
                                                        </IconButton>
                                                    </span>
                                                </Tooltip>
                                            ) : (
                                                <Tooltip title="Set Paid">
                                                    <IconButton
                                                        onClick={() => {
                                                            dispatch(editInvoice({ ...row, paid: true }, row.id, true));
                                                        }}
                                                        color="success"
                                                    >
                                                        <AssignmentTurnedInOutlinedIcon />
                                                    </IconButton>
                                                </Tooltip>
                                            )}
                                            <Tooltip title="View/Edit">
                                                <IconButton
                                                    onClick={() => {
                                                        handleClickView(row.id);
                                                    }}
                                                    color="primary"
                                                >
                                                    <RemoveRedEyeSharpIcon />
                                                </IconButton>
                                            </Tooltip>
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
                                        </ButtonGroup>
                                    )}
                                </StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
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
                        Are you sure you want to permanently delete this Invoice?
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
export default InvoicesView;
