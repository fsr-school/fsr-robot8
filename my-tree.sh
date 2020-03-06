#!/usr/bin/env bash

# 如果有Permission denied错误，请执行一次授权命令
# sudo chmod -R 777 run.sh


find . \( -path "./cloudfunctions" -o -path "./node_modules" -o  -path "./coverage/*" -o  -path "./dist/*" -o  -path "./.git/*" -o  -path "*.DS_Store" \) -prune -o -print | sed -e 's;[^/]*/;|____;g;s;____|;   |;g' > TREE.md
