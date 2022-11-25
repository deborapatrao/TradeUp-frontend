import React, { useState, useEffect} from "react";
import {
    VStack,
    Image,
    Heading,
    Text,
    ScrollView,
} from "native-base";
import { Pressable, StyleSheet } from "react-native";
import axios from "axios";
// import ResourcesList from "../utils/resources.json";

const ArticleList = ({navigation}) => {
const [data, setData] = useState([])

const apiKey= '1a01a2c1e3e54c10b6e7cfca9c84d7cd';

useEffect(() => {
    loadArticles()
}, [])

async function loadArticles(){
    try {
        const response = await axios.get(`https://newsapi.org/v2/top-headlines?q=crypto&pageSize=5&apiKey=${apiKey}`);

        setData(response.data.articles);
        console.log(data);

    }catch (error) {
        console.log(error)
      }
}


return(
    
    <ScrollView>
    {data.map((article, index) =>
    <Pressable key={index} onPress={() => navigation.navigate('ArticleSingle', {article: article})}>

        <VStack space={4} px={4} pt={10}>
            <Image height={140}
            source={{uri:article.urlToImage}} alt={article.title}
            />
            <Heading style={styles.headingText} color={'supporting.lightGreen'}>
                {article.title}
            </Heading>
            <Text>{article.description}</Text>
        </VStack>
        </Pressable>
    )}
    </ScrollView>
    
)};

const styles = StyleSheet.create({

    headingText: {
        fontSize: 20
    }
})

export default ArticleList