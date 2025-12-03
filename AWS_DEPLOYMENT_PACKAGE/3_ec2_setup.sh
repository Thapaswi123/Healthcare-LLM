#!/bin/bash
# EC2 Instance Setup Script - Run this on your EC2 instance after launch

echo "=========================================="
echo "Setting up EC2 for Healthcare LLM Backend"
echo "=========================================="

# Update system
echo "Updating system packages..."
sudo yum update -y || sudo apt-get update -y

# Install Node.js 18.x
echo "Installing Node.js..."
curl -fsSL https://rpm.nodesource.com/setup_18.x | sudo bash - || curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo yum install -y nodejs || sudo apt-get install -y nodejs

# Install PM2 globally
echo "Installing PM2..."
sudo npm install -g pm2

# Install Git
echo "Installing Git..."
sudo yum install -y git || sudo apt-get install -y git

# Create application directory
echo "Creating application directory..."
sudo mkdir -p /var/www/healthcare-llm
sudo chown -R $USER:$USER /var/www/healthcare-llm
cd /var/www/healthcare-llm

# Clone or copy your application files here
echo "=========================================="
echo "Setup complete!"
echo "Next steps:"
echo "1. Copy your application files to /var/www/healthcare-llm"
echo "2. Run npm install in each application directory"
echo "3. Use PM2 to start applications (see 4_start_apps_pm2.sh)"
echo "=========================================="
