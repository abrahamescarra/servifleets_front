import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { useTheme } from '@mui/material/styles';
import { Grid, Typography } from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';
import SkeletonTotalGrowthBarChart from 'ui-component/cards/Skeleton/TotalGrowthBarChart';
import { gridSpacing } from 'store/constant';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area } from 'recharts';

const TotalGrowthBarChart = ({ isLoading, values }) => {
    const theme = useTheme();

    return (
        <>
            {isLoading ? (
                <SkeletonTotalGrowthBarChart />
            ) : (
                <MainCard>
                    <Grid container spacing={gridSpacing}>
                        <Grid item xs={12}>
                            <Grid container alignItems="center" justifyContent="space-between">
                                <Grid item>
                                    <Grid container direction="column" spacing={1}>
                                        <Grid item>
                                            <Typography variant="h3">Earnings per Month</Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <ResponsiveContainer width="100%" height={315}>
                                <AreaChart margin={{ top: 20 }} data={values}>
                                    {/* GRADIENTS SECTION */}
                                    <defs>
                                        <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor={theme.palette.secondary.light} stopOpacity={0.8} />
                                            <stop offset="95%" stopColor={theme.palette.secondary.light} stopOpacity={0} />
                                        </linearGradient>
                                        <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor={theme.palette.secondary.main} stopOpacity={0.8} />
                                            <stop offset="95%" stopColor={theme.palette.secondary.main} stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    {/* AXIS DEFINITION */}
                                    <XAxis dataKey="name" axisLine={true} tickLine={true} />
                                    <YAxis
                                        allowDataOverflow={true}
                                        allowDecimals={true}
                                        dataKey="Earning"
                                        axisLine={true}
                                        tickLine={true}
                                        tickFormatter={(v) => `$${(Math.round(v * 100) / 100).toFixed(2)}`}
                                        // label={messages['charts.payments.y.label']}
                                    />
                                    <Tooltip labelStyle={{ color: 'black' }} />
                                    {/* <Tooltip payload={data} /> */}
                                    <Legend iconType="circle" />

                                    <Area
                                        dataKey="Earning"
                                        type="monotone"
                                        // dataKey='uv'
                                        fillOpacity={1}
                                        stroke={theme.palette.secondary.main}
                                        fill={theme.palette.secondary.light}
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        </Grid>
                    </Grid>
                </MainCard>
            )}
        </>
    );
};

TotalGrowthBarChart.propTypes = {
    isLoading: PropTypes.bool,
    values: PropTypes.array.isRequired
};

export default TotalGrowthBarChart;
