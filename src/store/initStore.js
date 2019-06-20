import { getStore } from 'kea';
import thunkPlugin from 'kea-thunk';
import localStoragePlugin from 'kea-localstorage';
import { routerMiddleware, routerReducer } from 'react-router-redux';
import { createBrowserHistory } from 'history';

const history = createBrowserHistory();

export default getStore({
    plugins: [thunkPlugin, localStoragePlugin],
    middleware: [routerMiddleware(history)],
    reducers: {
        routing: routerReducer
    }
});

export { history };
