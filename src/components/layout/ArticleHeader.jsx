import { Text, Icon, Box, HStack, Image, Pressable } from 'native-base'
import React from 'react'
import Alert from '../../assets/images/icons/alert-icon.png'
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet } from "react-native";

const ArticleHeader = ({ route }) => {
    const { article } = route.params;
    console.log('articel', article);
    return (
        <HStack w='100%' >
            <Text fontSize={'md'} ml={'40%'} color={'white'}>Title</Text>
            
        </HStack>
    )
};
export default ArticleHeader