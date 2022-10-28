import React, { useState, useEffect } from 'react'
import {
    Box,
    Text,
    FlatList
} from "native-base";
import { getWalletData } from '../../utils/requests';
import AssetItem from '../../components/listItems/AssetItem';

import { useSelector } from "react-redux";



const AssetsScreen = ({ navigation }) => {
    const [assetData, setAssetData] = useState(null);
    const { user } = useSelector((state) => state.auth);

    useEffect(() => {
        console.log('check2');
        if (user) {
            const unsubscribe = navigation.addListener('focus', async () => {
                console.log('AssetsScreen focused');
                const data = await getWalletData('/wallet/assets');
                console.log('Data: ', data);
                setAssetData(data.assets);
            });

            return unsubscribe;
        } else {
            console.log('not authenticated 2');
        }

    }, [navigation]);

    return (
        <Box bgColor={'primary.bg'} flex={1} px={4}>
            <FlatList
                data={assetData}
                style={{ paddingHorizontal: 5 }}
                renderItem={({ item }) => {
                    return <AssetItem asset={item} />
                }}
            />
        </Box>
    );
};

export default AssetsScreen;
