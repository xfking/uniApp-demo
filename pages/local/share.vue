<template>
	<view style="height: 100vh;width: 100vw;background-image: url('../../static/fxbj.png');background-size: 100% 100%;">
		<u-navbar :autoBack="true" bgColor="rgba(0, 0, 0,0)"></u-navbar>
		<view style="padding-top: 27vh;text-align: center;">
			<view>
				<view style="display: flex;justify-content: center;">
					<u--image :showLoading="true" :src="userData.src" radius="50%" width="60px" height="60px"
						@click="click">
					</u--image>
				</view>
				<view style="margin-top: 10px;font-size: 16px;">{{userData.name}}</view>
				<view>
					你的邀请码
				</view>
			</view>
			<view style="margin-top: 10px;font-size: 15px;">
				<view style="font-size: 25px;font-weight: bold;">
					{{userData.id}}
				</view>
				<view style="margin-top: 0px;position: relative;">
					<view style="height: 150px;">
						<view style="z-index: 999999;display: flex;justify-content: center;position: absolute;top: 0;width: 100%;">
							<u--image :showLoading="true" :src="qrcode" width="220px" height="220px">
							</u--image>
						</view>
						<view style="z-index: 0; display: flex;justify-content: center;position: absolute;top: 0;width: 100%;">
							<canvas canvas-id="qrcode" v-show="qrShow" style="width: 220px;" />
						</view>
					</view>
					
				</view>
			</view>
			<view style="padding-top: 90px;display: flex;justify-content: space-between;margin: 0px 25px;">
				<u-button @click="down()" style="width: 120px;" color="#FA2B31" shape="circle" type="primary"
					text="保存二维码"></u-button>
				<u-button @click="copyUrl(completeUrl)" style="width: 120px;" color="#ED84AC" shape="circle"
					type="primary" text="分享链接"></u-button>
			</view>
		</view>
		<u-toast ref="uToast"></u-toast>
	</view>
</template>

<script>
	import {
		getMyData
	} from '@/common/api.js';
	import uQRCode from '@/common/uqrcode.js'
	export default {
		data() {
			return {
				userData: {
					src: 'https://cdn.uviewui.com/uview/album/1.jpg',
					name: '',
					id: '',
					speedOfProgress: 60,
					startLevel: '0',
					endLevel: '1',
					msgCount: 0,
					isClerk: 0,
				},
				qrShow: false,
				qrcode: '',
				completeUrl: 'http://cqrcsm.cn/pwyn/register?userId=',
			}
		},
		onShow() {
			this.init()
		},
		methods: {
			copyUrl(url) {
				uni.setClipboardData({
					data: url + this.userData.id,
					success: function() {
						uni.showToast({
							title: '复制成功',
							duration: 2000,
							icon: 'none'
						});

					},
					fail: function(err) {
						uni.showToast({
							title: '复制失败',
							duration: 2000,
							icon: 'none'
						});
					}
				});
			},
			saveBase64Img(base64) {
				const bitmap = new plus.nativeObj.Bitmap('test');
				bitmap.loadBase64Data(
					base64,
					function() {
						const url = '_doc/' + new Date() + '.png';
						bitmap.save(
							url, {
								overwrite: true
							},
							i => {
								uni.saveImageToPhotosAlbum({
									filePath: url,
									success: function() {
										uni.showToast({
											title: '保存成功',
											icon: 'none'
										})
										bitmap.clear();
									}
								});
							},
							e => {
								uni.showToast({
									title: '保存失败',
									icon: 'none'
								})
								bitmap.clear();
							}
						);
					},
					e => {
						bitmap.clear();
					}
				);
			},
			qrFun: function(text) {
				this.qrShow = true
				uQRCode.make({
					canvasId: 'qrcode',
					componentInstance: this,
					text: text,
					size: 150,
					margin: 0,
					backgroundColor: '#ffffff',
					foregroundColor: '#000000',
					fileType: 'jpg',
					errorCorrectLevel: uQRCode.errorCorrectLevel.H,
					success: res => {
						this.qrcode = res
					}
				})
			},
			down() {
				setTimeout(() => {
					let pages = getCurrentPages();
					let page = pages[pages.length - 1];
					let ws = page.$getAppWebview();
					let bitmap = new plus.nativeObj.Bitmap('drawScreen');
					ws.draw(bitmap, () => {
			  	bitmap.save("_doc/drawScreen.jpg", {
							overwrite: true
						}, res => {
							uni.saveImageToPhotosAlbum({
								filePath: res.target,
								success: () => {
									uni.showModal({
										title: '温馨提示',
										content: '保存图片成功，赶紧去转发给好友吧~',
										showCancel: false,
										confirmColor: "#34CE98",
										confirmText: '知道了',
										success: () => {
											this.canSave = false;
										}
									})
									uni.hideLoading()
								},
								fail: function(e) {
									uni.showModal({
										title: '温馨提示',
			 						content: '保存图片失败，重新再试试~',
										showCancel: false,
										confirmColor: "#34CE98",
										confirmText: '知道了',
										success: () => {
											this.canSave = false;
										}
									})
									uni.hideLoading()
								}
							});

							bitmap.clear();
						}, error => {
							uni.showModal({
								title: '温馨提示',
								content: '保存图片失败，重新再试试~',
								showCancel: false,
								confirmColor: "#34CE98",
								confirmText: '知道了',
								success: () => {
									this.canSave = false;
								}
							})
							uni.hideLoading()
							bitmap.clear();
						});
					}, error => {
						uni.showModal({
							title: '温馨提示',
			  		content: '保存图片失败，重新再试试~',
			  		showCancel: false,
							confirmColor: "#34CE98",
							confirmText: '知道了',
							success: () => {
								this.canSave = false;
							}
						})
						uni.hideLoading()
					}, {
						check: true,
					});
				}, 2000)
			},
			async init() {
				await getMyData({}).then(res => {
					if (res.code == '0') {
						this.userData.name = res.data.loginId
						this.userData.id = res.data.userId
						this.userData.startLevel = res.data.level
						this.userData.msgCount = res.data.msgCount
						this.userData.isClerk = res.data.isClerk
						this.qrFun(this.completeUrl + this.userData.id)
					}
				})
			},
		}
	}
</script>

<style>

</style>
