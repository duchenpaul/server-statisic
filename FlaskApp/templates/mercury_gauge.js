
var gaugeOptions = {

    chart: {
        type: 'solidgauge'
    },
    title: {
        text: null,
    },

    pane: {
        center: ['50%', '85%'],
        size: '140%',
        startAngle: -90,
        endAngle: 90,
        background: {
            backgroundColor: (Highcharts.theme && Highcharts.theme.background2) || '#EEE',
            innerRadius: '60%',
            outerRadius: '100%',
            shape: 'arc'
        }
    },

    tooltip: {
        enabled: false
    },

    // the value axis
    yAxis: {
        stops: [
            [0.1, '#55BF3B'], // green
            [0.5, '#DDDF0D'], // yellow
            [0.9, '#DF5353'] // red
        ],
        lineWidth: 0,
        minorTickInterval: null,
        tickAmount: 2,
        title: {
            y: -70
        },
        labels: {
            y: 16
        }
    },

    plotOptions: {
        solidgauge: {
            dataLabels: {
                y: 5,
                borderWidth: 0,
                useHTML: true
            }
        }
    }
};

var chartCpu_load = Highcharts.chart('container-cpu_load', Highcharts.merge(gaugeOptions, {
    yAxis: {
        min: 0,
        max: 100,
        title: {
            text: 'CPU Load'
        }
    },

    credits: {
        enabled: false
    },

    series: [{
        name: 'CPU Load',
        data: [{{data_cpu_load_latest}}],
        dataLabels: {
            format: '<div style="text-align:center"><span style="font-size:25px;color:' +
                ((Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black') + '">{y:.1f}</span><br/>' +
                   '<span style="font-size:12px;color:silver">percent</span></div>'
        },
        tooltip: {
            valueSuffix: ' %'
        }
    }]

}));

var chartCpu_temp = Highcharts.chart('container-cpu_temp', Highcharts.merge(gaugeOptions, {
    yAxis: {
        min: 0,
        max: 80,
        title: {
            text: 'CPU Temperature'
        }
    },

    series: [{
        name: 'Cpu_temp',
        data: [{{data_cpu_temp_latest}}],
        dataLabels: {
            format: '<div style="text-align:center"><span style="font-size:25px;color:' +
                ((Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black') + '">{y:.1f}</span><br/>' +
                   '<span style="font-size:12px;color:silver">\'C</span></div>'
        },
        tooltip: {
            valueSuffix: ' revolutions/min'
        }
    }]

}));


