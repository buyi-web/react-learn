import { pathToRegexp } from 'path-to-regexp'

/**
 * 得到匹配结果（match对象），如果没有匹配，返回null
 * @param {*} path 路径规则
 * @param {*} pathname 具体地址
 * @param {*} options 相关配置
 */
export default function matchPath(path, pathname, options){
    
    if(pathname[0] !== '/'){
        pathname = '/' + pathname;
    }
    const keys = []; //保存路径规则中的关键字
    const regexp = pathToRegexp(path, keys, getOptions(options));
    const result = regexp.exec(pathname);
    if(!result) {
        return; //没有匹配
    }
    let groups = Array.from(result);
    groups = groups.slice(1);
    const params = getParams(groups, keys);
    return {
        isExact: pathname === result[0],
        params, 
        path,
        url: result[0]
    }
}

/**
 * 将传入的react-router配置，转换为path-to-regexp的配置
 * @param {*} options 
 */
function getOptions(options = {}) {
    const defaultOptions = {
        exact: false,
        sensitive: false,
        strict: false
    }
    const opts = { ...defaultOptions, ...options };
    return {
        sensitive: opts.sensitive,
        strict: opts.strict,
        end: opts.exact
    }
}

/**
 * 根据匹配的分组结果，得到一个params对象
 * @param {*} groups 
 * @param {*} keys 
 */
function getParams(groups, keys) {
    const obj = {};
    for (let i = 0; i < groups.length; i++) {
        const v = groups[i];
        const k = keys[i].name;
        obj[k] = v
    }
    return obj;
}
