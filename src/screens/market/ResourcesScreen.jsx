import React from 'react'
import {
    Box
} from "native-base";
import ArticleList from '../../components/lists/ArticleList';

const ResourcesScreen = ({ navigation }) => {

    return (
        <Box>
            <ArticleList navigation={navigation} />
        </Box>
    );
};

export default ResourcesScreen;