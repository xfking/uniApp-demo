<template>
	<view>
		<view style="background-color: #fff;" :style="{height:statusBarHeight+'px'}"></view>
		<view style="padding: 20px 15px;background: #fff;font-size: 15px;color: #aaa;">
			<view style="" v-if="select1.id1!=6">
				<view style="font-weight: bold;margin: 10px 5px;">
					选择性别
				</view>
				<view
					style="padding: 15px 10px;background: #fff;line-height: 40px;text-align: center;display: flex;justify-content: space-between;flex-wrap: wrap;">
					<view v-if="mainTypes==select1.id1"
						:style="{color:item.id==select1.gender?'#fff':'#000', background:item.id==select1.gender?'#FC76A6':'#EFEFEF'}"
						style="width: 30%;border-radius: 5px;margin: 5px 0;" v-for="(item,i) in selectGender"
						:key="i" @click="select1.gender=item.id">{{item.name}}</view>
					<view v-if="mainTypes!=select1.id1"
						:style="{color:item.id==select1.gender?'#fff':'#000', background:item.id==select1.gender?'#FC76A6':'#EFEFEF'}"
						style="width: 30%;border-radius: 5px;margin: 5px 0;" v-for="(item,i) in selectGender1"
						:key="i" @click="select1.gender=item.id">{{item.name}}</view>
				</view>
			</view>
			<view>
				<view>
					想要什么类型的店员呢？
				</view>
				<view>
					<view
						style="padding: 15px 10px;line-height: 40px;text-align: center;display: flex;justify-content: space-between;flex-wrap: wrap;">
						<view
							:style="{color:item.id==select1.id1?'#fff':'#000', background:item.id==select1.id1?'#FC76A6':'#EFEFEF'}"
							style="width: 47%;border-radius: 5px;margin: 10px 0;" v-for="(item,i) in selectList" :key="i"
							@click="clickType(item.id,i)">{{item.typeName}}</view>
					</view>
				</view>
			</view>
			<view>
				<view>
					想要什么等级的店员呢？
				</view>
				<view>
					<view
						style="padding: 15px 10px;line-height: 35px;text-align: center;display: flex;justify-content: space-between;flex-wrap: wrap;">
						<view
							:style="{color:item.id==select1.id2?'#fff':'#000', background:item.id==select1.id2?'#FC76A6':'#EFEFEF'}"
							style="width: 47%;border-radius: 5px;margin: 10px 0;" v-for="(item,i) in selectLists" :key="i"
							@click="clickType1(item.id,i)">{{item.typeName}}</view>
					</view>
				</view>
			</view>
			<view>
				<u-button @click="screenShow=true" :disabled="select1.id1==6?select1.id2==0:select1.gender==-1||select1.id2==0" style="width: 300px;margin-top: 30px;" color="#EC7FA8" type="primary" text="下一步"></u-button>
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
					</view>
				</view>
				<u-button :disabled="amoney==0" style="width: 300px;margin-top: 30px;margin-bottom: 20px;" color="#EC7FA8" type="primary"
					text="确定" @click="determine()"></u-button>
			</view>
			<view @click="close"
				style="display: flex;align-items: center;justify-content: center;width: 25px;height: 25px;border-radius: 50%;background: #ddd;position: absolute;right: 0;top: -12px;">
				<u-icon name="close" color="#000" size="20"></u-icon>
			</view>
		</u-popup>
		<bottomNavigation :index="2" />
	</view>
</template>

<script>
	import { getClerkType } from '@/common/api.js';
	import bottomNavigation from "@/components/bottomNavigation.vue"
	export default {
		components: {
			bottomNavigation
		},
		data() {
			return {
				statusBarHeight: getApp().globalData.statusBarHeight,
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
				amoney: 0,
				selectService: {
					type: 1,
					time: 0,
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
				screenShow: false,
				selectList: [],
				selectLists: [],
				select1: {
					gender: -1,
					id1: 0,
					index1: 0,
					id2: 0,
					index2: 0,
					id3: 0,

					voiceOfWord: 1,
					time: '',
				},
				voiceList: [],
				wordList: [],
				timeList: [],
				mainTypes: -1,
			}
		},
		onLoad() {
			this.init()
		},
		methods: {
			async init1() {
				await getClerkType().then(res=>{
					if (res.code=='0'){
						this.mainTypes = res.data[0].id
						this.selectList = res.data
						this.select1.id1 = res.data[0].id
						this.select1.index1 = 0
						this.selectLists = this.selectList[this.select1.index1].dataList
					}
					
				})
			},
			async init() {
				await getClerkType().then(res=>{
					if(!res.data.length){
						this.init1()
						return
					}
					if (res.code=='0'){
						this.mainTypes = res.data[0].id
						this.selectList = res.data
						this.select1.id1 = res.data[0].id
						this.select1.index1 = 0
						this.selectLists = this.selectList[this.select1.index1].dataList
					}
				})
			},
			clickType2(item){
				this.select1.voiceOfWord = item
				this.select1.time = ''
				this.amoney = 0
			},
			clickType3(item, index){
				this.select1.time = item
				let amoneys = 0
				if(this.select1.voiceOfWord==1){
					amoneys = this.wordList[index]
				}
				if(this.select1.voiceOfWord==2){
					amoneys = this.voiceList[index]
				}
				this.amoney = amoneys
			},
			clickType(id, index){
				if(this.select1.gender!=0&&this.select1.gender!=1){
					this.select1.gender = -1
				}
				this.select1.id1 = id
				this.select1.index1 = index
				this.select1.id2 = 0
				this.select1.index2 = 0
				this.selectLists = this.selectList[this.select1.index1].dataList
			},
			clickType1(id, index){
				this.select1.id2 = id
				this.select1.index2 = index
				this.select1.id3 = this.selectList[this.select1.index1].dataList[this.select1.index2].dataList[0].id
				let selectService1 = this.selectList[this.select1.index1].dataList[this.select1.index2].dataList[0].typeName.split(",")
				let voiceList = []
				let wordList = []
				let timeList = []
				selectService1.forEach((elem, index) => {
					let data1 = elem.split("-")
					if(data1[2]) voiceList.push(data1[2])
					if(data1[1]) wordList.push(data1[1])
					if(data1[0]) timeList.push(data1[0])
				});
				this.voiceList = voiceList
				this.wordList = wordList
				this.timeList = timeList
			},
			determine(){
				let data = {
					sex: this.select1.gender,
					serviceType: this.select1.voiceOfWord==1? '文字' : '语音',
					serviceTime: this.select1.time,
					zType: this.select1.id1,
					cType: this.select1.id2,
					amoney: this.amoney,
				}
				uni.$u.route({
					url: '/pages/local/payment',
					params: data
				})
			},
			open() {
			},
			close() {
				this.select1.voiceOfWord = 1
				this.select1.time = ''
				this.amoney = 0
				this.screenShow = false
			},
		}
	}
</script>

<style>

</style>
