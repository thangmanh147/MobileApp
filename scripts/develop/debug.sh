#!/usr/bin/env bash
#!/bin/bash

##############################################################################
# Bau dau build app de debug theo khoi tao moi truong truoc do               #
##############################################################################

. ./config.sh $1

# Neu khoi tao config truoc khi build loi, dung khong thuc thi tiep
if [[ ${IS_READY} -gt 0 ]]
then
    exit
fi

# CHAY APP O CHE DO DEBUG ===================================
react-native run-android --variant=${APP_NAME}Debug && # Tuong duong cau hinh trong .../android/app/build.gradle
react-native start
