import 'bootstrap/dist/css/bootstrap.min.css';
import { UserContextProvider } from 'contexts/user-context';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';

ReactDOM.render(
  <UserContextProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </UserContextProvider>,
  document.getElementById('root')
);
