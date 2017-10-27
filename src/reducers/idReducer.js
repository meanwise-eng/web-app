// @flow
import { GET_ID } from "../constants";
import type Action from "../actions";

type State = number;

export default function idReducer(state: State = null, action: Action): Action {
    if (action.type === GET_ID) {
        return action.id
    }
    return state;
}
