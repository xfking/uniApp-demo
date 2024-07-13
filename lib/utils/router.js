import qs from 'qs';
/**
 * encode URL
 * @param url
 * @param args
 */
export function encodeURL(url, args = {}) {
    let { url: result, query } = decodeURL(url);
    query = Object.assign(query, args);
    if (0 < Object.keys(query).length) {
        result += '?' + qs.stringify(query);
    }
    return result;
}
/**
 * 解码URL
 */
export function decodeURL(url) {
    if (!url || !url.includes('?')) {
        return { url: url, query: {} };
    }
    const tmp = url.split('?');
    return { url: tmp[0], query: qs.parse(tmp[1]) };
}
/**
 * 获取当前页面完整路径
 * @param def 默认页面路径
 */
export function getCurrentPageFullPath(def = '/pages/index/index') {
    const last = getCurrentPages().pop();
    if (1 > getCurrentPages().length || !last) {
        return def;
    }
    // @ts-ignore
    let path = last?.$page?.fullPath;
    if (!path || '/' === path) {
        return def;
    }
    return path;
}
/**
 * 获取当前页面路径
 * @param def 默认页面路径
 */
export function getCurrentPagePath(def = '/pages/index/index') {
    const last = getCurrentPages().pop();
    if (1 > getCurrentPages().length || !last) {
        return def;
    }
    let path = last.route;
    if (!path || '/' === path) {
        return def;
    }
    return '/' + path;
}
/**
 * navigator
 * @param options
 */
export function navigator(options) {
    const url = options.url || '';
    switch (options.type) {
        case 'navigateTo':
            navigateTo(url);
            break;
        case 'redirectTo':
            redirectTo(url);
            break;
        case 'navigateBack':
            navigateBack(options.delta);
            break;
        case 'switchTab':
            switchTab(url);
            break;
        case 'reLaunch':
            reLaunch(url);
            break;
    }
}
/**
 * navigateTo
 * @param url
 * @param args
 */
export function navigateTo(url, args = {}) {
    uni.navigateTo({ url: encodeURL(url, args) });
}
/**
 * redirectTo
 * @param url
 * @param args
 */
export function redirectTo(url, args = {}) {
    uni.redirectTo({ url: encodeURL(url, args) });
}
/**
 * reLaunch
 * @param url
 * @param args
 */
export function reLaunch(url, args = {}) {
    uni.reLaunch({ url: encodeURL(url, args) });
}
/**
 * switchTab
 * @param url
 * @param args
 */
export function switchTab(url, args = {}) {
    uni.switchTab({ url: encodeURL(url, args) });
}
/**
 * navigateBack
 * @param delta
 * @param defUrl
 */
export function navigateBack(delta = 1, defUrl) {
    if (2 > getCurrentPages().length && defUrl) {
        return reLaunch(defUrl);
    }
    uni.navigateBack({ delta });
}
/**
 * navigateBackPrev
 * 如果上一页不是目标页面则关闭当前页面跳转到目标页面
 * @param target
 */
export function navigateBackPrev(target) {
    const pages = getCurrentPages();
    if (2 > pages.length) {
        return redirectTo(target);
    }
    const route = pages[pages.length - 2].route;
    if (route === target) {
        return navigateBack(1);
    }
    redirectTo(target);
}
/**
 * router
 */
const router = {
    encode: encodeURL,
    decode: decodeURL,
    navigator,
    navigateTo,
    redirectTo,
    reLaunch,
    switchTab,
    navigateBack,
    navigateBackPrev
};
/**
 * export default
 */
export default router;
//# sourceMappingURL=router.js.map