/**
 * 判断某个对象是否是一个plain object
 * @param {*} obj 
 */
function isPlainObject(obj) {
    if (typeof obj !== "object" || obj === null) {
        return false;
    }
    // Object.getPrototypeOf(obj)  得到obj的原型
    return Object.getPrototypeOf(obj) === Object.prototype;
}

/**
 * 得到一个指定长度的随机字符串
 * @param {*} length 
 */
function getRandomString(length) {
    return Math.random().toString(36).substr(2, length).split("").join(".")
}
/**
 * 实现createStore的功能
 * @param {function} reducer reducer
 * @param {any} defaultState 默认的状态值
 */
export default function(reducer, defaultState) {

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
        type: `@@redux/INIT${getRandomString(7)}`
    })

    return {
        dispatch,
        getState,
        subscribe,
        replaceReducer
    }
}