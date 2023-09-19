import React from 'react';
import MainLayout from 'layout/MainLayout';
import DashboardDefault from 'views/dashboard/Default';
import Drivers from 'views/drivers/add-driver';
// sample page routing
import CustomersView from 'views/customers/customers-view';
import ModCustomerView from 'views/customers/mod-customer';
import TrucksView from 'views/trucks/trucks-view';
import InvoicesView from 'views/invoices/invoices-view';
import ModTruckView from 'views/trucks/mod-truck';
import TrailersView from 'views/trailers/trailers-view';
import ModTrailerView from 'views/trailers/mod-trailer';
import ModInvoiceView from 'views/invoices/mod-invoice';
import LoadsView from 'views/loads/loads-view';
import ModLoadView from 'views/loads/mod-load';
import DriversView from 'views/drivers/drivers-view';
import ModDriverView from 'views/drivers/mod-driver';
import AddDriver from 'views/drivers/add-driver';
import AddTruck from 'views/trucks/add-truck';
import AddTrailer from 'views/trailers/add-trailer';
import AddInvoice from 'views/invoices/add-invoice';
import AddLoad from 'views/loads/add-load';
import AddCustomer from 'views/customers/add-customer';
import Notifications from 'views/notifications';
import Factoring from 'views/factoring';
import Profile from 'views/profile';
import AuthLogin3 from 'views/login/Login';
import MinimalLayout from 'layout/MinimalLayout';
import InvoicePDFViewer from 'views/invoices/pdf-viewer';

const routes = [
    {
        path: '/',
        element: <MainLayout />,
        children: [
            {
                path: '/',
                element: <DashboardDefault />
            },
            {
                path: '/safety/drivers',
                element: <Drivers />
            },
            {
                path: '/customers',
                element: <CustomersView />
            },
            {
                path: '/trucks',
                element: <TrucksView />
            },
            {
                path: '/invoices',
                element: <InvoicesView />
            },
            {
                path: '/trailers',
                element: <TrailersView />
            },
            {
                path: '/loads',
                element: <LoadsView />
            },
            {
                path: '/drivers',
                element: <DriversView />
            },
            {
                path: '/customer/:id',
                element: <ModCustomerView />
            },
            {
                path: '/truck/:id',
                element: <ModTruckView />
            },
            {
                path: '/addInvoice/:id',
                element: <AddInvoice />
            },
            {
                path: '/trucks',
                element: <TrucksView />
            },
            {
                path: '/trailers',
                element: <TrailersView />
            },
            {
                path: '/trailer/:id',
                element: <ModTrailerView />
            },
            {
                path: '/invoice/:id',
                element: <ModInvoiceView />
            },
            {
                path: '/loads',
                element: <LoadsView />
            },
            {
                path: '/drivers',
                element: <DriversView />
            },
            {
                path: '/addDriver',
                element: <AddDriver />
            },
            {
                path: '/addInvoice',
                element: <AddInvoice />
            },
            {
                path: '/driver/:id',
                element: <ModDriverView />
            },
            {
                path: '/addTruck',
                element: <AddTruck />
            },
            {
                path: '/addCustomer',
                element: <AddCustomer />
            },
            {
                path: '/addTrailer',
                element: <AddTrailer />
            },
            {
                path: '/addLoad',
                element: <AddLoad />
            },
            {
                path: '/load/:id',
                element: <ModLoadView />
            },
            {
                path: '/notifications',
                element: <Notifications />
            },
            {
                path: '/factoring',
                element: <Factoring />
            },
            {
                path: '/profile',
                element: <Profile />
            },
            {
                path: '/viewInvoicePDF/:id',
                element: <InvoicePDFViewer />
            }
        ]
    },
    {
        path: '/login',
        element: <AuthLogin3 />
    }
];

export default routes;
