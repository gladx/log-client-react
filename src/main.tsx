import React from 'react';
import ReactDOM from 'react-dom/client';
import { ChakraProvider } from '@chakra-ui/react';
import { Helmet } from 'react-helmet';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import Login from './Login';
import Dashboard from './Dashboard';
import ErrorBoundary from './ErrorBoundary';
import './index.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/dashboard',
    element: <Dashboard />,
  },
  {
    path: '/login',
    element: <Login />,
  },
]);

//@ts-ignore
window.__navigate__ = router.navigate;

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <ErrorBoundary>
    <ChakraProvider>
      <Helmet>
        <title>Loading...</title>
      </Helmet>
      <RouterProvider router={router} />
    </ChakraProvider>
  </ErrorBoundary>
);
