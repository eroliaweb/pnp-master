@echo off
title PNPMaster - Print & Play Kart Baski Studyosu
cd /d "%~dp0"

echo PNPMaster aciliyor...
start "" ".\node_modules\.bin\electron.cmd" .
exit
