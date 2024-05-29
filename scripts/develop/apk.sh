#!/usr/bin/env bash
#!/bin/bash

##############################################################################
# Bau dau build app release theo khoi tao moi truong truoc do                #
##############################################################################

. ./config.sh $1

# Neu khoi tao config truoc khi build loi, dung khong thuc thi tiep
if [[ ${IS_READY} -gt 0 ]]
then
    exit
fi

# BUILD APP RA FILE APK =====================================
cd ./android &&
./gradlew assemble${APP_NAME}Release
