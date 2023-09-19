import React from 'react';
import { View, StyleSheet } from '@react-pdf/renderer';
import InvoiceTableHeader from './InvoiceTableHeader';
import InvoiceTableRow from './InvoiceTableRow';
import InvoiceTableBlankSpace from './InvoiceTableBlankSpace';
import InvoiceTableFooter from './InvoiceTableFooter';

const tableRowsCount = 11;

const styles = StyleSheet.create({
    tableContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 24,
        borderWidth: 1,
        borderColor: '#bff0fd'
    }
});

const InvoiceItemsTable = ({ services, data }) => (
    <View style={styles.tableContainer}>
        <InvoiceTableHeader />
        <InvoiceTableRow items={services} data={data} />
        <InvoiceTableBlankSpace rowsCount={tableRowsCount - services.length} />
        <InvoiceTableFooter items={services} data={data} />
    </View>
);

export default InvoiceItemsTable;
