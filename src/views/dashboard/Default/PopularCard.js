import PropTypes from 'prop-types';
import { useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Button, CardContent, Divider, Grid, Typography } from '@mui/material';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import SkeletonPopularCard from 'ui-component/cards/Skeleton/PopularCard';
import { gridSpacing } from 'store/constant';

// assets
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import RvHookupOutlinedIcon from '@mui/icons-material/RvHookupOutlined';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import AirlineSeatReclineNormalOutlinedIcon from '@mui/icons-material/AirlineSeatReclineNormalOutlined';
import { useNavigate } from 'react-router';

// ==============================|| DASHBOARD DEFAULT - POPULAR CARD ||============================== //

const PopularCard = ({ isLoading, customers, trailers, trucks, loads, drivers }) => {
    const navigate = useNavigate();
    return (
        <>
            {isLoading ? (
                <SkeletonPopularCard />
            ) : (
                <MainCard content={false}>
                    <CardContent>
                        <Grid container>
                            <Grid item xs={12} mb={2}>
                                <Grid container alignContent="center" pb={1} justifyContent="space-between">
                                    <Grid item>
                                        <Typography variant="h4">Business Information</Typography>
                                    </Grid>
                                </Grid>
                                <Divider />
                            </Grid>
                            <Grid item xs={12}>
                                <Grid container direction="column" py={1.5}>
                                    <Grid item>
                                        <Grid container alignItems="center" justifyContent="space-between">
                                            <Grid item>
                                                <Button
                                                    variant="text"
                                                    onClick={() => {
                                                        navigate('/customers');
                                                    }}
                                                    color="secondary"
                                                    size="large"
                                                    startIcon={<GroupOutlinedIcon />}
                                                >
                                                    Customers
                                                </Button>
                                            </Grid>
                                            <Grid item>
                                                <Grid container alignItems="center" justifyContent="space-between">
                                                    <Grid item>
                                                        <Typography variant="subtitle1" color="inherit">
                                                            {customers}
                                                        </Typography>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Divider />
                            </Grid>
                            <Grid item xs={12}>
                                <Grid container direction="column" py={1.5}>
                                    <Grid item>
                                        <Grid container alignItems="center" justifyContent="space-between">
                                            <Grid item>
                                                <Button
                                                    variant="text"
                                                    color="secondary"
                                                    size="large"
                                                    startIcon={<LocalShippingOutlinedIcon />}
                                                    onClick={() => {
                                                        navigate('/trucks');
                                                    }}
                                                >
                                                    Trucks
                                                </Button>
                                            </Grid>
                                            <Grid item>
                                                <Grid container alignItems="center" justifyContent="space-between">
                                                    <Grid item>
                                                        <Typography variant="subtitle1" color="inherit">
                                                            {trucks}
                                                        </Typography>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Divider />
                            </Grid>
                            <Grid item xs={12}>
                                <Grid container direction="column" py={1.5}>
                                    <Grid item>
                                        <Grid container alignItems="center" justifyContent="space-between">
                                            <Grid item>
                                                <Button
                                                    variant="text"
                                                    onClick={() => {
                                                        navigate('/trailers');
                                                    }}
                                                    color="secondary"
                                                    size="large"
                                                    startIcon={<RvHookupOutlinedIcon />}
                                                >
                                                    Trailers
                                                </Button>
                                            </Grid>
                                            <Grid item>
                                                <Grid container alignItems="center" justifyContent="space-between">
                                                    <Grid item>
                                                        <Typography variant="subtitle1" color="inherit">
                                                            {trailers}
                                                        </Typography>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Divider />
                            </Grid>
                            <Grid item xs={12}>
                                <Grid container direction="column" py={1.5}>
                                    <Grid item>
                                        <Grid container alignItems="center" justifyContent="space-between">
                                            <Grid item>
                                                <Button
                                                    variant="text"
                                                    color="secondary"
                                                    size="large"
                                                    startIcon={<AirlineSeatReclineNormalOutlinedIcon />}
                                                    onClick={() => {
                                                        navigate('/drivers');
                                                    }}
                                                >
                                                    Drivers
                                                </Button>
                                            </Grid>
                                            <Grid item>
                                                <Grid container alignItems="center" justifyContent="space-between">
                                                    <Grid item>
                                                        <Typography variant="subtitle1" color="inherit">
                                                            {drivers}
                                                        </Typography>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Divider />
                            </Grid>
                            <Grid item xs={12}>
                                <Grid container direction="column" pt={1}>
                                    <Grid item>
                                        <Grid container alignItems="center" justifyContent="space-between">
                                            <Grid item>
                                                <Button
                                                    variant="text"
                                                    color="secondary"
                                                    size="large"
                                                    startIcon={<Inventory2OutlinedIcon />}
                                                    onClick={() => {
                                                        navigate('/loads');
                                                    }}
                                                >
                                                    Loads
                                                </Button>
                                            </Grid>
                                            <Grid item>
                                                <Grid container alignItems="center" justifyContent="space-between">
                                                    <Grid item>
                                                        <Typography variant="subtitle1" color="inherit">
                                                            {loads}
                                                        </Typography>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </CardContent>
                </MainCard>
            )}
        </>
    );
};

PopularCard.propTypes = {
    isLoading: PropTypes.bool
};

export default PopularCard;
