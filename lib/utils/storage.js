/**
 * set
 * @param key
 * @param value
 */
export function setStorage(key, value) {
    uni.setStorageSync(key, value);
}
/**
 * get
 * @param key
 * @param def
 */
export function getStorage(key, def = null) {
    return uni.getStorageSync(key) || def;
}
/**
 * has
 * @param key
 */
export function hasStorage(key) {
    return uni.getStorageSync(key);
}
/**
 * remove
 * @param key
 */
export function removeStorage(key) {
    uni.removeStorageSync(key);
}
/**
 * clear
 */
export function clearStorage() {
    uni.clearStorageSync();
}
const storage = {
    set: setStorage,
    get: getStorage,
    has: hasStorage,
    remove: removeStorage,
    clear: clearStorage
};
export default storage;
//# sourceMappingURL=storage.js.map