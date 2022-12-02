import React, { useState, useEffect}  from 'react';
import { Center, Button, AlertDialog, Text, Image, VStack} from "native-base";
import { SafeAreaView, StyleSheet } from 'react-native';


const PriceAlertDialogComponent = ({ alert, setAlert }) => {

    const onClose = () => setAlert(false);
    const cancelRef = React.useRef(null);


    return (
        <Center>
            <AlertDialog isOpen={alert} w={'100%'} >
                <AlertDialog.Content backgroundColor={'secondary.lightGray'}>
                    <AlertDialog.CloseButton onPress={onClose} />
                    <AlertDialog.Body style={styles.body}>
                        <VStack w={'100%'} mt={2}>
                        <Text style={styles.text}>Price Alert Created!</Text>
                        </VStack>
                        </AlertDialog.Body>
                </AlertDialog.Content>
            </AlertDialog>
        </Center>
    );
}

export default PriceAlertDialogComponent;

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 50,
        backgroundColor: '#7F7F7F',
    },
    text: {
        color: '#29A343',
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 20,
        marginBottom: 10,
    },
    body: {
        backgroundColor: 'secondary.lightGray',
        marginTop: 10,
        marginBottom: 10,
    }
});
