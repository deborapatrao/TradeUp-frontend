import React, { useEffect, useState, useRef } from 'react'
import PropTypes from "prop-types";
import {
    Box,
    Button,
    VStack,
    Text,
    HStack,
    Select,
    Image,
    Input,
    Icon,
} from "native-base";
import { StyleSheet, ScrollView, View } from "react-native";
import SubIcon from "../../../assets/images/icons/sub-icon.png";
import AddIcon from "../../../assets/images/icons/add-icon.png"
import { useSelector, useDispatch } from "react-redux";
import { getBuyAndSellData, marketOrder } from '../../../utils/requests';
import AlertDialogComponent from '../../../components/utils/AlertDialogComponent';
import { priceFormatter } from '../../../components/utils/numberFormats';
import { Ionicons } from "@expo/vector-icons";

import TourTooltip from "../../../components/utils/TourTooltip";
import { copilot, walkthroughable, CopilotStep } from "react-native-copilot";
import { skipTutorial } from "../../../redux/action";

const WalkthroughableText = walkthroughable(Text);
const WalkthroughableView = walkthroughable(View);
const WalkthroughableButton = walkthroughable(Button);
const WalkthroughableScrollView = walkthroughable(ScrollView);

const BuyAndSellComponent = ({ navigation, ticker, onTour, start, copilotEvents }) => {
    const refScrollView = useRef();

    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);

    const [priceValue, setPriceValue] = useState(0);
    const [amountValue, setAmountValue] = useState('')
    const [totalValue, setTotalValue] = useState('')
    const [orderType, setOrderType] = useState('market');
    const [buyActive, setBuyActive] = useState(true);
    const [sellActive, setSellActive] = useState(false);
    const [alert, setAlert] = useState(false);
    const [loadingBuy, setLoadingBuy] = useState(false);
    const [loadingSell, setLoadingSell] = useState(false);
    const [buySellData, setBuySellData] = useState({})
    const [percentBtn, setPercentBtn] = useState('');

    // Tour states
    const [tourStatus, setTourStatus] = useState(onTour);
    const [defaultAmount, setDefaultAmount] = useState(10);

    const url24 = `https://api.binance.com/api/v3/ticker/24hr?symbol=${ticker}`;
    const url = 'https://api.binance.com/api/v3/depth?symbol=ETHUSDT&limit=10';

    useEffect(() => {
        loadBuySellData()
    }, [])

    const loadBuySellData = async () => {
        const data = await getBuyAndSellData('/crypto', ticker);
        setPriceValue(priceFormatter(data?.currentPrice))
        setBuySellData(data)
        console.log(data);
    }


    const handleClick = () => {
        console.log(`price from value is ${priceValue}`);
        console.log(`price from amount is ${amountValue}`);
        console.log(`price from total is ${totalValue}`);
    }

    const handleBuySellChange = (btn) => {
        if (btn === "sell") {
            setBuyActive(false)
            setSellActive(true)
        } else {
            setBuyActive(true)
            setSellActive(false)
        }
    }

    const handleAddBtn = () => {
        console.log(priceValue);
        const newPrice = parseFloat(priceValue) + 1
        console.log(newPrice);
        setPriceValue(newPrice)
    }


    const handlePriceValueChange = (txt) => {
        const newPrice = parseFloat(txt)
        if (!isNaN(newPrice)) {
            setPriceValue(newPrice)
        } else {
            console.log('nope');
            setPriceValue(0)
        }
    }

    const handleAmountChange = (txt) => {
        const newPrice = parseFloat(txt)
        if (!isNaN(newPrice)) {
            setAmountValue(newPrice.toFixed(5))
        } else {
            console.log('nope');
            setAmountValue('')
        }
        if (txt !== '') {
            const newTotalValue = parseFloat(priceValue) * newPrice
            setTotalValue(newTotalValue.toFixed(2))
        } else {
            setTotalValue('')
        }
    }

    const handleTotalChange = (txt) => {
        const newPrice = parseFloat(txt)

        if (!isNaN(newPrice)) {
            setTotalValue(newPrice.toFixed(2))
        } else {
            console.log('nope');
            setTotalValue('')
        }

        if (txt !== '') {
            const newAmountValue = newPrice / parseFloat(priceValue)
            setAmountValue(newAmountValue.toFixed(5))
        } else {
            setAmountValue('')
        }
    }

    const setTimer = () => {
        setAlert(true)

        // setTimeout(() => {
        //     setAlert(false)
        // }, 1000);
    }

    const handleMarketBuy = async () => {
        if (orderType == 'market') {
            //market order
            if (totalValue !== '' && !isNaN(amountValue)) {
                const data = {
                    coinTicker: ticker,
                    amount: parseFloat(amountValue),
                }
                console.log('BUY DATA: ', data);
                setLoadingBuy(true);
                await marketOrder('/buy', data);
                setLoadingBuy(false);
                setTimer();
            } else {
                setLoadingBuy(false);
                console.log('Total Value is empty');
            }
        } else {
            // limit order
            if (totalValue !== '') {
                const data = {
                    coinTicker: ticker,
                    coinQuantity: parseFloat(amountValue),
                    price: parseFloat(priceValue),
                    typeOrder: 'buy'
                }
                console.log('DATA: ', data);
                setLoadingBuy(true);
                await marketOrder('/crypto/order', data);
                setLoadingBuy(false);
                setTimer();
            } else {
                setLoadingBuy(false);
                console.log('Total Value is empty');
            }
        }
    }

    const handleMarketSell = async () => {
        if (amountValue !== '') {
            const data = {
                coinTicker: ticker,
                amount: parseFloat(amountValue),
            }

            setLoadingSell(true);
            await marketOrder('/sell', data);
            setLoadingSell(false);
            setTimer();

        } else {
            setLoadingSell(false);
            console.log('Amount is empty');
        }
    }

    const handlePercentBtnClick = (percent) => {
        if (buyActive) {
            setPercentBtn(percent);
            const percentObj = {
                '25%': 0.25,
                '50%': 0.5,
                '75%': 0.75,
                '100%': 1,
            }
            const newAmount = parseFloat(buySellData.usdtBalance) * percentObj[percent];
            handleTotalChange(newAmount);


        } else {
            console.log('sell');
        }
    }


    useEffect(() => {
        const tourTimeout = setTimeout(() => {
            if (user && user.isTutorial) {
                start(false, refScrollView.current);
            }
        }, 300);

        // copilotEvents.on("stepChange", (step) => {
        // 	// console.log(`Step is ${step.name}`);
        // 	if(step.name == "buystep8"){
        // 		copilotEvents.on("stop", () => {
        //             // dispatch(skipTutorial(user.firebase_uuid, false));
        //             // amountValue ? handleMarketBuy() : ""
        //             // setTourStatus(false);
        // 		});
        // 	}
        // });

        copilotEvents.on("stop", () => {
            setTourStatus(false)
            dispatch(skipTutorial(user.firebase_uuid, false));
        });

        return () => {
            clearTimeout(tourTimeout);
            copilotEvents.off("stepChange");
            copilotEvents.off("stop");
        };
    }, []);


    return (
        <>
            <ScrollView ref={refScrollView}>
                <VStack w="100%" backgroundColor='#171122' safeArea style={{ paddingHorizontal: 20 }}>
                    <HStack mb={3} justifyContent={'space-between'}>
                        <Button.Group isAttached>
                            <CopilotStep
                                text="Toggle to choose between buy or sell. Let's buy."
                                order={1}
                                name="buystep1"
                            >
                                <WalkthroughableView>
                                    <View>
                                        <Button
                                            onPress={() => handleBuySellChange("buy")}
                                            flexBasis={'15%'}
                                            backgroundColor={buyActive === true ? 'secondary.blue' : 'primary.field'}
                                        >
                                            <Text>Buy</Text>
                                        </Button>
                                    </View>
                                </WalkthroughableView>
                            </CopilotStep>

                            <View>
                                <Button
                                    onPress={() => handleBuySellChange("sell")}
                                    flexBasis={'15%'}
                                    backgroundColor={sellActive === true ? 'secondary.red' : 'primary.field'}
                                >
                                    <Text>Sell</Text>
                                </Button>
                            </View>
                        </Button.Group>

                        {user && user.isTutorial ? (
                            <CopilotStep
                                text="Select from different types of trading"
                                order={2}
                                name="buystep2"
                            >
                                <WalkthroughableView>
                                    <View>
                                        <Button variant="outline" _text={{ color: "white", }} style={{ with: "3dp" }} endIcon={<Icon as={Ionicons} color="white" name="chevron-down" size="xs" />}>
                                            Market
                                        </Button>
                                    </View>
                                </WalkthroughableView>
                            </CopilotStep>
                        ) : (
                            <Select selectedValue={orderType} flexBasis={'50%'} accessibilityLabel="Choose Service" placeholder="Order Type"
                                onValueChange={itemValue => setOrderType(itemValue)}>
                                <Select.Item label="Market" value="market" />
                                <Select.Item label="Limit" value="limit" />
                            </Select>
                        )}
                    </HStack>
                    <Box>

                        <CopilotStep
                            text="Enter the USDT price you want to pay per coin. Market price is the default."
                            order={3}
                            name="buystep3"
                        >
                            <WalkthroughableView>
                                <CopilotStep
                                    text="There are 3 ways to buy coins. Each method updates the other fields."
                                    order={4}
                                    name="buystep4"
                                >
                                    <WalkthroughableView>
                                        <View>
                                            <Text ml={3}>Price (USDT)</Text>
                                            <HStack
                                                backgroundColor={'primary.field'}
                                                justifyContent={'space-between'}
                                                my={3}
                                                mt={1}
                                                pt={1.5}
                                                pb={1.5}
                                                borderRadius={5}>
                                                <Button
                                                    backgroundColor={'primary.field'}
                                                    borderRightColor={'secondary.lightGray'}
                                                    borderRightWidth={1}
                                                    borderRadius={0}
                                                    flexBasis={'15%'}
                                                ><Image alt={'Substract'} source={SubIcon} /></Button>
                                                <Input
                                                    color={'secondary.white'}
                                                    variant={'unstyled'}
                                                    flexBasis={'70%'}
                                                    onChangeText={text => handlePriceValueChange(text)}
                                                    value={`${priceValue}`}
                                                    keyboardType={'numeric'}
                                                    // defaultValue={`${priceValue}`}
                                                    // keyboardType={'number-pad'}
                                                    textAlign={'center'}
                                                />
                                                <Button backgroundColor={'primary.field'}
                                                    borderLeftColor={'secondary.lightGray'}
                                                    borderLeftWidth={1}
                                                    borderRadius={0}
                                                    pt={1}
                                                    pb={1}
                                                    flexBasis={'15%'}
                                                    onPress={() => handleAddBtn()}>
                                                    <Image w={4} h={4} alt={'Add'} source={AddIcon} />
                                                </Button>
                                            </HStack>
                                        </View>
                                    </WalkthroughableView>
                                </CopilotStep>
                            </WalkthroughableView>
                        </CopilotStep>



                        <CopilotStep
                            text="1. Enter the amount of coins you want to buy. You can also buy a fraction of a coin."
                            order={5}
                            name="buystep5"
                        >
                            <WalkthroughableView>
                                <View>
                                    <Text ml={3}>{ticker.replace('USDT', '')}</Text>
                                    <HStack
                                        backgroundColor={'primary.field'}
                                        justifyContent={'space-between'}
                                        my={3}
                                        mt={1}
                                        pt={1.5}
                                        pb={1.5}
                                        borderRadius={5}
                                    >
                                        <Button
                                            backgroundColor={'primary.field'}
                                            borderRightColor={'secondary.lightGray'}
                                            borderRightWidth={1}
                                            borderRadius={0}
                                            pt={1}
                                            pb={1}
                                            flexBasis={'15%'}>
                                            <Image alt={'Substract'} source={SubIcon} />
                                        </Button>
                                        <Input
                                            color={'secondary.white'}
                                            variant={'unstyled'}
                                            flexBasis={'70%'}
                                            textAlign={'center'}
                                            keyboardType={'numeric'}
                                            onChangeText={text => handleAmountChange(text)}
                                            value={`${amountValue}`}
                                            placeholder={'Amount Coin'}
                                        />
                                        <Button
                                            backgroundColor={'primary.field'}
                                            borderLeftColor={'secondary.lightGray'}
                                            borderLeftWidth={1}
                                            borderRadius={0}
                                            pt={1}
                                            pb={1}
                                            flexBasis={'15%'}>
                                            <Image w={4} h={4} alt={'Add'} source={AddIcon} />
                                        </Button>
                                    </HStack>
                                </View>
                            </WalkthroughableView>
                        </CopilotStep>

                        <CopilotStep
                            text="2. Or enter the USDT you are willing to pay. You have 1000 USDT to begin with."
                            order={6}
                            name="buystep6"
                        >
                            <WalkthroughableView>
                                <View>
                                    <Text ml={3}>USDT</Text>
                                    <HStack
                                        backgroundColor={'primary.field'}
                                        justifyContent={'space-between'}
                                        my={3}
                                        mt={1}
                                        pt={1.5}
                                        pb={1.5}
                                        borderRadius={5}
                                    >
                                        <Button
                                            backgroundColor={'primary.field'}
                                            borderRightColor={'secondary.lightGray'}
                                            borderRightWidth={1}
                                            borderRadius={0}
                                            pt={1}
                                            pb={1}
                                            flexBasis={'15%'}>
                                            <Image alt={'Substract'} source={SubIcon} />
                                        </Button>
                                        <Input
                                            color={'secondary.white'}
                                            variant={'unstyled'}
                                            flexBasis={'70%'}
                                            textAlign={'center'}
                                            keyboardType={'numeric'}
                                            onChangeText={text => handleTotalChange(text)}
                                            value={`${totalValue}`}
                                            placeholder={'Total USDT'}
                                        />
                                        <Button
                                            backgroundColor={'primary.field'}
                                            borderLeftColor={'secondary.lightGray'}
                                            borderLeftWidth={1}
                                            borderRadius={0}
                                            pt={1}
                                            pb={1}
                                            flexBasis={'15%'}>
                                            <Image w={4} h={4} alt={'Add'} source={AddIcon} />
                                        </Button>
                                    </HStack>
                                </View>
                            </WalkthroughableView>
                        </CopilotStep>
                    </Box>
                    <Box>

                        <CopilotStep
                            text="3. Or select a fraction of your total available USDT."
                            order={7}
                            name="buystep7"
                        >
                            <WalkthroughableView>
                                <View>
                                    <HStack justifyContent={'space-between'} my={3}>
                                        <Button w={"23%"} backgroundColor={percentBtn === '25%' ? 'secondary.blue' : 'primary.field'} onPress={() => handlePercentBtnClick('25%')}>25%</Button>
                                        <Button w={"23%"} backgroundColor={percentBtn === '50%' ? 'secondary.blue' : 'primary.field'} onPress={() => handlePercentBtnClick('50%')}>50%</Button>
                                        <Button w={"23%"} backgroundColor={percentBtn === '75%' ? 'secondary.blue' : 'primary.field'} onPress={() => handlePercentBtnClick('75%')}>75%</Button>
                                        <Button w={"23%"} backgroundColor={percentBtn === '100%' ? 'secondary.blue' : 'primary.field'} onPress={() => handlePercentBtnClick('100%')}>100%</Button>
                                    </HStack>
                                </View>
                            </WalkthroughableView>
                        </CopilotStep>

                    </Box>
                    <Box>
                        <HStack justifyContent={'space-between'} my={3}>
                            <Text>Available</Text>
                            {sellActive ? <Text>{priceFormatter(buySellData?.coinQuantity)} {!buyActive ? ticker.replace('USDT', '') : 'USDT'}</Text> : <Text>{priceFormatter(buySellData?.usdtBalance)} {!buyActive ? ticker.replace('USDT', '') : 'USDT'}</Text>}
                        </HStack>
                    </Box>
                </VStack>

                {sellActive ?
                    <View style={{ paddingHorizontal: 20 }}>
                        <Button
                            w={'100%'}
                            alignSelf={'center'}
                            my={3}
                            mt={5}
                            backgroundColor={'secondary.red'}
                            onPress={handleMarketSell}
                            isLoading={loadingSell}
                        >Sell</Button>
                    </View>
                    :

                    <CopilotStep
                        text="Finally, select Buy to place your order."
                        order={8}
                        name="buystep8"
                    >
                        <WalkthroughableView>
                            <View style={{ paddingHorizontal: 20 }}>
                                <Button
                                    w={'100%'}
                                    alignSelf={'center'}
                                    mt={5}
                                    backgroundColor={'secondary.blue'}
                                    onPress={handleMarketBuy}
                                    isLoading={loadingBuy}
                                >Buy</Button>
                            </View>
                        </WalkthroughableView>
                    </CopilotStep>


                }
                {/* <Button w={'93%'} alignSelf={'flex-start'} onPress={handleClick} ml={3} mr={3} mt={10}>Buy</Button> */}

                {/* <Button w={'93%'} alignSelf={'flex-start'} onPress={() => navigation.navigate('PriceAlert')} ml={3} mr={3} mt={10}>Buy</Button> */}
            </ScrollView>

            <AlertDialogComponent alert={alert} setAlert={setAlert} navigation={navigation} />
        </>
    );
};

const styles = StyleSheet.create({
    togglebtns: {
        backgroundColor: 'primary.field',
        borderRadius: 5,
    },
    containers: {
        backgroundColor: 'primary.field',
        justifyContent: 'space-between',
        m: 3,
        mt: 1,
        borderRadius: 5,
    },
    containerBtnLft: {
        backgroundColor: 'primary.field',
        flexBasis: '15%',
        borderRightColor: 'secondary.lightGray',
        borderRightWidth: 1,
        borderRadius: 5,
        mt: 1,
        mb: 1,
    },
    containerBtnRt: {
        backgroundColor: 'primary.field',
        flexBasis: '15%',
        borderLeftColor: 'secondary.lightGray',
        borderLeftWidth: 1,
        borderRadius: 5,
        mt: 1,
        mb: 1,
    },
    containerInput: {
        color: "white",
        flexBasis: '80%',
        variant: 'unstyled',
    },

});


// export default BuyAndSellComponent;

BuyAndSellComponent.propTypes = {
    start: PropTypes.func.isRequired,
    copilotEvents: PropTypes.shape({
        on: PropTypes.func.isRequired,
    }).isRequired,
};

const style = {
    backgroundColor: "#386AF5",
    color: "#fff",
};

export default copilot({
    // verticalOffset: 25,
    tooltipComponent: TourTooltip,
    arrowColor: "#386AF5",
    tooltipStyle: style,
    backdropColor: "rgba(23, 17, 34, 0.95)",
    animated: true, // Can be true or false
    overlay: "svg", // Can be either view or svg
    stepNumberComponent: () => <></>,
})(BuyAndSellComponent);

