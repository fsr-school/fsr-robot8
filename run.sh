#!/usr/bin/env bash

# 如果有Permission denied错误，请执行一次授权命令
# sudo chmod -R 777 run.sh

# npm script
if [ "$1" = "" ]; then
  npm run dev:weapp
else
  npm run build:weapp
fi
