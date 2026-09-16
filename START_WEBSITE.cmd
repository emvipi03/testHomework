@echo off
setlocal
cd /d "%~dp0"
set "PATH=%CD%\.tools\node-v24.21.0-win-x64;%PATH%"
if not exist ".tools\node-v24.21.0-win-x64\node.exe" (
  echo Portable Node.js was not found in the .tools folder.
  echo Copy the complete Session Trex-Fossil folder, including .tools and node_modules.
  pause
  exit /b 1
)
start "" "http://127.0.0.1:5173"
echo The website is running. Keep this window open while using it.
echo This computer: http://127.0.0.1:5173
echo Same Wi-Fi: use the Network address shown below.
call npm.cmd run dev:lan -- --port 5173
endlocal
