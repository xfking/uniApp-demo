<script>
import {
  mapMutations
} from 'vuex'

export default {
  globalData: {
    statusBarHeight: uni.getSystemInfoSync().statusBarHeight,
    version: '1.0.0'
  },
  methods: {
    ...mapMutations(['isLogin'])
  },

  onLaunch() {

    // imgPrefix().then(res => {
    //   if (res.code === '0') {
    //     uni.setStorageSync('imgPrefixs', res.data);
    //   }
    // });

    // uni.getSystemInfo({
    // 	success: (res) => {
    // 		console.log(res.platform);
    // 		//检测当前平台，如果是安卓则启动安卓更新
    // 		if (res.platform == "android") {
    // 			// 获取本地应用资源版本号
    // 			plus.runtime.getProperty(plus.runtime.appid, (info) => {
    // 				// console.log(JSON.stringify(info));
    // 				this.globalData.version = info.version
    // 			})
    // 		}
    // 	}
    // })
    // const userInfo = uni.getStorageSync('userInfo'); //同步获取本地数据
    // //判断本地缓存是否存在数据
    // if (userInfo !== "") {
    // 	//传到vuex里面储存起来,并改变登录状态
    // 	this.isLogin(userInfo)
    // } else {
    // 	uni.$u.route({
    // 		type: 'redirect',
    // 		url: 'pages/local/login'
    // 	})
    // }
  },
  onShow: function () {
    console.log('App Show')
  },
  onHide: function () {
    console.log('App Hide')
  },
}
</script>

<style lang="scss">
/* 注意要写在第一行，同时给style标签加入lang="scss"属性 */
@import "@/uni_modules/uview-ui/index.scss";

body {
  background-color: #E8F0EF;
}

.flex {
  display: flex;
  align-items: center;
}

.flex_between {
  justify-content: space-between;
}
</style>
