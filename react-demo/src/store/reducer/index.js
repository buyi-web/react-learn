import loginReducer from "./login"
import usersReducer from './user'
import { combineReducers } from "../../redux"

// export default (state = {}, action) => {
//     const newState = {
//         loginUser: loginUserReducer(state.loginUser, action),
//         users: usersReducer(state.users, action)
//     };
//     return newState;
// }

export default combineReducers({
    loginReducer,
    usersReducer
})