#!/usr/bin/env python3
from get_data import *
from flask import Flask, render_template, make_response
import test

app = Flask(__name__)

@app.route('/multi_hcharts_mercury.js')
def mercury_hcharts_js():
	return render_template('multi_hcharts_mercury.js', data_CPU_load=get_server_data('cpu_load', 'server_data.tbl_mercury_live_info'), 
													data_CPU_temp=get_server_data('cpu_temp', 'server_data.tbl_mercury_live_info'))

@app.route('/multi_hcharts.js')
def vps_hcharts_js():
	return render_template('multi_hcharts.js', data_disk_percent=get_vps_disk_data(), data_bandwidth=get_vps_bandwidth_data())

@app.route('/multi_hcharts_xiaoqiang.js')
def xiaoqiang_hcharts_js():
	return render_template('multi_hcharts_xiaoqiang.js', data_pcb_temp=get_server_data('pcb_temp', 'server_data.tbl_xiaoqiang_live_info'), 
													data_disk_temp=get_server_data('disk_temp', 'server_data.tbl_xiaoqiang_live_info'),
													data_fan_speed=get_server_data('fan_speed', 'server_data.tbl_xiaoqiang_live_info'),
													data_cpu_load=get_server_data('cpu_load', 'server_data.tbl_xiaoqiang_live_info'),
													data_download_speed=get_server_data('download_speed', 'server_data.tbl_xiaoqiang_live_info'),
													data_upload_speed=get_server_data('upload_speed', 'server_data.tbl_xiaoqiang_live_info')	)


@app.route('/mercury_gauge.js')
def mercury_latest_js():
	return render_template('mercury_gauge.js', data_cpu_load_latest=get_server_data_gauge('cpu_load', 'server_data.vw_mercury_latest'), 
												data_cpu_temp_latest=get_server_data_gauge('cpu_temp', 'server_data.vw_mercury_latest'))




@app.route('/')
def index_page():
	return render_template('index.html', data_mercury_log_date_latest=get_server_data_gauge('log_date', 'server_data.vw_mercury_latest'))

@app.route('/mercury')
def mercury_page():
	return render_template('mercury.html')

@app.route('/pluto')
def pluto_page():
	return render_template('pluto.html')

@app.route('/xiaoqiang')
def xiaoqiang_page():
	return render_template('xiaoqiang.html')

@app.route('/mercury_latest')
def mercury_latest_page():
	return render_template('mercury_latest.html')

@app.route('/clock.js')
def clock_page():
	return app.send_static_file('clock.js')


if __name__ == '__main__':
	app.run(debug=True, host='0.0.0.0', port=5001)
