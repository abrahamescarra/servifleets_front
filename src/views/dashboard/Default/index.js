import { useEffect, useState } from 'react';

// material-ui
import { Grid } from '@mui/material';

// project imports
import TotalEarningCard from './TotalEarningCard';
import PopularCard from './PopularCard';
import MonthlyYearlyEarnings from './MonthlyYearlyEarnings';
import FulfilledOrders from './FulfilledOrders';
import TotalGrowthBarChart from './TotalGrowthBarChart';
import { gridSpacing } from 'store/constant';
import { loadDashBoardData } from 'store/actions/dashboard';
import { useDispatch, useSelector } from 'react-redux';
import customers from 'store/reducers/customersReducer';
// ==============================|| DEFAULT DASHBOARD ||============================== //

const Dashboard = () => {
    //Consts
    const [isLoading, setLoading] = useState(true);
    const dispatch = useDispatch();
    //Selectors
    const dataState = useSelector((state) => state.dashboard.data);
    useEffect(() => {
        setLoading(false);
        dispatch(loadDashBoardData());
    }, []);
    useEffect(() => {
        console.log(dataState);
    }, [dataState]);

    return (
        <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
                <Grid container spacing={gridSpacing}>
                    <Grid item lg={4} md={6} sm={6} xs={12}>
                        <TotalEarningCard isLoading={isLoading} value={dataState ? dataState.total_earnings : 0} />
                    </Grid>
                    <Grid item lg={4} md={6} sm={6} xs={12}>
                        <MonthlyYearlyEarnings
                            isLoading={isLoading}
                            monthly={dataState ? dataState.monthly_earnings : 0}
                            yearly={dataState ? dataState.yearly_earnings : 0}
                        />
                    </Grid>
                    <Grid item lg={4} md={12} xs={12}>
                        <FulfilledOrders
                            isLoading={isLoading}
                            monthly={dataState ? dataState.num_monthly_orders : 0}
                            yearly={dataState ? dataState.num_yearly_orders : 0}
                        />
                    </Grid>
                    {/* <Grid item lg={4} md={12} sm={12} xs={12}>
                        <Grid container spacing={gridSpacing}>
                            <Grid item sm={6} xs={12} md={6} lg={12}>
                                <TotalIncomeDarkCard isLoading={isLoading} />
                            </Grid>
                            <Grid item sm={6} xs={12} md={6} lg={12}>
                                <TotalIncomeLightCard isLoading={isLoading} />
                            </Grid>
                        </Grid>
                    </Grid> */}
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <Grid container spacing={gridSpacing}>
                    <Grid item xs={12} md={8}>
                        {dataState && !isLoading && dataState?.earnings_per_month && (
                            <TotalGrowthBarChart isLoading={isLoading} values={dataState?.earnings_per_month} />
                        )}
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <PopularCard
                            isLoading={isLoading}
                            customers={dataState ? dataState.customers : 0}
                            trailers={dataState ? dataState.trailers : 0}
                            trucks={dataState ? dataState.trucks : 0}
                            loads={dataState ? dataState.loads : 0}
                            drivers={dataState ? dataState.drivers : 0}
                        />
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default Dashboard;
