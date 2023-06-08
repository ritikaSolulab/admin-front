
// provder chart end

// AmCharts.makeChart("rec-chart",
// 				{
// 					"type": "serial",
// 					"categoryField": "category",
// 					"startDuration": 0,
// 					"hideCredits":true,
// 					"categoryAxis": {
// 						// "autoRotateAngle": 20,
// 						"widthField": "",
//                         "gridAlpha": 0,
//                         "axisColor": "#707070",
// 						"color": "#000",
// 						"minHorizontalGap": 3,

//                     },
//                     "colors": [
// 						"#ff4242",
// 						"#333333",                                                                      
//                     ],
// 					"trendLines": [],
// 					"graphs": [
// 						{
// 							"balloonText": "[[title]] of [[category]]:[[value]]",
// 							"bullet": "round",
// 							"id": "AmGraph-1",
// 							"title": "Receiver",
//                             "valueField": "column-1",
//                             "lineThickness": 2,
//                             "bullet": "round",
//                             "bulletBorderAlpha": 1,
//                             "bulletBorderColor": "#333333",
//                             "bulletColor": "#333333",

// 						},
// 						// {
// 						// 	"balloonText": "[[title]] of [[category]]:[[value]]",
//                         //     "bullet": "square",                            
// 						// 	"id": "AmGraph-2",
// 						// 	"title": "Sales data",
//                         //     "valueField": "column-2"
// 						// }
// 					],
// 					"guides": [],
// 					"valueAxes": [
// 						{
// 							"id": "ValueAxis-1",
// 							"color": "#000",
// 							"title": "Number of receiver"
// 						}
// 					],
// 					"allLabels": [],
// 					"balloon": {},
// 					"legend": {
// 						"enabled": false,
// 						"color": "#000",
//                         "useGraphSettings": false,
//                         // "color": "#63cfe3",
// 					},
// 					// "titles": [
// 					// 	{
// 					// 		"id": "Title-1",
// 					// 		"size": 15,
// 					// 		"text": "Chart Title"
// 					// 	}
// 					// ],
// 					"dataProvider": [
// 						{
// 							"category": "Jan",
// 							"column-1": "22"
// 						},
// 						{
// 							"category": "Feb",
// 							"column-1": "45"
// 						},
// 						{
// 							"category": "Mar",
// 							"column-1": "12"
// 						},
// 						{
// 							"category": "Apr",
// 							"column-1": "88"
// 						},
// 						{
// 							"category": "May",
// 							"column-1": "25"
// 						},
// 						{
// 							"category": "Jun",
// 							"column-1": "100"
// 						},
// 						{
// 							"category": "Jul",
// 							"column-1": "44"
// 						},
// 						{
// 							"category": "Aug",
// 							"column-1": "66"
// 						}
// 					]
// 				}
// 			);


// sale chart

AmCharts.makeChart("sale-chart",
	{
		"type": "serial",
		"categoryField": "category",
		"startDuration": 0,
		"hideCredits": true,
		"categoryAxis": {
			// "autoRotateAngle": 20,
			"widthField": "",
			"gridAlpha": 0,
			"axisColor": "#707070",
			"color": "#000",
			"minHorizontalGap": 3,

		},
		"colors": [
			"#3dbd02",
			"#333333",
		],
		"trendLines": [],
		"graphs": [
			{
				"balloonText": "[[title]] of [[category]]:[[value]]",
				"bullet": "round",
				"id": "AmGraph-1",
				"title": "Receiver",
				"valueField": "column-1",
				"lineThickness": 2,
				"bullet": "round",
				"bulletBorderAlpha": 1,
				"bulletBorderColor": "#333333",
				"bulletColor": "#333333",

			},
			// {
			// 	"balloonText": "[[title]] of [[category]]:[[value]]",
			//     "bullet": "square",                            
			// 	"id": "AmGraph-2",
			// 	"title": "Sales data",
			// 	"valueField": "column-2",
			// 	"lineThickness": 2,
			//     "bullet": "round",
			//     "bulletBorderAlpha": 1,
			//     "bulletBorderColor": "#02f252",
			//     "bulletColor": "#02f252",
			// }
		],
		"guides": [],
		"valueAxes": [
			{
				"id": "ValueAxis-1",
				"color": "#000",
				"title": "Number of Providers"
			}
		],
		"allLabels": [],
		"balloon": {},
		"legend": {
			"enabled": false,
			"color": "#000",
			"useGraphSettings": false,
			"color": "#63cfe3",
		},
		// "titles": [
		// 	{
		// 		"id": "Title-1",
		// 		"size": 15,
		// 		"text": "Chart Title"
		// 	}
		// ],
		"dataProvider": [
			{
				"category": "Jan",
				"column-1": "22",
			},
			{
				"category": "Feb",
				"column-1": "45",
			},
			{
				"category": "Mar",
				"column-1": "12",
			},
			{
				"category": "Apr",
				"column-1": "88",
			},
			{
				"category": "May",
				"column-1": "25",
			},
			{
				"category": "Jun",
				"column-1": "100",
			},
			{
				"category": "Jul",
				"column-1": "44",
			},
			{
				"category": "Aug",
				"column-1": "66",
			}
		]
	}
);

// issue reports

AmCharts.makeChart("issue-chart",
	{
		"type": "serial",
		"categoryField": "category",
		"startDuration": 0,
		"hideCredits": true,
		"categoryAxis": {
			// "autoRotateAngle": 20,
			"widthField": "",
			"gridAlpha": 0,
			"axisColor": "#707070",
			"color": "#000",
			"minHorizontalGap": 3,

		},
		"colors": [
			"#ff4242",
			"#333333",
		],
		"trendLines": [],
		"graphs": [
			{
				"balloonText": "[[title]] of [[category]]:[[value]]",
				"bullet": "round",
				"id": "AmGraph-1",
				"title": "Receiver",
				"valueField": "column-1",
				"lineThickness": 2,
				"bullet": "round",
				"bulletBorderAlpha": 1,
				"bulletBorderColor": "#333333",
				"bulletColor": "#333333",

			},
			// {
			// 	"balloonText": "[[title]] of [[category]]:[[value]]",
			//     "bullet": "square",                            
			// 	"id": "AmGraph-2",
			// 	"title": "Sales data",
			//     "valueField": "column-2"
			// }
		],
		"guides": [],
		"valueAxes": [
			{
				"id": "ValueAxis-1",
				"color": "#000",
				"title": "Number of Ticket"
			}
		],
		"allLabels": [],
		"balloon": {},
		"legend": {
			"enabled": false,
			"color": "#000",
			"useGraphSettings": false,
			// "color": "#63cfe3",
		},
		// "titles": [
		// 	{
		// 		"id": "Title-1",
		// 		"size": 15,
		// 		"text": "Chart Title"
		// 	}
		// ],
		"dataProvider": []
	}
);


// cost chart start

// AmCharts.makeChart("cost-chart",
// 	{
// 		"type": "serial",
// 		"categoryField": "costTocompany",
// 		"startDuration": 0,
// 		"hideCredits": true,
// 		"categoryAxis": {
// 			// "autoRotateAngle": 20,
// 			"widthField": "",
// 			"gridAlpha": 0,
// 			"axisColor": "#707070",
// 			"color": "#000",
// 			"minHorizontalGap": 3,
// 		},
// 		"trendLines": [],
// 		"graphs": [
// 			{
// 				"balloonText": "[[title]] of [[costTocompany]]:[[value]]",
// 				"columnWidth": 0.27,
// 				"fillAlphas": 1,
// 				"gapPeriod": 0,
// 				"id": "AmGraph-1",
// 				"lineThickness": 0,
// 				"title": "Cost provider",
// 				"type": "column",
// 				"valueField": "column-1"
// 			},
// 			{
// 				"balloonText": "[[title]] of [[costTocompany]]:[[value]]",
// 				"columnWidth": 0.3,
// 				"fillAlphas": 1,
// 				"fontSize": -5,
// 				"gapPeriod": 0,
// 				"id": "AmGraph-2",
// 				"title": "abc",
// 				"type": "column",
// 				"valueAxis": "ValueAxis-2",
// 				"valueField": "column-2"
// 			}
// 		],
// 		"guides": [],
// 		"valueAxes": [
// 			{
// 				"id": "ValueAxis-1",
// 				"title": "Money"
// 			}
// 		],
// 		"allLabels": [],
// 		"balloon": {},
// 		"legend": {
// 			"enabled": false,
// 			"useGraphSettings": false
// 		},
// 		"dataProvider": [
// 			{
// 				"costTocompany": "costTocompany 1",
// 				"column-1": "5",
// 				"column-2": "10"
// 			},
// 			{
// 				"costTocompany": "costTocompany 2",
// 				"column-1": "2",
// 				"column-2": "8"
// 			},
// 			{
// 				"costTocompany": "costTocompany 3",
// 				"column-1": "4",
// 				"column-2": "20"
// 			}
// 		]
// 	}
// );


AmCharts.makeChart("blockhour-chart",
	{
		"type": "serial",
		"categoryField": "category",
		"startDuration": 0,
		"hideCredits": true,
		"categoryAxis": {
			// "autoRotateAngle": 9,
			"widthField": "",
			"gridAlpha": 0,
			"axisColor": "#707070",
			"color": "#000"

		},
		"colors": [
			"#F0732E",
			// "#333333",                                                                      
		],
		"trendLines": [],
		"graphs": [
			{
				"balloonText": "[[title]] of [[category]]:[[value]]",
				"bullet": "round",
				"id": "AmGraph-1",
				"title": "Blocks",
				"valueField": "column-1",
				"lineThickness": 2,
				"bullet": "round",
				"bulletBorderAlpha": 1,
				"bulletBorderColor": "#333333",
				"bulletColor": "#333333",

			},
			// {
			// 	"balloonText": "[[title]] of [[category]]:[[value]]",
			//     "bullet": "square",                            
			// 	"id": "AmGraph-2",
			// 	"title": "Sales data",
			//     "valueField": "column-2"
			// }
		],
		"guides": [],
		"valueAxes": [
			{
				"id": "ValueAxis-1",
				"color": "#000",
				"title": "Number of Blocks"
			}
		],
		"allLabels": [],
		"balloon": {},
		"legend": {
			"enabled": false,
			"color": "#000",
			"useGraphSettings": false,
			// "color": "#63cfe3",
		},
		// "titles": [
		// 	{
		// 		"id": "Title-1",
		// 		"size": 15,
		// 		"text": "Chart Title"
		// 	}
		// ],
		"dataProvider": [
			{
				"category": "1hr",
				"column-1": "30"
			},
			{
				"category": "2hr",
				"column-1": "10"
			},
			{
				"category": "6hr",
				"column-1": "55"
			},
			{
				"category": "6hr",
				"column-1": "77"
			},
			{
				"category": "3hr",
				"column-1": "25"
			},
			{
				"category": "4hr",
				"column-1": "60"
			},
			{
				"category": "7hr",
				"column-1": "20"
			}
		]
	}
);

// block hour chart end

AmCharts.makeChart("refer-chart",
	{
		"type": "serial",
		"categoryField": "category",
		"startDuration": 0,
		"hideCredits": true,
		"categoryAxis": {
			// "autoRotateAngle": 9,
			"widthField": "",
			"gridAlpha": 0,
			"axisColor": "#707070",
			"color": "#000"

		},
		"colors": [
			"#F0732E",
			// "#333333",                                                                      
		],
		"trendLines": [],
		"graphs": [
			{
				"balloonText": "[[title]] of [[category]]:[[value]]",
				"bullet": "round",
				"id": "AmGraph-1",
				"title": "Refer",
				"valueField": "column-1",
				"lineThickness": 2,
				"bullet": "round",
				"bulletBorderAlpha": 1,
				"bulletBorderColor": "#333333",
				"bulletColor": "#333333",

			},
			// {
			// 	"balloonText": "[[title]] of [[category]]:[[value]]",
			//     "bullet": "square",                            
			// 	"id": "AmGraph-2",
			// 	"title": "Sales data",
			//     "valueField": "column-2"
			// }
		],
		"guides": [],
		"valueAxes": [
			{
				"id": "ValueAxis-1",
				"color": "#000",
				"title": "Number of Refers"
			}
		],
		"allLabels": [],
		"balloon": {},
		"legend": {
			"enabled": false,
			"color": "#000",
			"useGraphSettings": false,
			// "color": "#63cfe3",
		},
		// "titles": [
		// 	{
		// 		"id": "Title-1",
		// 		"size": 15,
		// 		"text": "Chart Title"
		// 	}
		// ],
		"dataProvider": [
			{
				"category": "Jan",
				"column-1": "50"
			},
			{
				"category": "Feb",
				"column-1": "22"
			},
			{
				"category": "Mar",
				"column-1": "44"
			},
			{
				"category": "Apr",
				"column-1": "11"
			},
			{
				"category": "Jun",
				"column-1": "6"
			},
			{
				"category": "Jul",
				"column-1": "60"
			},
			{
				"category": "Aug",
				"column-1": "20"
			}
		]
	}
)