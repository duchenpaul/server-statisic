#! /bin/bash
PYTHON_SCRIPT=server_status_web
LOG_PATH=/var/log/script_logs

echo "Try to kill the existing instance..."
kill -9 $(ps ax | grep ${PYTHON_SCRIPT} | fgrep -v grep | awk '{ print $1 }')

echo "Start new web service..."
./${PYTHON_SCRIPT}.py > ${LOG_PATH}/${PYTHON_SCRIPT}_`date +"%Y%m%d" `.log 2>&1 &
