<template>
	<view>
		<view style="text-align: center;font-size: 30px;margin: 100px 0 60px 0;">登录</view>
		<view style="padding: 10px;margin: 20px 15px;background: #fff;">
			<u--form labelPosition="left" :model="model1" :rules="rules" ref="form1">
				<u-form-item labelWidth="80" label="用户名" prop="userInfo.loginId" borderBottom ref="item1">
					<u--input v-model="model1.userInfo.loginId" border="none"></u--input>
				</u-form-item>
				<u-form-item labelWidth="80" label="密码" prop="userInfo.pwd" borderBottom ref="item2">
					<u--input v-model="model1.userInfo.pwd" type="password" border="none"></u--input>
				</u-form-item>
				<u-form-item labelWidth="80" label="验证码" prop="userInfo.code" borderBottom ref="item3">
					<u--input v-model="model1.userInfo.code" border="none"></u--input>
					<u--image @click="getYzm()" slot="right" :src="imgSrc" width="80px" height="30px" mode="widthFix">
					</u--image>
				</u-form-item>
			</u--form>
			<u-button style="width: 300px;margin-top: 30px;margin-bottom: 20px;" color="#EC7FA8" type="primary"
				text="确定" @click="submit()"></u-button>
			<view class="flex" style="justify-content: space-between;">
				<view style="text-align: center;margin: 20px;color: dodgerblue;" @click="register()">注册</view>
				<view style="text-align: center;margin: 20px;color: dodgerblue;" @click="forgot()">忘记密码</view>
			</view>
			<!-- <view style="text-align: center;">版本号：{{version}}</view> -->
		</view>

	</view>
</template>

<script>
	import {
		getVerification,
		login,
		getVersion
	} from '@/common/api.js';
	import {
		mapMutations
	} from 'vuex'
	import storage from "@/common/storage.js"; // 缓存封装
	export default {
		data() {
			return {
				imgSrc: '',
				version: '',
				downloadUrl: '',
				model1: {
					userInfo: {
						pid: uni.getDeviceInfo().deviceId,
						loginId: '',
						pwd: '',
						code: '',
					},
				},
				rules: {
					'userInfo.loginId': {
						type: 'string',
						required: true,
						message: '请填写用户名',
						trigger: ['blur', 'change']
					},
					'userInfo.pwd': {
						type: 'string',
						required: true,
						message: '请填写密码',
						trigger: ['blur', 'change']
					},
					'userInfo.code': {
						type: 'string',
						required: true,
						message: '请填写验证码',
						trigger: ['blur', 'change']
					},
				},
			}
		},
		async onLoad() {
			const loginInfo = uni.getStorageSync('loginInfo')
			if (loginInfo) {
				this.model1.userInfo.loginId = loginInfo.loginId;
				this.model1.userInfo.pwd = loginInfo.pwd;
			}
			this.getYzm()
			await getVersion().then(res => {
				if (res.code == '0') {
					this.version = res.data.version
					this.downloadUrl = res.data.downloadUrl
					uni.getSystemInfo({
						success: (res) => {
							console.log(res.platform);
							//检测当前平台，如果是安卓则启动安卓更新  
							if (res.platform == "android") {
								this.AndroidCheckUpdate();
							}
						}
					})
				}
			})
		},
		async onShow() {
			

		},
		methods: {
			...mapMutations(['isLogin']),
			async AndroidCheckUpdate() {
				const _this = this;
				
				//  比较版本是否不同 当前版本：plus.runtime.version
				const localVersion = getApp().globalData.version.split('.');
				console.log(_this.version)
				let current = _this.version.split('.');
				// 默认是同一个版本，不需要更新
				let flag = false;
				
				current.forEach((item, i) => {
					if (item !== localVersion[i]) {
						// 检测到版本不同，需要更新
						flag = true;
					}
				});
				console.log(flag)
				if (flag) {
					uni.showModal({
						title: '发现新版本，是否更新',
						content: '待更新版本号：' + _this.version,
						success: res => {
							if (res.confirm) {
								_this.doUpData(_this.downloadUrl);
								// plus.runtime.openURL(androidUrl)
							}
						}
					});
				}

			},
			doUpData(Url) {
				const _this = this;
				uni.showLoading({
					title: '更新中……'
				});
				const downloadTask = uni.downloadFile({
					//执行下载
					url: Url, //下载地址
					timeout: 1000 * 30, //30秒超时时间
					success: downloadResult => {
						//下载成功
						console.log(downloadResult);
						uni.hideLoading();
						if (downloadResult.statusCode == 200) {
							plus.runtime.install(
								//安装软件
								downloadResult.tempFilePath, {
									force: true
								},
								function(res) {
									plus.runtime.restart();
								}
							);
						}
					},
					fail: err => {
						uni.hideLoading();
						_this.$u.toast(err.errMsg);
						console.log(err);
					},
					complete: com => {
						console.log(com);
					}
				});

				// 下载进度
				downloadTask.onProgressUpdate(res => {
					// this.$u.toast(res.progress)
					console.log('下载进度' + res.progress);
				});
			},
			register() {
				uni.$u.route({
					url: '/pages/local/register'
				})
			},
			forgot() {
				uni.$u.route({
					url: '/pages/local/forgot'
				})
			},
			async getYzm() {
				await getVerification({
					pid: this.model1.userInfo.pid
				}).then(res => {
					if (res.code == '0') {
						this.imgSrc = res.data
					}
				})
			},
			submit() {
				this.$refs.form1.validate().then(res => {
					this.logins()
				}).catch(errors => {})
			},
			async logins() {
				await login(this.model1.userInfo).then(res => {
					if (res.code == '0') {
						uni.$u.toast('登录成功')
						storage.setJson("users", res.data)
						uni.setStorageSync('loginInfo', {
							loginId: this.model1.userInfo.loginId,
							pwd: this.model1.userInfo.pwd
						})
						this.isLogin(res.data)
						uni.$u.route({
							url: '/pages/index/index'
						})
						return
					}
					if (res.code == '9') {
						uni.$u.toast(res.msg || '登录失败')
						this.model1.userInfo.code = ''
						this.getYzm()
						return
					}
					uni.$u.toast(res.msg || '登录失败')
				})
			}
		},
	}
</script>

<style lang="scss" scoped>
</style>
