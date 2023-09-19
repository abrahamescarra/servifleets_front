import React from 'react';

import { Page, Document, Image, StyleSheet } from '@react-pdf/renderer';
import InvoiceTitle from './InvoiceTitle';
import BillToAndInvoiceNo from './BillToAndInvoiceNo';
import InvoiceItemsTable from './InvoiceItemsTable';
import InvoiceThankYouMsg from './InvoiceThankYouMsg';
import InvoiceFooter from './InvoiceFooter';
import PickUpAndDelivery from './PickUpAndDelivery';

const styles = StyleSheet.create({
    page: {
        fontFamily: 'Helvetica',
        fontSize: 11,
        paddingTop: 30,
        paddingLeft: 60,
        paddingRight: 60,
        lineHeight: 1.5,
        flexDirection: 'column'
    },
    logo: {
        width: 74,
        height: 66,
        marginLeft: 'auto',
        marginRight: 'auto'
    }
});
const Invoice = ({ data, services }) => {
    return (
        <Document>
            {data === null || data.invoice_number === undefined || data === undefined || services === null || services === undefined ? (
                <></>
            ) : (
                <Page size="A4" style={styles.page}>
                    <InvoiceTitle title="Invoice" data={data} />
                    <BillToAndInvoiceNo data={data} />
                    <PickUpAndDelivery data={data} />
                    <InvoiceItemsTable services={services} data={data} />
                    <InvoiceThankYouMsg />
                    <InvoiceFooter data={data} />
                </Page>
            )}
        </Document>
    );
};

export default Invoice;
