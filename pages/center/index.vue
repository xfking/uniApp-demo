<template>
  <view>
    <view style="background-color: #EC7FA8;" :style="{height:statusBarHeight+'px'}"></view>
    <view style="background: #EC7FA8;color: #fff;padding: 15px 20px 20px 15px;">
      <view style="display: flex;align-items: center;position: relative;">
        <view>
          <u-upload :fileList="fileList1"
                    @afterRead="afterRead"
                    @delete="deletePic"
                    name="1"
                    multiple
                    :maxCount="1">
            <u--image :showLoading="true" :src="userData.userImg" radius="50%" width="60px" height="60px">
            </u--image>
          </u-upload>
        </view>
        <view style="margin-left: 12px;line-height: 1.5;">
          <view style="font-size: 20px;">{{userData.name}}</view>
          <view style="font-size: 13px;">ID：{{userData.id}}</view>
        </view>
        <view style="position: absolute;top: 50%;right: 0%;transform: translateY(-50%);font-size: 13px;">推广人数：{{userData.userCount|| 0}}</view>
      </view>
      <view style="display: flex;align-items: center;justify-content: space-between;margin-top: 30px;">
        <view class="flex">LV.{{userData.startLevel}} <u-tag v-show="userData.isYy==1" style="margin-left: 10px;" text="运营中心" shape="circle" size="mini" type="success">
        </u-tag></view>
        <view style="background-color: #E18236;border-radius: 30px;padding: 5px 20px;border: 1px solid #fff;" @click="show=true">
          签到
        </view>
      </view>
    </view>
    <u-gap bgColor="transparent" height="10"></u-gap>
    <view style="background: #fff;">
      <u-cell title="我的购买订单" isLink>
        <view slot="icon" class="u-slot-value"
              style="background: #E18236;width: 4px;height: 18px;border-radius: 3px;margin-right: 6px;"></view>
        <text slot="value" class="u-slot-value" @click="pageJump1('order', 0)">查看全部</text>
      </u-cell>
      <view style="padding: 5px 0;">
        <u-grid :border="false" col="3">
          <u-grid-item style="padding: 15px 0;" v-for="(item,i) in gridList1" :key="i" @click="pageJump1(item.page, item.state)">
            <image :src="require(`../../static/${item.src}.png`)" style="width: 20px;height: 20px;"></image>
            <text style="font-size: 13px;margin-top: 5px;color: #909090;">{{item.title}}</text>
          </u-grid-item>
        </u-grid>
      </view>
    </view>
    <u-gap bgColor="transparent" height="10"></u-gap>
    <view style="background: #fff;">
      <u-cell title="我的服务">
        <view slot="icon" class="u-slot-value"
              style="background: #E18236;width: 4px;height: 18px;border-radius: 3px;margin-right: 6px;"></view>
      </u-cell>
      <view style="padding: 5px 0;">
        <u-grid :border="false" col="4">
          <u-grid-item style="padding: 15px 0;" v-for="(item,i) in gridList2" :key="i" @click="pageJump(item.page)">
            <image :src="require(`../../static/${item.src}.png`)" style="width: 20px;height: 20px;"></image>
            <text style="font-size: 13px;margin-top: 5px;color: #909090;">{{item.title}}</text>
          </u-grid-item>
        </u-grid>
      </view>
    </view>
    <view>
      <u-button style="width: 300px;margin-top: 30px;margin-bottom: 20px;" color="#EC7FA8" type="primary"
                text="退出登录" @click="tcdl()"></u-button>
    </view>

    <!-- 签到 -->
    <u-popup mode="center" :show="show" round='8' @close="show=false" closeIconPos='top-right'>
      <view style="text-align: center;font-size: 16px;font-weight: 700;padding: 15px 0;">-----<span style="margin:0 15px">每日签到得积分</span>-----</view>
      <view style="width: 300px;padding: 15px;font-size: 14px;">
        <view style="display:flex;flex-wrap: wrap;justify-content: center;">
          <view v-for="(item,index) in clock" :key="index" class="flex_list" :class="userData.loginCount>index?'red_border':'gray_border'" style="border-radius: 4px;width: 20%;margin-right: 10px;margin-bottom:10px;text-align: center;overflow: hidden;" @click="handCheck(index)">
            <view style="color: #fff;padding: 5px 0;font-size: 12px;" :class="userData.loginCount>index?'red':'gray'">{{userData.loginCount>index?'已签到':'待签到'}}</view>
            <view style="padding: 10px 0;text-align: center">+{{item}}</view>
          </view>
        </view>
      </view>
    </u-popup>
    <u-toast ref="uToast"></u-toast>
  </view>
</template>

<script>
import {
  mapMutations
} from 'vuex'
import { getMyData, updateUserImg, imgPrefix, punchClock } from '@/common/api.js';
export default {
  data() {
    return {
      show: false,
      clock:['5','10','15','20','25','30','40'],
      statusBarHeight: getApp().globalData.statusBarHeight,
      userData: {
        src: 'https://cdn.uviewui.com/uview/album/1.jpg',
        userImg: '',
        name: '',
        id: '',
        speedOfProgress: 60,
        startLevel: '0',
        endLevel: '1',
        msgCount: 0,
        isClerk: 0,
        loginCount: 0,
        isYy: 0
      },
      gridList1: [{
        page: 'order',
        title: '待服务',
        src: 'waitFor',
        state: 1,
      },
        {
          page: 'order',
          title: '服务中',
          src: 'customerService',
          state: 2,
        },
        {
          page: 'order',
          title: '待评价',
          src: 'evaluate',
          state: 3,
        },
      ],
      gridList2: [{
        page: 'wallet',
        title: '钱包',
        src: 'wallet',
      },
        {
          page: 'clerkApplication',
          title: '店员中心',
          src: 'customerService',
        },
        {
          page: 'aboutUs',
          title: '联系我们',
          src: 'opinion',
        },
        {
          page: 'customerService',
          title: '在线客服',
          src: 'contactUs',
        },
        {
          page: 'feedback',
          title: '意见反馈',
          src: 'questionMark',
        },
        {
          page: 'team',
          title: '我的团队',
          src: 'td',
        },
        {
          page: 'share',
          title: '分享',
          src: 'fx',
        },
        {
          page: 'transfer',
          title: '转账',
          src: 'wallet',
        },
        {
          page: 'setting',
          title: '设置',
          src: 'setting',
        },
      ],
      fileList: [],
      fileList1: [],
      imgsList: [],
      imgPrefixs: '',
    }
  },
  async onShow() {
    await imgPrefix().then(res => {
      if (res.code == '0') {
        this.imgPrefixs = res.data
      }
    })
    this.init()
  },
  methods: {
    uploadFilePromise(url) {
      return new Promise((resolve, reject) => {
        let a = uni.uploadFile({
          url: 'http://cqrcsm.cn/tapi/user/upFile',
          filePath: url,
          name: 'file',
          formData: {},
          success: (res) => {
            setTimeout(() => {
              resolve(JSON.parse(res.data).data)
            }, 1000)
          }
        });
      })
    },
    // 删除图片
    deletePic(event) {
      this[`fileList${event.name}`].splice(event.index, 1)
      this.imgsList.splice(event.index, 1)
    },
    // 新增图片
    async afterRead(event) {
      let lists = [].concat(event.file)
      let fileListLen = this[`fileList${event.name}`].length
      lists.map((item) => {
      })
      for (let i = 0; i < lists.length; i++) {
        const result = await this.uploadFilePromise(lists[i].url)
        this.sd3(result)
      }
    },
    async sd3(sd123){
      await updateUserImg({img:sd123}).then(res=>{
        if (res.code=='0'){
          this.init()
        }
      })
    },
    ...mapMutations(['logout']),
    async tcdl(){
      this.logout()
      uni.$u.route({
        type: 'reLaunch',
        url: '/pages/local/login'
      })
    },
    async init() {
      await getMyData({}).then(res=>{
        if (res.code=='0'){
          this.userData.name = res.data.loginId
          this.userData.id = res.data.userId
          this.userData.startLevel = res.data.level
          this.userData.msgCount = res.data.msgCount
          this.userData.isClerk = res.data.isClerk
          this.userData.loginCount = res.data.loginCount
          this.userData.userImg = this.imgPrefixs+res.data.userImg
          this.userData.userCount = res.data.userCount
          this.userData.isYy = res.data.isYy
        }
      })
    },
    async handCheck(index){
      if(this.userData.loginCount==index){
        await punchClock({userId:this.userData.id}).then(res=>{
          // this.$refs.uToast.show({
          // 	message: res.msg
          // })
          uni.showToast({
            title:res.msg,
            icon:'none'
          })
          this.init()
        })
      }else{
        uni.showToast({
          title:'暂不可签到',
          icon:'none'
        })
      }
    },
    pageJump(e, data) {
      let parameter = ''
      if (data) {
        parameter = `?state=${data}`
      }
      uni.navigateTo({
        url: `/pages/local/${e}${parameter}`
      });
    },
    pageJump1(e,data) {
      let parameter = `?state=${data}`
      uni.navigateTo({
        url: `/pages/local/${e}${parameter}`
      });
    }
  }
}
</script>

<style scoped>
.gray{
  background-color: rgba(0, 0, 0, .4);
}
.gray_border{
  border: 1px solid gray;
}
.red{
  background-color: #E18236;
}
.red_border{
  border: 1px solid #E18236;
}
.flex_list:nth-child(4n){
  margin-right: 0;
}
</style>
