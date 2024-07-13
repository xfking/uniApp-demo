<template>
	<view>
		<u-navbar title="我的订单" @leftClick="leftClicks" :placeholder="true" safeAreaInsetTop fixed :autoBack="false" >
		</u-navbar>
		<view style="background: #fff;">
			<u-tabs :list="list" :current="current" :scrollable="true" @click="click" :activeStyle="{color:'#FE77AA'}"
				lineColor="#FE77AA" lineWidth="80"></u-tabs>
		</view>
		<view v-if="listData.length==0">
			<u-empty text="暂无数据" icon="http://cdn.uviewui.com/uview/empty/car.png">
			</u-empty>
		</view>
		<view v-else>
			<view v-for="(item,s) in listData" :key="s" style="padding: 10px 0;">
				<view style="background: #fff;display: flex;padding: 10px 5px;" @click="entryDetails(item)">
					<view style="position: relative;">
						<u--image :showLoading="true" :src="item.clerkUserImgs" radius="50%" width="110px"
							height="110px">
						</u--image>
						<view
							style="width: 100%; position: absolute;bottom: 0px;left: 0px;display: flex;justify-content: center;">
							<u-tag :text="item.zTypeName" bgColor="#fc1216" shape="circle" borderColor="#FC76A6"
								size="mini"></u-tag>
						</view>
					</view>
					<view style="height: 110px;width: 100%;margin-left: 10px;line-height: 1.8;font-size: 16px;">
						<view style="font-weight: bold;min-height: 28px;">{{item.clerkUserName}}</view>
						<view style="color: #aaa;font-size: 14px;">
							<view>服务类型：{{item.serviceType}}</view>
							<view style="line-height: 1.3;">服务时长：{{item.serviceTime}}</view>
						</view>
						<view style="display: flex;justify-content: space-between;">
							<view style="color: red;">￥ {{item.amoney}}</view>
							<view style="display: flex;align-items: center;">
								<view v-if="item.state==1 && item.isClerk==1" style="margin-right: 10px;"
									@click.stop="startServices(item.orderId)">
									<u-button style="width: 60px;" type="primary" text="开始服务" size="mini"></u-button>
								</view>
								<view v-if="item.state==2 && isClerk==0" style="margin-right: 10px;"
									@click.stop="confirmOrder(item.orderId)">
									<u-button style="width: 60px;" type="primary" text="确认订单" size="mini"></u-button>
								</view>
								<view v-if="item.state==3 && isClerk==0" style="margin-right: 10px;" @click.stop="evaluate(item.orderId)">
									<u-button style="width: 30px;" type="primary" text="评价" size="mini"></u-button>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<u-action-sheet :show="show" :actions="actions" title="请选择改变状态" @close="show = false" @select="onSelect">
		</u-action-sheet>
		<u-popup :show="popupShow" mode="center" :round="10" @close="close" @open="open">
			<view style="padding: 20px;">
				<view style="text-align: center;font-size: 18px;">订单评价</view>
				<u--form labelPosition="left" :model="resData" ref="form1">
					<u-form-item labelWidth="40" label="评分" borderBottom ref="item1">
						<u-rate count="5" v-model="resData.score"></u-rate>
					</u-form-item>
					<u-form-item labelWidth="80" label="评价内容" borderBottom ref="item1">
						<u--input v-model="resData.content" border="none" placeholder="请填写评价内容"></u--input>
					</u-form-item>
				</u--form>
				<u-button @click="commentOrders" style="width: 30px;margin-top: 15px;" type="primary" text="提交"
					size="mini"></u-button>
			</view>
		</u-popup>
	</view>
</template>

<script>
	import {
		getMyOrder,
		updateOrder,
		startService,
		imgPrefix,
		closeOrder,
		commentOrder,
		getMyData,
	} from '@/common/api.js';
	export default {
		data() {
			return {
				popupShow: false,
				actions: [{
						name: '待支付',
					},
					{
						name: '已支付/待服务',
					}, {
						name: '服务中',
					}, {
						name: '待评价',
					}, {
						name: '完成',
					},
				],
				show: false,
				dataItem: {},
				listData: [],
				current: 0,
				list: [{
					name: '全部',
				}, {
					name: '待服务',
				}, {
					name: '服务中'
				}, {
					name: '待评价',
				}, {
					name: '已完成'
				},{
					name: '拼团'
				}],
				isClerk: 0,
				imgPrefixs: '',
				resData: {
					orderId: '',
					content: '',
					score: 0,
				}
			}
		},
		async onLoad(option) {
			this.current = option.state
			await getMyData({}).then(res=>{
				if (res.code=='0'){
					this.isClerk = res.data.isClerk
				}
			})
			await imgPrefix().then(res => {
				if (res.code == '0') {
					this.imgPrefixs = res.data
					this.init()
				}
			})

		},
		methods: {
			leftClicks() {
				uni.navigateTo({
					url: '/pages/index/my'
				});
			},
			async commentOrders() {
				if (!this.resData.content) {
					uni.$u.toast('请填写评价内容')
					return
				}
				if (this.resData.score == 0) {
					uni.$u.toast('请选择评分')
					return
				}
				await commentOrder(this.resData).then(res => {
					if (res.code == '0') {
						uni.$u.toast('评价成功')
						this.popupShow = false
						this.resData = {
							orderId: '',
							content: '',
							score: 0,
						}
						this.current = 0
						this.init()
						return
					}
					uni.$u.toast(res.msg||'评价失败')
				})
			},
			evaluate(orderId) {
				this.resData.orderId = orderId
				this.popupShow = true
			},
			open() {
			},
			close() {
				this.popupShow = false
				this.resData = {
					orderId: '',
					content: '',
					score: 0,
				}
			},
			async onSelect(e) {
				let data = {
					orderId: this.dataItem.orderId,
					state: e.name == '待支付' ? 0 : e.name == '已支付/待服务' ? 1 : e.name == '服务中' ? 2 : e.name == '待评价' ?
						3 : 4
				}
				await updateOrder(data).then(res => {
					if (res.code == '0') {
						uni.$u.toast('更改成功')
						this.current = 0
						this.init()
					return
					}
					uni.$u.toast(res.msg||'更改失败')
				})
			},
			changeState(data) {
				this.show = true
				this.dataItem = data
			},
			async init1() {
				await getMyOrder({
					state: this.current == 0 ? '' : this.current,
				}).then(res => {
					if (res.code == '0') {
						this.listData = res.data
						res.data.forEach((elem, index) => {
							if (!elem.clerkUserImg) {
								elem.clerkUserImgs = ''
							} else {
								let url = elem.clerkUserImg.split(",")
								elem.clerkUserImgs = this.imgPrefixs + url[0]
							}
						});
					}
			
				})
			},
			async init() {
				await getMyOrder({
					state: this.current == 0 ? '' : this.current,
				}).then(res => {
					if (res.code == '0') {
						if(!res.data.length){
							this.init1()
							return
						}
						this.listData = res.data
						res.data.forEach((elem, index) => {
							if (!elem.clerkUserImg) {
								elem.clerkUserImgs = ''
							} else {
								let url = elem.clerkUserImg.split(",")
								elem.clerkUserImgs = this.imgPrefixs + url[0]
							}
						});
					}

				})
			},
			click(item) {
				this.current = item.index
				this.init()
			},
			entryDetails(data) {
				uni.$u.route({
					url: '/pages/local/orderDetails',
					params: data
				})
			},
			async startServices(orderId) {
				await startService({
					orderId
				}).then(res => {
					if (res.code == '0') {
						uni.$u.toast('开始服务成功')
						this.init()
						setTimeout(() => {
							this.init()
						}, 1000)
						return
					}
					uni.$u.toast(res.msg||'开始服务失败')
				})
			},
			async confirmOrder(orderId) {
				await closeOrder({
					orderId
				}).then(res => {
					if (res.code == '0') {
						uni.$u.toast('订单确认成功')
						this.init()
						setTimeout(() => {
							this.init()
						}, 1000)
						return
					}
					uni.$u.toast(res.msg||'订单确认失败')
				})
			},
		}
	}
</script>

<style>

</style>
