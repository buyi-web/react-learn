import compose  from "./compose";
/*
 * 注册中间件
 * @param  {...any} middlewares 所有的中间件
 */
export default function applyMiddleware (...middlewares) {
    return function (createStore) { //创建仓库的函数
        return function (reducer, defaultState) {
            // 创建仓库
            const store = createStore(reducer, defaultState);
            let dispatch = () => { throw new Error('the dispatch function is not called now')};
            const simpleStore = {
                getState: store.getState,
                dispatch: (...args) => dispatch(...args)
            }
            //给dispatch赋值
            //根据中间件数组，得到一个dispatch创建函数的数组
            const dispatchProducers = middlewares.map(mid => mid(simpleStore));
            dispatch = compose(...dispatchProducers)(store.dispatch);
            return {
                ...store,
                dispatch
            }
        }
    }
}
