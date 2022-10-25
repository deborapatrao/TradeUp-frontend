import { Avatar, 
    Stack, 
    Box,
    Text, 
    HStack,
    SearchIcon, 
    InfoIcon, 
    Input,
    Image} from 'native-base'
import { StyleSheet} from "react-native";
import NotificationIcon from '../../assets/images/icons/notif-icon.png'
import React from 'react';

const HomeHeader = ({navigation}) => {
    return (
        <Stack safeArea >
            <HStack justifyContent={'space-between'} w='100%' justifyItems={'center'} mb={2}>
                {/* <Avatar size={8} alignSelf={'flex-start'} onPress={() => navigation.navigate('Menu')}/>                 */}
                <Avatar size={8} mt={1}/>
                <Input 
                    placeholder='Looking for a coin?'
                    placeholderTextColor={'secondary.lightGray'}
                    fontSize={'md'}
                    variant='rounded' 
                    focusOutlineColor={'gray.400'}
                    backgroundColor='primary.field'
                    w='70%'
                    h='80%'
                    InputRightElement={
                        <SearchIcon size={5} ml={2} color={'gray.200'} mr={2}/>
                    }/> 
                <Image source={NotificationIcon} w={5} h={5} ml={2} mr={2} mt={2}/>  
            </HStack>
        </Stack>
    )
// }

	// return (
	// 	<Center>
	// 		<HStack space={2} alignItems="center">
	// 			<Link
	// 				_text={{
	// 					color: "indigo.500",
	// 					fontWeight: "medium",
	// 					fontSize: "sm",
	// 				}}
	// 				onPress={() => navigation.navigate("Menu")}
	// 			>
	// 				Profile
	// 			</Link>
	// 			<Text>Header with icons and input here</Text>
	// 		</HStack>
	// 	</Center>
	// );
};

export default HomeHeader
