import { AuthContextProvider } from 'contexts/auth-context/auth-context';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import store from 'redux/configureStore';
import App from './App';
import { Provider } from 'react-redux';
import './index.css';

ReactDOM.render(
  <Provider store={store}>
    <AuthContextProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AuthContextProvider>
  </Provider>,
  document.getElementById('root')
);
