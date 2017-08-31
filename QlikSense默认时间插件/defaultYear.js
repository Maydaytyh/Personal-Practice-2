var isDefaultSelected = false;

define(["jquery"], function ($, cssContent) {
	'use strict'
	$("<style>").html(cssContent).appendTo("head");
	return {
		initialProperties: {
			version: 1.1,
			qListObjectDef: {
				qShowAlternatives: true,
				qFrequencyMode: "V",
				qInitialDataFetch: [{
					qWidth: 1,
					qHeight: 150
				}]
			}
		},
		definition: {
			type: "items",
			component: "accordion",
			items: {
				dimension: {
					type: "items",
					translation: "维度",
					ref: "qListObjectDef",
					min: 1,
					max: 2,
					items: {
						label: {
							type: "string",
							ref: "qListObjectDef.qDef.qFieldLabels.0",
							translation: "标签",
							show: true
						},
						libraryId: {
							type: "string",
							component: "library-item",
							libraryItemType: "dimension",
							ref: "qListObjectDef.qLibraryId",
							translation: "维度",
							show: function (data) {
								return data.qListObjectDef && data.qListObjectDef.qLibraryId;
							}
						},
						field: {
							type: "string",
							expression: "always",
							expressionType: "dimension",
							ref: "qListObjectDef.qDef.qFieldDefs.0",
							translation: "字段",
							show: function (data) {
								return data.qListObjectDef && !data.qListObjectDef.qLibraryId;
							}
						}
					}
				},
				functions:{
					type: "items",
					label:"功能",
					items: {
						options: {
							type: "items",
							label: "选项",
							items: {
								onjtype: {
									type: "string",
									component: "radiobuttons",
									label: "按钮样式",
									ref: "objtype",
									options: [{
										value: "C",
										label: "对勾"
									}, {
										value: "R",
										label: "圆点"
									}, {
										value: "B",
										label: "按钮"
									}],
									defaultValue: "R"
								},
								multiple: {
									type: "boolean",
									label: "多选开关",
									ref: "multiple",
									defaultValue: false
								},
								defaultvalue: {
									type: "string",
									expression: "optional",
									label: "默认值选择",
									ref: "defaultselection"
								}
							}
						}
					}
				},
				settings: {
					uses: "settings"
				}
			}
		},
		snapshot: {
			canTakeSnapshot: true
		},
		paint: function ($element, layout) {
			var self = this, html = "";
			var data = [];
			var selected = 0;
			var defaultvalue = null;
			var defaultselectionList = layout.defaultselection.split(',');
			var selectValues = [];
			var allPossible = true;

			this.backendApi.eachDataRow(function (rownum, row) {				
				if (row[0].qState === 'S') {
					selected = 1;
				}
				data.push(row[0]);
				
				if( row[0].qState != 'O' ) {
					allPossible = false;
				}
			});

			data.sort(function (a, b) { return parseInt(a.qNum) - parseInt(b.qNum) });

			for (var i = 0; i < data.length; i++) {
				var checked = '';
				var text = data[i].qText;

				if (isDefaultSelected == false) {
					if (defaultselectionList.length > 0) {
						for (var v = 0; v < defaultselectionList.length; v++) {
							if (data[i].qText == defaultselectionList[v]) {
								selectValues.push(data[i].qElemNumber);
							}
						}

					}
				} else {
					selectValues.push(data[i].qElemNumber);
				}

				var orientation = '';

				var objtype = 'checkbox';

				//console.log(data[i].qState)
				if (data[i].qState === "S" || data[i].qState === "O") {
					if (objtype != 'button') {
						if(allPossible == false) {
							checked = ' checked ';
							text = '<strong>' + data[i].qText + '</strong>';
						}						
					} else {
						text = data[i].qText;
					}
				}

				var style = '';
				if (layout.btnactive === undefined) {
					style = "font-weight: bold; border: 1;";
				} else {
					style = layout.btnactive;
				}

				if (data[i].qState === "S") {
					style = ' style="' + style + '"';
				} else {
					style = ' style="' + layout.btninactive + '"';
				}
				html += '<input type="' + objtype + '" name="' + layout.qInfo.qId + '" ' + checked + ' class="data state' + data[i].qState + '" data-value="'
						+ data[i].qElemNumber + '"><label ' + style + '>' + text + '</label>' + orientation;
			}

			var dim = 0;

			if (isDefaultSelected == false) {
				self.backendApi.selectValues(dim, selectValues, layout.multiple);
			}

			$element.html(html);

			var value = [];

			if (isDefaultSelected == true) {
				$element.find('input').each(function (i, input) {
					selectValues.push(parseInt(input.getAttribute("data-value"), 10));
				});
			}

			$element.find('input').on('qv-activate', function () {
				var valueS = parseInt(this.getAttribute("data-value"), 10);
				self.backendApi.selectValues(dim, [valueS], layout.multiple);
				self.backendApi.selectValues(1, [1,2,3,4,5], layout.multiple);
			});
			isDefaultSelected = true;
		}
	};
});
