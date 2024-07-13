<template>
	<view>
		<u-swiper height="350" :list="urlList" radius="0" @change="e => current = e.current" :autoplay="true">
			<view slot="indicator" class="indicator">
				<view class="indicator__dot" v-for="(item, index) in urlList" :key="index"
					:class="[index === current && 'indicator__dot--active']">
				</view>
			</view>
		</u-swiper>
		<view style="padding: 15px;line-height: 1.8;background: #fff;">
			<view style="color: red;">
				<text v-if="level=='普通'">￥{{info.oldPrice}} <text v-if="info.oldScore">+{{info.oldScore}}积分 </text></text>
				<text v-else>￥{{info.price}} <text v-if="info.score">+{{info.score}}积分 </text></text>
			</view>
			<view style="color: #999;font-size: 12px;">已售 {{info.sold||0}}</view>
			<view style="font-weight: bold;">{{info.name}}</view>
		</view>
		<u-gap bgColor="transparent" height="10"></u-gap>
		<view style="">
			<view v-for="(item,index) in imgs" :key="index">
				<img :src="item" alt="" style="width: 100%;">
			</view>
		</view>
		<u-button style="position: fixed;left:50%;bottom:50px;width: 300px; border-radius:4px 0 0 4px;transform: translateX(-50%);" color="#EC7FA8" type="primary"
			:text="`直接购买`" @click="determine()"></u-button>
	</view>
</template>

<script>
	import {
		getGoodsById,
		getMyData
	} from '@/common/api.js';
	export default {
		data() {
			return {
				id:'',
				level:'',
				imgPrefixs:'',
				info:'',
				urlList:[],
				imgs:[],
				current:0
			}
		},
		onLoad(options) {
			if(options.id){
				this.id=options.id
				this.init()
			}
		},
		async onShow() {
			if (uni.getStorageSync('imgPrefixs')) {
				this.imgPrefixs = uni.getStorageSync('imgPrefixs')
			}
			await getMyData({}).then(res => {
				if (res.code == '0') {
					this.level = res.data.level
				}
			})
		},
		methods: {
			async init(){
				await getGoodsById({
					id: this.id
				}).then(res => {
					if (res.code == '0') {
						let url = res.data.logos.split(",")
						let urlList = []
						url.forEach((elem, index) => {
							urlList.push(this.imgPrefixs+elem)
						});
						this.urlList = urlList
						
						let urls = res.data.imgs.split(",")
						let urlLists = []
						urls.forEach((elem, index) => {
							urlLists.push(this.imgPrefixs+elem)
						});
						this.imgs = urlLists
						this.info = res.data
						
					}
				})
			},
			determine(){
				let data = {
					goodsName: this.info.name,
					url: this.urlList[0],
					amoney: this.level=='普通'?this.info.oldPrice:this.info.price,
					integral: this.level=='普通'?this.info.oldScore:this.info.score,
					splicing: 1,
					number: 1,
					sold: this.info.sold,
					goodsId: this.id,
					orderType: 2
				}
				uni.$u.route({
					url: '/pages/local/goodsPayment',
					params: data
				})
			},
		}
	}
</script>

<style>

</style>
