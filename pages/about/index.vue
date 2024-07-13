<template>
  <view>
    <view
        style="display: flex;align-items: center;justify-content: space-between;padding: 0 10px;box-sizing: border-box;background-color: #fff;">
      <view v-for="(item,index) in navList" :key="index" @click="handNav(item)"
            :class="selectNav==item?'select':''" style="padding:15px 0">
        {{ item }}
      </view>
    </view>
    <view style="padding: 5px;box-sizing: border-box">
      <view v-for="(item,index) in tableList" :key="index" style="padding: 5px;box-sizing: border-box;">
        <view style="text-align: center;color: #999;font-size: 12px;margin-bottom: 10px;">{{ item.ctime }}</view>
        <view style="border-radius: 5px;background-color: #fff;padding: 10px;box-sizing: border-box">
          <view style="margin-bottom: 10px;font-weight: 700;font-size: 14px">{{ item.title }}</view>
          <view v-for="(item,index) in item.urls" :key="index">
            <video v-if="fileType(item)=='video'" :src="`${imgPrefixs}${item}`" style="width: 100%;"
                   controls></video>
            <img v-if="fileType(item)=='img'" :src="`${imgPrefixs}${item}`" alt="" style="width: 100%;">
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import toast from "../../lib/utils/toast";
import {imgPrefix, knowUs} from "../../common/api";

export default {
  data() {
    return {
      imgPrefixs: '',
      imgs: [],
      videos: [],
      dataList: [],
      tableList: [],
      navList: ['公司资质', '动态资讯', '平台功能', '服务项目'],
      selectNav: '公司资质'
    }
  },
  onLoad() {
    imgPrefix().then((res) => {
      this.imgPrefixs = res.data;
      uni.setStorageSync('imgPrefixs', res.data);
    }).catch(toast.error);
    knowUs().then((res) => {
      this.dataList = res.data;
      this.changeList()
    }).catch(toast.error);
  },
  methods: {
    handNav(item) {
      this.selectNav = item
      this.changeList()
    },
    changeList() {
      let name = this.selectNav;
      let list = this.dataList;
      if (list && list.length) {
        let element = {};
        list.forEach(m => {
          if (m.name == name) {
            element = m
          }
        })
        if (element) {
          this.tableList = element.list || []
        }
      }
    },
    fileType(file) {
      const typeList = file.split('.');
      const type = typeList[typeList.length - 1]
      let videos = ['mp4', 'm4v', 'avi', 'dat', 'mkv', 'flv', 'vob', 'm4v', 'mov', '3gp', 'mpg', 'mpeg', 'rmvb',
        'wmv', 'asf', 'asx'
      ];
      let imgs = ['bmp',
        'jpg',
        'png',
        'tif',
        'gif',
        'pcx',
        'tga',
        'exif',
        'fpx',
        'svg',
        'psd',
        'pcd',
        'dxf',
        'webp',
        'avif',
        'apng'
      ];
      if (videos.indexOf(type) != -1) {
        return 'video'
      }
      if (imgs.indexOf(type) != -1) {
        return 'img'
      }
    }
  }
}
</script>

<style scoped>
.select {
  font-weight: 700;
  border-bottom: 2px solid #E18236;
}
</style>
