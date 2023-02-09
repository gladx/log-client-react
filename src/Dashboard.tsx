import { useEffect, useState } from 'react';
import './App.css';
import { getLogs, getMoodFormat } from './api';
import {
  Text,
  Spinner,
  useToast,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from '@chakra-ui/react';
import { Helmet } from 'react-helmet';
import AddLog from './AddLog';
import LogOut from './LogOut';

function Dashboard() {
  const toast = useToast();
  const [logs, setLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchLogs = () => {
    setLoading(true);
    getLogs()
      .then((res) => {
        if (res.status === 200) {
          setLogs(res.data['hydra:member']);
        }
      })
      .catch((res) => {
        toast({
          title: 'Failed',
          description: res.message,
          status: 'error',
          duration: 3000,
        });
      })
      .finally(() => {
        setLoading(false);
      });
  }

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      return;
    }
    fetchLogs();
  }, []);

  return (
    <div className="App">
      <Helmet>
        <title>Dashboard</title>
      </Helmet>
      <h1>Dashboard</h1>
      <div>
        <LogOut />
      </div>
      <div>
        <AddLog fetchLogs={fetchLogs} />
      </div>
      <div className="card">
        {loading ? (
          <Spinner size="xl" />
        ) : (
          <TableContainer>
            <Table variant='simple' size='sm'>
              <Thead>
                <Tr>
                  <Th>title</Th>
                  <Th>mood</Th>
                  <Th>Time</Th>
                </Tr>
              </Thead>
              <Tbody>
                {logs.map((log) => {
                  return (
                    <Tr>
                      <Td>{log.content}</Td>
                      <Td>{getMoodFormat(log.mood)}</Td>
                      <Td >{log.createdAt}</Td>
                    </Tr>
                  )
                })}
              </Tbody>
            </Table>
          </TableContainer>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
