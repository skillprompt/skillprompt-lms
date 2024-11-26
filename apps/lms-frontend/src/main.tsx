import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { NextUIProvider } from '@nextui-org/react';
import App from './app/app';
import { BrowserRouter } from 'react-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
const queryClient = new QueryClient();
root.render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
       <NextUIProvider>
      <App />
    </NextUIProvider>
         
    </QueryClientProvider>
  </StrictMode>
);
