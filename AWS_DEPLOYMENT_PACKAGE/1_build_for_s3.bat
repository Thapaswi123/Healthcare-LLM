@echo off
REM Build all Next.js applications for static export to S3 (Windows)

echo ==========================================
echo Building Healthcare LLM Apps for S3
echo ==========================================

REM Create output directory
if not exist "s3_builds" mkdir s3_builds

REM Build AI Clinical Co-Pilot
echo Building AI Clinical Co-Pilot...
cd "..\AI Clinical Co-Pilot"
call npm install
call npm run build
xcopy /E /I /Y out "..\AWS_DEPLOYMENT_PACKAGE\s3_builds\clinical-copilot"
cd ..\AWS_DEPLOYMENT_PACKAGE

REM Build Prior Authorization Automation
echo Building Prior Authorization Automation...
cd "..\Prior Authorization Automation\ai_pa_full_modules\frontend"
call npm install
call npm run build
xcopy /E /I /Y out "..\..\..\AWS_DEPLOYMENT_PACKAGE\s3_builds\prior-auth"
cd ..\..\..\AWS_DEPLOYMENT_PACKAGE

REM Build Medication Safety Assistant
echo Building Medication Safety Assistant...
cd "..\Medication Safety Assistant\med_safety_app"
call npm install
call npm run build
xcopy /E /I /Y out "..\..\AWS_DEPLOYMENT_PACKAGE\s3_builds\medication-safety"
cd ..\..\AWS_DEPLOYMENT_PACKAGE

REM Build Patient Communication Agent
echo Building Patient Communication Agent...
cd "..\Patient Communication Agent\patient_comm_app"
call npm install
call npm run build
xcopy /E /I /Y out "..\..\AWS_DEPLOYMENT_PACKAGE\s3_builds\patient-communication"
cd ..\..\AWS_DEPLOYMENT_PACKAGE

echo ==========================================
echo Build Complete! Static files ready in s3_builds\
echo ==========================================
pause
