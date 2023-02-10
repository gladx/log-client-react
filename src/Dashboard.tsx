import { useEffect, useState } from 'react';
import './App.css';
import { getLogs, getMoodFormat } from './api';
import {
  Spinner,
  useToast,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Flex,
  TableContainer,
} from '@chakra-ui/react';
import { Helmet } from 'react-helmet';
import AddLog from './AddLog';
import LogOut from './LogOut';
import EncryptionKey from './EncryptionKey';
import { decrypt } from 'crypto-js/aes';
import CryptoJS from 'crypto-js';
import { useAtom } from 'jotai';
import { eKeyAtom } from './atoms';

const TableItem = (item: any, eKey: string) => {
  let content: string = item.content || '';
  if (content && eKey) {
    content = decrypt(item.content, eKey).toString(CryptoJS.enc.Utf8);
  }
  return (
    <Tr key={item['@id']}>
      <Td>{content || item.content}</Td>
      <Td>{getMoodFormat(item.mood)}</Td>
      <Td>{item.createdAt}</Td>
    </Tr>
  );
};

function Dashboard() {
  const toast = useToast();
  const [eKey] = useAtom(eKeyAtom);
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
  };

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
      <Flex
        flexDir="row"
        alignItems="center"
        justifyContent="space-between"
        mt={3}
      >
        <EncryptionKey />
        <LogOut />
      </Flex>
      <div>
        <AddLog fetchLogs={fetchLogs} />
      </div>
      <div className="card">
        {loading ? (
          <Spinner size="xl" />
        ) : (
          <TableContainer>
            <Table variant="simple" size="sm">
              <Thead>
                <Tr>
                  <Th>title</Th>
                  <Th>mood</Th>
                  <Th>Time</Th>
                </Tr>
              </Thead>
              <Tbody>{logs.map((item) => TableItem(item, eKey))}</Tbody>
            </Table>
          </TableContainer>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
