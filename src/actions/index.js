// @flow
import {
    GET_USER_DATA,
} from "../constants";

export type Action = {
    type: string,
    userObj?: Object
}

export function getUserData(userObj: Object): Action {
    return {
        type: GET_USER_DATA,
        userObj,
    };
}
