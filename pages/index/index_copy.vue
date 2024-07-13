<template>
	<view class="content" style="height: 100vh;">
		<view style="background-color: #FD79AB;" :style="{height:statusBarHeight+'px'}"></view>
		<view style="background-color: #FD79AB;padding: 8px 13px;">
			<u-search placeholder="搜店员" v-model="keyword" bgColor="#fff" searchIconColor="#9DB7C0"
				:actionStyle="{color:'#fff'}" @custom="queryContent()"></u-search>
		</view>
		<u-gap bgColor="transparent" height="10"></u-gap>
		<view>
			<u-swiper :list="list5" radius="0" @change="e => current = e.current" :autoplay="true">
				<view slot="indicator" class="indicator">
					<view class="indicator__dot" v-for="(item, index) in list5" :key="index"
						:class="[index === current && 'indicator__dot--active']">
					</view>
				</view>
			</u-swiper>
		</view>
		<u-gap bgColor="transparent" height="10"></u-gap>
		<view style="padding: 15px 10px;display: flex;justify-content: space-between;align-items: center;
		 font-size: 17px;font-weight: bold;background: #fff;">
			<view style="width: 80%;white-space: nowrap;overflow-y:auto;">
				<view v-for="(item,i) in selectList" :key="i" style="margin-right: 3%;background: #fff;display: inline-block;">
					<view v-if="item.id!=6"
						@click="clickType(item.id,i)" :style="{color:item.id==select1.id1?'#FC76A6':'#000'}">
						{{item.typeName}}
					</view>
				</view>
			</view>
			<view
				style="width: 20%;font-size: 15px;font-weight: normal;display: flex;align-items: center;justify-content: flex-end;"
				@click="screenShow = true">
				<u--image :showLoading="true" src="../../static/sx.png" width="15px" height="15px">
				</u--image>
				<view>筛选</view>
			</view>
		</view>
		<view v-for="(item,i) in dataList1" :key="i">
			<view style="padding: 10px;background: #fff;display: flex;" @click="entryDetails(item)">
				<view style="position: relative;">
					<view class="cTypeName" v-if="item.cTypeName">
						{{item.cTypeName}}
					</view>
					<u--image :showLoading="true" :src="item.url" radius="50%" width="110px" height="110px">
					</u--image>
				</view>
				<view style="margin-left: 10px;">
					<view style="display: flex;flex-wrap: wrap;align-items: center;font-size: 15px;margin-bottom: 6px;">
						<view style="max-width: 100px;font-size: 17px;font-weight: bold;margin-right: 10px;">
							{{item.nickName}}
						</view>
						<u--image v-if="item.sex==0" :showLoading="true" src="../../static/female.png" width="18px"
							height="18px">
						</u--image>
						<u--image v-if="item.sex==1" :showLoading="true" src="../../static/male.png" width="18px"
							height="18px">
						</u--image>
						<view v-if="item.online==0" style="color: #B85C54;margin-right: 10px;">在线</view>
						<view v-if="item.voice==0" style="color: #D096AC;">可语音</view>
					</view>
					<view style="display: flex;">
						<u-tag :text="item.address" size="mini" type="error" plain borderColor="#da92ec" color="#da92ec"
							style="margin: 5px 10px 5px 0;"></u-tag>
					</view>
					<view style="display: flex;flex-wrap: wrap;">
						<u-tag v-for="(items,s) in item.tag" :key="s" :text="items" type="warning" plain plainFill
							size="mini" style="margin: 3px;"></u-tag>
					</view>
				</view>
			</view>
			<u-gap v-if="dataList1.length-1 != i" bgColor="transparent" height="10"></u-gap>
		</view>
		<bottomNavigation :index="0" />
		<u-popup :show="screenShow" @close="close" @open="open" round="10" safeAreaInsetBottom>
			<view style="background: #fff;margin: 5px 5px;position: relative;overflow: hidden;">
				<view style="background: #fff;padding: 12px 15px;display: flex;align-items: center;">
					<view style="font-weight: bold;margin-right: 10px;">地区</view>
					<view>
						<u--input placeholder="请输入地区" border="none" v-model="address"></u--input>
					</view>
				</view>
				<view style="">
					<view style="font-weight: bold;margin: 10px 5px;">
						选择性别
					</view>
					<view
						style="padding: 15px 10px;background: #fff;line-height: 40px;text-align: center;display: flex;justify-content: space-between;flex-wrap: wrap;">
						<view v-if="mainTypes==select2.id1"
							:style="{color:item.id==select1.gender?'#fff':'#000', background:item.id==select1.gender?'#FC76A6':'#EFEFEF'}"
							style="width: 30%;border-radius: 5px;margin: 5px 0;" v-for="(item,i) in selectGender"
							:key="i" @click="select1.gender=item.id">{{item.name}}</view>
						<view v-if="mainTypes!=select2.id1"
							:style="{color:item.id==select1.gender?'#fff':'#000', background:item.id==select1.gender?'#FC76A6':'#EFEFEF'}"
							style="width: 30%;border-radius: 5px;margin: 5px 0;" v-for="(item,i) in selectGender1"
							:key="i" @click="select1.gender=item.id">{{item.name}}</view>
					</view>
				</view>
				<view style="margin: 5px 5px;">
					<view style="font-weight: bold;margin: 10px 5px;">
						选择类型
					</view>
					<view
						style="padding: 15px 10px;background: #fff;line-height: 40px;text-align: center;display: flex;justify-content: space-between;flex-wrap: wrap;">
						<view
							:style="{color:item.id==select2.id1?'#fff':'#000', background:item.id==select2.id1?'#FC76A6':'#EFEFEF'}"
							style="width: 30%;border-radius: 5px;margin: 5px 0;" v-for="(item,i) in selectList" :key="i"
							@click="clickType2(item.id,i)">{{item.typeName}}</view>
					</view>
				</view>
				<u-button style="width: 300px;margin-top: 30px;margin-bottom: 20px;" color="#EC7FA8" type="primary"
					text="确定" @click="determine()"></u-button>
			</view>
			<view @click="close()"
				style="display: flex;align-items: center;justify-content: center;width: 25px;height: 25px;border-radius: 50%;background: #ddd;position: absolute;right: 0;top: -12px;">
				<u-icon name="close" color="#000" size="20"></u-icon>
			</view>
		</u-popup>
		<!-- 旅游弹窗 -->
		<u-popup mode="center" :show="show" round='8' @close="show=false" closeIconPos='top-right'>
			<view style="width: 300px;padding: 15px;font-size: 14px;">
				<scroll-view scroll-y="true" style="height: 300px;">
					<view style="display: flex;align-items: center;justify-content: space-between;padding-bottom: 10px;"
						v-for="(item,index) in travelList" :key="index">
						<view style="line-height: 1.5; flex:1">
							<view class="text_one" style="max-width:200px ;">{{item.name}}</view>
							<view style="color:#999;font-size: 12px;">已报名人数:
								{{item.num||0}}{{item.maxNum?`/${item.maxNum}`:''}}</view>
						</view>
						<view v-if="item.isEntry==1"
							style="padding: 4px 20px;border-radius: 20px;background-color: #D096AC;color: #fff;">已报名
						</view>
						<view v-else-if="item.num==item.maxNum"
							style="padding: 4px 20px;border-radius: 20px;background-color: #999;color: #fff;">人数已满
						</view>
						<view v-else
							style="padding: 4px 20px;border-radius: 20px;background-color: #FD79AB;color: #fff;"
							@click="handCheck(item)">报名</view>
					</view>
				</scroll-view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	import {
		getBanner,
		getClerks,
		imgPrefix,
		getClerkType,
		getTravelList,
		getMyData
	} from '@/common/api.js';
	import bottomNavigation from "@/components/bottomNavigation.vue"
	export default {
		components: {
			bottomNavigation
		},
		data() {
			return {
				show: false,
				travelList: [],
				address: '',
				selectLists: [],
				select1: {
					id1: 0,
					index1: 0,
					id2: -1,
					index2: 0,
					gender: -1,
				},
				select2: {
					id1: 0,
					index1: 0,
					id2: -1,
					index2: 0,
					gender: -1,
				},
				dataList1: [],
				imgPrefixs: '',
				token: "eyJ0eXAiOiJKV1QiLCJ0eXBlIjoiSldUIiwiZW5jcnlwdGlvbiI6IkhTMjU2IiwiYWxnIjoiSFMyNTYifQ.eyJUaW1lIjoxNjYzMTI1ODcyODcyLCJleHAiOjE2NjMyMTIyNzIsInVzZXJJZCI6IlU4UUFLWiIsInVzZXJDb2RlIjoiMyJ9.2_GZg6vSaNOe5WfFi_9miSzo4hR7FDYGcFZg_UVBUY8",
				select: {
					gender: 1,
					type: 0,
				},
				selectGender: [{
						name: '男神',
						id: 1,
					},
					{
						name: '女神',
						id: 0,
					},
					{
						name: '帅T',
						id: 3,
					},
					{
						name: '美P',
						id: 2,
					},
				],
				selectGender1: [{
						name: '男神',
						id: 1,
					},
					{
						name: '女神',
						id: 0,
					},
				],
				selectType: [{
						name: '普通',
						id: 1,
					},
					{
						name: '金牌',
						id: 2,
					},
					{
						name: '镇店',
						id: 3,
					},
					{
						name: '男神',
						id: 4,
					},
					{
						name: '女神',
						id: 5,
					},
					{
						name: '首席',
						id: 6,
					},
					{
						name: '锦鲤',
						id: 7,
					},
				],
				screenShow: false,
				type: 1,
				current: 0,
				keyword: '',
				list5: [],
				dataList: [{
					videoSrc: 'https://bjetxgzv.cdn.bspapp.com/VKCEYUGU-hello-uniapp/2cc220e0-c27a-11ea-9dfb-6da8e309e0d8.mp3',
					url: 'https://cdn.uviewui.com/uview/album/1.jpg',
					name: '店长',
					tag: ['绿色平台', '6年老店', '禁止私下交易', '深夜单去淘宝', "店长微"],
					luckyCharm: '锦鲤',
					gender: false,
					state: true,
					voice: true,
					video: true,
				}, {
					url: 'https://cdn.uviewui.com/uview/album/1.jpg',
					name: '甜饼',
					tag: ['人间小太阳', 'LOL好心态玩家', '奶茶深度爱好者', '高级奶茶品鉴师'],
					luckyCharm: '锦鲤',
					gender: false,
					state: true,
					voice: false,
					video: true,
				}, {
					url: 'https://cdn.uviewui.com/uview/album/1.jpg',
					name: '时光',
					tag: ['情感咨询', '霸道总裁', '哄睡故事'],
					luckyCharm: '男神',
					gender: true,
					state: true,
					voice: false,
					video: true,
				}, {
					videoSrc: 'https://bjetxgzv.cdn.bspapp.com/VKCEYUGU-hello-uniapp/2cc220e0-c27a-11ea-9dfb-6da8e309e0d8.mp3',
					url: 'https://cdn.uviewui.com/uview/album/1.jpg',
					name: '店长',
					tag: ['绿色平台', '6年老店', '禁止私下交易', '深夜单去淘宝', "店长微"],
					luckyCharm: '锦鲤',
					gender: false,
					state: true,
					voice: true,
					video: true,
				}, {
					videoSrc: 'https://bjetxgzv.cdn.bspapp.com/VKCEYUGU-hello-uniapp/2cc220e0-c27a-11ea-9dfb-6da8e309e0d8.mp3',
					url: 'https://cdn.uviewui.com/uview/album/1.jpg',
					name: '甜饼',
					tag: ['人间小太阳', 'LOL好心态玩家', '奶茶深度爱好者', '高级奶茶品鉴师'],
					luckyCharm: '锦鲤',
					gender: false,
					state: true,
					voice: false,
					video: true,
				}, {
					videoSrc: 'https://bjetxgzv.cdn.bspapp.com/VKCEYUGU-hello-uniapp/2cc220e0-c27a-11ea-9dfb-6da8e309e0d8.mp3',
					url: 'https://cdn.uviewui.com/uview/album/1.jpg',
					name: '时光',
					tag: ['情感咨询', '霸道总裁', '哄睡故事'],
					luckyCharm: '男神',
					gender: true,
					state: true,
					voice: false,
					video: true,
				}, ],
				innerAudioContext: null,
				selectList: [],
				statusBarHeight: getApp().globalData.statusBarHeight,
				mainTypes: -1,
				level:''
			}
		},
		async onLoad() {
			await getClerkType().then(res => {
				if (res.code == '0') {
					const list=res.data.filter(m=>m.id!=6)
					this.mainTypes = list[0].id
					this.selectList = list
					this.select1.id1 = list[0].id
					this.select2.id1 = list[0].id
					this.selectLists = this.selectList[this.select1.index1].dataList
					this.init()
				}
			})
			await getMyData({}).then(res=>{
				if (res.code=='0'){
					this.level = res.data.level
				}
			})
		},
		async onShow() {
			await imgPrefix().then(res => {
				if (res.code == '0') {
					this.imgPrefixs = res.data
					uni.setStorageSync('imgPrefixs', this.imgPrefixs)
				}

			})
			await getBanner().then(res => {
				if (res.code == '0') {
					let list = []
					res.data.forEach((elem, index) => {
						list.push(this.imgPrefixs + elem.imgPath)
					});
					this.list5 = list
				}

			})
			await getTravelList({}).then(res => {
				if (res.code == '0') {
					if (res.data.length) {
						let flg=true
						res.data.forEach(m => {
							m.img = this.imgPrefixs + m.img
							if(m.isEntry==1){
								flg=false
							}
						})
						if(this.level === '普通'){
							this.show=false
						}else{
							this.show=flg
						}
					}else{
						this.show=false
					}
					this.travelList = res.data
					console.log(this.travelList)
				}
			})
		},
		methods: {
			async init() {
				await getClerks({
					name: this.keyword,
					zType: this.select1.id1,
					cType: this.select1.id2 == -1 ? "" : this.select1.id2,
					sex: this.select1.gender == -1 ? "" : this.select1.gender,
					address: this.address,
					page: 1,
					pageSize: 1000,
				}).then(res => {
					if (res.code == '0') {
						this.dataList1 = res.data
						res.data.forEach((elem, index) => {
							let url = elem.imgs.split(",")
							elem.url = this.imgPrefixs + url[0]
							elem.tag = elem.skill.split(",")
						});
					}
				})
			},
			clickType(id, index) {
				this.select1.id1 = id
				this.select1.index1 = index
				this.select1.id2 = -1
				this.select1.index2 = 0
				this.select1.gender = -1
				this.selectLists = this.selectList[this.select1.index1].dataList
				this.select2.id1 = id
				this.select2.index1 = index
				this.address = ''
				this.init()
			},
			clickType2(id, index) {
				if (this.select1.gender != 0 && this.select1.gender != 1) {
					this.select1.gender = -1
				}
				this.select2.id1 = id
				this.select2.index1 = index
				this.select1.index2 = 0
				this.selectLists = this.selectList[this.select2.index1].dataList
			},
			playVoice(index) {
				this.innerAudioContext = uni.createInnerAudioContext();
				this.innerAudioContext.autoplay = true;
				this.innerAudioContext.src = this.dataList[index].videoSrc;
				this.innerAudioContext.onPlay(() => {});
				this.innerAudioContext.onError((res) => {});
				this.dataList[index].video = false
			},
			pauseVoice(index) {
				this.innerAudioContext.onStop()
				this.innerAudioContext.destroy()
				this.dataList[index].video = true
			},
			open() {},
			close() {
				this.select1.id2 = -1
				this.select1.gender = -1
				this.screenShow = false
				this.address = ''
			},
			queryType(e) {
				this.type = e
				this.select.gender = 1
				this.select.type = 0
				this.queryContent()
			},
			determine() {
				this.select1.id1 = this.select2.id1
				this.select1.index1 = this.select2.index1
				this.screenShow = false
				this.queryContent()
			},
			queryContent() {
				this.init()
			},
			entryDetails(data) {
				uni.$u.route({
					url: '/pages/local/details',
					params: data
				})
			},
			handCheck(data) {
				uni.$u.route({
					url: '/pages/local/travelDetail',
					params: data
				})
			}
		}
	}
</script>

<style lang="scss">
	.indicator {
		@include flex(row);
		justify-content: center;

		&__dot {
			height: 6px;
			width: 6px;
			border-radius: 100px;
			background-color: rgba(255, 255, 255, 0.35);
			margin: 0 5px;
			transition: background-color 0.3s;

			&--active {
				background-color: #ffffff;
			}
		}
	}

	.cTypeName {
		position: absolute;
		left: 0;
		top: 0;
		padding: 5px 6px;
		font-size: 12px;
		color: #ffffff;
		background-color: rgb(252, 118, 166);
		border-radius: 5px;
		z-index: 1;
	}

	.text_one {
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}
</style>
