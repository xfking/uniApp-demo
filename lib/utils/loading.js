import types from './types';
/**
 * show loading
 * @param args
 */
export function showLoading(args) {
    let opt = {
        title: '',
        mask: true
    };
    if (types.isString(args)) {
        opt.title = args;
    }
    else {
        opt = Object.assign(opt, args);
    }
    uni.showLoading(opt);
}
/**
 * hide loading
 */
export function hideLoading(pullDown = true) {
    uni.hideLoading();
    pullDown && uni.stopPullDownRefresh();
}
const loading = {
    show: showLoading,
    hide: hideLoading
};
export default loading;
//# sourceMappingURL=loading.js.map