import types from './types';
/**
 * void function
 */
export function vFunc() {
}
/**
 * 计算flex布局补位数量
 * @param total
 * @param num
 */
export function calcFlexPlhNum(total, num) {
    if (2 > num || 1 > total) {
        return 0;
    }
    return num - total % num;
}
/**
 * 空的
 * @param val
 */
export function empty(val) {
    if (types.isNil(val)) {
        return true;
    }
    return 1 > val.length;
}
/**
 * 延迟操作
 * @param timeout
 */
export function sto(timeout) {
    return new Promise((resolve) => {
        const id = setTimeout(() => {
            resolve();
            clearTimeout(id);
        }, timeout);
    });
}
/**
 * 比较
 * @param value
 * @param other
 */
export function equal(value, other) {
    return value === other;
}
/**
 * 设置剪贴板内容
 */
export function setClipboardData(options) {
    options.data = String(options.data);
    // #ifdef H5
    let input = document.createElement('input');
    input.value = options.data;
    document.body.appendChild(input);
    input.select(); // 选择实例内容
    document.execCommand('Copy');
    document.body.removeChild(input);
    if (false != options.showToast) {
        uni.showToast({ title: '内容已复制' });
    }
    // #endif
    // #ifndef H5
    uni.setClipboardData({
        data: options.data,
        showToast: options.showToast
    });
    // #endif
}
/**
 * 确定弹窗
 * @param options
 */
export function showConfirmModal(options) {
    return new Promise((resolve, reject) => {
        uni.showModal({
            ...options,
            editable: false,
            success: (result) => {
                result.cancel && reject();
                result.confirm && resolve();
            }
        });
    });
}
/**
 * 获取图片信息
 * @param src
 */
export function getImageInfo(src) {
    return new Promise((resolve, reject) => {
        uni.getImageInfo({
            src: src,
            success: resolve,
            fail: reject
        });
    });
}
/**
 * 获取导航栏高度
 */
export function getNavigationHeight() {
    const menu = uni.getMenuButtonBoundingClientRect();
    const statusBarHeight = uni.getSystemInfoSync().statusBarHeight || 0;
    return (menu.top - statusBarHeight) * 2 + menu.height;
}
/**
 * 下载
 * @param url
 */
export function downloadFile(url) {
    return new Promise((success, fail) => {
        uni.downloadFile({
            url,
            success,
            fail
        });
    });
}
/**
 * 查看文档
 * @param src
 * @param type
 */
export function openNetworkDocument(src, type) {
    return new Promise((resolve, reject) => {
        uni.downloadFile({
            url: src,
            success: (result) => {
                uni.openDocument({
                    filePath: result.tempFilePath,
                    fileType: type,
                    success: resolve,
                    fail: reject
                });
            },
            fail: reject
        });
    });
}
const utils = {
    vFunc,
    calcFlexPlhNum,
    empty,
    sto,
    equal,
    setClipboardData,
    showConfirmModal,
    getImageInfo,
    getNavigationHeight,
    downloadFile,
    openNetworkDocument
};
export default utils;
//# sourceMappingURL=utils.js.map