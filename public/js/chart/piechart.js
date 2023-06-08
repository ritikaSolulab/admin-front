
AmCharts.makeChart("trans-pie",
{
	"type": "pie",
	// "angle": 2,
	"balloonText": "[[title]]<br><span style='font-size:14px'><b>[[value]]</b> </span>",
//   "depth3D": 2,
  "labelRadius": -30,
  "labelTickAlpha": 0,
  "startDuration": 0,
  "gradientRatio": [],
  "hideCredits":true,
  "pullOutDuration": 0,
  "pullOutRadius": 0,
	"labelText": " [[value]]",
	"titleField": "category",
	"valueField": "column-1",
//   "allLabels": [],
  "handDrawn": false,
  "handDrawScatter": 0,
  "handDrawThickness": 0,
  "theme": "chalk",
  
  "balloon": {},
  "colors": [
	  "#1691B3",
    "#F6BE57",
    // "#EB5858",  
    "#F3ACB3",                           
    // "#999c9e",                           
],
	"legend": {
    "enabled": true,
    "color": "#221815",
    "markerType": "square",
    "valueAlign": "left",
	// "fontSize": 12,
	"align": "center",
	"autoMargins": false,
	"valueText": ":[[value]]",
	// "position": "right",
},
	"titles": [],
	"dataProvider": [
		{
			"category": "organization1",
			"column-1": 2
		},
		{
			"category": "organization2",
			"column-1": 8
		},
		{
			"category": "organization3",
			"column-1": 3
		},
    
	]
}
);



