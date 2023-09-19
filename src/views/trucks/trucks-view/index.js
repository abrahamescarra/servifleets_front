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
    Box,
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
    OutlinedInput,
    TextField
} from '@mui/material';
import { IconSearch } from '@tabler/icons';
import { shouldForwardProp } from '@mui/system';
import { useTheme } from '@emotion/react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteTruck, loadTrucks } from 'store/actions/trucks';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import RemoveRedEyeSharpIcon from '@mui/icons-material/RemoveRedEyeSharp';
import { useNavigate } from 'react-router';
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
const TrucksView = () => {
    //CONSTS
    const theme = useTheme();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    //SELECTORS
    const trucks = useSelector((state) => state.trucks.list);
    const loading = useSelector((state) => state.trucks.loading);

    //STATES
    const [searched, setSearched] = useState('');
    const [id, setId] = useState();
    const [open, setOpen] = useState(false);
    const [list, setList] = useState(trucks);

    //EFECTS
    useEffect(() => {
        dispatch(loadTrucks());
    }, []);
    useEffect(() => {
        setList(trucks);
    }, [loading]);

    //HANDLERS
    const handleClickDelete = (id) => {
        setId(id);
        setOpen(true);
    };
    const handleCloseDelete = (bol) => {
        setOpen(false);
        if (bol) {
            dispatch(deleteTruck(id));
        }
    };
    const handleClickView = (id) => {
        return navigate(`/truck/${id}/`);
    };

    //FUNCTIONS
    const requestSearch = (e) => {
        setSearched(e.target.value);
        const filteredRows = trucks.filter((row) => {
            return row.name.toLowerCase().includes(e.target.value.toLowerCase());
        });
        setList(filteredRows);
    };

    //RETURN
    return (
        <MainCard title="Manage Trucks">
            <Grid pt={0} container mb={1} mt={0} justifyContent="flex-end">
                <Grid item mt={0.5} mb={0.5}>
                    <ReactToExcel
                        table="table_trucks"
                        filename="trucks"
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
                <Table id="table_trucks" stickyHeader sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>Number</StyledTableCell>
                            <StyledTableCell>Year</StyledTableCell>
                            <StyledTableCell>Brand</StyledTableCell>
                            <StyledTableCell>VIN Number</StyledTableCell>
                            <StyledTableCell>Options</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {list.map((row) => (
                            <StyledTableRow key={row.id}>
                                <StyledTableCell component="th" scope="row">
                                    {row.number}
                                </StyledTableCell>
                                <StyledTableCell>{row.year}</StyledTableCell>
                                <StyledTableCell>{row.brand}</StyledTableCell>
                                <StyledTableCell>{row.vin_number}</StyledTableCell>

                                <StyledTableCell>
                                    <ButtonGroup variant="outlined" color="secondary">
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
                                    </ButtonGroup>
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
                        Are you sure you want to permanently delete this Truck?
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
export default TrucksView;
