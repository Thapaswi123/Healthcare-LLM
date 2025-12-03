@echo off
echo ========================================
echo Deploying ai_pa_full_modules
echo ========================================
echo.

cd /d "D:\HealthCare LLM\Prior Authorization Automation\ai_pa_full_modules\frontend"

echo Installing dependencies...
call npm install

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ========================================
    echo Installation successful!
    echo Starting development server on port 3001...
    echo ========================================
    echo.
    start "AI PA Full Modules - Port 3001" cmd /k npm run dev -- -p 3001
    echo.
    echo Server starting in new window...
    echo URL: http://localhost:3001
    echo.
) else (
    echo.
    echo Installation failed!
    echo.
)

pause
