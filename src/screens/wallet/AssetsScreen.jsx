import React, { useState, useEffect } from 'react'
import {
    Box,
    Text,
    FlatList
} from "native-base";
import { getWalletData } from '../../utils/requests';
import AssetItem from '../../components/listItems/AssetItem';




const AssetsScreen = ({ navigation }) => {
    const [assetData, setAssetData] = useState(null);
    
    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', async () => {
            console.log('AssetsScreen focused');
            const data = await getWalletData('/wallet/assets');
            console.log('Data: ', data);
            setAssetData(data.assets);
        });
        
       
        return unsubscribe;


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
