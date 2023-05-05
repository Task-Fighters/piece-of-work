import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { AppProvider } from './AppContext';
import { BrowserRouter } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import {store} from './store'
import { Provider } from 'react-redux'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  // @ts-ignore
  <GoogleOAuthProvider clientId={process.env.REACT_APP_CLIENT_ID}>
    {/* <React.StrictMode> */}
    <Provider store={store} >
      <BrowserRouter>
        <AppProvider>
          <App />
        </AppProvider>
      </BrowserRouter>
    </Provider>
    {/* </React.StrictMode> */}
  </GoogleOAuthProvider>
);
