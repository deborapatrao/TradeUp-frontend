import React from 'react'
import {
    Image,
    Heading,
    Text,
    ScrollView,
    VStack,
} from "native-base";
import { StyleSheet } from "react-native";
import ArticleList from '../../components/lists/ArticleList';

const SampleResource = ({ route }) => {

    const { article } = route.params;
  
    const sampleUrl = "https://www.investopedia.com/thmb/pWBTORzzifDoVLg_mw8NmvQKccg=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/UnderstandingBasicCandlestickCharts-01_2-4d7b49098a0e4515bbb0b8f62cc85d77.png";

    return (
        <ScrollView>
            <VStack space={4} px={4} pt={10}>
            <Image height={140} 
            source={{uri:article.urlToImage}} alt={article.title} 
            />
            <Heading style={styles.headingText} color={'supporting.lightGreen'}>
            {article.title}
            </Heading>
            <Text>Candlestick charts originated in Japan over 100 years before the West developed the bar and point-and-figure charts. In the 1700s, a Japanese man named Homma discovered that, while there was a link between price and the supply and demand of rice, the markets were strongly influenced by the emotions of traders.
            </Text>
            <Text>
            Candlesticks show that emotion by visually representing the size of price moves with different colors. Traders use the candlesticks to make trading decisions based on regularly occurring patterns that help forecast the short-term direction of the price.
            </Text>

            <Heading style={styles.headingText} color={'supporting.lightGreen'}>
            Candlestick Components
            </Heading>
            <Image height={140} 
            source={{uri:"https://www.investopedia.com/thmb/pWBTORzzifDoVLg_mw8NmvQKccg=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/UnderstandingBasicCandlestickCharts-01_2-4d7b49098a0e4515bbb0b8f62cc85d77.png"}} alt={"Candlesticks"} />

            <Text>
            Just like a bar chart, a daily candlestick shows the market's open, high, low, and close price for the day. The candlestick has a wide part, which is called the "real body." 
            </Text>
            <Text>
            This real body represents the price range between the open and close of that day's trading. When the real body is filled in or black, it means the close was lower than the open. If the real body is empty, it means the close was higher than the open.
            Text by Cory Mitchell (Investopedia).
            </Text>
            </VStack>
        </ScrollView>
    );
};

const styles = StyleSheet.create({

    headingText: {
        fontSize: 20
    }
})

export default SampleResource;