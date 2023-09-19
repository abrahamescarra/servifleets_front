import React, { Fragment } from 'react';
import { Text, View, StyleSheet } from '@react-pdf/renderer';

const borderColor = '#90e5fc';
const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        borderBottomColor: '#bff0fd',
        borderBottomWidth: 1,
        alignItems: 'center',
        height: 24,
        fontStyle: 'bold'
    },
    dualrow: {
        flexDirection: 'row',
        borderBottomColor: '#bff0fd',
        borderBottomWidth: 1,
        alignItems: 'center',
        height: 40,
        fontStyle: 'bold',
        paddingTop: 2
    },
    activity: {
        width: '25%',
        textAlign: 'left',
        borderRightColor: borderColor,
        borderRightWidth: 1,
        paddingLeft: 8
    },
    description: {
        width: '40%',
        borderRightColor: borderColor,
        borderRightWidth: 1,
        textAlign: 'right',
        paddingRight: 8
    },
    qty: {
        width: '5%',
        borderRightColor: borderColor,
        borderRightWidth: 1,
        textAlign: 'right',
        paddingRight: 8
    },
    rate: {
        width: '15%',
        borderRightColor: borderColor,
        borderRightWidth: 1,
        textAlign: 'right',
        paddingRight: 8
    },
    amount: {
        width: '15%',
        textAlign: 'right',
        paddingRight: 8
    }
});

const InvoiceTableRow = ({ items, data }) => {
    const rows = items.map((item) => (
        <>
            {item.activity_name.length >= 18 || item.description.length > 31 ? (
                <View style={styles.dualrow} key={item.id.toString()}>
                    <Text style={styles.activity}>{item.activity_name}</Text>
                    <Text style={styles.description}>{item.description}</Text>
                    <Text style={styles.qty}>{item.qty}</Text>
                    <Text style={styles.rate}>{item.rate}</Text>
                    <Text style={styles.amount}>{(item.qty * item.rate).toFixed(2)}</Text>
                </View>
            ) : (
                <View style={styles.row} key={item.id.toString()}>
                    <Text style={styles.activity}>{item.activity_name}</Text>
                    <Text style={styles.description}>{item.description}</Text>
                    <Text style={styles.qty}>{item.qty}</Text>
                    <Text style={styles.rate}>{item.rate}</Text>
                    <Text style={styles.amount}>{(item.qty * item.rate).toFixed(2)}</Text>
                </View>
            )}
        </>
    ));
    return (
        <Fragment>
            {data.description.length > 31 ? (
                <View style={styles.dualrow}>
                    <Text style={styles.activity}>LOAD {data.load_number}</Text>
                    <Text style={styles.description}>{data.description}</Text>
                    <Text style={styles.qty}>1</Text>
                    <Text style={styles.rate}>{data.rate}</Text>
                    <Text style={styles.amount}>{data.rate}</Text>
                </View>
            ) : (
                <View style={styles.row}>
                    <Text style={styles.activity}>LOAD {data.load_number}</Text>
                    <Text style={styles.description}>{data.description}</Text>
                    <Text style={styles.qty}>1</Text>
                    <Text style={styles.rate}>{data.rate}</Text>
                    <Text style={styles.amount}>{data.rate}</Text>
                </View>
            )}

            {rows}
        </Fragment>
    );
};

export default InvoiceTableRow;
