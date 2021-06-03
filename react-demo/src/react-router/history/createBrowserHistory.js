/**
 * 创建一个history api的history对象
 * @param {*} options 
 */
export default function createBrowserHistory(options = {}) {

    const history = {
        location: createLocation(options.basename)
    }
    return history
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
    return location
}

const h = createBrowserHistory({
    basename: 'news'
})
console.log(h);