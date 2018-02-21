import MySQLdb as mysql
import json, sys, configparser, decimal

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

class DecimalEncoder(json.JSONEncoder):
    def default(self, o):
        if isinstance(o, decimal.Decimal):
            return float(o)
        return super(DecimalEncoder, self).default(o)

def get_vps_disk_data():
	db = mysql.connect(**config)
	cursor = db.cursor()
	try:
		cursor.execute('select unix_timestamp(db_insert_date), disk_used, disk_plan from tbl_pluto_live_info  order by db_insert_date')
		data_disk_percent_values = [[i[0]*1000,round(i[1] / i[2] * 100, 2 ) ] for i in cursor.fetchall()]
	except Exception as e:
		print('DB Query error: ' + e)
	finally:
		db.close()

	return json.dumps(data_disk_percent_values, cls=DecimalEncoder)

def get_vps_bandwidth_data():
	db = mysql.connect(**config)
	cursor = db.cursor()
	try:
		cursor.execute('select unix_timestamp(db_insert_date), bandwidth_used, bandwidth_plan from tbl_pluto_live_info order by db_insert_date')
		data_bandwidth_values = [[i[0]*1000,round(i[1] / i[2] * 100, 2) ] for i in cursor.fetchall()]

	except Exception as e:
		print('DB Query error: ' + e)
	finally:
		db.close()

	return json.dumps(data_bandwidth_values, cls=DecimalEncoder)

def get_server_data(item, table_name):
	'''Return the json data that queried from the table, item: column name of the table.'''
	db = mysql.connect(**config)
	cursor = db.cursor()
	try:
		cursor.execute('select unix_timestamp(log_date), {} from {}  order by log_date'.format(item, table_name))
		data_values = [[i[0]*1000, i[1] ] for i in cursor.fetchall()]
	except Exception as e:
		print('DB Query error: ' + e)
	finally:
		db.close()

	return json.dumps(data_values, cls=DecimalEncoder)

def get_server_data_gauge(item, table_name):
	'''Return the json data that queried from the table, item: column name of the table.'''
	db = mysql.connect(**config)
	cursor = db.cursor()
	try:
		cursor.execute('select {} from {}  order by log_date'.format(item, table_name))
		data_values =  cursor.fetchone()[0]
	except Exception as e:
		print('DB Query error: ' + e)
	finally:
		db.close()

	return data_values

if __name__ == '__main__':
	print(get_server_data_gauge('log_date', 'server_data.vw_mercury_latest'))
	print(get_server_data_gauge('cpu_temp', 'server_data.vw_mercury_latest'))