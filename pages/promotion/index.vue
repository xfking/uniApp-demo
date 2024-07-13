<template>
  <view style="background-color: #fff;text-align: center; height: 100vh;">
    <view style="display: flex; justify-content: center;padding-top: 100px;">
      <u--image :showLoading="true" src="../../static/1024x1024.png" width="200px" height="200px"></u--image>
    </view>
    <view style="font-weight: 700;font-size: 18px;">{{params.nickName}}</view>
    <view style="padding-top: 30px; line-height: 1.8; color: #EC7EA5;">
      <p>价值5400元的国内游</p>
      <p>奖励积分</p>
      <p>获得推广权</p>
      <p>积分交易手续费低</p>
      <p>获得平台分红股</p>
      <p>开通推广员后无法退款，敬请理解!</p>
    </view>

    <u-button style="width: 300px; border-radius:4px 0 0 4px;margin-top: 100px;" :disabled="!isYy" color="#EC7FA8" type="primary"
              :text="!isYy?'已购买':`直接购买(￥${amoney})`" @click="determine(0)"></u-button>

  </view>
</template>

<script>
import {getClerks, imgPrefix, commentList, getClerkType, getGroupList, getMyData } from '@/common/api.js';
export default {
  data() {
    return {
      isYy: true,
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
  async onLoad() {
    await this.init()
  },
  async onShow() {
    await imgPrefix().then(res=>{
      if (res.code=='0'){
        this.imgPrefixs = res.data
      }

    })
    await this.init()
    await this.getUserData()

  },
  methods: {
    async getUserData(){
      await getMyData({}).then(res=>{
        if (res.code=='0'){
          this.isYy = res.data.level =='普通'
        }
      })
    },
    async init(){
      await getClerks({
        zType: 6,
        page: 1,
        pageSize: 1,
      }).then(res => {
        if (res.code == '0') {
          res.data.forEach((elem, index) => {
            let url = elem.imgs.split(",")
            elem.url = this.imgPrefixs + url[0]
            elem.tag = elem.skill.split(",")
          });
          this.params=res.data[0]
        }
      })

      this.params.tag = this.params.skill.split(",")
      let url = this.params.imgs.split(",")
      let urlList = []
      url.forEach((elem, index) => {
        urlList.push(this.imgPrefixs+elem)
      });
      this.urlList = urlList
      this.params.urlList = urlList
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

          this.clickType2(this.selectServiceType[0].id)
          this.clickType3(this.timeList[0],0)
        }
      })

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
      this.integral = this.params.zType!=6?(amoneys/2*1).toFixed(0):0
      this.amoney = amoneys
      this.cutPrice = (amoneys*1*this.params.splicing).toFixed(0)
    },
    clickType2(item){
      this.select1.voiceOfWord = item
      this.select1.time = ''
      this.amoney = 0
    },
    determine(e){
      let data = {
        nickName: this.params.nickName,
        url: this.params.url,
        sex: this.params.sex==1? '1' : '0',
        serviceType: this.selectService.type,
        serviceTime: this.select1.time,
        zType: this.params.zType,
        cType: this.params.cType,
        clerkUserId: this.params.userId,
        amoney: this.amoney,
        integral: null,
        cTypeName: this.params.cTypeName,
        zTypeName: this.params.zTypeName,
        splicing: 1,
        splicingOrderId:''
      }
      uni.$u.route({
        url: '/pages/local/paymentCopy',
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
