// @flow
import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";

import userReducer from "./userReducer";
import idReducer from "./idReducer";

const rootReducer = combineReducers({
    routing: routerReducer,
    user: userReducer,
    id: idReducer
})

export default rootReducer;
