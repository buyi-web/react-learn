import ListenerManage from './ListenerManage';
import BlockManage from './BlockManage';
/**
 * 创建一个history api的history对象
 * @param {*} options 
 */
export default function createBrowserHistory(options = {}) {
    // 默认配置
    const { 
        basename = "/",
        forceRefresh = false,
        keyLength = 6,
        getUserConfirmation = (message, callback) => callback(window.confirm(message))
    } = options;
    const listenerManage = new ListenerManage();
    const blockManager = new BlockManage(getUserConfirmation );

    function go(step) {
        window.history.go(step);
    }
    function goBack() {
        window.history.back();
    }
    function goForward() {
        window.history.forward();
    }
    /**
     * 添加对地址变化的监听
     */
    function addDomListener() {
        //popstate事件，仅能监听前进、后退、用户对地址hash的改变
        //无法监听到pushState、replaceState
        window.addEventListener("popstate", () => {
            const location = createLocation(basename);
            const action = "POP";
            blockManager.triggerBlock(location, action, () => {
                listenerManage.triggerListener(location, "POP");
                history.location = location;
            })
        })
    }

    addDomListener();
    /**
     * 向地址栈中加入一个新的地址
     * @param {*} path 新的地址，可以是字符串，也可以是对象
     * @param {*} state 附加的状态数据，如果第一个参数是对象，该参数无效
     */
    function push(path, state) {
        changePage(path, state, true);
    }
    function replace(path, state) {
        changePage(path, state, false);
    }
    function changePage(path, state, isPush) {
        let action = "PUSH";
        if (!isPush) {
            action = "REPLACE"
        }
        const pathInfo = formatPathAndState(path, state, basename);
        const location = createLocationByPath(pathInfo, basename);
        blockManager.triggerBlock(location, action, () => {
            if (isPush) {
                window.history.pushState({
                    key: createKey(keyLength),
                    state: pathInfo.state
                }, null, pathInfo.path);
            }
            else {
                window.history.replaceState({
                    key: createKey(keyLength),
                    state: pathInfo.state
                }, null, pathInfo.path);
            }
            listenerManage.triggerListener(location, action)
            history.action = action;
            history.location = location
            if (forceRefresh) {  //强制刷新
                window.location.href = pathInfo.path;
            }
        })
    }
    function listen(listener) {
        return listenerManage.addListener(listener)
    }
    function block(prompt) {
        return blockManager.block(prompt);
    }
    
    const history = {
        action: 'POP',
        location: createLocation(options.basename),
        length: window.history.length,
        go,
        goBack,
        goForward,
        push,
        replace,
        listen,
        block
    }
    return history
}

/**
 * 根据path和state，得到一个统一的对象格式
 * @param {*} path 
 * @param {*} state 
 * @param {*} basename 
 */
function formatPathAndState(path, state, basename) {
    if(typeof path === 'string') {
        return {
            path,
            state
        }
    }else if(typeof path === 'object') { // 价格path的对象数据格式为{pathname, search, hash, state, ...}
        let pathAll = basename + path.pathname
        let {search = '', hash = ''} = path
        if(search[0] !== '?'){
            search += '?'
        }
        if(hash[0] !== '#') {
            hash += '#'
        }
        pathAll += search
        pathAll += hash
        return {
            path: pathAll,
            state: path.state
        } 
    } else {
        throw new TypeError("path must be string or object");
    }

}

// 初始化 根据地址栏url产生一个location对象
function createLocation(basename = "") {
    let pathname = window.location.pathname;
    const regexp = new RegExp(`^/${basename}`)
    pathname = pathname.replace(regexp, "")
    const location = {
        hash: window.location.hash,
        search: window.location.search,
        pathname
    }
    // state
    let state, historyState = window.history.state;
    if(historyState == null) {
        state = undefined
    }else if(typeof historyState !== 'object') {
        state = historyState
    }else{
        if(historyState.hasOwnProperty('key')){
            location.key = historyState.key
            state = historyState.state
        }else{
            state = historyState
        }
    }
    location.state = state;
    return location
}

/**
 * push 和 replace 根据pathInfo创建一个location对象
 * @param {*} pathInfo  {path:"/news/asdf#aaa?a=2&b=3", state:状态}
 * @param {*} basename 
 */
function createLocationByPath(pathInfo, basename) {

    let pathname = pathInfo.path.replace(/[#?].*$/,'')
    // 处理basename的情况
    if(basename){
        let reg = new RegExp(`^${basename}`);
        pathname = pathname.replace(reg, "");
    }

    //search
    var questionIndex = pathInfo.path.indexOf("?");
    var sharpIndex = pathInfo.path.indexOf("#");
    let search;
    if (questionIndex === -1 || questionIndex > sharpIndex) {
        search = "";
    }
    else {
        search = pathInfo.path.substring(questionIndex, sharpIndex);
    }
    //hash
    let hash;
    if (sharpIndex === -1) {
        hash = "";
    }
    else {
        hash = pathInfo.path.substr(sharpIndex);
    }
    return {
        hash,
        pathname,
        search,
        state: pathInfo.state
    }
}
/**
 * 产生一个指定长度的随机字符串，随机字符串中可以包含数字和字母
 * @param {*} keyLength 
 */
function createKey(keyLength) {
    return Math.random().toString(36).substr(2, keyLength);
}

window.h = createBrowserHistory({
    basename: 'news'
})
console.log(window.h); 