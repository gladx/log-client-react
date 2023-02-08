import { useEffect, useState } from 'react';
import './App.css';
import { getLogs } from './api';
import { Text, Spinner, useToast } from '@chakra-ui/react';
import { Helmet } from 'react-helmet';
import AddLog from './AddLog';
import LogOut from './LogOut';

function Dashboard() {
  const toast = useToast();
  const [logs, setLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if(!localStorage.getItem('token')) {
      return;
    }
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
          <AddLog />
      </div>
      <div className="card">
        {loading ? (
          <Spinner size="xl" />
        ) : (
          logs.map((log) => {
            return (
              <Text key={log['@id']} fontSize="1xl">
                {log.content} | {log.createdAt}
              </Text>
            );
          })
        )}
      </div>
    </div>
  );
}

export default Dashboard;
