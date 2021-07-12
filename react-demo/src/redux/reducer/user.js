import * as actionTypes from '../action/action-type'
import {v4 as uuid} from "uuid"

const initialState = [
    { id: uuid(), name: "用户1", age: 11 },
    { id: uuid(), name: "用户2", age: 12 }
];

export default (state = initialState, { type, payload }) => {
    switch (type) {
        case actionTypes.ADDUSER:
            return [...state, payload];
        case actionTypes.DELETEUSER:
            return state.filter(it => it.id !== payload);
        case actionTypes.UPDATEUSER:
            return state.map(it => it.id === payload.id ? {...it, ...payload} : it);
        default:
            return state
    }
}
