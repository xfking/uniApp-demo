<template>
	<view style="padding: 20px;width: 100%;box-sizing: border-box;background-color: #fff">
		<view class="flex flex_between" v-for="(item,index) in groupList" :key="index" style="margin-bottom: 7px;padding-bottom: 7px;;border-bottom: 1px solid rgba(0, 0, 0, 0.05);">
			<view class="flex">
				<u--image :showLoading="true" :src="item.userImg" radius="50%" width="50px" height="50px">
				</u--image>
				<view style="margin-left: 10px;">
					{{item.userName}}
				</view>
			</view>
			<view class="flex">
				<view style="margin-right: 15px;text-align: right;">
					还差<span style="color: red;">1</span>人成团
					<view style="font-size: 12px;color: #656565;">时长 {{item.serviceTime}}</view>
				</view>
				<u-button style="width: 60px;margin: 0;" color="rgba(236,127,118,1)" type="primary"
					text="去拼单" @click="determines(item)"></u-button>
			</view>
			
		</view>
	</view>
</template>

<script>
	import { getGroupList, imgPrefix } from '@/common/api.js';
	export default {
		data(){
			return{
				groupList: [],
				params: {},
				imgPrefixs: ''
			}
		},
		async onLoad(option) {
			this.params = option
			await imgPrefix().then(res=>{
				if (res.code=='0'){
					this.imgPrefixs = res.data
				}
				
			})
		},
		async onShow(){
			await getGroupList({clerkUserId:this.params.userId,page:1,pageSize:100}).then(res=>{
				if (res.code=='0'){
					let list = res.data
					if(list.length){
						list.forEach(item=>{
							item.userImg=this.imgPrefixs+item.userImg
						})
					}
					this.groupList = list
				}
			})
		},
		methods:{
			determines(item){
				let data = {
					nickName: item.nickName,
					url: this.imgPrefixs+item.url,
					sex: item.sex==1? '1' : '0',
					serviceType: item.serviceType,
					serviceTime: item.serviceTime,
					zType: item.zType,
					cType: item.cType,
					cTypeName: item.cTypeName,
					zTypeName: item.zTypeName,
					clerkUserId: this.params.userId,
					amoney: item.amoney,
					integral: item.zType!=6?(item.amoney*0.5).toFixed(0) : 0,
					splicing: 2,
					splicingOrderId: item.orderId
				}
				uni.$u.route({
					url: '/pages/local/payment',
					params: data
				})
			},
		}
	}
</script>

<style>
</style>