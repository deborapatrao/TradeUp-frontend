import React, { useState, useEffect, Component } from "react";
import { Image, View, Box } from "native-base";
import { StyleSheet, ScrollView, Dimensions, Text } from "react-native";
import axios from "axios";

const Carousel = () => {


    const [data, setData] = useState([])
    const [state, setState] = useState({ active: 0 })

    const apiKey = '951f797b551d48f590c91a9f3af557f3';

    useEffect(() => {
        loadArticles()
    }, [])

    async function loadArticles() {
        try {
            const response = await axios.get(`https://newsapi.org/v2/top-headlines?q=crypto&pageSize=5&apiKey=${apiKey}`);

            setData(response.data.articles);

        } catch (error) {
            console.log(error)
        }
    }

    const { width } = Dimensions.get('window');
    const height = width * 0.5;



    const change = ({ nativeEvent }) => {
        const slide = Math.ceil(nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width);
        if (slide !== this.state.active) {
            this.setState({ active: slide })
        }
    }

    return (
        <>
            <View>
                <ScrollView
                    pagingEnabled
                    horizontal
                    style={{ width, height }}>
                    {data.map((cont, index) =>
                        <Box style={{ width }} key={index}>
                            <Image
                                onPress
                                key={index}
                                source={{ uri: cont.urlToImage }}
                                alt={cont.title}
                                style={styles.Image}
                                height={height}
                            />
                            <View style={styles.Paginator}>
                                <Text key={index} style={styles.Dot} numberOfLines={5}>{cont.title}</Text>

                            </View>
                        </Box>
                    )}
                </ScrollView>

                {/* <View style={styles.Paginator}>
                    <Text style={styles.Dot}>⚫</Text>
            </View> */}
            </View>

        </>
    )
};

const styles = StyleSheet.create({
    Image: {
        marginLeft: 2,
        marginRight: 2,
        borderRadius: 10,
        width: '90%',
        height: "100%",
        resizeMode: 'cover',
    },
    Paginator: {
        flexDirection: 'row',
        position: 'absolute',
        bottom: 0,
        alignSelf: 'center'

    },
    Dot: {
        color: 'black',
        backgroundColor: 'rgba(128, 128, 128, 0.90)',
        width: '90%',
        borderRadius: 5,
        overflow: 'hidden',
        padding: 3,
        fontWeight: 'bold',
        marginBottom: 2,
    },
    DotActive: {
        color: 'white',
    }
})


export default Carousel
