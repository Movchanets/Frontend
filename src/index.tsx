import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store";
import App from "./App";
import { getAccessToken } from "./services/api-user-service";
import { ToastContainer } from 'react-toastify';
import { AuthUser } from './store/action-creators/userActions';

const token = getAccessToken();
if (token) {
  AuthUser(token, "Loaded from localStorage", store.dispatch);
}

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <ToastContainer autoClose={5000} />
      <App />
    </BrowserRouter>
  </Provider>
);
