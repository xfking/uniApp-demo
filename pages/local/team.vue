<template>
	<view>
		<view style="padding: 15px;background-color: #fff;height: 100vh;">
			<view style="background: #EA80A6;color: #fff;padding: 15px;border-radius: 5px;">
				<view
					style="font-size: 16px; display: flex;justify-content: space-between;text-align: center;line-height: 2;">
					<view>
						<view>
							动态收益
						</view>
						<view style="font-size: 18px;font-weight: bold;">
							{{datas.teamAllProfitUsdt}}
						</view>
					</view>
					<view>
						<view>
							我的节点人
						</view>
						<view style="font-size: 18px;font-weight: bold;">
							{{datas.myNode||'暂无'}}
						</view>
					</view>
					<view>
						<view>
							团队人数
						</view>
						<view style="font-size: 18px;font-weight: bold;">
							{{datas.teamCount}}
						</view>
					</view>
				</view>
				<view style="display: flex;justify-content: space-between;font-size: 12px;margin-top: 20px;">
					<view>
						团队总业绩：{{datas.teamAllMoney}}
					</view>
					<view>
						昨日新增业绩：{{datas.teamYesTodayMoney}}
					</view>
				</view>
			</view>
			<view>
				<div style="display: table;width: 100%;margin-top: 20px;line-height: 2.8;">
					<div style="display: table-row;font-weight: bold;font-size: 14px;">
						<div style="display: table-cell;text-align: center;">用户</div>
						<div style="display: table-cell;text-align: center;">节点人</div>
						<div style="display: table-cell;text-align: center;">等级</div>
						<div style="display: table-cell;text-align: center;">业绩</div>
					</div>
					<div style="display: table-row;font-size: 12px;color: #aaa;" v-for="(item, index) in datas.teamMemberData" :key="index">
						<!-- <div style="display: table-cell;">{{$u.timeFormat(item.rtime, 'yyyy年mm月dd日')}}</div> -->
						<div style="display: table-cell;text-align: center;">{{item.loginId}}</div>
						<div style="display: table-cell;text-align: center;">{{item.nodeName}}</div>
						<div style="display: table-cell;text-align: center;">{{item.level}}</div>
						<div style="display: table-cell;text-align: center;">{{item.peopleNum}}</div>
					</div>
				</div>
			</view>
		</view>
	</view>
</template>

<script>
	import { myCommunity } from '@/common/api.js';
	export default {
		data() {
			return {
				datas:{},
			}
		},
		async onLoad() {
			await myCommunity({}).then(res=>{ 
				if (res.code=='0'){
					this.datas=res.data
				}
			})
		},
		methods: {
		}
	}
</script>

<style>

</style>
