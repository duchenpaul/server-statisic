#!/usr/bin/python3
import json
from insert_into_DB import db_append_status
from urllib import request
import configparser

try:
	configRead = configparser.ConfigParser()
	configRead.read('config.ini')

	VEID = configRead['vps info']['VEID'],
	API_KEY = configRead['vps info']['API_KEY'],
except Exception as e:
	print("Error read config file, check config.ini")
	sys.exit(1)


live_info_type = 'getLiveServiceInfo'
plan_info_type = 'getServiceInfo'


def getServiceInfo(info_type):
	API_URL = 'https://api.64clouds.com/v1/{}?veid={}&api_key={}'.format(info_type, VEID, API_KEY)
	# print(API_URL)
	headers = {'User-Agent':'Mozilla/5.0 (Windows NT 6.1; WOW64; rv:23.0) Gecko/20100101 Firefox/23.0'}  
	req = request.Request(url=API_URL, headers=headers)  
	resp = request.urlopen(req).read().decode('UTF-8')
	# print(resp)
	return json.loads(resp)

live_Data = getServiceInfo(live_info_type)
RAMPlan = int(live_Data['plan_ram'])
diskPlan = int(live_Data['plan_disk'])
bandwidthPlan = int(live_Data['plan_monthly_data'])

# RAMUsed = 
diskUsed = int(live_Data['vz_quota']['occupied_kb']) * 1000
bandwidthUsed = int(live_Data['data_counter'])

db_append_status(diskPlan, bandwidthPlan, diskUsed, bandwidthUsed)
