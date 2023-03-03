import { disableReactDevTools } from '@fvilers/disable-react-devtools';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';

import store, { persistor } from 'redux/store';

import App from './App';
import './styles/index.scss';

if (import.meta.env.NODE_ENV === 'production') {
  disableReactDevTools();
}

const root: HTMLElement | null = document.getElementById('root');

if (!root) throw new Error();

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <App />
        </PersistGate>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
