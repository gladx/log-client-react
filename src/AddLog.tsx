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
  Select
} from '@chakra-ui/react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';

function addLog({ fetchLogs }: { fetchLogs: () => void }) {
  const toast = useToast();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [mood, setMood] = useState(4);
  const [loading, setLoading] = useState(false);

  const handleLogChange = (e: any) => setTitle(e.target.value);
  const handleMoodChange = (e: any) => setMood(+e.target.value);

  const addLogFn = () => {
    addLogs(title, mood)
      .then((res) => {
        toast({
          title: 'Success',
          description: 'Add Successful',
          status: 'success',
          duration: 3000,
        });
        fetchLogs();
        setTitle('');
        setMood(0);
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
        <FormControl mb={5}>
          <FormLabel>Write something</FormLabel>
          <Input type="text" value={title} onChange={handleLogChange} />
        </FormControl>
        <FormControl>
          <FormLabel>Mood</FormLabel>
          <Select value={mood} placeholder='Select option' onChange={handleMoodChange}>
            <option value='7'>😄 Supper Good</option>
            <option value='6'>😊 Really Good</option>
            <option value='5'>🙂 Good</option>
            <option value='4'>😐 OK</option>
            <option value='3'>😟 Bad</option>
            <option value='2'>😫 Really Bad</option>
            <option value='1'>😭 Supper Bad</option>
          </Select>
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
