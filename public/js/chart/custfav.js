AmCharts.makeChart("custfav",
				{
					"type": "serial",
					"categoryField": "category",
					"rotate": true,
					"startDuration": 0,
                    "hideCredits":true,
					"labelText": "[[value]]",
					
					"categoryAxis": {
						"gridPosition": "start",
						"axisThickness": 0,
						"minHorizontalGap": 91,
                        "minVerticalGap": 33,
                        // "startOnAxis": true,
                    },
                    "colors": [                      
                        "#EB5858",                            
                        "#000",                            
                    ],
					"trendLines": [],
					"graphs": [
						{
							"balloonText": "[[title]] of [[category]]:[[value]]",
							"columnWidth": 1.5,
							"fillAlphas": 1,
							"id": "AmGraph-1",
							"title": "Sales data",
							"topRadius": 0,
							"type": "column",
							"valueField": "column-1"
						},
						{
							"balloonText": "[[title]] of [[category]]:[[value]]",
							"fillAlphas": 1,
							"id": "AmGraph-2",
							"title": "Months",
							"type": "column",
							"valueField": "column-2"
						}
					],
					"guides": [],
					"valueAxes": [
						{
							"id": "ValueAxis-1",
							"offset": -1,
							"title": ""
						}
					],
					"allLabels": [],
					"balloon": {},
					"legend": {
						"enabled": true,
					},
					"dataProvider": [
						{
							"category": "Jan",
                            "column-1": "0",
                            "color":"#EB5858"
						},
						{
							"category": "Feb",
							"column-1": "10"
						},
						{
							"category": "Mar",
							"column-1": "5"
						},
						{
							"category": "Apr",
							"column-1": "35"
						},
						{
							"category": "May",
							"column-1": "20"
						},
						{
							"category": "Jun",
							"column-1": "10"
						},
						{
							"category": "Jul",
							"column-1": "15"
						},
						{
							"category": "Aug",
							"column-1": "20"
						},
						{
							"category": "Sep",
							"column-1": "15"
						}
					]
				}
			);