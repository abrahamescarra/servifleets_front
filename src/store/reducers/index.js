import { combineReducers } from 'redux';
import customers from './customersReducer';
// reducer import
import customizationReducer from './customizationReducer';
import authReducer from './authReducer';
import trucksReducer from './trucksReducer';
import trailersReducer from './trailersReducer';
import loadsReducer from './loadsReducer';
import driversReducer from './driversReducer';
import notificationsReducer from './notificationsReducer';
import factoringReducer from './factoringReducer';
import invoicesReducer from './invoicesReducer';
import servicesReducer from './servicesReducer';
import dashboardReducer from './dashboardReducer';
// ==============================|| COMBINE REDUCER ||============================== //

const reducer = combineReducers({
    customization: customizationReducer,
    customers: customers,
    auth: authReducer,
    trucks: trucksReducer,
    trailers: trailersReducer,
    loads: loadsReducer,
    drivers: driversReducer,
    notifications: notificationsReducer,
    invoices: invoicesReducer,
    factoring: factoringReducer,
    services: servicesReducer,
    dashboard: dashboardReducer
});

export default reducer;
