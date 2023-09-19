import React, { Fragment } from 'react';
import { Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
    NoContainer: {
        flexDirection: 'row',
        marginTop: 10
    },
    DateContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        borderBottom: '#031491',
        marginBottom: 10,
        borderBottomWidth: 2,
        paddingBottom: 10
    },

    invoiceDate: {
        fontSize: 12,
        fontStyle: 'bold',
        width: 200,
        textAlign: 'right'
    },
    label: {
        width: 200,
        color: '#031491',
        fontFamily: 'Helvetica-Oblique',
        textAlign: 'right'
    },
    left: {
        marginRight: 'auto',
        marginLeft: 0,
        width: 200
    },
    billTo: {
        marginLeft: 0,
        marginRight: 322,
        fontFamily: 'Helvetica-Oblique',
        color: '#031491'
    }
});

const PickUpAndDelivery = ({ data }) => (
    <Fragment>
        <View style={styles.NoContainer}>
            <Text style={styles.billTo}>Consignor:</Text>
            <Text style={styles.label}>Consignee Ship to:</Text>
        </View>
        <View style={styles.DateContainer}>
            <Text style={styles.left}>{data.pickup}</Text>
            <Text style={styles.invoiceDate}>{data.delivery}</Text>
        </View>
    </Fragment>
);

export default PickUpAndDelivery;
