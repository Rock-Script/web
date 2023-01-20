import './App.css';
import { Provider } from 'react-redux';
import Store from './store/Store';
import { RouterProvider } from 'react-router';
import Routes from './routes/Routes';

function App() {
  return (
    <div className="App">
      <Provider store={Store}>
        <RouterProvider router={Routes}></RouterProvider>
      </Provider>
    </div>
  );
}

export default App;
