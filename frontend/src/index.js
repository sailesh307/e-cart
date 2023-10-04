import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import store from './state/store/configureStore';
import { ThemeProvider } from '@material-tailwind/react';
import { SnackbarProvider } from 'notistack';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeProvider>
      <Provider store={store}>
        <SnackbarProvider
          autoHideDuration={2000}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          maxSnack={1}
        >
          <App />
        </SnackbarProvider>
      </Provider>
    </ThemeProvider>
  </React.StrictMode>
);