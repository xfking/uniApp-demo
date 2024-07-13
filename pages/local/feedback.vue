<template>
	<view>
		<view style="background: #fff;">
			<u-cell title="问题类型" :value="type" :isLink="true" @click="pickerShow = true"></u-cell>
		</view>
		<u-gap bgColor="transparent" height="10"></u-gap>
		<view style="background: #fff;">
			<u--textarea v-model="typeValue" border="none" placeholder="请详细描述你的问题和意见..."></u--textarea>
		</view>
		<view style="margin-top: 25px;">
			<u-button style="width: 300px;" :disabled="typeValue==''" type="primary" text="立即反馈" shape="circle" @click="submit()"></u-button>
		</view>
		<u-picker :show="pickerShow" :columns="columns" @confirm="confirmPicker" @close="pickerShow = false" @cancel="pickerShow = false" closeOnClickOverlay></u-picker>
		<u-toast ref="uToast"></u-toast>
	</view>
</template>

<script>
	import { getFeedbackType, commitFeedbackType } from '@/common/api.js';
	export default {
		data() {
			return {
				type: '',
				typeValue: '',
				pickerShow: false,
				columns: [],
			}
		},
		async onLoad() {
			await getFeedbackType().then(res=>{
				if (res.code=='0'){
					this.columns.push(res.data)
					this.type = res.data[0]
				}
				
			})
		},
		methods: {
			confirmPicker(e){
				this.type = e.value[0]
				this.pickerShow = false
			},
			async submit(){
				await commitFeedbackType({
					context: this.typeValue,
					type: this.type,
				}).then(res=>{
					if (res.code=='0'){
						this.$refs.uToast.show({
							message: '提交成功'
						})
						this.typeValue = ""
					}
				})
			}
		}
	}
</script>

<style>

</style>
