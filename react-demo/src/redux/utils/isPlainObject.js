/**
 * 判断某个对象是否是一个plain object
 * @param {*} obj 
 */
export default function isPlainObject(obj) {
    if (typeof obj !== "object" || obj === null) {
        return false;
    }
    // Object.getPrototypeOf(obj)  得到obj的原型
    return Object.getPrototypeOf(obj) === Object.prototype;
}
