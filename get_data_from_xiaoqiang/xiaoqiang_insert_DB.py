#!/usr/bin/python3
# -*- coding: UTF-8 -*-

import MySQLdb, sys
import datetime, configparser
import fileinput, csv, os

source_file = 'xiaoqiang_mon.csv'
config_file = os.path.dirname(os.path.realpath(__file__)) + '/config.ini'

try:
	print('Read config file: ' + config_file )
	configRead = configparser.ConfigParser()
	configRead.read(config_file)
	config = {
		'host': configRead['datebase']['host'],
		'port': int(configRead['datebase']['port']),
		'user': configRead['datebase']['user'],
		'passwd': configRead['datebase']['passwd'],
		'db': configRead['datebase']['db'],
		'charset': 'utf8'
	}
except Exception as e:
	print("Error read config file, check config.ini")
	sys.exit(1)

def source_file_de_dup(source_file):
	'''De_dup the source file'''
	seen = set() # set for fast O(1) amortized lookup
	for line in fileinput.FileInput(source_file, inplace=1):
		if line in seen: continue # skip duplicate

		seen.add(line)
		print(line) # standard output is now redirected to the file


def source_file_read(source_file):
	'''Input the csv file, output list'''
	with open(source_file, 'r') as f:
		data = list(csv.reader(f, delimiter='|'))
		data = list(filter(None, data))

	return data

def db_append_status(pcb_temp, fan_speed, cpu_load, download_speed, upload_speed, disk_temp, disk_LoadCycleCount, disk_Power_On_Hours, disk_Power_Cycle_Count, log_date):
	'''insert machine status into the table'''

	sql = "INSERT INTO `server_data`.`tbl_xiaoqiang_live_info`" + \
	" (`pcb_temp`, `fan_speed`, `cpu_load`, `download_speed`, `upload_speed`, `disk_temp`, `disk_LoadCycleCount`, `disk_Power_On_Hours`, `disk_Power_Cycle_Count`, `log_date`, `db_insert_date`)" + \
	" VALUES ({}, {}, {}, {}, {}, {}, {}, {}, {}, FROM_UNIXTIME({}), now());"\
	.format(pcb_temp, fan_speed, cpu_load, download_speed, upload_speed, disk_temp, disk_LoadCycleCount, disk_Power_On_Hours, disk_Power_Cycle_Count, log_date)

	EXEC_SQL = sql

	db = MySQLdb.connect(**config)
	cursor = db.cursor()
	try:
		cursor.execute(EXEC_SQL)
	except Exception as e:
		print("Execute {} fail!".format(EXEC_SQL))
		print(e)
		db.rollback()
	else:
		# print("All good!")
		db.commit()
	finally:
		# print('Closing DB conn')
		db.close()

if __name__ == '__main__':
	try:
		source_file_de_dup(source_file)
		data = source_file_read(source_file)
		for i in  range(len(data)):
			db_append_status(*data[i])

		print('Inserted {} records'.format(i))
	except Exception as e:
		print(e)
		sys.exit(1)
	else:
		print('All values in {} has been loaded into {}'.format(source_file, config['db']))
		sys.exit(0)

	