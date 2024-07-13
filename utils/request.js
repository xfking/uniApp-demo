import qs from 'qs';
import axios from 'axios';
// import token from '@/lib/utils/token';
// import storage from '@/lib/utils/storage';
import adapter from '@/lib/utils/axios-adapter';
import debounce from 'lodash.debounce';

/**
 * instance
 */
const instance = axios.create({
  withCredentials: true,
  baseURL: 'http://cqrcsm.cn/tapi',
  headers: {
    // 'Content-Type': import.meta.env.VITE_APP_REQUEST_CONTENT_TYPE,
  },
  adapter: adapter,
  transformRequest: data => qs.stringify(data)
});

/**
 * request interceptors
 */
instance.interceptors.request.use(async (config) => {
  config.data = Object.assign({}, config.data);
  config.headers = Object.assign({}, config.headers);

  // const t = token.get();
  // if (t) {
  //   config.headers[import.meta.env.VITE_APP_REQUEST_HEADERS_TOKEN_KEY] = t;
  // } else {
  //   // #ifdef MP-WEIXIN
  //   config.data.code = await st.login();
  //   // #endif
  // }

  // // #ifdef MP-WEIXIN
  // const userId = storage.get(import.meta.env.VITE_APP_STORAGE_USER_ID_KEY);
  // userId && (config.headers[import.meta.env.VITE_APP_REQUEST_HEADERS_USER_ID_KEY] = userId);
  // // #endif

  return config;
}, (error) => {
  return Promise.reject(error);
});

/**
 * response interceptors
 */
instance.interceptors.response.use(function (response) {
  if (200 !== response.status) {
    return Promise.reject(response);
  }

  // const t = response.data.token;
  // t && token.set(t);

  const code = Number(response.data.code);

  // 正常
  if (0 === code) {
    return Promise.resolve(response.data);
  }
  //
  // if ([-1, -2].includes(code)) {
  //   delete response.data.msg;
  // }
  //
  // // 用户登录
  // if (-1 === code) {
  //   login(UserLoginQueryMode.UserInfo);
  // }
  //
  // // 手机号登录
  // if (-2 === code) {
  //   login(UserLoginQueryMode.PhoneNumber);
  // }
  //
  // // 完善信息
  // if (-3 === code) {
  //   evpi();
  // }

  return Promise.reject(response);
}, function (error) {
  return Promise.reject(error);
});

const login = debounce((mode) => {
  // if ([
  //   '/pages/index/index',
  //   '/pages/goods/index',
  //   '/pages/cart/index',
  //   '/pages/my/index'
  // ].includes(getCurrentPagePath())) {
  //   return token.remove();
  // }
  // const route = router.decode(getCurrentPageFullPath());
  // const url = '/pages-user/login/index';
  // if (url === route.url) {
  //   if (Number(Number(route.query.mode) === mode)) {
  //     return;
  //   }
  //   router.redirectTo(url, {mode});
  // } else {
  //   router.navigateTo(url, {mode});
  // }
});

export default instance;
