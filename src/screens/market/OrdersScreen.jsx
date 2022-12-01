import React,{ useState, useEffect } from 'react'
import {
    Box,
    Text,
    FlatList,
    View,
} from "native-base";
import { getActiveOrderHistoryData } from '../../utils/requests';
import { SafeAreaView, Dimensions, StyleSheet } from 'react-native';


const OrdersScreen = ({navigation, route}) => {
    const [data, setData] = useState()
    
	const { ticker } = route.params;

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', async () => {
            loadActiveOrders();
        });


        return unsubscribe;
	}, [navigation]);


	const loadActiveOrders = async () => {
		try {
			const res = await getActiveOrderHistoryData("/crypto/order/active");
            setData(res.ordersActives);
            
		} catch (error) {
			console.log(error);
		}
	};


    const renderItem = ({item, index}) => {
        return (
            <Box key={index} style={styles.itemContainer}>
                <Box>
                    <Box style={styles.tickerPriceContainer}>
                        <Text>{item.name}</Text>
                        <Text style={styles.price}> USDT</Text>
                    </Box>                    
                    <Text style={styles.orderType}>{item.typeOrder}</Text>
                    <Text>Price (USDT)</Text>
                    <Text style={styles.quantity}>Quantity ({item.ticker})</Text>
                </Box>
                <Box alignItems={'flex-end'}>
                    <Text style={styles.date}>{(item.createdAt).slice(0,10)}</Text>
                    {item.status === false ? 
                    <Box style={styles.statusContainer}>
                    <Text style={styles.statusCancel}>Cancel</Text>
                    <Text style={styles.statusActive}>Active</Text>
                    </Box>
                    : <Text style={styles.statusFilled}>Filled</Text>}
                    
                    <Text>${item.price}</Text>
                    <Text style={styles.quantity}>{(item.quantity).toFixed(7)}</Text>
                </Box>
                    
            </Box>
        )
    }

    return (

        <SafeAreaView style={styles.container}>
            <FlatList
                data={data}
                keyExtractor={(e, i) => i.toString()}
                renderItem={renderItem}
            />


        </SafeAreaView>
    );
};

export default OrdersScreen;

const styles = StyleSheet.create({
    container:{
        flex: 1, 
    },
    listTab: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginLeft: 10,
        marginTop: 25,
        marginBottom: 20,
    },
    btnTab:{
        width: Dimensions.get('window').width / 4.5,
        flexDirection: 'row',
        height: 33,
        marginRight: 10,
        backgroundColor: 'rgba(204, 204, 204, 0.05)',
        borderRadius: 8,
        textAlign: 'center',
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textTab:{
        fontSize:16,
    },
    btnTabActive:{
        width: Dimensions.get('window').width / 4,
        height: 33,
        borderRadius: 8,
        backgroundColor: '#386AF5',
        textAlign: 'center',
        textAlignVertical: 'center',
    },
    texTabActive: {
        color: 'white',
    },
    itemContainer:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 15,
        margin: 10,
        borderRadius: 10,
        backgroundColor: 'rgba(204, 204, 204, 0.05)',
    },
    date:{
        color: '#7F7F7F',
        fontSize: 10,
    },
    tickerPriceContainer:{
        flexDirection: 'row',
    },
    price:{
        color: '#7F7F7F',
        marginLeft: 5,
    },
    orderType:{
        color: '#7F7F7F',
        marginTop: 7,
        marginBottom: 7,
    },
    statusActive:{
        backgroundColor: '#29A343',
        textAlign: 'center',
        borderRadius: 5,
        width: 60,
        marginTop: 7,
        marginBottom: 7,
        marginLeft: 5,
    },
    statusCancel:{
        backgroundColor: '#FF6666',
        textAlign: 'center',
        borderRadius: 5,
        width: 60,
        marginTop: 7,
        marginBottom: 7,
    },
    statusFilled:{
        backgroundColor: '#386AF5',
        textAlign: 'center',
        borderRadius: 5,
        width: 60,
        paddingTop: 2,
        paddingBottom: 2,
        marginTop: 7,
        marginBottom: 7,
    },
    quantity:{
        marginTop: 7,
        marginBottom: 7,
    },
    statusContainer:{
        flexDirection: 'row',
    }
});


