// 常量数据
// 洞内外观察 ----------------------------------
// 岩石类型  数据列表
const rockTypeList = [
	{
		value: '凝灰岩',
		label: '凝灰岩',
		children: [
			{
				value: '坚硬岩',
				label: '坚硬岩',
			},{
				value: '较坚硬岩',
				label: '较坚硬岩'
			},{
				value: '较软岩',
				label: '较软岩'
			},{
				value: '软岩',
				label: '软岩'
			},{
				value: '极软岩',
				label: '极软岩'
			}
		]
	},{
		value: '花岗岩',
		label: '花岗岩',
		children: [
			{
				value: '坚硬岩',
				label: '坚硬岩',
			},{
				value: '较坚硬岩',
				label: '较坚硬岩'
			},{
				value: '较软岩',
				label: '较软岩'
			},{
				value: '软岩',
				label: '软岩'
			},{
				value: '极软岩',
				label: '极软岩'
			}
		]
	},{
		value: '黏质土',
		label: '黏质土',
		children: [
			{
				value: '坚硬',
				label: '坚硬',
			},{
				value: '坚硬~硬塑',
				label: '坚硬~硬塑'
			},{
				value: '硬塑~可塑',
				label: '硬塑~可塑'
			},{
				value: '软塑~流塑',
				label: '软塑~流塑'
			}
		]
	},{
		value: '沙质土',
		label: '沙质土',
		children: [
			{
				value: '密实',
				label: '密实',
			},{
				value: '密实~中密',
				label: '密实~中密'
			},{
				value: '松散',
				label: '松散'
			}
		]
	},{
		value: '碎石土',
		label: '碎石土',
		children: [
			{
				value: '密实',
				label: '密实',
			},{
				value: '密实~中密',
				label: '密实~中密'
			},{
				value: '中密~稍密',
				label: '中密~稍密'
			}
		]
	}
]
// 风化程度及走向  数据列表
const rockLithologyOccurrenceList = [
	{
		value: '未风化',
		label: '未风化'
	},{
		value: '微风化',
		label: '微风化'
	},{
		value: '弱风化',
		label: '弱风化'
	},{
		value: '强风化',
		label: '强风化'
	},{
		value: '全风化',
		label: '全风化'
	}
]
// 节理裂隙发育程度及走向  数据列表
const jfissureDevTrendList = [
	{
		value: '节理裂隙较发育',
		label: '节理裂隙较发育'
	},{
		value: '节理裂隙稍发育',
		label: '节理裂隙稍发育'
	}
]
// 断层破碎带宽度及特征  数据列表
const ffractWidthFeaturesList = [
	{
		value: '',
		label: '无'
	}
]
// 地下水状况  数据列表
const groundwaterStatusList = [
	{
		value: '基岩裂缝水较发育',
		label: '基岩裂缝水较发育'
	},{
		value: '基岩裂缝水稍发育',
		label: '基岩裂缝水稍发育'
	}
]
// 掌子面稳定状态  数据列表
const faceSteadyStateList = [
	{
		value: '稳定',
		label: '稳定'
	},{
		value: '较稳定',
		label: '较稳定'
	},{
		value: '不稳定',
		label: '不稳定'
	}
]
// 渗漏水状况  数据列表
const leakageConditionList = [
	{
		value: '支护表面有潮斑',
		label: '支护表面有潮斑',
		checked: false
	},{
		value: '支护表面有点状出水',
		label: '支护表面有点状出水',
		checked: false
	},{
		value: '支护表面有淋雨状出水',
		label: '支护表面有淋雨状出水',
		checked: false
	},{
		value: '支护表面有涌流状出水',
		label: '支护表面有涌流状出水',
		checked: false
	}
]
// 喷层裂缝状况  数据列表
const crackConditionList = [
	{
		value: '未见明显裂缝',
		label: '未见明显裂缝'
	},{
		value: '有明显裂缝',
		label: '有明显裂缝'
	}
]
// 喷层与围岩接触状况  数据列表
const sprcontactConditionList = [
	{
		value: '喷层剥落',
		label: '喷层剥落'
	},{
		value: '未见喷层剥落',
		label: '未见喷层剥落'
	},{
		value: '掉块',
		label: '掉块'
	}
]
// 钢拱架挤压状况  数据列表
const steelarchExtrusionConditionList = [
	{
		value: '未见挤压变形',
		label: '未见挤压变形'
	},{
		value: '存在挤压变形',
		label: '存在挤压变形'
	}
]
// 锚杆破坏状况  数据列表
const boltFailureConditionList = [
	{
		value: '未见锚杆破坏',
		label: '未见锚杆破坏'
	},{
		value: '存在锚杆破坏',
		label: '存在锚杆破坏'
	}
]
// 二衬表面裂缝状况  数据列表
const secondCrackConditionList = [
	{
		value: '未施工',
		label: '未施工'
	},{
		value: '未见明显裂缝',
		label: '未见明显裂缝'
	}
]
// 是否有底鼓现象  数据列表
const floorDrumPhenomenonList = [
	{
		value: '存在底鼓',
		label: '存在底鼓'
	},{
		value: '未见明显底鼓',
		label: '未见明显底鼓'
	},{
		value: '未施工',
		label: '未施工'
	},{
		value: '否',
		label: '否'
	}
]
// 地表开裂沉陷、状况  数据列表
const surfacsubConditionList = [
	{
		value: '未见明显开裂',
		label: '未见明显开裂'
	},{
		value: '明显开裂',
		label: '明显开裂'
	}
]
// 边坡、仰坡稳定状态  数据列表
const swaterLeakageConditionList = [
	{
		value: '稳定',
		label: '稳定'
	},{
		value: '较稳定',
		label: '较稳定'
	},{
		value: '坍塌',
		label: '坍塌'
	},{
		value: '滑塌',
		label: '滑塌'
	},{
		value: '滑坡',
		label: '滑坡'
	}
]
// 地表水渗漏状况  数据列表
const surfaceWaterConditionList = [
	{
		value: '有',
		label: '有'
	},{
		value: '无',
		label: '无'
	},{
		value: '未见地表积水现象',
		label: '未见地表积水现象'
	}
]
// 地表植被变化状况  数据列表
const surfaceVegetationChangesList = [
	{
		value: '无变化',
		label: '无变化'
	},{
		value: '未见植被破坏滑移',
		label: '未见植被破坏滑移'
	}
]
// 原设计围岩级别  数据列表
const originalRockGradeList = [
	{
		value: 'Ⅰ',
		label: 'Ⅰ'
	},{
		value: 'Ⅱ',
		label: 'Ⅱ'
	},{
		value: 'Ⅲ',
		label: 'Ⅲ'
	},{
		value: 'Ⅳ',
		label: 'Ⅳ'
	},{
		value: 'Ⅴ',
		label: 'Ⅴ'
	},{
		value: 'Ⅵ',
		label: 'Ⅵ'
	}
]
// 现判断围岩级别  数据列表
const nowRockGradeList = [
	{
		value: 'Ⅰ',
		label: 'Ⅰ'
	},{
		value: 'Ⅱ',
		label: 'Ⅱ'
	},{
		value: 'Ⅲ',
		label: 'Ⅲ'
	},{
		value: 'Ⅳ',
		label: 'Ⅳ'
	},{
		value: 'Ⅴ',
		label: 'Ⅴ'
	},{
		value: 'Ⅵ',
		label: 'Ⅵ'
	}
]
// 洞内外观察 ------------------------------------
// 关键必测项目---------------------------------------
const parameterNameKeyList = [
	{
		value:"拱顶下沉",
		label:'拱顶下沉'
	},{
		value:"拱脚下沉",
		label:'拱脚下沉'
	},{
		value:"地表下沉",
		label:'地表下沉'
	},{
		value:"周边位移",
		label:'周边位移'
	}
]
// 拱顶下沉
const testName0List = [
	{value:'A',label:'A'},
	{value:'A1',label:'A1'},
	{value:'A2',label:'A2'}
]
// 拱脚下沉
const testName1List = [
	{value:'B',label:'B'},
	{value:'E',label:'E'}
]
// 地表下沉
const testName2List = [
	{value:'1#',label:'1#'},
	{value:'2#',label:'2#'},
	{value:'3#',label:'3#'},
	{value:'4#',label:'4#'},
	{value:'5#',label:'5#'},
	{value:'6#',label:'6#'},
	{value:'7#',label:'7#'},
	{value:'8#',label:'8#'}
]
// 周边位移
const testName3List = [
	{value:'B-C',label:'B-C'},
	{value:'B-D',label:'B-D'},
	{value:'B-E',label:'B-E'},
	{value:'C-D',label:'C-D'},
	{value:'D-E',label:'D-E'},
	{value:'E-F',label:'E-F'},
	{value:'F-G',label:'F-G'}
]

// 关键必测项目---------------------------------------
// 一般监测参数 ------------------------------------
// 钢架内力及外力/围岩压力/支护、衬砌内应力/锚杆轴力 监测参数  数据列表
const parameterNameList = [
	{
		value: '钢支撑内力',
		label: '钢支撑内力'
	},{
		value: '围岩压力',
		label: '围岩压力'
	},{
		value: '两侧支护间压力',
		label: '两侧支护间压力'
	},{
		value: '支护内应力',
		label: '支护内应力'
	},{
		value: '衬砌内应力',
		label: '衬砌内应力'
	},{
		value: '锚杆轴力',
		label: '锚杆轴力'
	},{
		value: '围岩内部位移',
		label: '围岩内部位移'
	}
]
// 安装位置(钢架内力及外力) 数据列表
const installationPositionList = [
	{
		value: '拱顶内侧',
		label: '拱顶内侧'
	},{
		value: '拱顶外侧',
		label: '拱顶外侧'
	},{
		value: '左拱腰内侧',
		label: '左拱腰内侧'
	},{
		value: '左拱腰外侧',
		label: '左拱腰外侧'
	},{
		value: '右拱腰内侧',
		label: '右拱腰内侧'
	},{
		value: '右拱腰外侧',
		label: '右拱腰外侧'
	},{
		value: '左边墙内侧',
		label: '左边墙内侧'
	},{
		value: '左边墙外侧',
		label: '左边墙外侧'
	},{
		value: '右边墙内侧',
		label: '右边墙内侧'
	},{
		value: '右边墙外侧',
		label: '右边墙外侧'
	},{
		value: '左拱肩内侧',
		label: '左拱肩内侧'
	},{
		value: '左拱肩外侧',
		label: '左拱肩外侧'
	},{
		value: '右拱肩内侧',
		label: '右拱肩内侧'
	},{
		value: '右拱肩外侧',
		label: '右拱肩外侧'
	}
]
// 安装位置 数据列表2
const installationPosition2List = [
	{
		value: '拱顶',
		label: '拱顶'
	},{
		value: '左拱腰',
		label: '左拱腰'
	},{
		value: '右拱腰',
		label: '右拱腰'
	},{
		value: '左边墙',
		label: '左边墙'
	},{
		value: '右边墙',
		label: '右边墙'
	},{
		value: '左拱肩',
		label: '左拱肩'
	},{
		value: '右拱肩',
		label: '右拱肩'
	}
]
// 一般监测参数 ------------------------------------
// 监测计划参数 ------------------------------------
// 开挖方法
const excavationMethodList = [
	{value: '台阶法', label: '台阶法'},
	{value: '全断面法', label: '全断面法'},
	{value: '单侧壁开挖法', label: '单侧壁开挖法'},
	{value: '双侧壁导洞法', label: '双侧壁导洞法'},
	{value: '拱脚下沉', label: '拱脚下沉'},
	{value: '地表下沉', label: '地表下沉'}
]
// 监测计划参数 ------------------------------------
export default {
	rockTypeList,
	rockLithologyOccurrenceList,
	jfissureDevTrendList,
	ffractWidthFeaturesList,
	groundwaterStatusList,
	faceSteadyStateList,
	leakageConditionList,
	crackConditionList,
	sprcontactConditionList,
	steelarchExtrusionConditionList,
	boltFailureConditionList,
	secondCrackConditionList,
	floorDrumPhenomenonList,
	surfacsubConditionList,
	swaterLeakageConditionList,
	surfaceWaterConditionList,
	surfaceVegetationChangesList,
	originalRockGradeList,
	nowRockGradeList,
	
	parameterNameKeyList,
	testName0List,
	testName1List,
	testName2List,
	testName3List,
	
	parameterNameList,
	installationPositionList,
	installationPosition2List,
	
	excavationMethodList
}