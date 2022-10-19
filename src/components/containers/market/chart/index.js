import React, { useState, useEffect } from "react";
import { View, StyleSheet, SafeAreaView, ScrollView } from "react-native";
import { Button, Text } from "native-base";
import Chart, { size } from "./Chart";
import axios from "axios";
// import Orders from '../../components/Orders'

import { PanGestureHandler, State } from "react-native-gesture-handler";
import Animated, {
    add,
    diffClamp,
    eq,
    modulo,
    sub,
} from "react-native-reanimated";
import { onGestureEvent } from "react-native-redash";
import { useValues } from "react-native-redash/lib/module";
import Line from "./Line";
import Label from "./Label";
// import NewLine from "../../components/Chart/NewLine.js";



const ChartComponent = () => {
    const getDomain = (rows) => {
        const values = rows.map(({ high, low }) => [parseFloat(high), parseFloat(low)]).flat();
        const min = Math.min(...values);
        const max = Math.max(...values);
        if (!isNaN(min) && !isNaN(max)) {
            return [min, max];
        } else {
            return [0, 0]
        }
    };

    const [candlesNew, setCandles] = useState([1]);
    const candles = candlesNew.slice(0, 30);
    const domain = getDomain(candles);

    console.log('main domain: ', domain);
    // Lines when you click on the chart
    const [x, y, state] = useValues(0, 0, State.UNDETERMINED);
    const gestureHandler = onGestureEvent({
        x,
        y,
        state,
    });

    const caliber = size / candles.length;
    // Functions to implement the moving of the white lines when you click on the chart
    const translateY = diffClamp(y, 0, size);
    const translateX = add(sub(x, modulo(x, caliber)), caliber / 2);
    const opacity = eq(state, State.ACTIVE); // active or not active




    const [orders, setOrders] = useState({
        asks: [],
        bids: []
    });
    const intervals = ['1s', '1m', '5m', '1h', '1d'];
    const [timeframe, setTimeframe] = useState(0);


    useEffect(() => {
        getChartData();
        // const intervalId = setInterval(getChartData, 10000);

        // return () => clearInterval(intervalId);

    }, [timeframe]);

    //   useEffect(() => {
    //     getOrdersData();
    //     // const intervalId = setInterval(getOrdersData, 5000);

    //     // return () => clearInterval(intervalId);
    //   }, []);


    //   async function getOrdersData() {
    //     try {
    //       const response = await axios.get(
    //         `https://api.poloniex.com/markets/ETH_USDT/orderBook?scale=1&limit=10`
    //       );
    //       //   console.log(response.data);
    //       // console.log(JSON.stringify(response.data, null, 2));
    //         const newObj = {
    //           asks: response.data.asks,
    //           bids: response.data.bids
    //         }

    //         setOrders({...newObj})
    //         // console.log('orders updated');


    //     } catch (error) {
    //       console.log(error);

    //     }
    //   }

    async function getChartData() {
        try {
            const response = await axios.get(
                `https://api.binance.com/api/v3/klines?symbol=BTCUSDT&interval=${intervals[timeframe]}&limit=50`
            );
            //   console.log(response.data);

            const newArr = [];

            response.data.map((item) => {
                const newObj = {
                    low: item[3],
                    high: item[2],
                    open: item[1],
                    close: item[4],
                    volume: item[5],
                    time: item[0],
                };
                newArr.push(newObj);
            });

            setCandles(newArr);
            // console.log(newArr.length);

        } catch (error) {
            console.log(error);

        }
    }


    // console.log(domain);

    return (
        <SafeAreaView style={styles.container}>

            <View>
                <Text>Chart</Text>
                <Text>≈$18,900 USDT</Text>
            </View>

            <View>
                <Button.Group style={styles.btnsPanel} size="xs">
                    {intervals && intervals.map((item, index) => {
                        return (
                            <Button
                                key={index}
                                onPress={() => setTimeframe(index)}
                                bgColor={index === timeframe ? 'secondary.blue' : 'primary.field'}
                                size="xs"
                                p={0}
                                px={3}
                            >
                                <Text>{item}</Text>
                            </Button>
                        )
                    })}
                </Button.Group>
            </View>

            <View style={{ backgroundColor: '#171122', paddingVertical: 10 }}>
                {candles.length > 0 ? <Chart {...{ candles, domain }} /> : null}


                <PanGestureHandler minDist={0} {...gestureHandler}>
                    <Animated.View style={StyleSheet.absoluteFill}>
                        <Animated.View
                            style={{
                                transform: [{ translateY }],
                                opacity,
                                ...StyleSheet.absoluteFillObject,
                            }}
                        >
                            <Line x={size} y={0} />
                        </Animated.View>
                        <Animated.View
                            style={{
                                transform: [{ translateX }],
                                opacity,
                                ...StyleSheet.absoluteFillObject,
                            }}
                        >
                            <Line x={0} y={size} />
                        </Animated.View>
                        <Label y={translateY} {...{ size, domain, opacity }} />
                    </Animated.View>
                </PanGestureHandler>
            </View>

            {/* <ScrollView>
      {orders.asks.length > 0 && orders.bids.length > 0 ? <Orders asks={orders.asks} bids={orders.bids} /> : null}
      </ScrollView> */}

        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        // backgroundColor: "#000000",
    },
    btnsPanel: {
        justifyContent: 'space-around',
        backgroundColor: '#231D30',
        padding: 5,
        borderRadius: 5,
    },
    chart: {
        borderBottomWidth: 2,
        borderBottomColor: "#fff",
    },
    btnsContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end'
    }
});

export default ChartComponent;
