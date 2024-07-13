<template>
	<view>
		<view style="background-color: #fff;padding: 5px 10px;">
			<u--form labelPosition="left" :model="userInfo" :rules="rules" ref="form1">
				<u-form-item labelWidth="100" label="到账用户名" prop="toUser" ref="item2">
					<u--input v-model="userInfo.toUser" type="text" border="none" placeholder="请输入到账用户名">
					</u--input>
				</u-form-item>
				<u-form-item labelWidth="100" label="到账用户名ID" prop="toUserId" ref="item2">
					<u--input v-model="userInfo.toUserId" type="text" border="none" placeholder="请输入到账用户名ID">
					</u--input>
				</u-form-item>
				<u-form-item labelWidth="100" label="转账数量" prop="money" ref="item1">
					<u--input v-model="userInfo.money" border="none" placeholder="请输入转账金额"></u--input>
				</u-form-item>
				<u-form-item labelWidth="100" label="交易密码" prop="payPwd" ref="item2">
					<u--input v-model="userInfo.payPwd" type="password" border="none" placeholder="请输入交易密码">
					</u--input>
				</u-form-item>
			</u--form>
		</view>
		<u-gap bgColor="transparent" height="40"></u-gap>
		<view>
			<u-button style="width: 300px;" color="#E6526C" text="提交" @click="submit()"></u-button>
		</view>
		<u-toast ref="uToast"></u-toast>
	</view>
</template>

<script>
	import {
		billTransfer
	} from '@/common/api.js';
	export default {
		data() {
			return{
				userInfo:{
					toUs:'',
					money:'',
					payPwd:'',
					toUserId:''
				},
				rules: {
					'toUser':{
							type: 'string',
							required: true,
							message: '请填写到账用户名',
							trigger: ['blur', 'change']
					},
					'toUserId':{
							type: 'string',
							required: true,
							message: '请填写到账用户名ID',
							trigger: ['blur', 'change']
					},
					'money': {
						type: 'string',
						required: true,
						message: '请填写转账数量',
						trigger: ['blur', 'change']
					},
					'payPwd': {
						type: 'string',
						required: true,
						message: '请填写交易密码',
						trigger: ['blur', 'change']
					},
				},
			}
		},
		methods:{
			submit() {
				this.$refs.form1.validate().then(res => {
					this.withdrawalApplys()
				}).catch(errors => {
				})
			},
			async withdrawalApplys(){
				await billTransfer({
					money: this.userInfo.money,
					payPwd: this.userInfo.payPwd,
					toUser: this.userInfo.toUser,
					toUserId: this.userInfo.toUserId,
				}).then(res => {
					if (res.code == '0') {
						uni.$u.toast('转账成功')
						this.userInfo.money=''
						this.userInfo.payPwd=''
						this.userInfo.toUser=''
						this.userInfo.toUserId=''
						return
					}
					uni.$u.toast(res.msg||'转账失败')
				})
			},
		}
	}
</script>

<style>
</style>
