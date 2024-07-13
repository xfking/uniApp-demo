<template>
	<view>
		<img :src="info.img" alt="" style='width:100%'>
		<view style="width:100%;position: fixed;bottom: 50px;display: flex;justify-content: center;">
			<u-button style="width: 300px;" color="#E6526C" text="报名" @click="submit()"></u-button>
		</view>
		<u-toast ref="uToast"></u-toast>
	</view>
</template>

<script>
	import {
		entryTravel
	} from '@/common/api.js';
	export default {
		data() {
			return {
				info: {}
			}
		},
		onLoad(options) {
			console.log(options)
			if (options) {
				this.info = options
				
			}
		},
		methods: {
			submit() {
				entryTravel({
					travelId: this.info.id||''
				}).then(res => {
					if (res.code == '0') {
						uni.$u.toast('报名成功')
						setTimeout(() => {
							uni.navigateBack()
						}, 1000)
					} else {
						uni.$u.toast(res.msg||'报名失败')
					}
				})
			}
		}
	}
</script>

<style>

</style>
