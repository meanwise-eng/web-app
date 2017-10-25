// @flow
import { GET_USER_DATA } from "../constants";
import { Action } from "../actions";

type State = Object;

export default function userReducer(state: State = null, action: Action): State {
    if (action.type === GET_USER_DATA) {
        return action.userObj
    }
    return state;
}
