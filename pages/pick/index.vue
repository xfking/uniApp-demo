<template>
  <view class="content" style="height: 100vh;">
    <view style="background-color: #FD79AB;" :style="{height:statusBarHeight+'px'}"></view>
    <view style="background-color: #FD79AB;padding: 8px 13px;">
      <u-search placeholder="搜商品" v-model="keyword" bgColor="#fff" searchIconColor="#9DB7C0"
                :actionStyle="{color:'#fff'}" @custom="queryContent()"></u-search>
    </view>
    <u-gap bgColor="transparent" height="10"></u-gap>
    <view v-for="(item,index) in dataList" :key="index" @click="handDetail(item.id)">
      <view
          style="padding: 15px;box-sizing: border-box;background: #fff;margin-bottom: 15px;display: flex;align-items: center;">
        <view
            style="width: 80px;height: 80px;background: #fafafa;border-radius: 5px;overflow: hidden;margin-right: 15px;">
          <u--image :showLoading="true" :src="item.url" width="80px" height="80px">
          </u--image>
        </view>
        <view style="flex:1;height: 70px;display: flex;flex-direction: column;justify-content: space-between;">
          <view style="font-weight: bold;">{{item.name}}</view>
          <view style="color: #999;font-size: 12px;">已售 {{item.sold||0}}</view>
          <view style="color: red;font-size: 13px;">
            <text style="margin-right:10px">用户￥{{item.oldPrice}} <text v-if="item.oldScore">+{{item.oldScore}}积分 </text></text>
            <text>推广员￥{{item.price}} <text v-if="item.score">+{{item.score}}积分 </text></text>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import {
  getGoodsList,
  getMyData
} from '@/common/api.js';
export default {
  data() {
    return {
      keyword: '',
      statusBarHeight: getApp().globalData.statusBarHeight,
      dataList: [1, 1, 1],
      imgPrefixs: '',
      level: ''
    }
  },
  onLoad() {
    this.init()
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
    queryContent() {
      this.init()
    },
    async init() {
      await getGoodsList({
        page: 1,
        pageSize: 1000,
      }).then(res => {
        if (res.code == '0') {
          res.data.forEach((elem, index) => {
            let url = elem.logos.split(",")
            elem.url = this.imgPrefixs + url[0]
          });
          this.dataList = res.data
        }
      })
    },
    handDetail(id){
      uni.navigateTo({
        url: `/pages/local/boutiqueDetails?id=${id}`
      });
    }
  }
}
</script>

<style>

</style>
