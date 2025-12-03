@echo off
echo Installing Prior Authorization Apps...
echo.

echo [1/3] Installing ai_pa_full_modules...
cd "Prior Authorization Automation\ai_pa_full_modules\frontend"
call npm install
cd ..\..\..
echo.

echo [2/3] Installing ai_pa_next_level...
cd "Prior Authorization Automation\ai_pa_next_level\frontend"
call npm install
cd ..\..\..
echo.

echo [3/3] Installing ai_pa_full...
cd "Prior Authorization Automation\ai_pa_full\frontend"
call npm install
cd ..\..\..
echo.

echo Done! All dependencies installed.
pause
