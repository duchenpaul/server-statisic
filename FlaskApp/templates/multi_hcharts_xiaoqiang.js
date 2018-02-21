$(function () {
    var chart;
    $(document).ready(function() {
        Highcharts.setOptions({
            global:{
                useUTC:false
            }
           })
        var temp_chart = new Highcharts.StockChart({
            chart: {
                renderTo: 'temp_chart',
                // defaultSeriesType: 'areaspline',
                // events: {
                //     load: requestData
                // }
                zoomType: 'x'
            },
            legend: {
                enabled: true,
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
                text: 'Temperature'
            },
            xAxis: {
                type: 'datetime',
                tickPixelInterval: 150,
                maxZoom: 20 * 1000
            },
            yAxis: {
                minPadding: 0,
                maxPadding: 0,
                title: {
                    text: 'Value',
                    margin: 80
                },
                threshold: null
            },
            series: [{
                showInNavigator: true,
                name: 'PCB temp',
                color: '#3498DB', 
                data: {{data_pcb_temp}},
                type: 'areaspline',
                threshold: null,
            }, {
                showInNavigator: true,
                name: 'Disk temp',
                color: '#58D68D', 
                data: {{data_disk_temp}},
                type: 'areaspline',
                threshold: null,
            }],

            tooltip: {
            pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y} \'C</b> <br/>',
            valueDecimals: 2,
            split: true
            },


        });
    
        
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
                name: 'CPU load',
                color: '#E74C3C', 
                data: {{data_cpu_load}},
                type: 'areaspline',
                threshold: 0,
            },],
            tooltip: {
            pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y} %</b><br/>',
            valueDecimals: 2,
            split: true
            },
        });  // End of  new Highcharts.StockChart   

        var fan_speed_chart = new Highcharts.StockChart({
            chart: {
                renderTo: 'fan_speed_chart',
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
                text: 'Fan Speed'
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
                name: 'Fan Speed',
                color: '#F1C40F', 
                data: {{data_fan_speed}},
                type: 'areaspline',
                threshold: null,
            }],
            tooltip: {
            pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y} RPM</b><br/>',
            valueDecimals: 2,
            split: true
            },
        });  // End of  new Highcharts.StockChart   

        var internet_speed_chart = new Highcharts.StockChart({
            chart: {
                renderTo: 'internet_speed_chart',
                defaultSeriesType: 'areaspline',
                // events: {
                //     load: requestData
                // }
                zoomType: 'x'
            },
            legend: {
                enabled: true,
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
                text: 'Internet Speed Speed'
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
                name: 'Download',
                color: '#58D68D', 
                data: {{data_download_speed}},
                type: 'areaspline',
                threshold: 0,
            },{
                name: 'Upload',
                color: '#5DADE2', 
                data: {{data_upload_speed}},
                type: 'areaspline',
                threshold: 0,
            }],
            tooltip: {
            pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y} KB/s</b><br/>',
            valueDecimals: 2,
            split: true
            },
        });  // End of  new Highcharts.StockChart

    });
   });