<template>
	<view style="background: #FBFCFE;height: 100%;position: absolute;width: 100%;">
		<view style="margin-top: 80px;padding: 10px;margin: 20px 15px;">
			<u--form labelPosition="left" :model="model1" :rules="rules" ref="form1">
				<u-form-item labelWidth="60" label="手机号" prop="userInfo.phone" borderBottom ref="item8">
					<u--input v-model="model1.userInfo.phone" border="phone"></u--input>
				</u-form-item>
				<u-form-item labelWidth="60" label="验证码" prop="userInfo.code" borderBottom ref="item9">
					<u--input v-model="model1.userInfo.code" border="none"></u--input>
					<u-button v-if="!showTime" :loading="loading" :disabled="loading" style="width: 100px;"
						color="#DF8CB6" type="primary" text="获取验证码" @click="handCode()"></u-button>
					<u-button v-else style="width: 100px;" color="#DF8CB6" type="primary" :text="time"></u-button>
				</u-form-item>
			</u--form>
			<u-button shape="circle" style="width: 230px;margin-top: 50px;margin-bottom: 20px;"
				color="linear-gradient(to right, #DF8CB6, #A2BCEF)" type="primary" text="确 认" @click="submit()">
			</u-button>
		</view>

	</view>
</template>

<script>
	import {
		sendMessage,
		bindPhone
	} from '@/common/api.js';
	export default {
		data() {
			return {
				model1: {
					userInfo: {
						phone: '',
						code: ''
					},
				},
				loading: false,
				showTime: false,
				timer: '',
				time: 60,
				rules: {
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
					this.loading = false
					if (res.code == '0') {
						uni.$u.toast('验证码已发送')
						this.timeIntervals()
					} else {
						uni.$u.toast(res.msg)
					}
				})
			},
			timeIntervals() {
				this.showTime = true
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
				await bindPhone(this.model1.userInfo).then(res => {
					if (res.code == '0') {
						uni.$u.toast('手机号绑定成功')
						setTimeout(() => {
							uni.navigateBack()
						}, 1500)
						return
					}
					uni.$u.toast(res.msg || '手机号绑定失败')
				})
			}
		},
	}
</script>

<style lang="scss" scoped>
</style>
