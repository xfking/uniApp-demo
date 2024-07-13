<template>
	<view style="background: #fff;">
		<!-- <u-cell icon="../../static/zd.png" title="余额转账" :isLink="true" @click="routeJump('billTransfer')"></u-cell>
		<u-cell icon="../../static/zd.png" title="积分转账" :isLink="true" @click="routeJump('integralTransfer')"></u-cell> -->
		<u-cell icon="../../static/zd.png" title="余额转账" :isLink="true" @click="routeJump('billTransfer')">
			<text slot="value" class="u-slot-value" v-if="money">{{money}} </text>
		</u-cell>
		<u-cell icon="../../static/zd.png" :isLink="true" title="积分转账" @click="routeJump('integralTransfer')">
			<text slot="value" class="u-slot-value" v-if="score">{{score}} </text>
		</u-cell>
	</view>
</template>

<script>
	import { getMyWallet } from '@/common/api.js';
	export default {
		data() {
			return {
				money: 0,
				score: 0
			}
		},
		async onLoad() {
			await getMyWallet({}).then(res=>{
				if (res.code=='0'){
					this.money = res.data.usableBalance
					this.score = res.data.score
				}
				
			})
		},
		methods: {
			routeJump(page) {
				uni.$u.route({
					url: `/pages/local/${page}`
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
