#!/bin/bash

# Healthcare LLM Applications - EC2 Deployment Script
# Run this script on your EC2 instance at 18.207.255.100

echo "🚀 Starting deployment..."

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Step 1: Update system
echo -e "${YELLOW}Step 1: Updating system...${NC}"
sudo yum update -y

# Step 2: Install Node.js if not installed
if ! command -v node &> /dev/null; then
    echo -e "${YELLOW}Step 2: Installing Node.js...${NC}"
    curl -fsSL https://rpm.nodesource.com/setup_18.x | sudo bash -
    sudo yum install -y nodejs
else
    echo -e "${GREEN}Node.js already installed: $(node --version)${NC}"
fi

# Step 3: Install PM2 if not installed
if ! command -v pm2 &> /dev/null; then
    echo -e "${YELLOW}Step 3: Installing PM2...${NC}"
    sudo npm install -g pm2
else
    echo -e "${GREEN}PM2 already installed: $(pm2 --version)${NC}"
fi

# Step 4: Navigate to project directory
cd /home/ubuntu/healthcare-llm-applications || exit

# Step 5: Install dependencies
echo -e "${YELLOW}Step 5: Installing dependencies...${NC}"

echo "Installing AI Clinical Co-Pilot dependencies..."
cd "AI Clinical Co-Pilot"
npm install --production
cd ..

echo "Installing Prior Authorization dependencies..."
cd "Prior Authorization Automation/ai_pa_full_modules/frontend"
npm install --production
cd ../../..

echo "Installing Medication Safety dependencies..."
cd "Medication Safety Assistant/med_safety_app"
npm install --production
cd ../..

echo "Installing Patient Communication dependencies..."
cd "Patient Communication Agent/patient_comm_app"
npm install --production
cd ../..

# Step 6: Build applications
echo -e "${YELLOW}Step 6: Building applications...${NC}"

echo "Building AI Clinical Co-Pilot..."
cd "AI Clinical Co-Pilot"
npm run build
cd ..

echo "Building Prior Authorization..."
cd "Prior Authorization Automation/ai_pa_full_modules/frontend"
npm run build
cd ../../..

echo "Building Medication Safety..."
cd "Medication Safety Assistant/med_safety_app"
npm run build
cd ../..

echo "Building Patient Communication..."
cd "Patient Communication Agent/patient_comm_app"
npm run build
cd ../..

# Step 7: Stop existing PM2 processes
echo -e "${YELLOW}Step 7: Stopping existing processes...${NC}"
pm2 stop all || true
pm2 delete all || true

# Step 8: Start applications with PM2
echo -e "${YELLOW}Step 8: Starting applications...${NC}"
pm2 start ecosystem.config.js

# Step 9: Save PM2 configuration
echo -e "${YELLOW}Step 9: Saving PM2 configuration...${NC}"
pm2 save

# Step 10: Setup PM2 startup
echo -e "${YELLOW}Step 10: Setting up PM2 startup...${NC}"
sudo env PATH=$PATH:/usr/bin pm2 startup systemd -u ubuntu --hp /home/ubuntu

# Step 11: Display status
echo -e "${GREEN}✅ Deployment complete!${NC}"
echo ""
echo "Application Status:"
pm2 status

echo ""
echo "Access your applications at:"
echo "  🏥 AI Clinical Co-Pilot:      http://3.227.251.11:3004"
echo "  📋 Prior Authorization:       http://3.227.251.11:3000"
echo "  💊 Medication Safety:         http://3.227.251.11:3001"
echo "  💬 Patient Communication:     http://3.227.251.11:3002"
echo ""
echo "Useful commands:"
echo "  pm2 status          - View app status"
echo "  pm2 logs            - View logs"
echo "  pm2 restart all     - Restart all apps"
echo "  pm2 monit           - Monitor resources"
