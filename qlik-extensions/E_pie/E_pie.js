//引用echarts-all.js文件
define(["./echarts-all"],
            function() {
            	//创建了三个空数组来存放数据
				var alldata=[];
				var Dimdata = [];
				var meadata = [];
			 	var objsArr = [];
				//echart的基本配置项
                var option = {
                	//标题
                    title : {
						text: '我模仿的饼图插件',
						subtext: ''
					},
					//触发方式
				    tooltip : {
				        trigger: 'item',
				        formatter: "{a} <br/>{b} : {c} ({d}%)"
				    },
					//工具栏
					toolbox: {
						//是否显示工具栏
						show : true,
						//各工具配置项
						feature : {
						}
					},
					series : [
						{	
							//系列名称 也就是鼠标移上去后的会显示的
							name:'成交',
							type:'pie',
							radius:'55%',
							data:objsArr,
							itemStyle:{
								emphasis:{
									shadowBlur:10,
									shadowOffsetX:0,
									shadowColor:'rgba(0,0,0,0.5)'
								}
							}
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
						alldata=[];
						Dimdata = [];
						meadata = [];
						objsArr = [];
						//定义初始lastrow为0，定义this为me
						var lastrow = 0, me = this;
						//移除所有内容，包括所有元素和子节点
						$element.empty();
						//一个判断语句，当视窗的高和宽不等于0时:定义divStr为id为main-pie，样式为$element容器的宽和高的一个div.
						//否则，当$element容器的宽和高有一个为0时：定义divStr为一个高600px,宽800px的div.				
						if($element.height()!=0 && $element.width()!=0){
							var divStr = '<div id="main-pie" style="height:'+$element.height()+'px;'+'width:'+$element.width()+'px;"></div>';
						}else{
							var divStr = '<div id="main-pie" style="height:600px;width:800px;"></div>';
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
							if(alldata.length==0){
							   alldata.push(newRow);
							}else{
								//有数据，定义存在为假，
							   var isExist = false;
							   //若维度文本值等于alldata[j][0],则把alldata[j][1]加上value
							   for(var j=0;j<alldata.length;j++){
								   if(alldata[j][0]==weidu){
								   alldata[j][1] = alldata[j][1] + value;
								   isExist = true;
								   break;
								   }
								}
							}
							if(!isExist){
							  alldata.push(newRow);
							}									
						  }
						  for(var k=0;k<alldata.length;k++){
							  var dataObj = [alldata[k][0]];
							  var dataObj2 = [alldata[k][1]];
							  
							  Dimdata.push(dataObj);
							  meadata.push(dataObj2);
							}
						 	for(var g=0;g<alldata.length;g++){
						 		var obj = {name:"default",value:g};
						 		objsArr.push(obj);
						 	}
						 	for(var m=0;m<alldata.length;m++){
						 		objsArr[m].name=Dimdata[m];
						 		objsArr[m].value=meadata[m];
						 	}
						}
						function myfunction(){
							getData();
							var myChart = echarts.init(document.getElementById('main-pie'));
							option.series[0].data = objsArr;
							myChart.setOption(option,true);
						}
						promise.done(myfunction);
					}
				}
            });