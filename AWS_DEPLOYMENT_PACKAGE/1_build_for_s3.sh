#!/bin/bash
# Build all Next.js applications for static export to S3

echo "=========================================="
echo "Building Healthcare LLM Apps for S3"
echo "=========================================="

# Create output directory
mkdir -p ./s3_builds

# Build AI Clinical Co-Pilot
echo "Building AI Clinical Co-Pilot..."
cd "../AI Clinical Co-Pilot"
npm install
npm run build
cp -r out ../AWS_DEPLOYMENT_PACKAGE/s3_builds/clinical-copilot
cd ../AWS_DEPLOYMENT_PACKAGE

# Build Prior Authorization Automation
echo "Building Prior Authorization Automation..."
cd "../Prior Authorization Automation/ai_pa_full_modules/frontend"
npm install
npm run build
cp -r out ../../../AWS_DEPLOYMENT_PACKAGE/s3_builds/prior-auth
cd ../../../AWS_DEPLOYMENT_PACKAGE

# Build Medication Safety Assistant
echo "Building Medication Safety Assistant..."
cd "../Medication Safety Assistant/med_safety_app"
npm install
npm run build
cp -r out ../../AWS_DEPLOYMENT_PACKAGE/s3_builds/medication-safety
cd ../../AWS_DEPLOYMENT_PACKAGE

# Build Patient Communication Agent
echo "Building Patient Communication Agent..."
cd "../Patient Communication Agent/patient_comm_app"
npm install
npm run build
cp -r out ../../AWS_DEPLOYMENT_PACKAGE/s3_builds/patient-communication
cd ../../AWS_DEPLOYMENT_PACKAGE

echo "=========================================="
echo "Build Complete! Static files ready in ./s3_builds/"
echo "=========================================="
