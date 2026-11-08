@echo off
title PNPMaster Web
cd /d "%~dp0"

echo Tarayici modunda baslatiliyor...
start http://localhost:5173
call npm run dev
