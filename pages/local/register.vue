<template>
	<view style="background: #FBFCFE;height: 100%;position: absolute;width: 100%;">
		<view style="margin: 20px 20px;">
			<view style="font-size: 30px;font-weight: bold;">
				Hi
			</view>
			<view>
				欢迎来到“陪你有我”
			</view>
		</view>
		<view style="margin-top: 80px;padding: 10px;margin: 20px 15px;">
			<u--form labelPosition="left" :model="model1" :rules="rules" ref="form1">
				<u-form-item labelWidth="60" label="用户名" prop="userInfo.loginId" borderBottom ref="item1">
					<u--input v-model="model1.userInfo.loginId" border="none"></u--input>
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
				<u-form-item labelWidth="80" label="登陆密码" prop="userInfo.loginPwd" borderBottom ref="item2">
					<u--input v-model="model1.userInfo.loginPwd" type="password" border="none"
						placeholder="长度在8-18个字母或数字"></u--input>
				</u-form-item>
				<u-form-item labelWidth="80" label="确认密码" prop="userInfo.rePwd" borderBottom ref="item3">
					<u--input v-model="model1.userInfo.rePwd" type="password" border="none" placeholder="长度在8-18个字母或数字">
					</u--input>
				</u-form-item>
				<u-form-item labelWidth="80" label="交易密码" prop="userInfo.payPwd" borderBottom ref="item4">
					<u--input v-model="model1.userInfo.payPwd" type="password" border="none"></u--input>
				</u-form-item>
				<u-form-item labelWidth="120" label="确认交易密码" prop="userInfo.repayPwd" borderBottom ref="item5">
					<u--input v-model="model1.userInfo.repayPwd" type="password" border="none"></u--input>
				</u-form-item>
				<u-form-item labelWidth="60" label="邀请码" prop="userInfo.inviteCode" borderBottom ref="item6">
					<u--input v-model="model1.userInfo.inviteCode" border="none" @blur="handBlur"></u--input>
				</u-form-item>
				<u-form-item labelWidth="60" label="节点人" prop="userInfo.node" borderBottom ref="item6"
					@click="handOppen">
					<u--input v-model="model1.userInfo.node" border="none" readonly>
					</u--input>
					<u-icon name="close" color="#000" size="20" v-if="model1.userInfo.node"
						@click.native.stop="handClear"></u-icon>
				</u-form-item>
			</u--form>
			<u-button shape="circle" style="width: 230px;margin-top: 50px;margin-bottom: 20px;"
				color="linear-gradient(to right, #DF8CB6, #A2BCEF)" type="primary" text="确定" @click="submit()">
			</u-button>
			<u-picker :show="show" title="选择节点人" :columns="columns" @confirm="onConfirm" @cancel="onCancel" />
		</view>

	</view>
</template>

<script>
	import {
		register,
		getNodePerson,
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
						loginPwd: '',
						rePwd: '',
						payPwd: '',
						repayPwd: '',
						inviteCode: '',
						node: '',
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
					'userInfo.loginPwd': [{
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
					'userInfo.rePwd': [{
							type: 'string',
							required: true,
							message: '请填写确认密码',
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
					'userInfo.payPwd': {
						type: 'string',
						required: true,
						message: '请填写交易密码',
						trigger: ['blur', 'change']
					},
					'userInfo.repayPwd': {
						type: 'string',
						required: true,
						message: '请填写确认交易密码',
						trigger: ['blur', 'change']
					},
					'userInfo.inviteCode': {
						type: 'string',
						required: true,
						message: '请填写邀请码',
						trigger: ['blur', 'change']
					},
					'userInfo.node': {
						type: 'string',
						required: true,
						message: '请选择节点人',
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
					}else{
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
			handBlur(e) {
				if (e) {
					this.getList()
				}
			},
			async getList() {
				const _this = this;
				await getNodePerson({
					inviteCode: _this.model1.userInfo.inviteCode
				}).then(res => {
					if (res.code == '0') {
						_this.columns = []
						_this.columns.push(res.data)
						console.log(_this.columns)
					}
				})
			},
			handOppen() {
				if (this.model1.userInfo.inviteCode) {
					this.show = true
				} else {
					uni.$u.toast('请填写推荐码')
				}
			},
			onConfirm(e) {
				console.log(e)
				this.model1.userInfo.node = e.value[0]
				this.show = false
			},
			onCancel() {
				this.show = false
			},
			handClear() {
				this.model1.userInfo.node = ''
			},
			async registers() {
				await register(this.model1.userInfo).then(res => {
					if (res.code == '0') {
						uni.$u.toast('注册成功')
						uni.$u.route({
							url: '/pages/local/login'
						})
						return
					}
					uni.$u.toast(res.msg || '登录失败')
				})
			}
		},
	}
</script>

<style lang="scss" scoped>
	page{
		background-color: #fff;
	}
</style>
