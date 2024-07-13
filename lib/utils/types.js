/**
 * isNumber
 * @param arg
 */
export function isNumber(arg) {
    return Object.prototype.toString.call(arg) == '[object Number]';
}
/**
 * isString
 * @param arg
 */
export function isString(arg) {
    return Object.prototype.toString.call(arg) == '[object String]';
}
/**
 * isBoolean
 * @param arg
 */
export function isBoolean(arg) {
    return Object.prototype.toString.call(arg) == '[object Boolean]';
}
/**
 * isUndefined
 * @param arg
 */
function isUndefined(arg) {
    return Object.prototype.toString.call(arg) == '[object Undefined]';
}
/**
 * isNull
 * @param arg
 */
function isNull(arg) {
    return Object.prototype.toString.call(arg) == '[object Null]';
}
/**
 * isNil
 * @param arg
 */
function isNil(arg) {
    return isNull(arg) || isUndefined(arg);
}
/**
 * isFunction
 * @param arg
 */
export function isFunction(arg) {
    return Object.prototype.toString.call(arg) == '[object Function]';
}
/**
 * isObject
 * @param arg
 */
export function isObject(arg) {
    return Object.prototype.toString.call(arg) == '[object Object]';
}
/**
 * isRegExp
 * @param arg
 */
function isRegExp(arg) {
    return Object.prototype.toString.call(arg) == '[object RegExp]';
}
/**
 * isDate
 * @param arg
 */
function isDate(arg) {
    return Object.prototype.toString.call(arg) == '[object Date]';
}
/**
 * is Error
 * @param arg
 */
function isError(arg) {
    return Object.prototype.toString.call(arg) == '[object Error]';
}
/**
 * is http
 * @param arg
 */
function isHttp(arg) {
    return arg.startsWith('http://');
}
/**
 * is https
 * @param arg
 */
function isHttps(arg) {
    return arg.startsWith('https://');
}
/**
 * types
 */
const types = {
    isNumber,
    isString,
    isBoolean,
    isUndefined,
    isNull,
    isNil,
    isFunction,
    isObject,
    isRegExp,
    isDate,
    isError,
    isHttp,
    isHttps
};
export default types;
//# sourceMappingURL=types.js.map