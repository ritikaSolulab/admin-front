// const costReports = AmCharts.makeChart("cost-chart",
//     {
//         "type": "serial",
//         "categoryField": "costTocompany",
//         "startDuration": 0,
//         "hideCredits": true,
//         "categoryAxis": {
//             // "autoRotateAngle": 20,
//             "widthField": "",
//             "gridAlpha": 0,
//             "axisColor": "#707070",
//             "color": "#000",
//             "minHorizontalGap": 3,
//         },
//         "trendLines": [],
//         "graphs": [
//             {
//                 "balloonText": "[[title]] of [[costTocompany]]:[[value]]",
//                 "columnWidth": 0.27,
//                 "fillAlphas": 1,
//                 "gapPeriod": 0,
//                 "id": "AmGraph-1",
//                 "lineThickness": 0,
//                 "title": "Cost provider",
//                 "type": "column",
//                 "valueField": "column-1"
//             },
//             // {
//             //     "balloonText": "[[title]] of [[costTocompany]]:[[value]]",
//             //     "columnWidth": 0.3,
//             //     "fillAlphas": 1,
//             //     "fontSize": -5,
//             //     "gapPeriod": 0,
//             //     "id": "AmGraph-2",
//             //     "title": "abc",
//             //     "type": "column",
//             //     "valueAxis": "ValueAxis-2",
//             //     "valueField": "column-2"
//             // }
//         ],
//         "guides": [],
//         "valueAxes": [
//             {
//                 "id": "ValueAxis-1",
//                 "title": "Money"
//             }
//         ],
//         "allLabels": [],
//         "balloon": {},
//         "legend": {
//             "enabled": false,
//             "useGraphSettings": false
//         },
//         "dataProvider": [
//             {
//                 "costTocompany": "costTocompany 1",
//                 "column-1": "5",
//             },
//             {
//                 "costTocompany": "costTocompany 2",
//                 "column-1": "2",
//             },
//             {
//                 "costTocompany": "costTocompany 3",
//                 "column-1": "4",
//             }
//         ]
//     }
// );


const getReceiverReport = (startDate, endDate) => {
    let query = '';
    if (startDate && endDate) {
        query = `?startDate=${startDate}&endDate=${endDate}`;
    }
    $.ajax({
        url: `${receiverOnBoardReportApi}${query}`,
        method: 'get',
        success: (result) => {
            const { data: { report, totalReceiver, sequence, change } } = result;
            const finalReportData = [];
            if (report && report.length) {
                report.forEach(reportCount => {
                    finalReportData.push({
                        "date": reportCount._id,
                        "value": reportCount.total
                    })
                });
            }
            $('#totalReceiver').html(totalReceiver);
            if (sequence === '+') {
                $('#receiverChange').attr('class', 'm-xs font-bold text-green');
                $('#receiverChange').html(change.toFixed(2));
            } else {
                $('#receiverChange').attr('class', 'm-xs font-bold text-red');
                $('#receiverChange').html(change.toFixed(2));

            }

            // am4core.useTheme(am4themes_animated);
            var watermark = new am4core.Label();
            watermark.text = "Receiver Report";

            var chart = am4core.create("rec-chart", am4charts.XYChart);
            chart.children.push(watermark);

            chart.data = finalReportData;
            chart.dateFormatter.inputDateFormat = "MM-dd-yyyy";
            var dateAxis = chart.xAxes.push(new am4charts.DateAxis());
            var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());

            // Create series
            var series = chart.series.push(new am4charts.LineSeries());
            series.dataFields.valueY = "value";
            series.dataFields.dateX = "date";
            series.tooltipText = "{value}"
            series.strokeWidth = 2;
            series.minBulletDistance = 15;

            // Drop-shaped tooltips
            series.tooltip.background.cornerRadius = 20;
            series.tooltip.background.strokeOpacity = 0;
            series.tooltip.pointerOrientation = "vertical";
            series.tooltip.label.minWidth = 40;
            series.tooltip.label.minHeight = 40;
            series.tooltip.label.textAlign = "middle";
            series.tooltip.label.textValign = "middle";

            // Make bullets grow on hover
            var bullet = series.bullets.push(new am4charts.CircleBullet());
            bullet.circle.strokeWidth = 2;
            bullet.circle.radius = 4;
            bullet.circle.fill = am4core.color("#fff");

            var bullethover = bullet.states.create("hover");
            bullethover.properties.scale = 1.3;

            // Make a panning cursor
            chart.cursor = new am4charts.XYCursor();
            chart.cursor.behavior = "panXY";
            chart.cursor.xAxis = dateAxis;
            chart.cursor.snapToSeries = series;

            // Create vertical scrollbar and place it before the value axis
            chart.scrollbarY = new am4core.Scrollbar();
            chart.scrollbarY.parent = chart.leftAxesContainer;
            chart.scrollbarY.toBack();

            // Create a horizontal scrollbar with previe and place it underneath the date axis
            chart.scrollbarX = new am4charts.XYChartScrollbar();
            chart.scrollbarX.series.push(series);
            chart.scrollbarX.parent = chart.bottomAxesContainer;

            dateAxis.start = 0.79;
            dateAxis.keepSelection = true;
            // receiverChart.dataProvider = finalReportData;

            // receiverChart.validateData();
        }, error: (result) => {
            toastr.show(result.responseJSON.msg);
        }
    })
}
const getProviderReport = (startDate, endDate) => {
    let query = '';
    if (startDate && endDate) {
        query = `?startDate=${startDate}&endDate=${endDate}`;
    }
    $.ajax({
        url: `${providerOnBoardReportApi}${query}`,
        method: 'get',
        success: (result) => {
            const { data: { report, totalProvider, change, sequence } } = result;
            const finalReportData = [];
            if (report && report.length) {
                report.forEach(reportCount => {
                    finalReportData.push({
                        "date": new Date(reportCount._id),
                        "value": reportCount.total
                    })
                });
            }
            $('#totalProvider').html(totalProvider);
            if (sequence === '+') {
                $('#provideChange').attr('class', 'm-xs font-bold text-green');
                $('#provideChange').html(change.toFixed(2));
            } else {
                $('#provideChange').attr('class', 'm-xs font-bold text-red');
                $('#provideChange').html(change.toFixed(2));

            }
            var watermark = new am4core.Label();
            watermark.text = "Provider Report";

            var chart = am4core.create("pro-chart", am4charts.XYChart);
            chart.children.push(watermark);

            chart.data = finalReportData;
            chart.dateFormatter.inputDateFormat = "MM-dd-yyyy";
            var dateAxis = chart.xAxes.push(new am4charts.DateAxis());
            var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());

            // Create series
            var series = chart.series.push(new am4charts.LineSeries());
            series.dataFields.valueY = "value";
            series.dataFields.dateX = "date";
            series.tooltipText = "{value}"
            series.strokeWidth = 2;
            series.minBulletDistance = 15;

            // Drop-shaped tooltips
            series.tooltip.background.cornerRadius = 20;
            series.tooltip.background.strokeOpacity = 0;
            series.tooltip.pointerOrientation = "vertical";
            series.tooltip.label.minWidth = 40;
            series.tooltip.label.minHeight = 40;
            series.tooltip.label.textAlign = "middle";
            series.tooltip.label.textValign = "middle";

            // Make bullets grow on hover
            var bullet = series.bullets.push(new am4charts.CircleBullet());
            bullet.circle.strokeWidth = 2;
            bullet.circle.radius = 4;
            bullet.circle.fill = am4core.color("#fff");

            var bullethover = bullet.states.create("hover");
            bullethover.properties.scale = 1.3;

            // Make a panning cursor
            chart.cursor = new am4charts.XYCursor();
            chart.cursor.behavior = "panXY";
            chart.cursor.xAxis = dateAxis;
            chart.cursor.snapToSeries = series;

            // Create vertical scrollbar and place it before the value axis
            chart.scrollbarY = new am4core.Scrollbar();
            chart.scrollbarY.parent = chart.leftAxesContainer;
            chart.scrollbarY.toBack();

            // Create a horizontal scrollbar with previe and place it underneath the date axis
            chart.scrollbarX = new am4charts.XYChartScrollbar();
            chart.scrollbarX.series.push(series);
            chart.scrollbarX.parent = chart.bottomAxesContainer;

            dateAxis.start = 0.79;
            dateAxis.keepSelection = true;


            // providerChart.dataProvider = finalReportData;
            // providerChart.validateData();
        }, error: (result) => {
            toastr.show(result.responseJSON.msg);
        }
    })
}
const salesReport = (startDate, endDate, list) => {
    let query = '';
    if (startDate && endDate) {
        query = `?startDate=${startDate}&endDate=${endDate}&subscriptionIdList=${list}`;
    }
    if(list && list != '')
    {
        query = `?startDate=${startDate}&endDate=${endDate}&subscriptionIdList=${list}`;    
    }
    $.ajax({
        url: `${salesReportApi}${query}`,
        method: 'get',
        success: (result) => {
            const { data: { reportData, expiredCount, providerSubscriptionCount } } = result;
            const finalReportData = [];
            if (reportData && reportData.length) {
                reportData.forEach(reportCount => {
                    finalReportData.push({
                        "date": new Date(reportCount._id),
                        "value": reportCount.total
                    })
                });
            }
            $('#subscriptionCount').html(providerSubscriptionCount);
            $('#expiredSubscriptionCount').html(expiredCount);

            var watermark = new am4core.Label();
            watermark.text = "Sales Report";

            var chart = am4core.create("sale-chart", am4charts.XYChart);
            chart.children.push(watermark);

            chart.data = finalReportData;
            chart.dateFormatter.inputDateFormat = "MM-dd-yyyy";
            var dateAxis = chart.xAxes.push(new am4charts.DateAxis());
            var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());

            // Create series
            var series = chart.series.push(new am4charts.LineSeries());
            series.dataFields.valueY = "value";
            series.dataFields.dateX = "date";
            series.tooltipText = "{value}"
            series.strokeWidth = 2;
            series.minBulletDistance = 15;

            // Drop-shaped tooltips
            series.tooltip.background.cornerRadius = 20;
            series.tooltip.background.strokeOpacity = 0;
            series.tooltip.pointerOrientation = "vertical";
            series.tooltip.label.minWidth = 40;
            series.tooltip.label.minHeight = 40;
            series.tooltip.label.textAlign = "middle";
            series.tooltip.label.textValign = "middle";

            // Make bullets grow on hover
            var bullet = series.bullets.push(new am4charts.CircleBullet());
            bullet.circle.strokeWidth = 2;
            bullet.circle.radius = 4;
            bullet.circle.fill = am4core.color("#fff");

            var bullethover = bullet.states.create("hover");
            bullethover.properties.scale = 1.3;

            // Make a panning cursor
            chart.cursor = new am4charts.XYCursor();
            chart.cursor.behavior = "panXY";
            chart.cursor.xAxis = dateAxis;
            chart.cursor.snapToSeries = series;

            // Create vertical scrollbar and place it before the value axis
            chart.scrollbarY = new am4core.Scrollbar();
            chart.scrollbarY.parent = chart.leftAxesContainer;
            chart.scrollbarY.toBack();

            // Create a horizontal scrollbar with previe and place it underneath the date axis
            chart.scrollbarX = new am4charts.XYChartScrollbar();
            chart.scrollbarX.series.push(series);
            chart.scrollbarX.parent = chart.bottomAxesContainer;

            dateAxis.start = 0.79;
            dateAxis.keepSelection = true;

        }, error: (result) => {
            toastr.show(result.responseJSON.msg);
        }
    })
}

const daysFilter = (value) => {
    let startDate = new Date();
    let endDate = new Date();
    if (value === '30d') {
        startDate.setDate(endDate.getDate() - 30);
    } else if (value === '90d') {

        startDate.setDate(endDate.getDate() - 90);
    } else if (value === '1y') {

        startDate.setDate(endDate.getDate() - 365);
    }
    startDate = moment(startDate).format('MM/DD/YYYY');
    endDate = moment(endDate).format('MM/DD/YYYY');
    $('#startDate').val(startDate);
    $('#endDate').val(endDate);
    getFilteredCountAjax(startDate, endDate);
}
const getFilteredCount = () => {
    if (new Date($('#startDate').val()) <= new Date($('#endDate').val())) {
        getFilteredCountAjax($('#startDate').val(), $('#endDate').val());
    } else {
        swal({
            text: 'please select correct date'
        });
    }
}

const subscriptionList = () => {
    $.ajax({
        url: `${subscriptionApi}?isWithoutFreeTire=true`,
        method: 'get',
        success: (result) => {
            result.data.forEach(subscription => {
                const option = document.createElement('option');
                option.setAttribute('value', subscription._id);
                option.innerHTML = subscription.planName;
                document.getElementById('subscriptionList').appendChild(option);
            })
        }, error: (result) => {
            toastr.show(result.responseJSON.msg);
        }
    })

}

const providerList = () => {
    $.ajax({
        url: `${providerApi}/approvedList`,
        method: 'get',
        success: (result) => {
            result.data.forEach(subscription => {
                const option = document.createElement('option');
                option.setAttribute('value', subscription._id);
                option.innerHTML = subscription.email;
                document.getElementById('providerList').appendChild(option);
            })
        }, error: (result) => {
            toastr.show(result.responseJSON.msg);
        }
    })

}

const constReport = (startDate, endDate, list) => {
    $.ajax({
        url: `${costReportApi}`,
        method: 'post',
        data : JSON.stringify({
            'startDate': startDate ? startDate : null,
            'endDate': endDate ? endDate : null,
            'providerIdList': list ? list : null,
        }),
        success: (result) => {
            const data = result.data.reportData;
            const { totalProvider } = result.data;
            let totalMoenyCollected = 0;
            const finalReportData = [];
            if (data && data.length) {
                data.forEach(reportCount => {
                    finalReportData.push({
                        "costTocompany": moment(new Date(reportCount.fullDate)).format('MMM-YY'),
                        "value": reportCount.total,
                    });
                    totalMoenyCollected += reportCount.total;
                });
            }



            $('#totalMoneyCollected').html(`${totalMoenyCollected} $`);
            $('#totalNumberOfProvider').html(totalProvider);
            $('#profitLoss').html(totalMoenyCollected);

            var chart = am4core.create("cost-chart", am4charts.XYChart);

            // Add data
            chart.data = finalReportData;

            // Create axes

            var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
            categoryAxis.dataFields.category = "costTocompany";
            categoryAxis.renderer.grid.template.location = 0;
            categoryAxis.renderer.minGridDistance = 30;

            categoryAxis.renderer.labels.template.adapter.add("dy", function (dy, target) {
                if (target.dataItem && target.dataItem.index & 2 == 2) {
                    return dy + 25;
                }
                return dy;
            });

            var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());

            // Create series
            var series = chart.series.push(new am4charts.ColumnSeries());
            series.dataFields.valueY = "value";
            series.dataFields.categoryX = "costTocompany";
            series.name = "Money";
            series.columns.template.tooltipText = "{categoryX}: [bold]{valueY}[/]";
            series.columns.template.fillOpacity = .8;

            var columnTemplate = series.columns.template;
            columnTemplate.strokeWidth = 2;
            columnTemplate.strokeOpacity = 1;




        }, error: (result) => {
            toastr.show(result.responseJSON.msg);
        }
    })
}

$(document).ready(function () {
    getReceiverReport();
    getProviderReport();
    subscriptionList();
    salesReport();
    providerList();
    constReport();
});

$('input[name="onBoardDateRang"]').daterangepicker({
    autoUpdateInput: true,
    locale: {
        cancelLabel: 'Clear'
    },
    opens: 'left'
});

$('input[name="onBoardDateRang"]').on('apply.daterangepicker', function (ev, picker) {
    getReceiverReport(picker.startDate.format('MM/DD/YYYY'), picker.endDate.format('MM/DD/YYYY'));
    getProviderReport(picker.startDate.format('MM/DD/YYYY'), picker.endDate.format('MM/DD/YYYY'));
    $(this).val(picker.startDate.format('MM/DD/YYYY') + ' - ' + picker.endDate.format('MM/DD/YYYY'));
});

$('input[name="onBoardDateRang"]').on('cancel.daterangepicker', function (ev, picker) {
    $('input[name="onBoardDateRang"]').datepicker('setDate', null);
    getReceiverReport();
    getProviderReport()
    $(this).val();
});

$('input[name="subscriptionFilter"]').daterangepicker({
    autoUpdateInput: true,
    locale: {
        cancelLabel: 'Clear'
    },
    opens: 'left'
});

$('input[name="subscriptionFilter"]').on('apply.daterangepicker', function (ev, picker) {

    salesReport(picker.startDate.format('MM/DD/YYYY'), picker.endDate.format('MM/DD/YYYY'), $('#subscriptionList').val());
    $(this).val(picker.startDate.format('MM/DD/YYYY') + ' - ' + picker.endDate.format('MM/DD/YYYY'));
});

$('input[name="subscriptionFilter"]').on('cancel.daterangepicker', function (ev, picker) {
    $('input[name="subscriptionFilter"]').datepicker('setDate', null);
    salesReport();
    $(this).val();
});


$('input[name="costDateRangeFilter"]').daterangepicker({
    autoUpdateInput: true,
    locale: {
        cancelLabel: 'Clear'
    },
    opens: 'left'
});

$('input[name="costDateRangeFilter"]').on('apply.daterangepicker', function (ev, picker) {

    constReport(picker.startDate.format('MM/DD/YYYY'), picker.endDate.format('MM/DD/YYYY'), $('#providerList').val());
    $(this).val(picker.startDate.format('MM/DD/YYYY') + ' - ' + picker.endDate.format('MM/DD/YYYY'));
});

$('input[name="costDateRangeFilter"]').on('cancel.daterangepicker', function (ev, picker) {
    $('input[name="costDateRangeFilter"]').datepicker('setDate', null);
    salesReport();
    $(this).val();
});


$('#subscriptionList').change(() => {
    salesReport(null, null, $('#subscriptionList').val());
})

$('#providerList').change(() => {
    const dates = $('#costDateRangeFilter').val().split('-');
    let startDate = null;
    let endDate = null;
    if(dates && dates.length > 0)
    {
        startDate = dates[0];
        endDate = dates[1];
    }
    constReport(startDate, endDate,$('#providerList').val().join(','));
})





