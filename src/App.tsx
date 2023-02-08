import { useEffect } from 'react';
import './App.css';
import { Spinner } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/dashboard');
    } else {
      navigate('/login');
    }
  }, []);

  return (
    <div className="App">
      <h1>Welcome</h1>
      <div className="card">
        <Spinner size="xl" />
      </div>
    </div>
  );
}

export default App;
