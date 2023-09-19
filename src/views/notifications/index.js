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
import { loadNotifications } from 'store/actions/notifications';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import RemoveRedEyeSharpIcon from '@mui/icons-material/RemoveRedEyeSharp';
import { useNavigate } from 'react-router';

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
const NotificationsView = () => {
    //CONSTS
    const theme = useTheme();
    const [id, setId] = useState();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    //SELECTORS
    const notifications = useSelector((state) => state.notifications.all);
    const loading = useSelector((state) => state.notifications.loading);

    //STATES
    const [searched, setSearched] = useState('');
    const [list, setList] = useState(notifications);

    //EFECTS
    useEffect(() => {
        dispatch(loadNotifications());
    }, []);
    useEffect(() => {
        setList(notifications);
    }, [loading]);

    //FUNCTIONS
    const requestSearch = (e) => {
        setSearched(e.target.value);
        const filteredRows = notifications.filter((row) => {
            return row.identifier.toLowerCase().includes(e.target.value.toLowerCase());
        });
        setList(filteredRows);
    };

    //RETURN
    return (
        <MainCard title="Notifications">
            <Grid pt={0} container mb={1} mt={0} justifyContent="flex-end">
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
                <Table stickyHeader sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>Model</StyledTableCell>
                            <StyledTableCell>Document</StyledTableCell>
                            <StyledTableCell>Identifier</StyledTableCell>
                            <StyledTableCell>Expiration Date</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {list.map((row) => (
                            <StyledTableRow key={row.id}>
                                <StyledTableCell component="th" scope="row">
                                    {row.model}
                                </StyledTableCell>
                                <StyledTableCell>{row.field}</StyledTableCell>
                                <StyledTableCell>{row.identifier}</StyledTableCell>
                                <StyledTableCell>{row.exp_date}</StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </MainCard>
    );
};
export default NotificationsView;
