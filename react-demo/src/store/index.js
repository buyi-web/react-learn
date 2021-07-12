import { createStore, bindActionCreators } from 'redux'
import * as actionTypes from './action/action-type'
import * as numberActions from './action/number-action'

function reducer(state, action) {
    //返回一个新的状态
    if (action.type === actionTypes.INCREASE) {
        return state + 1;
    }
    else if (action.type === actionTypes.DECREASE) {
        return state - 1;
    }
    else if (action.type === actionTypes.SET) {
        return action.payload;
    }
    return state;//如果是一个无效的操作类型，数据不变
}

const store = createStore(reducer, 10);

//第一个参数，是action创建函数合并的对象，第二个参数是仓库的dispatch函数
//得到一个新的对象，新对象中的属性名与第一个参数的属性名一致
const bindActions = bindActionCreators(numberActions, store.dispatch)

console.log(store.getState()); //得到仓库中当前的数据

//得到一个increase action，并直接分发
bindActions.getIncreaseAction(); //向仓库分发action

console.log(store.getState()); //得到仓库中当前的数据

bindActions.getSetAction(3);

console.log(store.getState()); //得到仓库中当前的数据