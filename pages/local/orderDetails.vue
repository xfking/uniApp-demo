<template>
	<view>
		<view style="background: #fff;padding: 10px;">
			<view style="font-size: 14px;display: flex;align-items: flex-start;">
				<view>
					<u--image :showLoading="true" :src="params.clerkUserImgs" width="65px" height="65px">
					</u--image>
				</view>
				<view style="margin-left: 10px;">
					<view style="color: #343434;">{{params.clerkUserName}}</view>
					<view style="color: #aaa;">{{params.zTypeName}}</view>
				</view>
			</view>
			<view style="display: flex;justify-content: center;padding: 10px 0;">
				<view style="display: flex;align-items: center;font-size: 14px;color: #ffa91e;">
					<u-icon name="order" color="#ffa91e" size="20" style="margin-right: 5px;"></u-icon>
					{{params.state==0? '待支付':params.state==1? '已支付/待服务':params.state==2? '服务中':params.state==3? '待评价':'完成'}}
				</view>
			</view>
			<u-line></u-line>
		<view style="line-height: 2;font-size: 15px;">
			<view style="display: flex;justify-content: space-between;align-items: center;">
				<view>订单号</view>
				<view style="color: #aaa;" @click="copyUrl(params.orderId)">{{params.orderId}}</view>
			</view>
			<view style="display: flex;justify-content: space-between;align-items: center;">
				<view>服务类型</view>
				<view style="color: #aaa;">{{params.serviceType}}</view>
			</view>
			<view style="display: flex;justify-content: space-between;align-items: center;">
				<view>服务时间</view>
				<view style="color: #aaa;">{{params.serviceTime}}</view>
			</view>
			<view style="display: flex;justify-content: space-between;align-items: center;">
				<view>微信</view>
				<view style="color: #aaa;" @click="copyUrl(params.weChat)">{{params.weChat}}</view>
			</view>
			<view style="display: flex;justify-content: space-between;align-items: center;">
				<view>创建时间</view>
				<view style="color: #aaa;">{{$u.timeFormat(params.ctime, 'yyyy年mm月dd日 hh:MM:ss')}}</view>
			</view>
			<view style="display: flex;justify-content: space-between;align-items: center;">
				<view>金额</view>
				<view style="color: red;font-size: 18px;">￥ {{params.amoney}}</view>
			</view>
		</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				params: {
				},
			}
		},
		onLoad(option) {
			this.params = option
		},
		methods: {
			copyUrl(url) {
				uni.setClipboardData({
					data: url,
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
		}
	}
</script>

<style>

</style>
