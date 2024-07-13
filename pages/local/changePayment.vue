<template>
	<view style="background: #FBFCFE;height: 100%;position: absolute;width: 100%;">
		<view style="margin-top: 80px;padding: 10px;margin: 20px 15px;">
			<u--form labelPosition="left" :model="model1" :rules="rules" ref="form1">
				<u-form-item labelWidth="90" label="旧支付密码" prop="userInfo.oldPwd" borderBottom ref="item2">
					<u--input v-model="model1.userInfo.oldPwd" type="password" border="none"
						placeholder="长度在8-18个字母或数字"></u--input>
				</u-form-item>
				<u-form-item labelWidth="90" label="新支付密码" prop="userInfo.newPaypwd" borderBottom ref="item2">
					<u--input v-model="model1.userInfo.newPaypwd" type="password" border="none"
						placeholder="长度在8-18个字母或数字"></u--input>
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
		updateUserPwd
	} from '@/common/api.js';
	export default {
		data() {
			return {
				columns: [],
				show: false,
				imgSrc: '',
				model1: {
					userInfo: {
						oldPwd: '',
						newPaypwd: ''
					},
				},
				loading: false,
				showTime:false,
				timer: '',
				time: 60,
				rules: {
					'userInfo.oldPwd': [{
							type: 'string',
							required: true,
							message: '请填写旧支付密码',
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
					'userInfo.newPaypwd': [{
							type: 'string',
							required: true,
							message: '请填写新支付密码',
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
			submit() {
				this.$refs.form1.validate().then(res => {
					this.registers()
				}).catch(errors => {})
			},
			async registers() {
				await updateUserPwd(this.model1.userInfo).then(res => {
					if (res.code == '0') {
						uni.$u.toast('密码重置成功')
						setTimeout(()=>{
							uni.$u.route({
								url: '/pages/local/login'
							})
						},1500)
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
