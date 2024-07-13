<template>
	<view style="background: #FBFCFE;height: 100%;position: absolute;width: 100%;">
		<!-- <view style="margin: 20px 20px;">
			<view style="font-size: 30px;font-weight: bold;">
				Hi
			</view>
			<view>
				欢迎来到“陪你有我”
			</view>
		</view> -->
		<view style="margin-top: 80px;padding: 10px;margin: 20px 15px;">
			<u--form labelPosition="left" :model="model1" :rules="rules" ref="form1">
				<u-form-item labelWidth="60" label="用户名" prop="userInfo.loginId" borderBottom ref="item1">
					<u--input v-model="model1.userInfo.loginId" border="none"></u--input>
				</u-form-item>
				<u-form-item labelWidth="80" label="登陆密码" prop="userInfo.pwd" borderBottom ref="item2">
					<u--input v-model="model1.userInfo.pwd" type="password" border="none"
						placeholder="长度在8-18个字母或数字"></u--input>
				</u-form-item>
				<u-form-item labelWidth="60" label="手机号" prop="userInfo.phone" borderBottom ref="item8">
					<u--input v-model="model1.userInfo.phone" border="phone"></u--input>
				</u-form-item>
				<u-form-item labelWidth="60" label="验证码" prop="userInfo.code" borderBottom ref="item9">
					<u--input v-model="model1.userInfo.code" border="none"></u--input>
					<u-button v-if="!showTime" :loading="loading" :disabled="loading" style="width: 100px;" color="#DF8CB6" type="primary" text="获取验证码"
						@click="handCode()"></u-button>
					<u-button v-else style="width: 100px;" color="#DF8CB6" type="primary" :text="time"></u-button>
				</u-form-item>
			</u--form>
			<u-button shape="circle" style="width: 230px;margin-top: 50px;margin-bottom: 20px;"
				color="linear-gradient(to right, #DF8CB6, #A2BCEF)" type="primary" text="密码重置" @click="submit()">
			</u-button>
		</view>

	</view>
</template>

<script>
	import {
		forgetPwd,
		sendMessage
	} from '@/common/api.js';
	export default {
		data() {
			return {
				columns: [],
				show: false,
				imgSrc: '',
				model1: {
					userInfo: {
						pid: uni.getDeviceInfo().deviceId,
						loginId: '',
						pwd: '',
						phone: '',
						code: ''
					},
				},
				loading: false,
				showTime:false,
				timer: '',
				time: 60,
				rules: {
					'userInfo.loginId': {
						type: 'string',
						required: true,
						message: '请填写用户名',
						trigger: ['blur', 'change']
					},
					'userInfo.phone': {
						type: 'string',
						required: true,
						message: '请填写手机号',
						trigger: ['blur', 'change']
					},
					'userInfo.code': {
						type: 'string',
						required: true,
						message: '请填写手机验证码',
						trigger: ['blur', 'change']
					},
					'userInfo.pwd': [{
							type: 'string',
							required: true,
							message: '请填写登陆密码',
							trigger: ['blur', 'change']
						},
						{
							pattern: /^[0-9a-zA-Z]*$/g,
							transform(value) {
								return String(value);
							},
							message: '只能包含字母或数字'
						},
						{
							min: 8,
							max: 18,
							message: '长度在8-18个字符之间'
						},
					],
				},
			}
		},
		onLoad() {},
		methods: {
			async handCode() {
				const phone = this.model1.userInfo.phone
				if (!phone) {
					uni.$u.toast('请填写手机号')
					return
				}
				this.loading = true
				await sendMessage({
					phone: phone
				}).then(res => {
					
					if (res.code == '0') {
						uni.$u.toast('验证码已发送')
						this.timeIntervals()
					}else{
						uni.$u.toast(res.msg)
					}
					this.loading = false
				})
			},
			timeIntervals() {
				this.showTime = true
				clearInterval(this.timeInterval)
				console.log(this.time)
				this.timeInterval = setInterval(() => {
					if (this.time > 0) {
						this.time--
					} else {
						this.showTime = false
						this.time = 60
						clearInterval(this.timeInterval)
					}
				}, 1000)
			},
			submit() {
				this.$refs.form1.validate().then(res => {
					this.registers()
				}).catch(errors => {})
			},
			async registers() {
				await forgetPwd(this.model1.userInfo).then(res => {
					if (res.code == '0') {
						uni.$u.toast('密码重置成功')
						uni.$u.route({
							url: '/pages/local/login'
						})
						return
					}
					uni.$u.toast(res.msg || '重置失败')
				})
			}
		},
	}
</script>

<style lang="scss" scoped>
</style>
