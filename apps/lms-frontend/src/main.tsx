import { StrictMode } from 'react';

import * as ReactDOM from 'react-dom/client';
import App from './app/app';
import { NextUIProvider } from '@nextui-org/react';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <StrictMode>
    <NextUIProvider>
      <App />
    </NextUIProvider>
  </StrictMode>
);
