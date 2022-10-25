import React, { useEffect} from 'react'
import {
    Box,
    Text
} from "native-base";

const OverviewScreen = () => {

    useEffect(() => {
       console.log('OverviewScreen');
    }, []);

    return (
        <Box bgColor={'primary.bg'} flex={1}>
            <Text>OverviewScreen</Text>
        </Box>
    );
};

export default OverviewScreen;
