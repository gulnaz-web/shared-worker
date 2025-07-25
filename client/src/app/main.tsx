import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { store } from '@/shared/api/store/store.ts';
import { Provider } from 'react-redux';
import App from './App.tsx';
import './styles/index.css';

createRoot(document.getElementById('root')!).render(
   <StrictMode>
      <Provider store={store}>
         <App />
      </Provider>
   </StrictMode>,
);
