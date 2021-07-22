import isPlainObject from './utils/isPlainObject'
import ActionTypes from "./utils/ActionTypes"

/**
 * 实现createStore的功能
 * @param {function} reducer reducer
 * @param {any} defaultState 默认的状态值
 * @param {function} enhanced 表示applymiddleware返回的函数
 */
export default function createStore (reducer, defaultState, enhanced) {

    if (typeof defaultState === "function") {
        //第二个参数是应用中间件的函数返回值
        enhanced = defaultState;
        defaultState = undefined;
    }
    if (typeof enhanced === "function") {
        //进入applyMiddleWare的处理逻辑
        return enhanced(createStore)(reducer, defaultState);
    }

    let currentReducer = reducer, //当前使用的reducer
    currentState = defaultState; //当前仓库中的状态

    const listeners = [] // 记录所有监听器（订阅者）

    function dispatch(action) {
        if(!isPlainObject(action)){
            throw new TypeError("action must be a plain object");
        }
        if(action.type === undefined) {
            throw new TypeError("action must has a property of type");
        }

        currentState = currentReducer(currentState, action)

        //运行所有的订阅者（监听器）
        for (const listener of listeners) {
            listener()
        }
    }

    function getState() {
        return currentState;
    }

    function subscribe(listener) {
        listeners.push(listener)
        let isRemoved = false
        return function() {
            if(isRemoved) {
                return
            }
            const index = listeners.indexOf(listener)
            listeners.splice(index, 1)
            isRemoved = true
        }
    }

    function replaceReducer(reducer) {
        currentReducer = reducer
    }
    //创建仓库时，需要分发一次初始的action
    dispatch({
        type: ActionTypes.INIT
    })

    return {
        dispatch,
        getState,
        subscribe,
        replaceReducer
    }
}