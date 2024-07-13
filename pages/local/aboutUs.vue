<template>
	<view style="text-align: center;line-height: 2;background: #fff;height: 100vh;">
		<view style="padding: 60px 0 10px 0; display: flex;justify-content: center;">
			<u--image :showLoading="true" shape="circle" :src="src" width="80px" height="80px" @click="click"></u--image>
		</view>
		<view style="color: #C7C7C7;">{{text}}</view>
	</view>
</template>

<script>
	import { getContactUs } from '@/common/api.js';
	export default {
		data() {
			return {
				src: 'https://cdn.uviewui.com/uview/album/1.jpg',
				text: ''
			}
		},
		async onLoad() {
			await getContactUs().then(res=>{
				if (res.code=='0'){
					this.text = res.data
				}
				
			})
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
