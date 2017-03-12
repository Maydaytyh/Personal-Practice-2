//引用echarts-all.js文件
define(["./echarts-all"],
            function() {
            	//创建了三个空数组来存放数据
				var alldataPie=[];
				var DimdataPie = [];
				var meadataPie = [];
				//echart的基本配置项
                var option = {
                	//标题
                    title : {
						text: '某楼盘销售情况',
						subtext: '纯属虚构'
					},
					//触发方式
					tooltip : {
						//坐标轴触发
						trigger: 'axis'
					},
					//工具栏
					toolbox: {
						//是否显示工具栏
						show : true,
						//各工具配置项
						feature : {
	/* 						mark : {show: true},
							//数据视图工具
							dataView : {show: true, readOnly: false},
							//动态类型切换
							magicType : {show: true, type: ['line', 'bar', 'stack', 'tiled']},
							//配置项还原
							restore : {show: true},
							//保存为图片
							saveAsImage : {show: true} */
						}
					},
					//是否显示拖拽用的手柄
					calculable : true,
					//直角坐标系中的X轴
					xAxis : [
						{	
							//坐标轴类型 类目轴 离散数据
							type : 'category',
							//坐标轴的留白，true时会有留白
							boundaryGap : false,
							//类目数据，在类目轴中有效
							data : DimdataPie
							//data : ['周一','周二','周三','周四','周五','周六','周日']
							
						}
					],
					//直角坐标系中的Y轴
					yAxis : [
						{
							//数值轴 连续数据
							type : 'value'
						}
					],
					//系列列表
					series : [
						{	
							//系列名称 也就是鼠标移上去后的会显示的
							name:'成交',
							//图表类型 折线图
							type:'bar',
							//是否平滑曲线显示
							smooth:true,
							//{折线拐点标志的样式，填充样式}
							itemStyle: {normal: {areaStyle: {type: 'default'}}},
							//填充数据 数据内容数组
							data: meadataPie
							//data:[10, 12, 21, 54, 260, 830, 710]
						},
					]
				};
                return {
                	//这是一个Extension API 初始化属性
                    initialProperties: {
                    	//超立方体，并不懂
                        qHyperCubeDef: {
                        	//维度
                            qDimensions: [],
                            //度量
                            qMeasures: [],
                            //初始化数据获取
                            qInitialDataFetch: [
                                {
                                    qWidth: 10,
                                    qHeight: 1000
                                }
                            ]
                        }
                    },
                    //定义右侧属性栏
                    definition: {
                    	//类型：条目
                        type: "items",
                        //组件 折叠窗
                        component: "accordion",
                        //具体选项设置
                        items: {
                        	//维度
                            dimensions: {
                                uses: "dimensions",
                                min:1,
                                max:1
                            },
                            //度量
                            measures: {
                                uses: "measures",
                                min:1,
                                max:1
                            },
                            //排序
                            sorting: {
                                uses: "sorting"
                            },
                            //外观
                            appearance: {
                                uses: "settings"
                            }
                        }
                    },
                    //拍摄快照按钮
                    snapshot : {
                        canTakeSnapshot : true
                    },
                    //这也是个extensionAPI，先去把paint方法撸一遍
                    paint: function($element,layout) {
                        //add your rendering code here 
						alldataPie=[];
						DimdataPie = [];
						meadataPie = [];
						//定义初始lastrow为0，定义this为me
						var lastrow = 0, me = this;
						//移除所有内容，包括所有元素和子节点
						$element.empty();
						//一个判断语句，当视窗的高和宽不等于0时:定义divStr为id为main-bar，样式为$element容器的宽和高的一个div.
						//否则，当$element容器的宽和高有一个为0时：定义divStr为一个高600px,宽800px的div.				
						if($element.height()!=0 && $element.width()!=0){
							var divStr = '<div id="main-bar" style="height:'+$element.height()+'px;'+'width:'+$element.width()+'px;"></div>';
						}else{
							var divStr = '<div id="main-bar" style="height:600px;width:800px;"></div>';
						}
						// $element是一个可调整大小的视窗
						var table = $(divStr);
						//被选元素尾部插入内容，然后promise()
						var promise = $element.append( table ).promise();
						//取到layout的多维数据模型
						var hc = layout.qHyperCube;
						//定义一个获取数据的函数
						function getData(){ 
						  for(var r = 0; r < layout.qHyperCube.qDataPages[0].qMatrix.length; r++){
						  	//纬度
							var weidu = layout.qHyperCube.qDataPages[0].qMatrix[r][0].qText;
							//度量
							var value = layout.qHyperCube.qDataPages[0].qMatrix[r][1].qText;
							//新行
							var newRow = [weidu,value];
							//如果没有数据，把newRow的数据送入
							if(alldataPie.length==0){
							   alldataPie.push(newRow);
							}else{
								//有数据，定义存在为假，
							   var isExist = false;
							   //若维度文本值等于alldataPie[j][0],则把alldataPie[j][1]加上value
							   for(var j=0;j<alldataPie.length;j++){
								   if(alldataPie[j][0]==weidu){
								   alldataPie[j][1] = alldataPie[j][1] + value;
								   //存在设置为真
								   isExist = true;
								   break;
								   }
								}
							}
							//当isExist为假的时候，newRow的数据送到alldataPie中
							if(!isExist){
							  alldataPie.push(newRow);
							}									
						  }
						  //？？
						  for(var k=0;k<alldataPie.length;k++){
							  var dataObj = [alldataPie[k][0]];
							  var dataObj2 = [alldataPie[k][1]];
							  
							  DimdataPie.push(dataObj);
							  meadataPie.push(dataObj2);
							}
						}
						//返回100，200，300等
						function hundredint(value){
							var int1=parseInt(value/100);
							return (int1+1)*100;
						}
						//定义了myfunction这个函数
						function myfunction(){
							//获取数据
							getData();
							//初始化echarts的main-bar
							var myChart = echarts.init(document.getElementById('main-bar'));
							//y轴最小值是0，最大值是距离度量的最大值以上最近的整百
							option.yAxis[0].min = 0;;
							option.yAxis[0].max = hundredint(layout.qHyperCube.qMeasureInfo[0].qMax);
							//x轴数据为DimdataPie，series的数据为meadataPie
							option.xAxis[0].data = DimdataPie;
							option.series[0].data = meadataPie;
							myChart.setOption(option,true);
						}
						//promise.done()或者promise.finally()运行myfunction
						promise.done(myfunction);
					}
				}
            });