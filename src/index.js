import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from 'components/App';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { store, persistor } from './redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <BrowserRouter basename="fs-87-react-node-argojkee">
          <App />
          <ToastContainer />
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
