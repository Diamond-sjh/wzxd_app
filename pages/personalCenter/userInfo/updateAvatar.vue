<template>
	<view class="updateAvatar">
		<image class="image" :src="path"></image>
		<view class="btns">
			<button class="btn" size="mini" type="default" @click="chooseImage">选择图片</button>
			<button class="btn" size="mini" type="default" @click="sureImage">确认上传</button>
		</view>
		<kps-image-cutter @ok="onok" @cancel="oncancle" :url="url" :fixed="false" :maxWidth="300" :maxHeight="300"></kps-image-cutter>
	</view>
</template>

<script>
	import kpsImageCutter from "@/components/ksp-image-cutter/ksp-image-cutter.vue";
	export default {
		components:{kpsImageCutter},
		data() {
			return {
				path: '',
				url:''
			}
		},
		onLoad(option) {
			let that = this
			// console.log(JSON.parse(option.params))
			// 获取eventChannel事件
			const eventChannel = this.getOpenerEventChannel()
			// 触发父级页面定义的方法
			eventChannel.emit('UpdateAvatarFromUserInfo', {data: 'updateAvatar'});
			// 监听imgUrlFromUpdateAvatar事件，获取上一页面通过eventChannel传送到当前页面的数据
			eventChannel.on('imgUrlFromUpdateAvatar', function(data) {
				that.path = data.url
			})
		},
		methods: {
			// 选择图片
			chooseImage() {
				uni.chooseImage({
					count:1,
					success: (res) => {
						// 设置url的值，显示控件
						this.url = res.tempFilePaths[0]
					}
				});
			},
			// 上传图片
			async sureImage(){
				try{
					// promise方式上传选择图片到云服务
					const result = await uniCloud.uploadFile({
						filePath: this.path,
						cloudPath: 'wzxd-avatar.jpg',
						onUploadProgress: function(progressEvent) {
							console.log(progressEvent);
							var percentCompleted = Math.round(
								(progressEvent.loaded * 100) / progressEvent.total
							);
						}
					});
					// callback方式上传选择图片到服务器
					// uniCloud.uploadFile({
					// 	filePath: res.tempFilePaths[0],
					// 	cloudPath: 'a.jpg',
					// 	onUploadProgress: function(progressEvent) {
					// 		console.log(progressEvent);
					// 		var percentCompleted = Math.round(
					// 			(progressEvent.loaded * 100) / progressEvent.total
					// 		);
					// 	},
					// 	success(res) {
					// 		console.log(res)
					// 	},
					// 	fail() {},
					// 	complete() {}
					// });
				}catch(e){
					uni.showToast({
						title:"上传云服务失败",
						icon:"none"
					})
				}
			},
			// 图片裁剪控件  确定选择
			onok(ev) {
				this.path = ev.path;
				this.url = "";
			},
			// 图片裁剪控件  取消选择
			oncancle() {
				this.url = "";
			}
		}
	}
</script>

<style>
	.updateAvatar {
		padding: 10px;
	}
	.image {
	    width: 200px;
	    height: 200px;
		border-radius: 50%;
		display: block;
		margin: 20px auto;
		
	}
	.btns {
		text-align: center;
	}
	.btns .btn {
		margin: 0 15px;
		background-color: #ffd700;
	}
</style>
