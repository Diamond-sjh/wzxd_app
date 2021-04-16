<template>
	<view class="updateUserInfo">
		<view class="userEmail" v-if="email">
			<u-input v-model="info.email" type="text" :border="true" :focus="true" confirm-type="done" />
		</view>
		<view class="userLastName" v-if="lastName">
			<u-input v-model="info.lastName" type="text" :border="true" :focus="true" confirm-type="done" />
		</view>
		<view class="userFirstName" v-if="firstName">
			<u-input v-model="info.firstName" type="text" :border="true" :focus="true" confirm-type="done" />
		</view>
		<view class="userBirthday" v-if="birthday">
			<u-input v-model="info.birthday" type="text" :border="true" :focus="false" @click="showBirthday = true" :disabled="true"/>
			<u-calendar v-model="showBirthday" :safe-area-inset-bottom="true" @change="birthdayChange"></u-calendar>
		</view>
		<view class="userPhone" v-if="phone">
			<u-input v-model="info.phone" type="text" :border="true" :focus="true" confirm-type="done" />
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				info:{
					email:'',
					lastName:'',
					firstName:'',
					birthday:'',
					phone:''
				},
				email:'',
				lastName:'',
				firstName:'',
				birthday:'',
				phone:'',
				list:[{value:'M',name:'男'},{value:'F',name:'女'}],
				showBirthday:false
			}
		},
		onLoad(option) {
			// 清空对象
			for(let key in this.info){
			    delete this.info[key];
			}
			let that = this
			// 获取eventChannel事件
			const eventChannel = this.getOpenerEventChannel()
			// 触发父级页面定义的方法
			eventChannel.emit('UpdateAvatarFromUserInfo', {data: 'updateAvatar'});
			// 监听imgUrlFromUpdateAvatar事件，获取上一页面通过eventChannel传送到当前页面的数据
			eventChannel.on('InfoFromUpdateUserInfo', (data) => {
				Object.assign(this.info,data)
				this.email = this.info.email,
				this.lastName = this.info.lastName,
				this.firstName = this.info.firstName,
				this.birthday = this.info.birthday,
				this.phone = this.info.phone
			})
		},
		onNavigationBarButtonTap(e) {
			console.log(e)
			// 获取eventChannel事件
			const eventChannel = this.getOpenerEventChannel()
			// 触发父级页面定义的方法
			eventChannel.emit('UpdateInfoFromUserInfo', this.info);
			uni.navigateBack({
			    delta: 1
			})
		},
		methods: {
			birthdayChange(e){
				console.log(e)
				this.info.birthday = e.result
			}
		}
	}
</script>

<style>
</style>
