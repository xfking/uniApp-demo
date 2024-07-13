<template>
	<view>
		<view>
			<view v-for="(item,i) in dataList" :key="i">
				<view v-if="item.type==1" style="display: flex;align-items: flex-start;margin: 20px 10px;">
					<u--image :showLoading="true" shape="circle" :src="src" width="50px" height="50px" @click="click">
					</u--image>
					<view style="margin: 0px 10px;">
						<view style="font-size: 12px;color: #aaa;margin-bottom: 5px;">
							{{$u.timeFormat(item.ctime, 'yyyy年mm月dd日 hh时MM分ss秒')}}</view>
						<view
							style="font-size: 18px; padding: 10px 10px;background: #fff;display: inline-block;min-width: 100px;max-width: 200px;border-bottom-right-radius: 8px;border-top-right-radius: 8px;border-bottom-left-radius: 8px;border: 2px solid ##E5E5E5;">
							{{item.context}}
						</view>
					</view>
				</view>
				<view v-if="item.type==0"
					style="display: flex;align-items: flex-start;justify-content: flex-end;margin: 20px 10px;">
					<view style="margin: 0px 10px;">
						<view style="font-size: 12px;color: #aaa;margin-bottom: 5px;text-align: right;">
							{{$u.timeFormat(item.ctime, 'yyyy年mm月dd日 hh时MM分ss秒')}}
						</view>
						<view style="display: flex;justify-content: flex-end;">
							<view
								style="font-size: 18px; padding: 10px 10px;background: #fff;display: inline-block;min-width: 100px;max-width: 200px;border-bottom-right-radius: 8px;border-top-left-radius: 8px;border-bottom-left-radius: 8px;border: 2px solid ##E5E5E5;">
								{{item.context}}
							</view>
						</view>
					</view>
					<u--image :showLoading="true" shape="circle" :src="src" width="50px" height="50px" @click="click">
					</u--image>

				</view>
			</view>
		</view>
		<view style="position: fixed;bottom: 0;width: 100%;">
			<view
				style="display: flex;justify-content: space-between;align-items: center;padding: 5px 10px;background: #fff;">
				<view>
					<u--input style="width: 260px;" placeholder="请输入内容" border="none" v-model="value"></u--input>
				</view>
				<view @click="sendMsgs(1)"
					style="background: #4C93F6;color: #fff;height: 30px;width: 50px;display: flex;justify-content: center;align-items: center;border-radius: 30px;line-height: 1;">
					发送
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		customerService,
		sendMsg
	} from '@/common/api.js';

	export default {
		data() {
			return {
				value: '',
				dataList: [],
				src: 'https://cdn.uviewui.com/uview/album/1.jpg'
			}
		},
		onLoad() {
			this.customerServices()
		},
		methods: {
			async sendMsgs(index) {
				if (!this.value) {
					return
				}
				await sendMsg({
					context: this.value,
					state: index
				}).then(res => {
					if (res.code == '0') {
						this.customerServices()
						this.value = ''
					}

				})
			},
			async customerServices(index) {
				await customerService({}).then(res => {
					if (res.code == '0') {
						this.dataList = res.data
					}
				})
			},
		}
	}
</script>

<style>

</style>
