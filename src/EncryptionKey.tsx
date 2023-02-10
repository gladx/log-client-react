import React, { useEffect, useState } from 'react';
import {
  Button,
  Input,
  InputGroup,
  InputRightElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from '@chakra-ui/react';
import { useAtom } from 'jotai';
import { eKeyAtom } from './atoms';

export default function EncryptionKey() {
  const [key, setKey] = useAtom(eKeyAtom);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [str, setStr] = useState('');

  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);

  const handleChange = (e: any) => setStr(e.target.value);

  const initialRef = React.useRef(null);

  const clearKey = () => {
    localStorage.setItem('e-key', '');
    setKey('');
    setStr('');
  };

  const saveKey = () => {
    localStorage.setItem('e-key', str);
    onClose();
    setTimeout(() => {
      setKey(str);
    }, 500);
  };

  useEffect(() => {
    const eKey = localStorage.getItem('e-key') || '';
    setKey(eKey);
    setStr(eKey);
  }, []);

  if (key) {
    return (
      <Button colorScheme="gray" variant="outline" onClick={clearKey}>
        Clear Encryption key
      </Button>
    );
  }

  return (
    <>
      <Button colorScheme="green" variant="outline" onClick={onOpen}>
        Set Encryption key
      </Button>
      <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Set your Encryption key</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <InputGroup size="md">
              <Input
                ref={initialRef}
                onChange={handleChange}
                placeholder="Encryption key"
                type={show ? 'text' : 'password'}
              />
              <InputRightElement width="4.5rem">
                <Button h="1.75rem" size="sm" onClick={handleClick}>
                  {show ? 'Hide' : 'Show'}
                </Button>
              </InputRightElement>
            </InputGroup>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={saveKey}>
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
