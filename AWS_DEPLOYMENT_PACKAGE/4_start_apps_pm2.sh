#!/bin/bash
# Start all Healthcare LLM applications using PM2 on EC2

echo "=========================================="
echo "Starting Healthcare LLM Applications with PM2"
echo "=========================================="

# Navigate to application directory
cd /var/www/healthcare-llm

# Start AI Clinical Co-Pilot on port 3000
echo "Starting AI Clinical Co-Pilot..."
cd "AI Clinical Co-Pilot"
npm install --production
pm2 start npm --name "clinical-copilot" -- start
cd ..

# Start Prior Authorization on port 3001
echo "Starting Prior Authorization..."
cd "Prior Authorization Automation/ai_pa_full_modules/frontend"
npm install --production
PORT=3001 pm2 start npm --name "prior-auth" -- start
cd ../../..

# Start Medication Safety on port 3005
echo "Starting Medication Safety Assistant..."
cd "Medication Safety Assistant/med_safety_app"
npm install --production
PORT=3005 pm2 start npm --name "medication-safety" -- start
cd ../..

# Start Patient Communication on port 3006
echo "Starting Patient Communication Agent..."
cd "Patient Communication Agent/patient_comm_app"
npm install --production
PORT=3006 pm2 start npm --name "patient-communication" -- start
cd ../..

# Save PM2 configuration
pm2 save

# Setup PM2 to start on system boot
pm2 startup

echo "=========================================="
echo "All applications started!"
echo "=========================================="
pm2 list
echo ""
echo "Applications running on:"
echo "- Clinical Co-Pilot: http://localhost:3000"
echo "- Prior Authorization: http://localhost:3001"
echo "- Medication Safety: http://localhost:3005"
echo "- Patient Communication: http://localhost:3006"
echo ""
echo "Configure Security Group to allow these ports!"
echo "=========================================="
