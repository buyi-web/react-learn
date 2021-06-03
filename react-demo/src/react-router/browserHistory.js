import { createBrowserHistory } from "history"
window.createBrowserHistory = createBrowserHistory;
window.h = createBrowserHistory({
    basename: "/news",
    forceRefresh: false, //强制刷新浏览器
    keyLength: 4,
    getUserConfirmation: (msg, callback) => {
        callback(window.confirm(msg));
    }
})

window.unblock = window.h.block((location, action) => {
    return `你真的要进入${location.pathname}吗？${action}`;
});

// window.unListen = window.h.listen((location, action) => {
//     console.log(location)
//     window.h.action = action;
// })
