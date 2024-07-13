<template>
	<view style="background: #fff;">
		<u-collapse accordion>
			<u-collapse-item :title="item.date" v-for="(item,i) in dataList" :key="i">
				<view slot="value" style="display: flex;color: #aaa;font-size: 14px;">
					<view>
						<text style="color: #F25B5F;margin-right: 5px;">收</text>{{item.in}}
					</view>
					<view style="margin-left: 15px;">
						<text style="color: #6CC968;margin-right: 5px;">支</text>{{item.out}}
					</view>
				</view>
				<view v-for="(items,i) in item.list" :key="i">
					<view
						style="display: flex;justify-content: space-between;align-items: center;line-height: 1.8;padding: 10px 0px;">
						<view>
							<view style="font-weight: bold;">{{items.type}} <span style="color:#6CC968" v-if="items.remarks">【{{items.remarks}}】</span></view>
							<view style="font-size: 14px;color: #aaa;">{{items.time}}</view>
						</view>
						<view style="font-weight: bold;" :style="{color:sd1(items.money)?'#6CC968':'#F25B5F'}">
							{{items.money}}元
						</view>
					</view>
					<u-line></u-line>
				</view>
			</u-collapse-item>
		</u-collapse>
	</view>
</template>

<script>
	import {
		getMyAssetRecords
	} from '@/common/api.js';
	export default {
		data() {
			return {
				dataList: [],
			}
		},
		onShow() {
			this.init()
		},
		methods: {
			sd1(str) {
				if (!isNaN(str)) {
					if (str < 0) {
						return true
					} else {
						return false
					}
				} else {
					return str.indexOf('-') != -1
				}
			},
			async init() {
				await getMyAssetRecords({
					page: 1,
					pageSize: 1000,
					type: 4
				}).then(res => {
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
