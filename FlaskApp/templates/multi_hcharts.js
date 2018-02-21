$(function () {
    var chart;
    $(document).ready(function() {
        Highcharts.setOptions({
            global:{
                useUTC:false
            }
           })
        var disk_chart = new Highcharts.StockChart({
            chart: {
                renderTo: 'disk_chart',
                defaultSeriesType: 'spline',
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
                text: 'Disk Usage'
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
                name: 'Disk Usage',
                color: '#DC143C', 
                type: 'areaspline',
                threshold: null,
                data: {{data_disk_percent}}
            }],
            tooltip: {
            pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y} %</b> <br/>',
            valueDecimals: 2,
            split: true
            },
        });
    
        
        var bandwidth_chart = new Highcharts.StockChart({
            chart: {
                renderTo: 'bandwidth_chart',
                defaultSeriesType: 'spline',
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
                text: 'bandwidth'
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
                name: 'bandwidth',
                color: '#0CBBF5', 
                type: 'areaspline',
                threshold: null,
                data: {{data_bandwidth}}
            }],
            tooltip: {
            pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y} %</b><br/>',
            valueDecimals: 2,
            split: true
            },
        });                                     

    });
   });