#!/usr/bin/python3
# -*- coding: UTF-8 -*-

import MySQLdb
import datetime, configparser

try:
	configRead = configparser.ConfigParser()
	configRead.read('config.ini')
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

def db_append_status(diskPlan, bandwidthPlan, diskUsed, bandwidthUsed):
	'''insert machine status into the table'''

	sql = "INSERT INTO tbl_pluto_live_info (disk_plan, bandwidth_plan, disk_used, bandwidth_used, db_insert_date) VALUES ({}, {}, {}, {}, now());".format(diskPlan, bandwidthPlan, diskUsed, bandwidthUsed)

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
		print("All good!")
		db.commit()
	finally:
		print('Closing DB conn')
		db.close()