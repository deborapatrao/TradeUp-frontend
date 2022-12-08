import React, { useState, useEffect } from "react";
import {
    VStack,
    Image,
    Heading,
    Text,
    ScrollView,
    Box,
} from "native-base";
import { Pressable, StyleSheet } from "react-native";
import StaticResource from '../utils/resources.json'
import axios from "axios";
// import ResourcesList from "../utils/resources.json";

const ArticleList = ({ navigation }) => {
    const [data, setData] = useState([])
    const staticData = StaticResource[0];


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


    return (

        <ScrollView>
            <Pressable onPress={() => navigation.navigate('SampleResource', { article: staticData })}>
                <VStack space={4} px={4} pt={10}>
                    <Image height={140}
                        source={{ uri: staticData.urlToImage }} alt={staticData.title}
                    />
                    <Heading style={styles.headingText} color={'supporting.lightGreen'}>
                        {staticData.title}
                    </Heading>
                    <Text>{staticData.description}</Text>
                </VStack>
            </Pressable>

            {data.map((article, index) =>
                <Pressable key={index} onPress={() => navigation.navigate('ArticleSingle', { article: article })}>

                    <VStack space={4} px={4} pt={10}>
                        <Image height={140}
                            source={{ uri: article.urlToImage }} alt={article.title}
                        />
                        <Heading style={styles.headingText} color={'supporting.lightGreen'}>
                            {article.title}
                        </Heading>
                        <Text>{article.description}</Text>
                    </VStack>
                </Pressable>
            )}

        </ScrollView>

    )
};

const styles = StyleSheet.create({

    headingText: {
        fontSize: 20
    }
})

export default ArticleList