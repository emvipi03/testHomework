@echo off
setlocal
cd /d "%~dp0"
set "PATH=%CD%\.tools\node-v24.21.0-win-x64;%PATH%"
if not exist ".tools\node-v24.21.0-win-x64\node.exe" (
  echo Khong tim thay Node portable trong thu muc .tools.
  echo Hay chep nguyen thu muc Session Trex-Fossil, bao gom .tools va node_modules.
  pause
  exit /b 1
)
start "" "http://127.0.0.1:5173"
echo Website dang chay. Giu cua so nay mo trong luc kiem tra.
echo May nay: http://127.0.0.1:5173
echo May cung Wi-Fi: xem dia chi Network hien ben duoi.
call npm.cmd run dev:lan -- --port 5173
endlocal
