import './global.css';
import * as React from 'react';
import * as ReactDOM from 'react-dom/client';

import { ChakraProvider } from '@chakra-ui/provider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { theme } from '@chakra-ui/react';

import App from './App';

const container = document.getElementById('wentilabs-chat-root-element');

if (!container) {
  throw new Error('Failed to find the root element');
}

const root = ReactDOM.createRoot(container);
const queryClient = new QueryClient();

root.render(
  <QueryClientProvider client={queryClient}>
    <ChakraProvider theme={theme}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </ChakraProvider>
  </QueryClientProvider>,
);
