import React from 'react';
import { Text, View, StyleSheet, Image } from '@react-pdf/renderer';

const styles = StyleSheet.create({
    titleContainer: {
        flexDirection: 'row',
        marginTop: 24
    },
    reportTitle: {
        color: '#031491',
        letterSpacing: 2,
        fontSize: 30,
        textAlign: 'left',
        marginVertical: 'auto',
        textTransform: 'uppercase',
        fontStyle: 'bold'
    },
    logo: {
        width: 74,
        height: 66,
        marginLeft: 'auto',
        marginRight: 20
    }
});

const InvoiceTitle = ({ title, data }) => (
    <View style={styles.titleContainer}>
        <Text style={styles.reportTitle}>{title}</Text>
        {data === null ? <></> : data.logo ? <Image style={styles.logo} src={data.logo} /> : <></>}
    </View>
);

export default InvoiceTitle;
