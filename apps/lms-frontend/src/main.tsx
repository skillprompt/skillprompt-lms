import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { NextUIProvider } from '@nextui-org/react';

import App from './app/app';
import { BrowserRouter } from 'react-router';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <StrictMode>
    <NextUIProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </NextUIProvider>
  </StrictMode>
);
