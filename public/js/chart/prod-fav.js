AmCharts.makeChart("prodfav",
    {
        "type": "serial",
        "categoryField": "category",
        "startDuration": 1,
        "startDuration": 0,
        "hideCredits": true,
        "categoryAxis": {
            "gridPosition": "start"
        },
        "trendLines": [],
        "graphs": [
            {
                "colorField": "color",
                "fillAlphas": 1,
                "id": "AmGraph-1",
                "lineColorField": "color",
                "title": "Products",
                "type": "column",
                "valueField": "column-1"
            }
        ],
        "guides": [],
        "valueAxes": [
            {
                "id": "ValueAxis-1",
                // "title": "Axis title"
            }
        ],
        "allLabels": [],
        "legend": {
            "enabled": true,
        },
        "balloon": {},
        "dataProvider": [
            {
                "category": "prod-1",
                "column-1": "100"
            },
            {
                "category": "prod-2",
                "column-1": "50"
            },
            {
                "category": "prod-3",
                "column-1": "70"
            },
            {
                "category": "prod-4",
                "column-1": "80"
            },
            {
                "category": "prod-5",
                "column-1": "50"
            },
            {
                "category": "prod-6",
                "column-1": "250",
                "color": "#d0c398"
            },
            {
                "category": "prod-7",
                "column-1": "20"
            },
            {
                "category": "prod-8",
                "column-1": "60"
            }
        ]
    }
);