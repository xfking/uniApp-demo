<template>
	<view>
		<view style="padding: 10px;margin: 20px 15px;background: #fff;">
			<u--form labelPosition="left" :model="model1" :rules="rules" ref="form1">
				<u-form-item labelWidth="40" label="昵称" prop="userInfo.nickName" borderBottom ref="item1">
					<u--input v-model="model1.userInfo.nickName" border="none"></u--input>
				</u-form-item>
				<u-form-item labelWidth="40" label="照片" prop="" borderBottom ref="item1">
					<u-upload :fileList="fileList1" @afterRead="afterRead" @delete="deletePic" name="1" multiple
						:maxCount="10"></u-upload>
				</u-form-item>
				<u-form-item labelWidth="80" label="是否在线" prop="userInfo.online" borderBottom @click="showOnline = true"
					ref="item1">
					<u--input v-model="model1.userInfo.online" disabled disabledColor="#ffffff" placeholder="请选是否在线"
						border="none"></u--input>
					<u-icon slot="right" name="arrow-right"></u-icon>
				</u-form-item>
				<u-form-item labelWidth="100" label="是否可语音" prop="userInfo.voice" borderBottom @click="showVoice = true"
					ref="item1">
					<u--input v-model="model1.userInfo.voice" disabled disabledColor="#ffffff" placeholder="请选择是否可语音"
						border="none"></u--input>
					<u-icon slot="right" name="arrow-right"></u-icon>
				</u-form-item>
				<u-form-item labelWidth="100" label="服务类型" prop="userInfo.zType" borderBottom @click="showZtypeSB()"
					ref="item1">
					<u--input v-model="model1.userInfo.zType" disabled disabledColor="#ffffff" placeholder="请选择主类型"
						border="none"></u--input>
					<u-icon slot="right" name="arrow-right"></u-icon>
				</u-form-item>
				<u-form-item labelWidth="40" label="性别" prop="userInfo.sex" borderBottom @click="showSexSB()"
					ref="item1">
					<u--input v-model="model1.userInfo.sex" disabled disabledColor="#ffffff" placeholder="请选择性别"
						border="none"></u--input>
					<u-icon slot="right" name="arrow-right"></u-icon>
				</u-form-item>
				<u-form-item labelWidth="60" label="手机号" prop="userInfo.phone" borderBottom ref="item2">
					<u--input v-model="model1.userInfo.phone" border="none"></u--input>
				</u-form-item>
				<u-form-item labelWidth="40" label="邮箱" prop="userInfo.email" borderBottom ref="item2">
					<u--input v-model="model1.userInfo.email" border="none"></u--input>
				</u-form-item>
				<u-form-item labelWidth="80" label="个人签名" prop="userInfo.perDepict" borderBottom ref="item2">
					<u--input v-model="model1.userInfo.perDepict" border="none"></u--input>
				</u-form-item>
				<u-form-item labelWidth="40" label="技能" prop="userInfo.skill" borderBottom ref="item3">
					<u--input v-model="model1.userInfo.skill" border="none" placeholder="多个用,逗号分割"></u--input>
				</u-form-item>
				<u-form-item labelWidth="60" label="微信号" prop="userInfo.weChat" borderBottom ref="item4">
					<u--input v-model="model1.userInfo.weChat" border="none"></u--input>
				</u-form-item>
				<u-form-item labelWidth="100" label="生日" prop="userInfo.birthday" borderBottom
					@click="showBirthday = true" ref="item1">
					<u--input v-model="model1.userInfo.birthday" disabled disabledColor="#ffffff" placeholder="请选择生日"
						border="none"></u--input>
					<u-icon slot="right" name="arrow-right"></u-icon>
				</u-form-item>
				<u-form-item labelWidth="40" label="职业" prop="userInfo.occupation" borderBottom ref="item5">
					<u--input v-model="model1.userInfo.occupation" border="none"></u--input>
				</u-form-item>
				<u-form-item labelWidth="40" label="地址" prop="userInfo.address" borderBottom ref="item6">
					<u--input v-model="model1.userInfo.address" border="none"></u--input>
				</u-form-item>
				<u-form-item labelWidth="80" label="在线时长" prop="userInfo.onlineDuration" borderBottom ref="item6">
					<u--input v-model="model1.userInfo.onlineDuration" border="none" placeholder="格式: 8小时/120分钟">
					</u--input>
				</u-form-item>
				<u-form-item labelWidth="80" label="是否在职" prop="userInfo.onJob" borderBottom @click="showOnJob = true"
					ref="item1">
					<u--input v-model="model1.userInfo.onJob" disabled disabledColor="#ffffff" placeholder="请选择是否在职"
						border="none"></u--input>
					<u-icon slot="right" name="arrow-right"></u-icon>
				</u-form-item>
				<u-form-item labelWidth="100" label="是否有经验" prop="userInfo.experience" borderBottom
					@click="showExperience = true" ref="item1">
					<u--input v-model="model1.userInfo.experience" disabled disabledColor="#ffffff"
						placeholder="请选择是否有经验" border="none"></u--input>
					<u-icon slot="right" name="arrow-right"></u-icon>
				</u-form-item>
				<u-form-item labelWidth="80" label="店铺等级" prop="userInfo.storeLevel" borderBottom ref="item6">
					<u--input v-model="model1.userInfo.storeLevel" border="none" placeholder="1--20"></u--input>
				</u-form-item>
				<u-form-item labelWidth="60" label="续单率" prop="userInfo.renewalRate" borderBottom ref="item6">
					<u--input v-model="model1.userInfo.renewalRate" border="none"></u--input>
				</u-form-item>
			</u--form>
			<u-button style="width: 300px;margin-top: 30px;margin-bottom: 20px;" color="#EC7FA8" type="primary"
				text="确定" @click="submit()"></u-button>
		</view>
		<u-action-sheet :show="showOnline" :actions="actions1" title="请选择是否在线" @close="showOnline = false"
			@select="onlineSelect">
		</u-action-sheet>
		<u-action-sheet :show="showSex" :actions="actionsSb" title="请选择性别" @close="showSex = false" @select="sexSelect">
		</u-action-sheet>
		<u-action-sheet :show="showVoice" :actions="actions3" title="请选择是否可语音" @close="showVoice = false"
			@select="voiceSelect">
		</u-action-sheet>
		<u-action-sheet :show="showOnJob" :actions="actions1" title="请选择是否在职" @close="showOnJob = false"
			@select="onJobSelect">
		</u-action-sheet>
		<u-action-sheet :show="showExperience" :actions="actions2" title="请选择有无经验" @close="showExperience = false"
			@select="experienceSelect">
		</u-action-sheet>
		<u-action-sheet :show="showZtype" :actions="actionsZ" title="请选择服务类型" @close="showZtype = false"
			@select="zTypeSelect">
		</u-action-sheet>
		<u-action-sheet :show="showCtype" :actions="actionsC" title="请选择次类型" @close="showCtype = false"
			@select="cTypeSelect">
		</u-action-sheet>
		<u-datetime-picker :minDate="214748364" :show="showBirthday" mode="date" @close="showBirthday = false"
			@confirm="birthdaySelect">
		</u-datetime-picker>
	</view>
</template>

<script>
	import {
		applyClerk, getClerkType
	} from '@/common/api.js';
	export default {
		data() {
			return {
				mainTypes: -1,
				cTypeName: '',
				showZtype: false,
				showCtype: false,
				imgsList: [],
				fileList1: [],
				showOnline: false,
				showSex: false,
				showVoice: false,
				showOnJob: false,
				showExperience: false,
				showBirthday: false,
				model1: {
					userInfo: {
						phone: '',
						zType: '',
						cType: '',
						imgs: '',
						online: '',
						nickName: '',
						sex: '',
						voice: '',
						email: '',
						perDepict: '',
						skill: '',
						weChat: '',
						birthday: '',
						occupation: '',
						address: '',
						onlineDuration: '',
						onJob: '',
						experience: '',
						storeLevel: '',
						renewalRate: '',
					},
				},
				actionsSb1: [{
						name: '男神',
					},
					{
						name: '女神',
					},
				],
				actionsSb: [],
				actionsSb2: [{
						name: '男神',
					},
					{
						name: '女神',
					},
					{
						name: '帅T',
					},
					{
						name: '美P',
					},
				],
				actions: [{
						name: '男',
					},
					{
						name: '女',
					},
				],
				actions1: [{
						name: '在',
					},
					{
						name: '否',
					},
				],
				actions2: [{
						name: '有',
					},
					{
						name: '无',
					},
				],
				actions3: [{
						name: '是',
					},
					{
						name: '否',
					},
				],
				selectList: [],
				actionsZ: [],
				actionsC: [],
				select1: {
					id1: 0,
					index1: 0,
					id2: 0,
					index2: 0,
				},
				rules: {
					'userInfo.phone': {
						type: 'string',
						required: true,
						message: '请填写手机号',
						trigger: ['blur', 'change']
					},
					'userInfo.zType': {
						type: 'string',
						required: true,
						message: '请填写主类型',
						trigger: ['blur', 'change']
					},
					'userInfo.cType': {
						type: 'string',
						required: true,
						message: '请填写次类型',
						trigger: ['blur', 'change']
					},
					'userInfo.nickName': {
						type: 'string',
						required: true,
						message: '请填写用户名',
						trigger: ['blur', 'change']
					},
					'userInfo.online': {
						type: 'string',
						max: 1,
						required: true,
						message: '请选择在或否',
						trigger: ['blur', 'change']
					},
					'userInfo.sex': {
						type: 'string',
						max: 2,
						required: true,
						message: '请选择性别',
						trigger: ['blur', 'change']
					},
					'userInfo.voice': {
						type: 'string',
						max: 1,
						required: true,
						message: '请选择是否可语音',
						trigger: ['blur', 'change']
					},
					'userInfo.email': {
						type: 'string',
						required: true,
						message: '请填写邮箱',
						trigger: ['blur', 'change']
					},
					'userInfo.perDepict': {
						type: 'string',
						required: true,
						message: '请填写个人签名',
						trigger: ['blur', 'change']
					},
					'userInfo.skill': {
						type: 'string',
						required: true,
						message: '请填写技能',
						trigger: ['blur', 'change']
					},
					'userInfo.weChat': {
						type: 'string',
						required: true,
						message: '请填写微信号',
						trigger: ['blur', 'change']
					},
					'userInfo.occupation': {
						type: 'string',
						required: true,
						message: '请填写职业',
						trigger: ['blur', 'change']
					},
					'userInfo.address': {
						type: 'string',
						required: true,
						message: '请填写地址',
						trigger: ['blur', 'change']
					},
					'userInfo.onlineDuration': {
						type: 'string',
						required: true,
						message: '请填写在线时长',
						trigger: ['blur', 'change']
					},
					'userInfo.onJob': {
						type: 'string',
						required: true,
						message: '请填写是否在职',
						trigger: ['blur', 'change']
					},
					'userInfo.experience': {
						type: 'string',
						required: true,
						message: '请填写有无经验',
						trigger: ['blur', 'change']
					},
					'userInfo.storeLevel': {
						type: 'string',
						required: true,
						message: '请填写店铺等级',
						trigger: ['blur', 'change']
					},
					'userInfo.renewalRate': {
						type: 'string',
						required: true,
						message: '请填写续单率',
						trigger: ['blur', 'change']
					},
				},
			}
		},
		async onLoad() {
			await getClerkType().then(res=>{
				if (res.code=='0'){
					this.mainTypes = res.data[0].id
					this.selectList = res.data
					let list = []
					res.data.forEach((elem, index) => {
						list.push({
							name: elem.typeName,
							id: elem.id,
							index: index
						})
					});
					this.actionsZ = list
				}
				
			})
		},
		methods: {
			showZtypeSB(){
				this.showZtype = true
			},
			showSexSB(){
				if(this.model1.userInfo.zType=='') {
					uni.$u.toast('请选择服务类型后再选性别')
					return
				}
				this.showSex = true
			},
			showCtype1(){
				if(this.model1.userInfo.zType=='') {
					uni.$u.toast('请选择主类型后再选次类型')
					return
				}
				this.showCtype = true
			},
			zTypeSelect(e){
				this.actionsSb = this.actionsSb1
				if (this.mainTypes == e.id) {
					this.actionsSb = this.actionsSb2
				}
				if(this.model1.userInfo.sex!='男神'&&this.model1.userInfo.sex!='女神'){
					this.model1.userInfo.sex = ''
				}
				this.cTypeName = e.name
				this.select1.id1 = e.id
				this.select1.index1 = e.index
				this.model1.userInfo.zType = e.name
				this.model1.userInfo.cType = ''
				this.select1.id2 = 0
				this.select1.index2 = 0
				let list = []
				this.selectList[e.index].dataList.forEach((elem, index) => {
					list.push({
						name: elem.typeName,
						id: elem.id,
						index: index
					})
				});
				this.actionsC = list
			},
			cTypeSelect(e){
				this.select1.id2 = e.id
				this.select1.index2 = e.index
				this.model1.userInfo.cType = e.name
			},
			deletePic(event) {
				this[`fileList${event.name}`].splice(event.index, 1)
				this.imgsList.splice(event.index, 1)
			},
			async afterRead(event) {
				let lists = [].concat(event.file)
				let fileListLen = this[`fileList${event.name}`].length
				lists.map((item) => {
					this[`fileList${event.name}`].push({
						...item,
						status: 'uploading',
						message: '上传中'
					})
				})
				for (let i = 0; i < lists.length; i++) {
					const result = await this.uploadFilePromise(lists[i].url)
					let item = this[`fileList${event.name}`][fileListLen]
					this[`fileList${event.name}`].splice(fileListLen, 1, Object.assign(item, {
						status: 'success',
						message: '',
						url: result
					}))
					fileListLen++
					this.imgsList.push(result)
				}
			},
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
			onlineSelect(e) {
				this.model1.userInfo.online = e.name
			},
			sexSelect(e) {
				this.model1.userInfo.sex = e.name
			},
			voiceSelect(e) {
				this.model1.userInfo.voice = e.name
			},
			onJobSelect(e) {
				this.model1.userInfo.onJob = e.name
			},
			experienceSelect(e) {
				this.model1.userInfo.experience = e.name
			},
			birthdaySelect(e) {
				const date = new Date(e.value)
				const year = date.getFullYear()
				const month = (date.getMonth() + 1).toString().padStart(2,'0')
				const day = (date.getDate()).toString().padStart(2,'0')
				this.model1.userInfo.birthday = `${year}-${month}-${day}`
				this.showBirthday = false
			},
			submit() {
				this.$refs.form1.validate().then(res => {
					this.applyClerks()
				}).catch(errors => {
				})
			},
			async applyClerks() {
				const { id1, id2} = this.select1
				const {
					phone,
					imgs,
					online,
					nickName,
					sex,
					voice,
					email,
					perDepict,
					skill,
					weChat,
					birthday,
					occupation,
					address,
					onlineDuration,
					onJob,
					experience,
					storeLevel,
					renewalRate,
				} = this.model1.userInfo
				await applyClerk({
					phone,
					zType: id1,
					online: online == '否' ? 1 : 0,
					sex: sex == '男神' ? 1 : sex == '女神' ? 0 : sex == '帅T' ? 3 : 2,
					voice: voice == '否' ? 1 : 0,
					onJob: onJob == '否' ? 0 : 1,
					experience: experience == '无' ? 0 : 1,
					nickName,
					email,
					perDepict,
					skill,
					weChat,
					birthday,
					occupation,
					address,
					onlineDuration,
					storeLevel,
					renewalRate,
					imgs: this.imgsList.toString(),
					cTypeName: this.cTypeName
				}).then(res => {
					if (res.code == '0') {
						uni.$u.toast('申请成功')
							uni.$u.route({
								url: '/pages/index/my'
							})
						return
					}
					uni.$u.toast(res.msg || '申请失败')
				})
			}
		},
	}
</script>

<style lang="scss" scoped>
</style>
