import ReactDOM from 'react-dom';

// third party
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

// project imports
import App from 'App';
import store from 'store';
import { SnackbarProvider } from 'notistack';

// style + assets
import 'assets/scss/style.scss';

// ==============================|| REACT DOM RENDER  ||============================== //

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <SnackbarProvider maxSnack={3}>
                <App />
            </SnackbarProvider>
        </BrowserRouter>
    </Provider>,
    document.getElementById('root')
);
