import React,{ useState, useEffect } from 'react'
import {
    Box,
    Text,
    FlatList,
    View,
} from "native-base";
import { getOrderHistoryData } from '../../utils/requests';
import { SafeAreaView, TouchableOpacity, Dimensions, StyleSheet } from 'react-native';

const listTab = [
    {
        status: 'All Orders',
    },
    {
        status: 'Active',
    },
    {
        status: 'Filled',
    }
]



const OrdersScreen = () => {

    const [status, setStatus] = useState('All Orders')
    const [datalist, setDatalist] = useState(data)
    const [data, setData] = useState()


    useEffect(() => {
		loadHistory();
        setStatusFilter(status);
	}, []);

	const loadHistory = async () => {
		try {
			const res = await getOrderHistoryData("/crypto/order/history");
            setData(res.orderHistory);
            setDatalist(res.orderHistory);

            
		} catch (error) {
			console.log(error);
		}
	};

    const setStatusFilter = status => {
        if(status === 'Active'){
            setDatalist([...data.filter(e => e.status === false)])
        }else if(status === 'Filled'){
            setDatalist([...data.filter(e => e.status === true)])
        }else{
            setDatalist(data)
            // console.log(`datalist: ${datalist}`);
        }
            setStatus(status)
    }


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
                    <Text style={[ item.status === false ? styles.statusActive : styles.statusFilled]}>{item.status === false ? 'Active' : 'Filled'}</Text>
                    <Text>${item.price}</Text>
                    <Text style={styles.quantity}>{(item.quantity).toFixed(7)}</Text>
                </Box>
                    
            </Box>
        )
    }

    return (

        <SafeAreaView style={styles.container}>
            <View style={styles.listTab}>
            {
                listTab.map(e => (
                <TouchableOpacity 
                    /* A ternary operator. If the status is equal to the status of the element, then it
                    will apply the style of btnTabActive. */
                    style={[styles.btnTab, status === e.status && styles.btnTabActive]}
                    onPress={() => setStatusFilter(e.status)}
                >
                    <Text 
                        style={[styles.textTab, status === e.status && styles.btnTabActive]}
                    >
                        {e.status}
                    </Text>
                </TouchableOpacity>
                ))
            }                
            </View>

            <FlatList
                data={datalist}
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
    }
});


