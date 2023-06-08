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
                "title": "Revenue ",
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
                "category": "12/12/2020",
                "column-1": "100"
            },
            {
                "category": "12/12/2020",
                "column-1": "50"
            },
            {
                "category": "12/12/2020",
                "column-1": "70"
            },
            {
                "category": "12/12/2020",
                "column-1": "80"
            },
            {
                "category": "12/12/2020",
                "column-1": "50"
            },
            {
                "category": "12/12/2020",
                "column-1": "250",
                "color": "#d0c398"
            },
            {
                "category": "12/12/2020",
                "column-1": "20"
            },
            {
                "category": "12/12/2020",
                "column-1": "60"
            },
            {
                "category": "12/12/2020",
                "column-1": "50"
            },
            {
                "category": "12/12/2020",
                "column-1": "250",
            },
            {
                "category": "12/12/2020",
                "column-1": "20"
            },
            {
                "category": "12/12/2020",
                "column-1": "60"
            }
        ]
    }
);