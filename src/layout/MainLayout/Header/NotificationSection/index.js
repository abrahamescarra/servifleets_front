import { useState, useRef, useEffect } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import {
    Avatar,
    Badge,
    Box,
    Button,
    ButtonBase,
    CardActions,
    ClickAwayListener,
    Divider,
    Grid,
    Paper,
    Popper,
    Typography,
    useMediaQuery
} from '@mui/material';

// third-party
import PerfectScrollbar from 'react-perfect-scrollbar';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import Transitions from 'ui-component/extended/Transitions';
import NotificationList from './NotificationList';

import { useNavigate } from 'react-router-dom';
// assets
import { IconBell } from '@tabler/icons-react';
import { useDispatch, useSelector } from 'react-redux';
import { markAllReaded } from 'store/actions/notifications';

// ==============================|| NOTIFICATION ||============================== //

const NotificationSection = () => {
    const navigate = useNavigate();
    const notReaded = useSelector((state) => state.notifications.notReaded);
    const theme = useTheme();
    const matchesXs = useMediaQuery(theme.breakpoints.down('md'));
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const darkMode = useSelector((state) => state.customization.dark);
    /**
     * anchorRef is used on different componets and specifying one type leads to other components throwing an error
     * */
    const anchorRef = useRef(null);

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }
        setOpen(false);
    };

    const prevOpen = useRef(open);
    useEffect(() => {
        if (prevOpen.current === true && open === false) {
            anchorRef.current.focus();
        }
        prevOpen.current = open;
    }, [open]);

    return (
        <>
            <Box
                sx={{
                    ml: 2,
                    mr: 3,
                    [theme.breakpoints.down('md')]: {
                        mr: 2
                    }
                }}
            >
                <ButtonBase sx={{ borderRadius: '12px' }}>
                    <Badge badgeContent={notReaded.length} color="error">
                        <Avatar
                            variant="rounded"
                            sx={{
                                ...theme.typography.commonAvatar,
                                ...theme.typography.mediumAvatar,
                                transition: 'all .2s ease-in-out',
                                background: darkMode ? theme.palette.secondary.dark : theme.palette.secondary.light,
                                color: darkMode ? theme.palette.secondary.light : theme.palette.secondary.dark,
                                '&[aria-controls="menu-list-grow"],&:hover': {
                                    background: theme.palette.secondary.dark,
                                    color: theme.palette.secondary.light
                                }
                            }}
                            ref={anchorRef}
                            aria-controls={open ? 'menu-list-grow' : undefined}
                            aria-haspopup="true"
                            onClick={handleToggle}
                            color="inherit"
                        >
                            <IconBell stroke={1.5} size="1.3rem" />
                        </Avatar>
                    </Badge>
                </ButtonBase>
            </Box>
            <Popper
                placement={matchesXs ? 'bottom' : 'bottom-end'}
                open={open}
                anchorEl={anchorRef.current}
                role={undefined}
                transition
                disablePortal
                popperOptions={{
                    modifiers: [
                        {
                            name: 'offset',
                            options: {
                                offset: [matchesXs ? 5 : 0, 20]
                            }
                        }
                    ]
                }}
            >
                {({ TransitionProps }) => (
                    <Transitions position={matchesXs ? 'top' : 'top-right'} in={open} {...TransitionProps}>
                        <Paper>
                            <ClickAwayListener onClickAway={handleClose}>
                                <MainCard border={false} elevation={16} content={false} boxShadow shadow={theme.shadows[16]}>
                                    <Grid container direction="column" spacing={2}>
                                        <Grid item xs={12}>
                                            <Grid container alignItems="center" justifyContent="space-between" sx={{ pt: 2, px: 2 }}>
                                                <Grid item></Grid>
                                                <Grid item>
                                                    <Typography
                                                        component={Button}
                                                        onClick={() => {
                                                            dispatch(markAllReaded());
                                                        }}
                                                        variant="subtitle2"
                                                        color="primary"
                                                    >
                                                        Mark as all read
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                        <Divider />
                                        <Grid item xs={12}>
                                            <PerfectScrollbar
                                                style={{ height: '100%', maxHeight: 'calc(100vh - 205px)', overflowX: 'hidden' }}
                                            >
                                                <NotificationList />
                                            </PerfectScrollbar>
                                        </Grid>
                                    </Grid>
                                    <Divider />
                                    <CardActions sx={{ p: 1.25, justifyContent: 'center' }}>
                                        <Button
                                            onClick={() => {
                                                navigate('/notifications');
                                            }}
                                            size="small"
                                            disableElevation
                                        >
                                            View All
                                        </Button>
                                    </CardActions>
                                </MainCard>
                            </ClickAwayListener>
                        </Paper>
                    </Transitions>
                )}
            </Popper>
        </>
    );
};

export default NotificationSection;
