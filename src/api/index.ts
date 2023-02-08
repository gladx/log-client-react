import axios from 'axios';
const instance = axios.create({
  baseURL: 'http://localhost:8000/api/',
  timeout: 30000,
});

instance.interceptors.request.use(
  function (config) {
    if (config.url != 'auth') {
      const token = localStorage.getItem('token');
      if (token && config.headers) {
        config.headers['Authorization'] = 'Bearer ' + token;
      }
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if(error?.response?.status === 401) {
        // redirect to /login
        // @ts-ignore
        window.__navigate__?.('login');
    }
    return Promise.reject(error);
  }
);

export const login = async (email: string, password: string) => {
  return instance.post('auth', { email, password }).then((res) => {
    if (res.status === 200) {
      localStorage.setItem('token', res.data.token);
    }
    return res;
  });
};

export const addLogs = async (content: string) => {
  return instance.post('logs', { content }).then((res) => {
    if (res.status === 200) {
      // success
    }
    return res;
  });
};

export const getLogs = async (page = 1) => instance.get(`logs?page=${page}`);
