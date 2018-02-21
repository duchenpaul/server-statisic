$(function () {
    var chart;
    $(document).ready(function() {
        Highcharts.setOptions({
            global:{
                useUTC:false
            }
           })
        var cpu_load_chart = new Highcharts.StockChart({
            chart: {
                renderTo: 'cpu_load_chart',
                defaultSeriesType: 'areaspline',
                // events: {
                //     load: requestData
                // }
                zoomType: 'x'
            },
            rangeSelector: {
              buttons: [{
                        type: 'hour',
                        count: 1,
                        text: '1h'
                    }, {
                        type: 'day',
                        count: 1,
                        text: '1D'
                    }, {
                        type: 'week',
                        count: 1,
                        text: '1W'
                    }, {
                        type: 'all',
                        count: 1,
                        text: 'All'
                    }],
              inputEnabled: $('#container').width() > 480,
                selected: 1
            },
            exporting:{
              enabled:false
            },
            title: {
                text: 'CPU load'
            },
            xAxis: {
                type: 'datetime',
                tickPixelInterval: 150,
                maxZoom: 20 * 1000
            },
            yAxis: {
                minPadding: 0.2,
                maxPadding: 0.2,
                title: {
                    text: 'Value',
                    margin: 80
                }
            },
            series: [{
                showInNavigator: true,
                name: 'CPU load',
                color: '#DC143C', 
                data: {{data_CPU_load}}
            }],

            tooltip: {
            pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y} %</b> <br/>',
            valueDecimals: 2,
            split: true
            },
        });
    
        
        var cpu_temp_chart = new Highcharts.StockChart({
            chart: {
                renderTo: 'cpu_temp_chart',
                defaultSeriesType: 'areaspline',
                // events: {
                //     load: requestData
                // }
                zoomType: 'x'
            },
            rangeSelector: {
              buttons: [{
                        type: 'hour',
                        count: 1,
                        text: '1h'
                    }, {
                        type: 'day',
                        count: 1,
                        text: '1D'
                    }, {
                        type: 'week',
                        count: 1,
                        text: '1W'
                    }, {
                        type: 'all',
                        count: 1,
                        text: 'All'
                    }],
              inputEnabled: $('#container').width() > 480,
                selected: 1
            },
            exporting:{
              enabled:false
            },
            title: {
                text: 'CPU temperature'
            },
            xAxis: {
                type: 'datetime',
                tickPixelInterval: 150,
                maxZoom: 20 * 1000
            },
            yAxis: {
                minPadding: 0.2,
                maxPadding: 0.2,
                title: {
                    text: 'Value',
                    margin: 80
                }
            },
            series: [{
                name: 'CPU temperature',
                color: '#0CBBF5', 
                type: 'areaspline',
                threshold: null,
                data: {{data_CPU_temp}}
            }],
            tooltip: {
            pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y} \'C</b><br/>',
            valueDecimals: 2,
            split: true
            },
        });                                     

    });
   });