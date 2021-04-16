<template>
	<view class="userInfo">
		<view class="userInfo-img" @click="navtophoto">
			<text class="title">个人头像</text>
			<view class="content">
				<img src="https://ossweb-img.qq.com/images/lol/img/champion/Morgana.png">
				<text class="iconfont icon-113fangxiang_xiangyou"></text>
			</view>
			
		</view>
		<view class="userInfo-item">
			<text class="title">账号</text>
			<view class="content">
				<text>{{userInfo.account}}</text>
			</view>
		</view>
		<view class="userInfo-item" @click="navToUpdateInfo('sex')">
			<text class="title">性别</text>
			<view class="content">
				<text>{{userInfo.sex=='M'?'男':userInfo.sex=='F'?'女':''}}</text>
				<text class="iconfont icon-113fangxiang_xiangyou"></text>
			</view>
		</view>
		<u-select v-model="show" :list="list" @confirm="confirmSex" :default-value="default_value"></u-select>
		<view class="userInfo-item" @click="navToUpdateInfo('email')">
			<text class="title">邮箱</text>
			<view class="content">
				<text>{{userInfo.email}}</text>
				<text class="iconfont icon-113fangxiang_xiangyou"></text>
			</view>
		</view>
		<view class="userInfo-item" @click="navToUpdateInfo('lastName')">
			<text class="title">姓</text>
			<view class="content">
				<text>{{userInfo.lastName}}</text>
				<text class="iconfont icon-113fangxiang_xiangyou"></text>
			</view>
		</view>
		<view class="userInfo-item" @click="navToUpdateInfo('firstName')">
			<text class="title">名</text>
			<view class="content">
				<text>{{userInfo.firstName}}</text>
				<text class="iconfont icon-113fangxiang_xiangyou"></text>
			</view>
		</view>
		<view class="userInfo-item" @click="navToUpdateInfo('birthday')">
			<text class="title">出生日期</text>
			<view class="content">
				<text>{{userInfo.birthday}}</text>
				<text class="iconfont icon-113fangxiang_xiangyou"></text>
			</view>
		</view>
		<view class="userInfo-item" @click="navToUpdateInfo('phone')">
			<text class="title">联系电话</text>
			<view class="content">
				<text>{{userInfo.phone}}</text>
				<text class="iconfont icon-113fangxiang_xiangyou"></text>
			</view>
		</view>
		<u-button type="primary" class="btn" :disabled="isClick" @click="saveUpdate">保存修改</u-button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				url:'https://ossweb-img.qq.com/images/lol/img/champion/Morgana.png',
				userInfo:{
					avatarUrl:'',//头像
					account:'',//账号
					sex:'',//性别
					email:'',//邮箱
					lastName:'',//姓
					firstName:'',//名
					birthday:'',//出生日期
					phone:'',//联系电话
					userId:'',
				},
				list:[{value:'M',label:'男'},{value:'F',label:'女'}],//性别列表字段
				show:false,//性别下拉列表是否展示
				default_value:[],//性别选项默认的值
				isClick:true,//保存修改i按钮是否可以点击
				clickVal:''//点击的哪一个字段
			}
		},
		onLoad() {
			this.$http.getCurrentUser().then(res=>{
				if(res.code == '200'){
					Object.assign(this.userInfo,res.data)
					// 获取性别列表选中的默认值索引--------
					let that = this
					function objFn(val){
					    return val.value == that.userInfo.sex;
					}
					let defaultIndex = this.list.findIndex(objFn)
					this.default_value = []
					this.default_value.push(defaultIndex)
					// -------------------------------------
				}
			})
		},
		methods: {
			// 跳转到修改头像页面.
			navtophoto() {
				let params = {
					url: this.url,
					code: '1'
				}
				let data = JSON.stringify(params)
				uni.navigateTo({
					url:'/pages/personalCenter/userInfo/updateAvatar?params='+data,
					// url:'/pages/personalCenter/updateAvatar',
					// 定义事件，获取被打开页面传送到当前页面的数据
					events: {
						UpdateAvatarFromUserInfo(data) {
						  console.log(data)
						}
					},
					success: function(res) {
					    // 通过eventChannel向被打开页面传送数据
					    res.eventChannel.emit('imgUrlFromUpdateAvatar', params)
					  }
				})
			},
			// 跳转到修改信息页
			navToUpdateInfo(val){
				let that = this
				this.clickVal = val
				if(val == 'sex'){
					this.show = true
					return
				}
				let params = {}
				switch (val){
					case 'email':
						params.email = this.userInfo.email
						break;
					case 'lastName':
						params.lastName = this.userInfo.lastName
						break;
					case 'firstName':
						params.firstName = this.userInfo.firstName
						break;
					case 'birthday':
						params.birthday = this.userInfo.birthday
						break;
					case 'phone':
						params.phone = this.userInfo.phone
				}
				uni.navigateTo({
					url:'/pages/personalCenter/userInfo/updateUserInfo',
					// 定义事件，获取被打开页面传送到当前页面的数据
					events: {
						UpdateInfoFromUserInfo(data) {
							that.isClick = false
							Object.assign(that.userInfo,data)
						}
					},
					success: function(res) {
					    // 通过eventChannel向被打开页面传送数据
					    res.eventChannel.emit('InfoFromUpdateUserInfo', params)
					},
					fail:function(res){
						console.log(res)
					}
				})
			},
			// 选择性别 确定按钮
			confirmSex(e){
				if(this.userInfo.sex == e[0].value){
					return
				}
				this.isClick = false
				this.userInfo.sex = e[0].value
				// 获取性别列表选中的值索引--------
				let that = this
				function objFn(val){
				    return val.value == that.userInfo.sex;
				}
				let defaultIndex = this.list.findIndex(objFn)
				this.default_value = []
				this.default_value.push(defaultIndex)
				// ------------------------------
			},
			// 点击保存修改
			saveUpdate(){
				let name = this.userInfo.lastName+this.userInfo.firstName
				this.userInfo.name = name
				this.$http.saveCurrentUser(this.userInfo).then(res=>{
					console.log(res)
				})
			}
		}
	}
</script>

<style>
	.userInfo {
		padding: 10px;
	}
	.userInfo .iconfont{
		padding: 5px;
	}
	.userInfo .userInfo-img {
		height: 36px;
		border-bottom: 1px solid #BFBFBF;
		margin-bottom: 10px;
	}
	.userInfo .userInfo-img .title {
		line-height: 32px;
	}
	.userInfo .userInfo-img .content {
		float: right;
	}
	.userInfo .userInfo-img .content img {
		width: 30px;
		height: 30px;
		vertical-align: middle;
		border-radius: 50%;
	}
	.userInfo .userInfo-item {
		height: 36px;
		border-bottom: 1px solid #BFBFBF;
		line-height: 28px;
		margin-bottom: 10px;
	}
	.userInfo .btn {
		margin-top: 20px;
	}
	.userInfo .userInfo-item .content {
		float: right
	}
</style>
