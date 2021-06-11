/**
 * 创建一个history api的history对象
 * @param {*} options 
 */
export default function createBrowserHistory(options = {}) {
    // 默认配置
    const { 
        basename = "",
        forceRefresh = false,
        keyLength = 6,
        getUserConfirmation = (message, callback) => callback(window.confirm(message))
    } = options;

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
        

    }
    const history = {
        location: createLocation(options.basename),
        length: window.history.length,
        go,
        goBack,
        goForward,
        push,
        replace,
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

function createLocation(basename = "") {
    let pathname = window.location.pathname;
    console.log(pathname);
    const regexp = new RegExp(`^/${basename}`)
    pathname = pathname.replace(regexp, "")
    console.log(pathname);
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

const h = createBrowserHistory({
    basename: 'news'
})
console.log(h); 