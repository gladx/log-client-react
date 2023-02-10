import './App.css';
import { Button, useToast } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

function logOut() {
  const toast = useToast();
  const navigate = useNavigate();

  const logOutFn = () => {
    localStorage.removeItem('token');
    toast({
      title: 'Success',
      description: 'Logout Successfully',
      status: 'success',
      duration: 3000,
    });
    navigate('/');
  };

  return (
    <Button onClick={logOutFn} bgColor="red.400">
      Logout
    </Button>
  );
}

export default logOut;
