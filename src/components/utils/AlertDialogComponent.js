import React from 'react';
import { Center, Button, AlertDialog, } from "native-base";

const AlertDialogComponent = ({ alert, setAlert }) => {
    // const [isOpen, setIsOpen] = React.useState(false);

    const onClose = () => setAlert(false);
    const cancelRef = React.useRef(null);

    return (
        <Center>
            <AlertDialog leastDestructiveRef={cancelRef} isOpen={alert} onClose={onClose}>
                <AlertDialog.Content w={'50%'}>
                    <AlertDialog.Body>
                        <Center>Order Created</Center>
                    </AlertDialog.Body>
                    {/* <AlertDialog.CloseButton />
                    <AlertDialog.Header>Delete Customer</AlertDialog.Header>
                    <AlertDialog.Body>
                        This will remove all data relating to Alex. This action cannot be
                        reversed. Deleted data can not be recovered.
                    </AlertDialog.Body>
                    <AlertDialog.Footer>
                        <Button.Group space={2}>
                            <Button variant="unstyled" colorScheme="coolGray" onPress={onClose} ref={cancelRef}>
                                Cancel
                            </Button>
                            <Button colorScheme="danger" onPress={onClose}>
                                Delete
                            </Button>
                        </Button.Group>
                    </AlertDialog.Footer> */}
                </AlertDialog.Content>
            </AlertDialog>
        </Center>
    );
}

export default AlertDialogComponent;
