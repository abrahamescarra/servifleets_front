import React from 'react';
import { Text, View, StyleSheet, Link } from '@react-pdf/renderer';

const styles = StyleSheet.create({
    titleContainer: {
        flexDirection: 'column',
        marginTop: 'auto',
        marginBottom: 30,
        alignContent: 'center',
        alignItems: 'center',
        textAlign: 'center'
    },
    reportTitle: {
        fontSize: 12,
        textAlign: 'center',
        marginLeft: 'auto',
        marginRight: 'auto',
        width: 250
    }
});

const InvoiceFooter = ({ data }) => (
    <View style={styles.titleContainer}>
        <Text style={styles.reportTitle}>{data.company_name}</Text>
        <Text style={styles.reportTitle}>{data.company_address}</Text>
        <Link>{data.email}</Link>
    </View>
);

export default InvoiceFooter;
