<template>
	<view>
		<u-navbar title="我的钱包" @leftClick="leftClick" :placeholder="true" safeAreaInsetTop fixed :autoBack="false" >
		</u-navbar>
		<!-- <view class="flex" style="justify-content: center;background: #EC7FA8;color: #fff;text-align: center; padding: 35px 0">
			<view style="flex:1">
				<view style="display: flex;align-items: flex-end;justify-content: center;">
					<view style="font-size: 16px;">
						￥
					</view>
					<view style="font-size: 24px;line-height: 1.2;">
						{{money}}
					</view>
				</view>
				<view style="font-size: 16px;">
					当前余额
				</view>
			</view>
			<view style="flex:1">
				<view style="display: flex;align-items: flex-end;justify-content: center;">
					<view style="font-size: 16px;">
						￥
					</view>
					<view style="font-size: 24px;line-height: 1.2;">
						{{frozenBalance}}
					</view>
				</view>
				<view style="font-size: 16px;">
					复购金额
				</view>
			</view>
			<view style="flex:1">
				<view style="display: flex;align-items: flex-end;justify-content: center;">
					<view style="font-size: 24px;line-height: 1.2;">
						{{score}}
					</view>
				</view>
				<view style="font-size: 16px;">
					当前积分
				</view>
			</view>
		</view> -->
		<view style="background: #fff; margin-top: 10px;">
			<u-cell icon="../../static/zd.png" title="余额" :isLink="true" @click="routeJump('bill')">
				<text slot="value" class="u-slot-value" v-if="money">{{money}} </text>
			</u-cell>
			<u-cell icon="../../static/zd.png" title="复购金额" :isLink="true" @click="routeJump('repurchase')">
				<text slot="value" class="u-slot-value" v-if="frozenBalance">{{frozenBalance}} </text>
			</u-cell>
			<u-cell icon="../../static/zd.png" title="贡献值" :isLink="true" @click="routeJump('contribution')">
				<text slot="value" class="u-slot-value" v-if="gxBalance">{{gxBalance}} </text>
			</u-cell>
			<u-cell icon="../../static/zd.png" :isLink="true" title="积分" @click="routeJump('integral')">
				<text slot="value" class="u-slot-value" v-if="score">{{score}} </text>
			</u-cell>
			<u-cell icon="../../static/cz.png" title="充值" :isLink="true" @click="routeJump('recharge')"></u-cell>
			<u-cell icon="../../static/tx.png" title="提现" :isLink="true" @click="routeJumps('withdrawal')"></u-cell>
		</view>
		<u-gap bgColor="transparent" height="10"></u-gap>
	</view>
</template>

<script>
	import { getMyWallet } from '@/common/api.js';
	export default {
		data() {
			return {
				money: 0,
				score: 0,
				frozenBalance: 0,
				txFee:0,
				gxBalance: 0
			}
		},
		async onLoad() {
			await getMyWallet({}).then(res=>{ 
				if (res.code=='0'){
					this.money = res.data.usableBalance
					this.score = res.data.score
					this.frozenBalance= res.data.frozenBalance
					this.txFee = res.data.txFee|| 1
					this.gxBalance = res.data.gxBalance
				}
				
			})
		},
		methods: {
			leftClick() {
				uni.$u.route({
					url: '/pages/index/my'
				})
			},
			routeJump(page){
				uni.$u.route({
					url: `/pages/local/${page}`
				})
			},
			routeJumps(page){
				uni.$u.route({
					url: `/pages/local/${page}?txFee=${this.txFee}`
				})
			}
		}
	}
</script>

<style>
.u-slot-value{
	background-color: red;
	border-radius: 20px;
	color: #fff;
	font-size: 14px;
	margin-right: 10px;
	padding: 0 5px;
}
</style>
