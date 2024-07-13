import qs from 'qs';
import types from './types';
import { vFunc } from './utils';
/**
 * show toast
 * @param args
 */
export function showToast(args) {
    let opt = {
        title: '',
        icon: 'none',
        mask: false,
        duration: 2000,
        finish: vFunc
    };
    if (types.isString(args)) {
        opt.title = args;
    }
    else {
        opt = Object.assign(opt, args);
    }
    const finish = opt.finish;
    const tid = setTimeout(() => {
        finish();
        clearTimeout(tid);
    }, opt.duration);
    uni.showToast(opt);
}
/**
 * show error
 * @param err
 * @param options
 */
export function showError(err, options) {
    const opt = Object.assign({ title: '' }, options);
    if (types.isError(err)) {
        opt.title = err.message;
    }
    else if (err?.data?.message) {
        opt.title = err?.data?.message;
    }
    else {
        opt.title = err?.data?.msg;
    }
    if (!opt.title) {
        return;
    }
    if (opt.title.length > 20) {
        uni.showModal({ content: opt.title, showCancel: false });
    }
    else {
        showToast(opt);
    }
}
/**
 * hide toast
 */
export function hideToast() {
    uni.hideToast();
}
const toast = {
    show: showToast,
    hide: hideToast,
    error: showError
};
export default toast;
//# sourceMappingURL=toast.js.map
