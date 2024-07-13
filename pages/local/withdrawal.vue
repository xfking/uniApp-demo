<template>
	<view>
		<view style="background-color: #fff;padding: 5px 10px;">
			<u--form labelPosition="left" :model="model1" :rules="rules" ref="form1">
				<u-form-item labelWidth="80" label="金额(￥)" prop="userInfo.money" ref="item1">
					<u--input v-model="model1.userInfo.money" border="none" placeholder="请输入提现金额 最低100元"></u--input>
				</u-form-item>
				<u-form-item labelWidth="80" label="交易密码" prop="userInfo.payPwd" ref="item2">
					<u--input v-model="model1.userInfo.payPwd" type="password" border="none" placeholder="请输入交易密码"></u--input>
				</u-form-item>
				<u-form-item labelWidth="100" label="微信收款码" prop="" borderBottom ref="item1">
					<u-upload :fileList="fileList1" @afterRead="afterRead" @delete="deletePic" name="1" multiple
						:maxCount="1"></u-upload>
				</u-form-item>
				<u-form-item labelWidth="80" label="手续费(￥)" v-if="txFee">
					<u--input v-model="txFee" border="none" readonly></u--input>
				</u-form-item>
				<u-form-item labelWidth="100" label="实到金额(￥)">
					<u--input v-model="total" border="none" readonly></u--input>
				</u-form-item>
			</u--form>
		</view>
		<view style="padding: 10px 20px;color: #aaa;background: #F6F6F6;font-size: 14px;">选择提现方式</view>
		<view style="background: #fff;">
			<u-radio-group v-model="paymentType">
				<view style="width: 100%;">
					<view @click="paymentType='0'"
						style="display: flex;align-items: center;padding: 10px 15px;">
						<view>
							<u-radio activeColor="#FE77AA" label="" name="0"></u-radio>
						</view>
						<view style="display: flex;align-items: center;margin-left: 15px;">
							<u--image :showLoading="true" src="../../static/wx.png" width="30px" height="30px">
								</u--image>
							<view style="margin-left: 10px;">
								<view style="font-size: 14px;">
									微信提现
								</view>
							</view>
						</view>
					</view>
				</view>
			</u-radio-group>
		</view>
		<u-gap bgColor="transparent" height="40"></u-gap>
		<view>
			<u-button style="width: 300px;" color="#E6526C" text="提交" @click="submit()"></u-button>
		</view>
		<u-toast ref="uToast"></u-toast>
	</view>
</template>

<script>
	import { withdrawalApply } from '@/common/api.js';
	export default {
		data() {
			return {
				fileList: [],
				fileList1: [],
				imgsList: [],
				paymentType: '0',
				txFee: 0,
				total: 0,
				model1: {
					userInfo: {
						money: '',
						payPwd: '',
					},
				},
				rules: {
					'userInfo.money': [
						{
							type: 'string',
							required: true,
							message: '请填写提现金额',
							trigger: ['blur', 'change']
						},
						{
							type: 'string',
							min: 3,
							message: '提现金额最低100元',
							trigger: ['change']
						}
					],
					'userInfo.payPwd': {
						type: 'string',
						required: true,
						message: '请填写交易密码',
						trigger: ['blur', 'change']
					},
				},
			}
		},
		onLoad(options) {
			console.log(options)
			if(options.txFee){
				this.txFee=options.txFee*1
				console.log(this.txFee)
			}
		},
		watch:{
			'model1.userInfo.money': {
			    immediate: true,
			    handler(n) {
			        if(n){
						const money= (n-n*this.txFee*1).toFixed(0)
						this.total = money>0?money:0
					}
			    }
			}
		},
		methods: {
			uploadFilePromise(url) {
				return new Promise((resolve, reject) => {
					let a = uni.uploadFile({
						url: 'http://cqrcsm.cn/tapi/user/upFile',
						filePath: url,
						name: 'file',
						formData: {},
						success: (res) => {
							setTimeout(() => {
								resolve(JSON.parse(res.data).data)
							}, 1000)
						}
					});
				})
			},
			deletePic(event) {
				this[`fileList${event.name}`].splice(event.index, 1)
				this.imgsList.splice(event.index, 1)
			},
			async afterRead(event) {
				let lists = [].concat(event.file)
				let fileListLen = this[`fileList${event.name}`].length
				lists.map((item) => {
					this[`fileList${event.name}`].push({
						...item,
						status: 'uploading',
						message: '上传中'
					})
				})
				for (let i = 0; i < lists.length; i++) {
					const result = await this.uploadFilePromise(lists[i].url)
					let item = this[`fileList${event.name}`][fileListLen]
					this[`fileList${event.name}`].splice(fileListLen, 1, Object.assign(item, {
						status: 'success',
						message: '',
						url: result
					}))
					fileListLen++
					this.imgsList.push(result)
				}
			},
			submit() {
				this.$refs.form1.validate().then(res => {
					this.withdrawalApplys()
				}).catch(errors => {
				})
			},
			async withdrawalApplys(){
				await withdrawalApply({
					money: this.model1.userInfo.money,
					payPwd: this.model1.userInfo.payPwd,
					collectionCode: this.imgsList.toString(),
				}).then(res => {
					if (res.code == '0') {
						uni.$u.toast('提现成功')
						this.model1.userInfo.money=''
						this.model1.userInfo.payPwd=''
						this.fileList=[]
						this.fileList1=[]
						this.imgsList=[]
						this.total= 0
						return
					}
					uni.$u.toast(res.msg||'提现失败')
				})
			},
		}
	}
</script>

<style>

</style>