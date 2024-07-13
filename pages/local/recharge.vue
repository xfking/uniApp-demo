<template>
	<view>
		<view style="background: #fff;">
			<u-cell icon="rmb-circle" :iconStyle="{color:'#C99BAC'}" title="选择充值金额"></u-cell>
		</view>
		<u-gap bgColor="transparent" height="10"></u-gap>
		<view style="background: #fff;padding: 12px 15px;display: flex;align-items: center;">
			<view style="margin-right: 10px;">自定义金额</view>
			<view>
				<u--input placeholder="请输入金额" border="none" v-model="amoney" @focus="sd2"></u--input>
			</view>
		</view>
		<u-gap bgColor="transparent" height="15"></u-gap>
		<view
			style="padding: 15px 10px;background: #fff;line-height: 50px;text-align: center;display: flex;justify-content: space-between;flex-wrap: wrap;">
			<view
				:style="{color:item.id==indexMoney?'#fff':'#000', background:item.id==indexMoney?'#FC76A6':'#EFEFEF'}"
				style="width: 30%;border-radius: 5px;margin: 5px 0;" v-for="(item,i) in selectMoney" :key="i"
				@click="indexMoney=item.id; sd1()">{{item.name}}元</view>
		</view>
		<u-button @click="determine()" style="width: 300px;margin-top: 30px;" color="#EC7FA8" type="primary" text="立即充值" :disabled="amoney==''"></u-button>
	</view>
</template>

<script>
	import { recharge } from '@/common/api.js';
	export default {
		data() {
			return {
				indexMoney: 0,
				selectMoney: [{
						name: '1000',
						id: 1,
					},
					{
						name: '2000',
						id: 2,
					},
					{
						name: '6000',
						id: 3,
					},
					{
						name: '8000',
						id: 4,
					},
					{
						name: '12000',
						id: 5,
					},
					{
						name: '15000',
						id: 6,
					},
				],
				amoney: ''
			}
		},
		computed: {
			calculateDiscount(){
				let value = 0
				switch (this.indexMoney){
					case 1:
						value = 9.5
						break;
					case 2:
						value = 9
						break;
					case 3:
						value = 8.8
						break;
					case 4:
						value = 8.5
						break;
					case 5:
						value = 8
						break;
					case 6:
						value = 7.5
						break;
					default:
						value = 0
						break;
				}
				return value
			}
		},
		methods: {
			sd2(){
				this.indexMoney = 0
				this.amoney=''
			},
			sd1(){
				this.amoney= this.selectMoney[this.indexMoney-1].name
			},
			async determine(){
				await recharge({
					amoney: this.amoney,
				}).then(res=>{
					if (res.code=='0'){
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
								uni.$u.toast('充值成功')
								uni.redirectTo({
									url: '/pages/local/wallet'
								});
							},
						    fail(e) {
								uni.$u.toast('充值失败')
							}
						})
						return
					}
					uni.$u.toast(res.msg||'充值失败')
				})
			}
		}
	}
</script>

<style>

</style>
