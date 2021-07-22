
import { createStore, applyMiddleware } from "../redux"
import reducer from "./reducer"
import logger from "redux-logger"
import { createAddUserAction, createDeleteUserAction } from "./action/user-action"

const store = createStore(reducer, applyMiddleware(logger))

store.dispatch(createAddUserAction({
    id: 3,
    name: "abc",
    age: 10
}))


store.dispatch(createAddUserAction({
    id: 4,
    name: "AAA",
    age: 16
}));

store.dispatch(createDeleteUserAction(3));
console.log(store.getState());

export default store;