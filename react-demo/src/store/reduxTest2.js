import { createStore, bindActionCreators } from '../redux'
import reducer from './reducer'
import { createAddUserAction, createDeleteUserAction, createUpdateUserAction} from './action/user-action'


const store = createStore(reducer);

const actionCreators = {
    addUser: createAddUserAction,
    deleteUser: createDeleteUserAction,
    updateUser: createUpdateUserAction
}

const actions = bindActionCreators(actionCreators, store.dispatch)

store.subscribe(() => {
    console.log("监听器1", store.getState());
})

actions.addUser({ id: 3, name: "abc", age: 100 })
actions.addUser({ id: 4, name: "hhh", age: 23 })
actions.deleteUser(3)