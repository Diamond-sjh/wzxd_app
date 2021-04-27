<script>
	export default {
		data(){
			return {
				curVersion:'1.0.0'
			}
		},
		onLaunch: function() {
			// console.log('App Launch')
			//#ifdef APP-PLUS
			this.checkUpdate();
			this.sendMessage()
			// #endif
		},
		onShow: function() {
			// console.log('App Show')
		},
		onHide: function() {
			// console.log('App Hide')
		},
		methods: {
			// 版本升级
			//# ifdef APP-PLUS
			checkUpdate(){
				var that = this;
				// 获取manifest.json 的信息
				plus.runtime.getProperty( plus.runtime.appid, function ( wgtinfo ) {
					this.curVersion = wgtinfo.version;
					console.log( "this.curVersion:" + this.curVersion );
				} );
				return
				// 更新版本接口  
				var server = "http://t.heijinka.vip/api/version"; 
				var that = this;
				return
				let params = {
					data: that.curVersion,
				}
				this.$http.getVersion().then(res => {
					if (res.statusCode == 200 && that.curVersion < res.data.msg.version) {
						uni.showModal({
							title: '版本更新1.0.1',
							content: '更新测试',
							confirmText: "更新",
							// showCancel: !res.forceUpdate,
							success(e){
								if (e.confirm) {
									console.log(plus.os.name)
									if (plus.os.name.toLowerCase() == 'ios') {
										// 跳转到下载页面
										plus.runtime.openURL(res.data.msg.downloadUrl)
									} else {
										that.createDownload('http://47.114.76.25:9505/wzxdapp.apk');
									}
								} else {
									//取消
								}
							}
						});
					} else {
						uni.showModal({
							title: '提示',
							content: '已是最新版本',
							showCancel: false
						});
					}
				})
			},
			createDownload(url){
				console.log(url)
				var dtask = plus.downloader.createDownload(url, {},
					function(d, status) {
						uni.showToast({
							title: '下载完成',
							mask: false,
							duration: 1000
						});
						//console.log(dtask);
						// 下载完成
						console.log('status: '+status);
						if (status == 200) {
							console.log('下载成功：'+d.filename);
							console.log('plus.io.convertLocalFileSystemURL(d.filename): '+plus.io.convertLocalFileSystemURL(d.filename))
							plus.runtime.install(plus.io.convertLocalFileSystemURL(d.filename), {}, function(success) {
								uni.showToast({
									title: '安装成功',
									mask: false,
									duration: 1500
								});
								// plus.runtime.restart();
							}, function(error) {
								uni.showToast({
									title: '安装失败-01',
									mask: false,
									duration: 1500
								});
							})
						} else {
							uni.showToast({
								title: '更新失败-02',
								mask: false,
								duration: 1500
							});
						}
					}
				);
				try {
					dtask.start(); // 开启下载的任务
					var prg = 0;
					var showLoading = plus.nativeUI.showWaiting("正在下载");  //创建一个showWaiting对象 
					dtask.addEventListener('statechanged', function(task,status) {
						// 给下载任务设置一个监听 并根据状态  做操作
						switch (task.state) {
							case 1:
								showLoading.setTitle("正在下载");
								break;
							case 2:
								showLoading.setTitle("已连接到服务器");
								break;
							case 3:
								prg = parseInt((parseFloat(task.downloadedSize) / parseFloat(task.totalSize)) * 100 );
								showLoading.setTitle("  正在下载" + prg + "%  ");
								break;
							case 4:
								plus.nativeUI.closeWaiting();
								//下载完成
								break;
						}
					});
				} catch (err) {
					plus.nativeUI.closeWaiting();
					uni.showToast({
						title: '更新失败-03',
						mask: false,
						duration: 1500
					});
				}
			},
			// 消息推送
			sendMessage(){
				var info = plus.push.getClientInfo()
				let content = `clientid:${info.clientid},token:${info.token}`
				console.log(content)
				// uni.showModal({
				// 	title: '提示',
				// 	content: content,
				// 	showCancel: false
				// });
				// 使用5+App的方式进行监听消息推送
				plus.push.addEventListener("click", function(msg) {
					console.log("click:" + JSON.stringify(msg));
					console.log(msg.payload);
					console.log(JSON.stringify(msg));
					uni.showModal({
						title: 'click',
						content: 'click',
						showCancel: false
					});
					// onLaunch 生命周期里，页面跳转有问题,跳不过去
					// 应该是页面还没加载，加上定时后，就可以了；
					// setTimeout(() => {
					// 	uni.navigateTo({
					// 		url: `pages/charging/chargeCoupon?data=${JSON.parse(msg.payload)}`
					// 	})
					// }, 1000)
				}, false);
				// 监听在线消息事件    
				plus.push.addEventListener("receive", function(msg) {
					uni.showModal({
						title: 'receive',
						content: 'receive',
						showCancel: false
					});
					//业务代码
					console.log("recevice:" + JSON.stringify(msg))
					//如果是在线收到推送消息，需要创建一条推送  cover: false 是否覆盖上一条推送消息
						console.log(msg)
					// if(msg.type === 'receive'){
						console.log(msg)
						var options = { cover: false, title: msg.title }
						//创建本地消息
						//content: ( String ) 必选
						//消息显示的内容，在系统通知中心中显示的文本内容。
						
						//payload: ( String ) 可选
						//消息承载的数据，可根据业务逻辑自定义数据格式。
						
						//options: ( MessageOptions ) 可选
						//创建消息的额外参数，参考MessageOptions。
						plus.push.createMessage(msg.content, msg.payload, options)
					// }
				}, false);
			}
			// # endif  
		}
	}
</script>

<style lang="scss">
	/* 注意要写在第一行，同时给style标签加入lang="scss"属性 */
	@import "uview-ui/index.scss";
	/*每个页面公共css */
	@import url("./style/iconfont.css");
</style>
