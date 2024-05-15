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
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import { IconSearch } from '@tabler/icons-react';
import { shouldForwardProp } from '@mui/system';
import { useTheme } from '@emotion/react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteCustomer, loadCustomers } from 'store/actions/customers';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import RemoveRedEyeSharpIcon from '@mui/icons-material/RemoveRedEyeSharp';
import { useNavigate } from 'react-router';
import '../../../assets/button_export.css';

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
const LightTooltip = styled(({ className, ...props }) => <Tooltip {...props} classes={{ popper: className }} />)(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
        backgroundColor: theme.palette.common.white,
        color: 'rgba(0, 0, 0, 0.87)',
        boxShadow: theme.shadows[1],
        fontSize: 11
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
const CustomersView = () => {
    //CONSTS
    const theme = useTheme();
    const [id, setId] = useState();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    //SELECTORS
    const customers = useSelector((state) => state.customers.list);
    const loading = useSelector((state) => state.customers.loading);

    //STATES
    const [searched, setSearched] = useState('');
    const [open, setOpen] = useState(false);
    const [list, setList] = useState(customers);

    //EFECTS
    useEffect(() => {
        dispatch(loadCustomers());
    }, []);
    useEffect(() => {
        setList(customers);
    }, [loading]);

    //HANDLERS
    const handleClickDelete = (id) => {
        setId(id);
        setOpen(true);
    };
    const handleCloseDelete = (bol) => {
        setOpen(false);
        if (bol) {
            dispatch(deleteCustomer(id));
        }
    };
    const handleClickView = (id) => {
        return navigate(`/customer/${id}/`);
    };

    //FUNCTIONS
    const requestSearch = (e) => {
        setSearched(e.target.value);
        const filteredRows = customers.filter((row) => {
            return row.name.toLowerCase().includes(e.target.value.toLowerCase());
        });
        setList(filteredRows);
    };

    //RETURN
    return (
        <MainCard title="Manage Customers">
            <Grid pt={0} container mb={1} mt={0} justifyContent="flex-end">
                <Grid item mt={0.5} mb={0.5}>
                    <ReactToExcel
                        table="table_customers"
                        filename="customers"
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
                <Table id="table_customers" stickyHeader sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>Name</StyledTableCell>
                            <StyledTableCell>Phone</StyledTableCell>
                            <StyledTableCell>Email</StyledTableCell>
                            <StyledTableCell>Address</StyledTableCell>
                            <StyledTableCell>City</StyledTableCell>
                            <StyledTableCell>State</StyledTableCell>
                            <StyledTableCell>ZIPCode</StyledTableCell>
                            <StyledTableCell>Terms</StyledTableCell>
                            <StyledTableCell>Options</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {list.map((row) => (
                            <StyledTableRow key={row.id}>
                                <StyledTableCell component="th" scope="row">
                                    {row.name}
                                </StyledTableCell>
                                <StyledTableCell>{row.phone}</StyledTableCell>
                                <StyledTableCell>{row.email}</StyledTableCell>
                                <StyledTableCell>{row.address}</StyledTableCell>
                                <StyledTableCell>{row.city}</StyledTableCell>
                                <StyledTableCell>{row.state}</StyledTableCell>
                                <StyledTableCell>{row.zip_code}</StyledTableCell>
                                <StyledTableCell>{row.terms}</StyledTableCell>
                                <StyledTableCell>
                                    {theme.palette.mode == 'dark' ? (
                                        <ButtonGroup variant="outlined" color="secondary">
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
                    {'Confirmar Eliminar'}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure you want to permanently delete this Customer?
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
export default CustomersView;
