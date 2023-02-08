import { useState } from 'react';
import './App.css';
import { login } from './api';
import {
  Input,
  Stack,
  Button,
  useToast,
  FormLabel,
  FormControl,
} from '@chakra-ui/react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';

function Login() {
  const toast = useToast();
  const navigate = useNavigate();
  const [email, setEmail] = useState('johndoe@example.com');
  const [password, setPassword] = useState('apassword');
  const [loading, setLoading] = useState(false);

  const handleEmailChange = (e: any) => setEmail(e.target.value);
  const handlePasswordChange = (e: any) => setPassword(e.target.value);

  const loginFn = () => {
    setLoading(true);
    login(email, password)
      .then((res) => {
        toast({
          title: 'Welcome',
          description: 'Successful Login',
          status: 'success',
          duration: 3000,
        });
        navigate('/dashboard');
      })
      .catch((res) => {
        toast({
          title: 'Login failed',
          description: res.message,
          status: 'error',
          duration: 3000,
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="App">
      <Helmet>
        <title>Login</title>
      </Helmet>
      <h1>Login</h1>
      <div className="card">
        <FormControl>
          <FormLabel>email</FormLabel>
          <Input type="email" value={email} onChange={handleEmailChange} />
        </FormControl>
        <FormControl>
          <FormLabel>Password</FormLabel>
          <Input
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </FormControl>
        <Stack
          direction="row"
          justifyContent={'center'}
          paddingTop={4}
          spacing={4}
        >
          <Button isLoading={loading} onClick={loginFn}>
            login
          </Button>
        </Stack>
      </div>
    </div>
  );
}

export default Login;
