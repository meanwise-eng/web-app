// @flow
import {
    GET_USER_DATA,
    GET_ID
} from "../constants";

export type Action = {
    type: string,
    id?: number,
    userObj?: Object
};

export function getUserData(userObj: Object): Action {
    return {
        type: GET_USER_DATA,
        userObj,
    };
}

export function getUserId(id: number): Action {
    return {
        type: GET_ID,
        id
    }
}
