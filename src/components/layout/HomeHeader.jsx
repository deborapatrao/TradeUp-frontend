import { Avatar, 
    Stack, 
    Box,
    Text, 
    HStack,
    SearchIcon, 
    InfoIcon, 
    Input,
    Icon} from 'native-base'
import { StyleSheet} from "react-native";
import React from 'react';

const HomeHeader = ({navigation}) => {
    return (
        <Stack safeArea >
            <HStack justifyContent={'space-between'} w='100%' justifyItems={'center'} mb={2}>
                {/* <Avatar size={8} alignSelf={'flex-start'} onPress={() => navigation.navigate('Menu')}/>                 */}
                <Avatar size={8} mt={1}/>
                <Input 
                    placeholder='Looking for a coin?'
                    placeholderTextColor={'gray.200'}
                    fontSize={'md'}
                    variant='rounded' 
                    focusOutlineColor={'gray.400'}
                    bg='gray.400'
                    w='70%'
                    h='80%'
                    _light={{
                        bg: "coolGray.400",
                        _focus: {
                          bg: "coolGray.400"
                        }
                      }}
                    InputRightElement={
                        <SearchIcon size={5} ml={2} color={'gray.200'} mr={2}/>
                    }/>                
                <InfoIcon size={6} color={'gray.400'} mt={2}/>
            </HStack>
        </Stack>
    )
}

const styles = StyleSheet.create({
    header: {
      direction:'row',
      justifyContent:'space-around',
    }
});

export default HomeHeader