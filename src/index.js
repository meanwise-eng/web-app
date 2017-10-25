// @flow
import { h, render } from "preact";
import { Store, createStore } from "redux";
import { Provider } from "preact-redux";

import App from "./components/App";
import rootReducer from "./reducers";

require("preact/devtools");

const store = createStore(rootReducer);

render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById("app")
);
