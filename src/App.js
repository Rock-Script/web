import './App.css';
import { Provider } from 'react-redux';
import Store from './store/Store';
import { RouterProvider } from 'react-router';
import Routes from './routes/Routes';
import AppDialog from './components/common/AppDialog';

function App() {
  return (
    <div className="App">
      <Provider store={Store}>
        <RouterProvider router={Routes}></RouterProvider>
        <AppDialog></AppDialog>
      </Provider>
    </div>
  );
}

export default App;
