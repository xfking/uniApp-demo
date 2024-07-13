import request from "../utils/request";

const http = uni.$u.http

// 获取轮播图
export const getBanner = () => http.post('/user/getBanner')

// 获取联系我们
export const getContactUs = () => http.post('/user/contactUs')

// 获取店员类型
export const getClerkType = () => http.post('/user/getClerkType')

// 获取意见反馈类型
export const getFeedbackType = () => http.post('/user/getFeedbackType')

// 生成验证码
export const getVerification = (data) => http.post('/user/getVerification', data)

// 获取版本号
export const getVersion = () => http.post('/user/getVersion')

// // 图片前缀
// export const imgPrefix = () => http.post('/user/imgPrefix')

// 登录
export const login = (data) => http.post('/user/login', data)

// 注册
export const register = (data) => http.post('/user/register', data)

// 上传图片
export const upFile = (data) => http.post('/user/upFile', data)


// 申请成为店员
export const applyClerk = (data) => http.post('/app/applyClerk', data)

// 提交意见反馈
export const commitFeedbackType = (data) => http.post('/app/commitFeedbackType', data)

// // 客服信息
export const customerService = (data) => http.post('/app/customerService', data)

// // 首页获取店员接口
export const getClerks = (data) => http.post('/app/getClerks', data)

// 我的信息
export const getMyData = (data) => http.post('/app/getMyData', data)

// 获取我的订单
export const getMyOrder = (data) => http.post('/app/getMyOrder', data)

// 我的钱包
export const getMyWallet = (data) => http.post('/app/getMyWallet', data)

// 下单接口
export const placeOrder = (data) => http.post('/app/placeOrder', data)

// // 发送客服信息
export const sendMsg = (data) => http.post('/app/sendMsg', data)

// 更改订单状态
export const updateOrder = (data) => http.post('/app/updateOrder', data)

// 店员开始服务
export const startService = (data) => http.post('/app/startService', data)

// 用户确认订单完成
export const closeOrder = (data) => http.post('/app/closeOrder', data)

// 提现申请
export const withdrawalApply = (data) => http.post('/app/withdrawalApply', data)

// 我的社区
export const myCommunity = (data) => http.post('/app/myCommunity', data)

// 评论列表
export const commentList = (data) => http.post('/app/commentList', data)

// 发表评论
export const commentOrder = (data) => http.post('/app/commentOrder', data)

// 我的资产记录
export const getMyAssetRecords = (data) => http.post('/app/getMyAssetRecords', data)

// 充值
export const recharge = (data) => http.post('/app/recharge', data)

// 修改头像
export const updateUserImg = (data) => http.post('/app/updateUserImg', data)

// 拼单列表
export const getGroupList = (data) => http.post('/app/getSplicingOrderList', data)

// 积分转账
export const integralTransfer = (data) => http.post('/app/scoreTx', data)

// 余额转账
export const billTransfer = (data) => http.post('/app/balanceTx', data)

// 获取节点人
export const getNodePerson = (data) => http.post('/user/getNodePerson', data)

// 发送短信
export const sendMessage = (data) => http.post('/user/sendMessage', data)

// 忘记密码
export const forgetPwd = (data) => http.post('/user/forgetPwd', data)

// 修改密码
export const updateUserPwd = (data) => http.post('/app/updateUserPwd', data)

// 绑定手机号
export const bindPhone = (data) => http.post('/app/bindPhone', data)

// 更换手机号
export const changePhone = (data) => http.post('/app/changePhone', data)

// 签到
export const punchClock = (data) => http.post('/app/punchClock', data)

// 获取旅游列表
export const getTravelList = (data) => http.post('/app/getTravelList', data)

// 旅游报名
export const entryTravel = (data) => http.post('/app/entryTravel', data)

// 关于我们
export function knowUs(data) {
  return request.post('/user/knowUs', data);
}

// 获取商品列表
export const getGoodsList = (data) => http.post('/app/getGoodsList', data)

// 获取商品详情
export const getGoodsById = (data) => http.post('/app/getGoodsById', data)

export function imgPrefix() {
  return request.post('/user/imgPrefix');
}
