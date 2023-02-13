import './App.css';
import { Provider } from 'react-redux';
import Store from './store/Store';
import { RouterProvider } from 'react-router';
import Routes from './routes/Routes';
import AppDialog from './components/common/AppDialog';
import AppSnackbar from './components/common/AppSnackbar';
import { ThemeProvider } from '@mui/material';
import AppTheme from './theme/AppTheme';
import Axios from './components/common/Axios';

function App() {
  return (
    <ThemeProvider theme={AppTheme}>
      <div className="App">
        <Provider store={Store}>
          <Axios>
            <RouterProvider router={Routes}></RouterProvider>
            <AppDialog></AppDialog>
            <AppSnackbar></AppSnackbar>
          </Axios>
        </Provider>
      </div>
    </ThemeProvider>
  );
}

export default App;
