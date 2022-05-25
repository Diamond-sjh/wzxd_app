<template>
	<view class="multiple">
		<view class="select-modal" :class="value?'show':''" @tap="hideModal">
			<view class="select-dialog" @tap.stop="" :style="{backgroundColor:bgColor}">
				<view class="select-bar bg-white">
					<view class="action text-blue" @tap="cancelClick">{{cancelText}}</view>
					<view class="action text-green" @tap="confirmClick">{{confirmText}}</view>
				</view>
				<view class="select-content">
					<view class="select-item" v-for="(item,index) in list" :key="index"
					:style="valueIndexOf(item)?'color:'+selectColor+';background-color:'+selectBgColor+';':'color:'+color+';'"
					 @click="select(item)">
						<view class="title">{{getLabelKeyValue(item)}}</view>
						<u-icon class="selectIcon icongou" v-if="valueIndexOf(item)" name="duigou" custom-prefix="custom-icon"></u-icon>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"multiple",
		props: {
			// 通过双向绑定控制组件的弹出与收起
			value: {
				type: Boolean,
				default: true
			},
			placeholder:{ // 占位符
				default: "",
				type: String
			},
			defaultValue:{
				type:Array,
				default: () => []
			},
			list: {
				default: () => [],
				type: Array
			},
			valueKey:{ // 指定list中valueKey的值作为下拉框绑定内容
				default: 'value',
				type: String
			},
			labelKey:{ // 指定list中labelKey的值作为下拉框显示内容
				default: 'label',
				type: String
			},
			cancelText:{
				default: "取消",
				type: String
			},
			confirmText:{
				default: "确定",
				type: String
			},
			color:{
				default: "#000000",
				type: String
			},
			selectColor:{
				default: "#0081ff",
				type: String
			},
			bgColor:{
				default: "#F1F1F1",
				type: String
			},
			selectBgColor:{
				default: "#FFFFFF",
				type: String
			}
		},
		data() {
			return {
				
			};
		},
		computed: {
			_value: {
				get() {
					return this.get_value(this.defaultValue);
				},
				set(val) {
					this.$emit('change', val);
				}
			}
		},
		methods: {
			get_value(val){ // 将数组值转换为以,隔开的字符串
				if(val || val===0){
					if(Array.isArray(val)){
						let chooseAttr = []
						val.forEach(item=>{
							let choose = this.list.find(temp => {
								let val_val = this.getValueKeyValue(temp)
								return item === val_val
							})
							chooseAttr.push(choose)
						})
						let values = chooseAttr.map(temp => this.getLabelKeyValue(temp)).join(',')
						return values
					} else {
						let choose = this.list.find(temp => {
							let val_val = this.getValueKeyValue(temp)
							return val === val_val
						})
						return this.getLabelKeyValue(choose)
					}
				} else {
					return ""
				}
			},
			select(item){ // 点击选项
				let val = this.getValueKeyValue(item);
				let _value = this.defaultValue;
				let index = _value.indexOf(val);
				if(index != -1){
					_value.splice(index,1)
					this.$emit('change', _value)
				} else {
					_value.push(val)
					this.$emit('change', _value)
				}
			},
			valueIndexOf(item){ //判断是否选中
				let val = this.getValueKeyValue(item);
				if(Array.isArray(this.defaultValue)){
					return this.defaultValue.indexOf(val) != -1
				} else {
					return false
				}
			},
			getLabelKeyValue(item){ // 获取label
				return item[this.labelKey]
			},
			getValueKeyValue(item){ // 获取value
				return item[this.valueKey]
			},
			cancelClick(){ // 点击取消
				this.$emit('cancel', this._value)
				this.hideModal()
			},
			confirmClick(){ // 点击确定
				console.log(this._value)
				// return
				this.$emit('confirm', this._value)
				this.hideModal()
			},
			hideModal(){ // 隐藏model
				this.$emit('input',false)
			}
		}
	}
</script>

<style lang="scss" scoped>
.multiple{
	font-size: 28rpx;
}
.bg-white{
	background-color: #FFFFFF;
}
.text-blue{
	color: #0081ff;
}
.text-green{
	color: #39b54a;
}
.select-modal {
	position: fixed;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
	z-index: 9999;
	opacity: 0;
	outline: 0;
	text-align: center;
	-ms-transform: scale(1.185);
	transform: scale(1.185);
	backface-visibility: hidden;
	perspective: 2000rpx;
	background: rgba(0, 0, 0, 0.6);
	transition: all 0.3s ease-in-out 0s;
	pointer-events: none;
	margin-bottom: -1000rpx;
	&::before {
		content: "\200B";
		display: inline-block;
		height: 100%;
		vertical-align: bottom;
	}
	.select-dialog {
		position: relative;
		display: inline-block;
		margin-left: auto;
		margin-right: auto;
		background-color: #f8f8f8;
		overflow: hidden;
		width: 100%;
		border-radius: 0;
		.select-content{
			// background-color: #F1F1F1;
			height: 420rpx;
			overflow:auto;
			.select-item{
				padding: 20rpx;
				display: flex;
				.title{
					flex: 1;
				}
			}
		}
	}
}
.select-modal.show {
	opacity: 1;
	transition-duration: 0.3s;
	-ms-transform: scale(1);
	transform: scale(1);
	overflow-x: hidden;
	overflow-y: auto;
	pointer-events: auto;
	margin-bottom: 0;
}
.select-bar {
	padding: 0 20rpx;
	display: flex;
	position: relative;
	align-items: center;
	min-height: 80rpx;
	justify-content: space-between;
	.action {
		display: flex;
		align-items: center;
		height: 100%;
		justify-content: center;
		max-width: 100%;
	}
}
</style>
