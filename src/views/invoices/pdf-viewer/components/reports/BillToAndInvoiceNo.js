import React, { Fragment } from 'react';
import { Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
    NoContainer: {
        flexDirection: 'row',
        marginTop: 26,
        borderTopColor: '#031491',
        paddingTop: 10,
        borderTopWidth: 2
    },
    DateContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    NormalContainer1: {
        flexDirection: 'row',
        justifyContent: 'flex-start'
    },
    NormalContainer2: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        paddingBottom: 15,
        borderBottomColor: '#031491',
        borderBottomWidth: 2
    },
    invoiceDate: {
        fontSize: 12,
        fontStyle: 'bold',
        textAlign: 'right'
    },
    invoiceNo: {
        fontSize: 12,
        fontStyle: 'bold',
        textAlign: 'right',
        marginLeft: 'auto'
    },
    label: {
        width: 60,
        color: '#031491'
    },
    terms: {
        width: 90,
        color: '#031491'
    },
    left: {
        marginRight: 'auto',
        marginLeft: 0,
        width: '200'
    },
    billTo: {
        marginLeft: 0,
        marginRight: 322,
        fontFamily: 'Helvetica-Oblique',
        color: '#031491'
    }
});

const InvoiceNo = ({ data }) => (
    <Fragment>
        <View style={styles.NoContainer}>
            <Text style={styles.billTo}>Bill To:</Text>
            <Text style={styles.label}>Invoice No:</Text>
            <Text style={styles.invoiceNo}>
                {data.invoice_number.toString().length === 1
                    ? '000'
                    : data.invoice_number.toString().length === 2
                    ? '00'
                    : data.invoice_number.toString().length === 3
                    ? '0'
                    : ''}
                {data.invoice_number}
            </Text>
        </View>
        <View style={styles.DateContainer}>
            <Text style={styles.left}>{data.name}</Text>
            <Text style={styles.label}>Date: </Text>
            <Text style={styles.invoiceDate}>{data.invoice_date}</Text>
        </View>
        <View style={styles.NormalContainer1}>
            <Text style={styles.left}>{data.address}</Text>
            <Text style={styles.terms}>TERMS: </Text>
            <Text style={styles.invoiceDate}>{data.terms}</Text>
        </View>
        <View style={styles.NormalContainer2}>
            <Text style={styles.left}>
                {data.city}, {data.state}, {data.zip_code}
            </Text>
            <Text style={styles.label}>Due Date: </Text>
            <Text style={styles.invoiceDate}>{data.due_date}</Text>
        </View>
    </Fragment>
);

export default InvoiceNo;
