import { createRoot } from 'react-dom/client';

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

const root = createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <BrowserRouter>
            <SnackbarProvider maxSnack={3}>
                <App />
            </SnackbarProvider>
        </BrowserRouter>
    </Provider>
);
