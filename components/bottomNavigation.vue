<template>
	<u-tabbar :value="value" @change="pageJump" :fixed="true" :placeholder="true" :safeAreaInsetBottom="true">
		<u-tabbar-item text="首页" icon="home"></u-tabbar-item>
		<u-tabbar-item text="关于我们" icon="info-circle"></u-tabbar-item>
		<u-tabbar-item text="开通推广" icon="photo"></u-tabbar-item>
		<u-tabbar-item text="精品" icon="shopping-cart"></u-tabbar-item>
		<u-tabbar-item text="我的" icon="account"></u-tabbar-item>
	</u-tabbar>
</template>

<script>
	export default {
		name: "bottomNavigation",
		props: ['index'],
		data() {
			return {
				value: this.index,
			};
		},
		methods: {
			pageJump(e) {
				let page = ""
				switch (e) {
					case 0:
						page = "index"
						break;
					case 1:
						page = "aboutMe"
						break;
					case 2:
						page = "openPromotion"
						break;
					case 3:
						page = "boutique"
						break;
					case 4:
						page = "my"
						break;
					default:
						page = "index"
						break;
				}
				uni.navigateTo({
					url: page
				});
			}
		}
	}
</script>

<style lang="scss">

</style>
