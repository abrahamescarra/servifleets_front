import React, { Component, Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PDFViewer } from '@react-pdf/renderer';
import Invoice from './components/reports/Invoice';
import { useParams } from 'react-router';
import { getAllDataInvoice } from 'store/actions/invoices';
import { loadServices } from 'store/actions/services';

const InvoiceViewer = () => {
    //Consts
    let { id } = useParams();
    const dispatch = useDispatch();

    //Selectors
    const all_data = useSelector((state) => state.invoices.all_data);
    const services = useSelector((state) => state.services.list);
    const logo = useSelector((state) => state.auth.user.logo);
    //States
    const [data, setData] = useState(null);
    const [listServices, setListServices] = useState(null);

    //Effects
    useEffect(() => {
        dispatch(getAllDataInvoice(id));
        dispatch(loadServices(id));
    }, []);

    useEffect(() => {
        if (all_data !== null) {
            setData(all_data);
        }
    }, [all_data]);

    useEffect(() => {
        if (services !== null) {
            setListServices(services);
        }
    }, [services]);

    return (
        <Fragment>
            <PDFViewer width="100%" height="1000" className="app">
                {data === null || listServices === null ? <></> : <Invoice data={{ ...data, logo }} services={listServices} />}
            </PDFViewer>
        </Fragment>
    );
};

export default InvoiceViewer;
