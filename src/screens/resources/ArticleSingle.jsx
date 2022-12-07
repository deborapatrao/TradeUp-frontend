import React, { useState, useEffect} from "react";
import {
    VStack,
    Image,
    Heading,
    Text,
    ScrollView,
    Box
} from "native-base";
import { StyleSheet } from "react-native";

const ArticleSingle = ({ route }) => {

    const { article } = route.params;
    console.log(article)
    return(
        <>
        <ScrollView>
            <VStack space={4} px={4} pt={10}>
            <Image height={140} source={{uri:article.urlToImage}} alt={article.title} />
            <Heading style={styles.headingText} color={'supporting.lightGreen'}>
                {article.title}
            </Heading>
            <Text>{article.content}</Text>
            </VStack>
        </ScrollView>
        </>
    )};

const styles = StyleSheet.create({

    headingText: {
        fontSize: 20
    }
})

export default ArticleSingle
