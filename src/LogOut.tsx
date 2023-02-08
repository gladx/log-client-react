import './App.css';
import {
  Stack,
  Button,
  useToast,
} from '@chakra-ui/react';
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
    <div className="App">
      <div className="card">
        <Stack
          direction="row"
          justifyContent={'center'}
          paddingTop={4}
          spacing={4}
        >
          <Button onClick={logOutFn} bgColor="red.400">
            Logout
          </Button>
        </Stack>
      </div>
    </div>
  );
}

export default logOut;
