#!/bin/bash
SOURCE=`basename $0 .sh`

BASEDIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
LOG_PATH=/var/log/script_logs
SCRIPT_LOG=${LOG_PATH}/${SOURCE}_`date +"%Y%m%d"`.log

WORK_DIR=${BASEDIR}/temp/
Mi_CSV_PATH=/tmp/xiaoqiang_mon.csv
mkdir ${WORK_DIR}


exit_process(){
	exit_code=$1
	case $exit_code in
		0 )		
			echo 'all good'
			;;
		1 )
			echo 'Failed, Backup the csv file'
			cp xiaoqiang_mon.csv xiaoqiang_mon.csv_`date +"%Y%m%d_%H%M%S"`
			;;
		2 )
			echo 'Other Error'
			;;

		* )
			echo "Undefined Return Code!"
			;;
	esac
	echo -e "$0 ended at `date`\n" 
	rm -fr ${WORK_DIR}/xiaoqiang_mon.csv
	exit $exit_code

}


check_result()
{
	return_status=$?
	if [ $return_status -ne 0 ]; then
		echo -e "Failed! Return Status = $return_status"
		exit_process 1
	else
		echo -e "Done! \n"
	fi
}


exit_process_code=0
echo "$0 started at `date`" >> ${SCRIPT_LOG}
exec >> ${SCRIPT_LOG} 2>&1
echo -e "\n\n------------------------------------------"
echo "$0 started at `date`" >> ${SCRIPT_LOG}

echo "`date '+%F %X'`: Fetch the csv file from xiaoqiang... "
scp -r -i /home/pi/.ssh/id_rsa_3072 root@xiaoqiang:${Mi_CSV_PATH} ${WORK_DIR}
check_result

echo "`date '+%F %X'`: Extract data and load into table ..."
cd  ${WORK_DIR}
python3 ${BASEDIR}/xiaoqiang_insert_DB.py
check_result

echo "`date '+%F %X'`: Remove csv file from xiaoqiang ..."
ssh -i /home/pi/.ssh/id_rsa_3072 root@xiaoqiang 'rm -fr  /tmp/xiaoqiang_mon.csv'
check_result

exit_process ${exit_process_code}
