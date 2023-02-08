import { useState } from 'react';
import './App.css';
import { addLogs } from './api';
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

function addLog() {
  const toast = useToast();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogChange = (e: any) => setTitle(e.target.value);

  const addLogFn = () => {
    addLogs(title)
      .then((res) => {
        toast({
          title: 'Success',
          description: 'Add Successful',
          status: 'success',
          duration: 3000,
        });
        navigate('/dashboard');
      })
      .catch((res) => {
        toast({
          title: 'Fail added',
          description: res.response.data["hydra:description"] || res.message,
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
      <div className="card">
        <FormControl>
          <Input type="text" value={title} onChange={handleLogChange} />
        </FormControl>
        <Stack
          direction="row"
          justifyContent={'center'}
          paddingTop={4}
          spacing={4}
        >
          <Button isLoading={loading} onClick={addLogFn} bgColor="green.400">
            Add Log
          </Button>
        </Stack>
      </div>
    </div>
  );
}

export default addLog;
