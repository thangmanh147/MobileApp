#!/usr/bin/env bash
#!/bin/bash

##############################################################################
# Khoi tao moi truong build.
# Goi sh nay truoc khi goi debug.sh, apk.sh, aab.sh
##############################################################################

IFS='.' read -r -a array <<< "$1" # Tach chuoi dau vao thanh mang. VD: iagent.dev thanh [iagent, dev]
BUNDLE=$1      # iagent.dev
APP_NAME=${array[0]}; # VD: iagent

ENV_FILE=".env.${BUNDLE}"
CONFIG_FILE="${APP_NAME}.js"

IS_READY=0

# ENV
if [[ ! -f ../../src/app-${APP_NAME}/env/${ENV_FILE} ]]   # Neu file cau hinh env khong ton tai
then
    printf "Thieu cau hinh \"src/app-${APP_NAME}/env/${ENV_FILE}\". \n"
    IS_READY=$((IS_READY+1))
else
    printf "Da cau hinh \"src/app-${APP_NAME}/env/${ENV_FILE}\". \n"
fi

# GG_SERVICE
if [[ ! -f ../../src/app-${APP_NAME}/google-services/android/google-services.json ]]   # Neu file cau hinh env khong ton tai
then
    printf "Thieu cau hinh \"src/app-${APP_NAME}/google-services/android/google-services.json\". \n"
    IS_READY=$((IS_READY+1))
else
    printf "Da cau hinh \"src/app-${APP_NAME}/google-services/android/google-services.json\". \n"
fi

# CONFIG
if [[ ! -f ../../src/app-${APP_NAME}/config/${CONFIG_FILE} ]]   # Neu file cau hinh khong ton tai
then
    printf "Thieu cau hinh \"src/app-${APP_NAME}/config/${CONFIG_FILE}\". \n"
    IS_READY=$((IS_READY+1))
else
    printf "Da cau hinh \"src/app-${APP_NAME}/config/${CONFIG_FILE}\". \n"
fi

# RESOURCE
if [[ ! -d ../../android/app/src/${APP_NAME} ]]   # Neu file cau hinh dich vu khong ton tai
then
    printf "Thieu cau hinh \"android/app/src/${APP_NAME}\". \n\n"
    IS_READY=$((IS_READY+1))
else
    printf "Da cau hinh \"android/app/src/${APP_NAME}\". \n\n"
fi

# RECHECK
if [[ ${IS_READY} -gt 0 ]]  # Neu 1 trong 3 dieu kien tren khong thoa man thi dung qua trinh
then
    printf "Build stopped (${IS_READY} error) !!!\n"
    exit
fi

# START
printf "Start BUILD .......... \n\n"

# CHUAN BI MOI TRUONG BUILD ===================================

# Clean moi truong build cu
cd ../../ &&                # Chuyen ra thu muc root
rm -rf /tmp/metro-* &&      # Xoa thu muc tam sinh ra trong qua trinh build
rm -rf src/config/images/private/ &&      # Xoa thu muc anh private
:> .env &&                  # Lam rong file env.
:> android/app/google-services.json && # Lam rong file gg service
:> src/config/System.js &&  # Lam rong file System config.

cd android &&               # Chuyen vao thu muc android
./gradlew clean &&          # Thuc hien clean du lieu lan build truoc
cd .. &&                    # Chuyen lai ra thu muc root

# Khoi tao moi truong build moi
cp src/app-${APP_NAME}/config/${CONFIG_FILE} src/config/System.js &&     #  Ghi de cau hinh thong tin hoat dong cua don vi dang build
cp src/app-${APP_NAME}/env/${ENV_FILE} .env &&   # Ghi de cac bien moi truong cua don vi dang build
cp src/app-${APP_NAME}/google-services/android/google-services.json android/app/google-services.json &&
cp -r src/app-${APP_NAME}/images/ src/config/images/
