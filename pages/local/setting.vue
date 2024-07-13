<template>
	<view style="background: #fff;">
		<u-cell icon="../../static/zd.png" title="修改登录密码" :isLink="true" @click="routeJump('changePwd')"></u-cell>
		<u-cell icon="../../static/zd.png" title="修改支付密码" :isLink="true" @click="routeJump('changePayment')"></u-cell>
		<u-cell v-if="!phone" icon="../../static/phone.png" title="绑定手机号" :isLink="true" @click="routeJump('bandPhone')"></u-cell>
		<u-cell v-if="phone" icon="../../static/phone.png" title="更换手机号" @click="routeJump('changePhone')">
			<span slot="right-icon">{{phone}}</span>
		</u-cell>
	</view>
</template>

<script>
	import { getMyData } from '@/common/api.js';
	export default {
		data() {
			return {
				phone:''
			}
		},
		async onShow() {
			await getMyData({}).then(res=>{
				if (res.code=='0'){
					this.phone=res.data.phone||''
				}
			})
		},
		methods: {
			routeJump(page) {
				uni.$u.route({
					url: `/pages/local/${page}`
				})
			}
		}
	}
</script>

<style>
</style>
