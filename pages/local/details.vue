<template>
	<view style="background: #fff;">
		<view>
			<u-swiper height="350" :list="urlList" radius="0" @change="e => current = e.current" :autoplay="true">
				<view slot="indicator" class="indicator">
					<view class="indicator__dot" v-for="(item, index) in list5" :key="index"
						:class="[index === current && 'indicator__dot--active']">
					</view>
				</view>
			</u-swiper>
		</view>
		<view style="padding: 20px;">
			<view style="display: flex;justify-content: space-between;align-items: center;margin-bottom: 10px;">
				<view style="display: flex;align-items: flex-end;">
					<view style="font-size: 17px;font-weight: bold;margin-right: 8px;">{{params.nickName}}</view>
					<u--image v-if="params.sex==0" :showLoading="true" src="../../static/female.png" width="18px" height="18px">
					</u--image>
					<u--image v-if="params.sex==1" :showLoading="true" src="../../static/male.png" width="18px" height="18px">
					</u--image>
				</view>
			</view>
			<view style="display: flex;flex-flow: wrap;">
				<u-tag v-if="params.online==0" text="在线" type="success" plain borderColor="#B5746D" color="#B5746D"
					style="margin: 5px 10px 5px 0;"></u-tag>
				<u-tag v-if="params.voice==0" text="可语音" type="error" plain borderColor="#EC7EA5" color="#EC7EA5"
					style="margin: 5px 10px 5px 0;"></u-tag>
				<u-tag :text="params.address" type="error" plain borderColor="#da92ec" color="#da92ec"
					style="margin: 5px 10px 5px 0;"></u-tag>
			</view>
		</view>
		<view style="padding: 20px;width: 100%;box-sizing: border-box;" v-if="groupList.length">
			<view class="flex flex_between" style="margin-bottom: 20px;">
				<view >
					拼团列表
				</view>
				<view style="color: #939E9F;font-size: 12px;" @click="handMore">
					查看更多
				</view>
			</view>
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
		<view>
			<u-tabs :itemStyle="{ height: '54px', padding: '0 15px' }" :activeStyle="{color: '#EC7EA5'}" :list="list1" @click="clicks1" :lineWidth="lineWidth" lineColor="#EC7EA5" lineHeight="3"></u-tabs>
			<view style="padding: 15px 15px;color: #656565;" v-if="listVales=='基本信息'">
				<view style="display: flex;align-items: center;">
					<view style="width: 10px;height: 10px;border-radius: 10px;background: #EC7EA5;margin: 0 10px;"></view>
					<view>个性签名</view>
				</view>
				<view style="line-height: 1.5;color: #939E9F;margin: 15px 0;">
					{{params.perDepict}}
				</view>
				<view style="display: flex;align-items: center;">
					<view style="width: 10px;height: 10px;border-radius: 10px;background: #EC7EA5;margin: 0 10px;"></view>
					<view>技能与才艺</view>
				</view>
				<view style="display: flex;flex-wrap: wrap;margin: 20px 0;">
					<u-tag v-for="(items,s) in params.tag" :key="s" :text="items" type="warning" plain plainFill
						size="mini" style="margin: 3px;"></u-tag>
				</view>
			</view>
			<view v-if="listVales!='基本信息'" style="text-align: center;padding: 10px 0 50px 0;">
				<view v-if="!sfList.length">无</view>
				<view v-else>
					<view style="display: flex;justify-content: space-between;flex-direction: row;color: #656565;padding: 6px 0;">
						<view style="flex: 1;" v-if="sfList[0].time">时间</view>
						<view style="flex: 1;" v-if="sfList[0].word">文字价格</view>
						<view style="flex: 1;" v-if="sfList[0].voice">语音价格</view>
					</view>
					<view v-for="(item, index) in sfList" :key="index" style="display: flex;justify-content: space-between;flex-direction: row;padding: 6px 0;">
						<view style="flex: 1;" v-if="item.time">{{item.time}}</view>
						<view style="flex: 1;" v-if="item.word">{{item.word}}</view>
						<view style="flex: 1;" v-if="item.voice">{{item.voice}}</view>
					</view>
				</view>
			</view>
		</view>
		<view style="padding: 10px;" v-for="(item, index) in rateList" :key="index">
			<view style="display: flex;justify-content: space-between;align-items: center;">
				<view>
					{{item.nickName}}
				</view>
				<view>
					<u-rate count="5" v-model="item.score"></u-rate>
				</view>
			</view>
			<view style="font-size: 14px;color: #aaa;margin-top: 5px;">{{item.content}}</view>
		</view>
		<view style="height: 52px;"></view>
		<view style="background: #fff;display: flex;justify-content: center;padding: 5px 0;position: fixed;bottom: 0;width: 100%;">
			<view style="width: 80px;">
				<u-button @click="screenShow=true" type="primary" color="#EC7FA8" style="border-radius: 10px;" icon="rmb-circle-fill" text="下单"></u-button>
			</view>
		</view>
		<u-popup :show="screenShow" @close="close" @open="open" round="10" safeAreaInsetBottom>
			<view style="background: #fff;margin: 5px 5px;position: relative;overflow: hidden;">
				<view style="" v-if="voiceList[0]">
					<view style="font-weight: bold;margin: 10px 5px;">
						服务类型
					</view>
					<view
						style="padding: 15px 10px;background: #fff;line-height: 30px;text-align: center;display: flex;justify-content: space-between;flex-wrap: wrap;">
						<view
							:style="{color:item.id==select1.voiceOfWord?'#fff':'#000', background:item.id==select1.voiceOfWord?'#FC76A6':'#EFEFEF'}"
							style="width: 48%;border-radius: 5px;margin: 5px 0;" v-for="(item,i) in selectServiceType"
							:key="i" @click="clickType2(item.id)">{{item.name}}</view>
					</view>
				</view>
				<view style="margin: 5px 5px;" v-if="wordList[0]">
					<view style="font-weight: bold;margin: 10px 5px;">
						时长
					</view>
					<view
						style="padding: 15px 10px;background: #fff;line-height: 30px;text-align: center;display: flex;justify-content: space-between;flex-wrap: wrap;">
						<view
							:style="{color:item==select1.time?'#fff':'#000', background:item==select1.time?'#FC76A6':'#EFEFEF'}"
							style="width: 31%;border-radius: 5px;margin: 5px 0;" v-for="(item,i) in timeList" :key="i"
							@click="clickType3(item, i)">{{item}}</view>
					</view>
				</view>
				<view style="margin: 5px 5px;">
					<view style="font-weight: bold;margin: 10px 5px;">
						价格
					</view>
					<view style="color: red;display: flex;align-items: center;font-size: 25px;">
						<view style="font-size: 20px;">￥</view>
						<view>{{amoney}}</view>
						<view>元</view>
						
						<view class="flex" style="margin-left: 10px;" v-if="integral&&params.zType!=6">
							<view>+ 积分</view>
							<view>{{integral}}</view>
						</view>
					</view>
				</view>
				<view class="flex" style="margin-top: 30px;margin-bottom: 20px;">
					<u-button :disabled="amoney==0" style="width: 300px; border-radius:4px 0 0 4px" color="#EC7FA8" type="primary"
						:text="`直接购买(￥${amoney})`" @click="determine(0)"></u-button>
						<u-button v-if="params.zType!=6" :disabled="amoney==0" style="width: 300px;border-radius:0 4px 4px 0" color="rgba(236,127,118,1)" type="primary"
							:text="`发起拼团(￥${cutPrice})`" @click="determine(1)"></u-button>
				</view>
				
			</view>
			<view @click="close"
				style="display: flex;align-items: center;justify-content: center;width: 25px;height: 25px;border-radius: 50%;background: #ddd;position: absolute;right: 0;top: -12px;">
				<u-icon name="close" color="#000" size="20"></u-icon>
			</view>
		</u-popup>
	</view>
</template>

<script>
	import { imgPrefix, commentList, getClerkType, getGroupList } from '@/common/api.js';
	export default {
		data() {
			return {
				amoney: 0,
				select1: {
					voiceOfWord: 1,
					time: '',
				},
				urlList: [],
				imgPrefixs: "",
				params: {},
				current: 0,
				list5: [
					'https://cdn.uviewui.com/uview/swiper/swiper3.png',
					'https://cdn.uviewui.com/uview/swiper/swiper2.png',
					'https://cdn.uviewui.com/uview/swiper/swiper1.png',
				],
				list1: [{
					name: '基本信息',
				}, {
					name: '服务类型与价格',
				}],
				listVales: '基本信息',
				lineWidth: 82,
				selectService: {
					type: "文字",
					time: "",
				},
				selectServiceType: [{
						name: '文字',
						id: 1,
					},
					{
						name: '语音',
						id: 2,
					},
				],
				selectServiceTime: [{
						name: '15 分钟',
						id: 1,
					},
					{
						name: '30 分钟',
						id: 2,
					},
					{
						name: '1 小时',
						id: 3,
					},
					{
						name: '1 天',
						id: 4,
					},
					{
						name: '1 周',
						id: 5,
					},
					{
						name: '1 月',
						id: 6,
					},
				],
				screenShow: false,
				rateList: [],
				selectList: [],
				voiceList: [],
				wordList: [],
				timeList: [],
				sfList: [],
				groupList: [],
				cutPrice: 0,
				integral: 0
			}
		},
		async onLoad(option) {
			this.params = option
			console.log(this.params)
			this.params.tag = this.params.skill.split(",")
			await imgPrefix().then(res=>{
				if (res.code=='0'){
					this.imgPrefixs = res.data
				}
				
			})
			let url = this.params.imgs.split(",")
			let urlList = []
			url.forEach((elem, index) => {
				urlList.push(this.imgPrefixs+elem)
			});
			this.urlList = urlList
			this.params.urlList = urlList
			await commentList({
				clerkUserId: this.params.userId,
				page: 1,
				pageSize: 1000,
			}).then(res=>{
				if (res.code=='0'){
					this.rateList = res.data
				}
				
			})
			await getClerkType().then(res => {
				if (res.code == '0') {
					this.selectList = res.data
					let newArr = this.selectList.filter((i) => {
						return i.id == this.params.zType
					});
					if (!newArr.length) return
					let newArrs = newArr[0].dataList.filter((i) => {
						return i.id == this.params.cType
					});
					if (!newArrs.length) return
					let selectService1 = newArrs[0].dataList[0].typeName.split(",")
					let voiceList = []
					let wordList = []
					let timeList = []
					let sfList = []
					if (!selectService1.length) return
					selectService1.forEach((elem, index) => {
						let data1 = elem.split("-")
						if(data1[2]) voiceList.push(data1[2])
						if(data1[1]) wordList.push(data1[1])
						if(data1[0]) timeList.push(data1[0])
						sfList.push({time:data1[0],word:data1[1],voice:data1[2]})
					});
					this.voiceList = voiceList
					this.wordList = wordList
					this.timeList = timeList
					this.sfList = sfList
				}
			})
		},
		async onShow(){
			await getGroupList({clerkUserId:this.params.userId,page:1,pageSize:3}).then(res=>{
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
		methods: {
			clickType3(item, index){
				this.select1.time = item
				let amoneys = 0
				if(this.select1.voiceOfWord==1){
					amoneys = this.wordList[index]
				}
				if(this.select1.voiceOfWord==2){
					amoneys = this.voiceList[index]
				}
				this.integral = this.params.zType!=6?(amoneys/2*1).toFixed(0):0
				this.amoney = amoneys
				this.cutPrice = (amoneys*1*this.params.splicing).toFixed(0)
			},
			clickType2(item){
				this.select1.voiceOfWord = item
				this.select1.time = ''
				this.amoney = 0
			},
			clicks1(item) {
				this.listVales = item.name
				this.lineWidth = item.rect.width
			},
			determine(e){
				let core= e? (this.cutPrice*0.5).toFixed(0) : this.integral
				let data = {
					nickName: this.params.nickName,
					url: this.params.url,
					sex: this.params.sex==1? '1' : '0',
					serviceType: this.selectService.type,
					serviceTime: this.select1.time,
					zType: this.params.zType,
					cType: this.params.cType,
					clerkUserId: this.params.userId,
					amoney: e? this.cutPrice : this.amoney,
					integral: this.params.zType!=6? core: null,
					cTypeName: this.params.cTypeName,
					zTypeName: this.params.zTypeName,
					splicing: e?2:1,
					splicingOrderId:''
				}
				uni.$u.route({
					url: '/pages/local/payment',
					params: data
				})
			},
			determines(item){
				console.log(item)
				let data = {
					nickName: item.nickName,
					url: this.imgPrefixs + item.url,
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
			handMore(){
				let data={
					userId:this.params.userId
				}
				uni.$u.route({
					url: '/pages/local/groupList',
					params: data
				})
			},
			open() {
			},
			close() {
				this.screenShow = false
			},
		}
	}
</script>

<style>

</style>
