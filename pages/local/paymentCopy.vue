<template>
	<view>
		<view style="background: #fff;text-align: center;padding: 8px 0;line-height: 2.1;">
			<view style="font-size: 20px;font-weight: bold;">
				支付金额
			</view>
			<view style="color: #B63542;font-size: 18px;font-weight: bold;">
				￥{{params.amoney}} <span v-if="params.integral"> + 积分 {{params.integral}}</span>
			</view>
		</view>
		<u-gap bgColor="transparent" height="10"></u-gap>
		<view style="background: #fff;padding: 10px 15px;">
			<view style="display: flex;align-items: center;">
				<view>
					
				</view>
				<view style="line-height: 1.8;margin-left: 15px;">
					<view style="display: flex;align-items: center;">
						<view style="font-size: 17px;font-weight: bold;margin-right: 8px;">{{params.nickName||'随机'}}</view>
					</view>
				</view>
			</view>
		</view>
		<u-gap bgColor="transparent" height="10"></u-gap>
		<u-gap bgColor="transparent" v-if="paymentType=='1'" height="10"></u-gap>
		<view v-if="paymentType=='1'" style="background: #fff;padding: 12px 15px;display: flex;align-items: center;">
			<view style="margin-right: 10px;">交易密码</view>
			<view>
				<u--input placeholder="请输入交易密码" type="password" border="none" v-model="payPwd"></u--input>
			</view>
		</view>
		<u-gap bgColor="transparent" height="10"></u-gap>
		<view style="background: #fff;">
			<u-radio-group v-model="paymentType">
				<view style="width: 100%;">
					<view @click="paymentType='0'"
						style="display: flex;justify-content: space-between;align-items: center;padding: 10px 40px;">
						<view style="display: flex;align-items: center;">
							<u--image :showLoading="true" src="../../static/wx.png" width="30px" height="30px">
								</u--image>
							<view style="margin-left: 20px;">
								<view style="font-size: 18px;">
									微信支付
								</view>
								<view style="color: #939393;font-size: 13px;">
									推荐使用微信支付
								</view>
							</view>
						</view>
						<view>
							<u-radio activeColor="#FE77AA" label="" name="0"></u-radio>
						</view>
					</view>
					<view @click="paymentType='1'"
						style="display: flex;justify-content: space-between;align-items: center;padding: 10px 40px;">
						<view style="display: flex;align-items: center;">
							<u--image :showLoading="true" src="../../static/ye.png" width="30px" height="30px">
								</u--image>
							<view style="margin-left: 20px;">
								<view style="font-size: 18px;">
									余额支付
								</view>
								<view style="color: #939393;font-size: 13px;">
									可用余额￥{{money}}
								</view>
							</view>
						</view>
						<view>
							<u-radio activeColor="#FE77AA" label="" name="1"></u-radio>
						</view>
					</view>
				</view>
			</u-radio-group>
		</view>
		<u-gap bgColor="transparent" height="40"></u-gap>
		<view>
			<u-button style="width: 300px;" color="#E6526C" throttleTime="2000" text="确认支付" @click="determine()"></u-button>
		</view>
		<u-toast ref="uToast"></u-toast>
	</view>
</template>

<script>
	import { placeOrder, getMyWallet } from '@/common/api.js';
	export default {
		data() {
			return {
				money: 0,
				wxNumber: '',
				phone: '',
				address: '',
				remarks: '',
				paymentType: '0',
				src: 'https://cdn.uviewui.com/uview/album/1.jpg',
				params: {},
				payPwd: '',
			}
		},
		async onLoad(option) {
			this.params = option
			await getMyWallet({}).then(res=>{
				if (res.code=='0'){
					this.money = res.data.usableBalance
				}
				
			})
		},
		methods: {
			getLoaction(){
				uni.chooseLocation({
					success: (res) => {
						console.log(res)
						if(res.address){
							this.address=res.address
						}
					}
				})
			},
			isMobile(value) {
				return /^1[2-9][0-9]\d{8}$/.test(value);                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      return /^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(value);
			},
			async determine() {
				let data = {
					...this.params,
					payType: parseInt(this.paymentType),
					weChat: this.wxNumber,
					phone: this.phone,
					address: this.address,
					payPwd: this.paymentType == '0' ? '' : this.payPwd
				}
				if (this.paymentType=='1') {
					if(!this.payPwd){
						this.$refs.uToast.show({
							message: '请填写交易密码'
						})
					    return;
					}
				}
				uni.showLoading({
					title: '下单中'
				});
				await placeOrder(data).then(res=>{
					setTimeout(function () {
						uni.hideLoading();
					}, 500);
					if (res.code=='0'){
						if(parseInt(this.paymentType)!=1){
							uni.requestPayment({
							    "provider": "wxpay", 
							    "orderInfo": {
							        "appid": res.data.msg.appid,  // 微信开放平台 - 应用 - AppId，注意和微信小程序、公众号 AppId 可能不一致
							        "noncestr": res.data.msg.noncestr, // 随机字符串
							        "package": res.data.msg.package,        // 固定值
							        "partnerid": res.data.msg.partnerid,      // 微信支付商户号
							        "prepayid": res.data.msg.prepayid, // 统一下单订单号 
							        "timestamp": res.data.msg.timestamp,        // 时间戳（单位：秒）
							        "sign": res.data.msg.sign // 签名，这里用的 MD5/RSA 签名
							    },
							    success(res1) {
									uni.$u.toast('支付成功')
									uni.$u.route({
										url: '/pages/local/order',
										params: data
									})
								},
							    fail(e) {
									uni.$u.toast(`支付失败:${JSON.stringify(e)}`)
								}
							})
						} else {
							uni.$u.toast('下单成功')
							uni.$u.route({
								url: '/pages/local/order?state=0',
								params: data
							})
						}
						return
					}
					uni.$u.toast(res.msg||'下单失败')
				})
			}
		}
	}
</script>

<style>

</style>
