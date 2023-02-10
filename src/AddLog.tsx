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
  Select,
  Icon,
} from '@chakra-ui/react';
import { HiPlus } from 'react-icons/hi2';
import { encrypt } from 'crypto-js/aes';
import { useAtom } from 'jotai';
import { eKeyAtom } from './atoms';

function addLog({ fetchLogs }: { fetchLogs: () => void }) {
  const toast = useToast();
  const [title, setTitle] = useState('');
  const [mood, setMood] = useState(4);
  const [loading, setLoading] = useState(false);
  const [eKey] = useAtom(eKeyAtom);

  const handleLogChange = (e: any) => setTitle(e.target.value);
  const handleMoodChange = (e: any) => setMood(+e.target.value);

  const addLogFn = () => {
    let content = title;
    if (eKey) {
      content = encrypt(title, eKey).toString();
    }

    addLogs(content, mood)
      .then((res) => {
        toast({
          title: 'Success',
          description: 'Add Successful',
          status: 'success',
          duration: 3000,
        });
        fetchLogs();
        setTitle('');
        setMood(4);
      })
      .catch((res) => {
        toast({
          title: 'Fail added',
          description: res.response.data['hydra:description'] || res.message,
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
          <Select
            value={mood}
            placeholder="Select option"
            onChange={handleMoodChange}
          >
            <option value="7">😄 Supper Good</option>
            <option value="6">😊 Really Good</option>
            <option value="5">🙂 Good</option>
            <option value="4">😐 OK</option>
            <option value="3">😟 Bad</option>
            <option value="2">😫 Really Bad</option>
            <option value="1">😭 Supper Bad</option>
          </Select>
        </FormControl>
        <Stack
          direction="row"
          justifyContent={'center'}
          paddingTop={4}
          spacing={4}
        >
          <Button
            isDisabled={!title || !mood}
            isLoading={loading}
            onClick={addLogFn}
            bgColor="green.400"
            leftIcon={<Icon as={HiPlus} />}
          >
            Add Log
          </Button>
        </Stack>
      </div>
    </div>
  );
}

export default addLog;
