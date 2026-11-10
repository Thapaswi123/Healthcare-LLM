# ✅ EC2 Deployment Checklist

## Pre-Deployment Checklist

### AWS Setup
- [ ] EC2 instance is running at 3.227.251.11
- [ ] You have the SSH key (.pem file)
- [ ] Security Group allows inbound traffic on ports: 22, 3000, 3001, 3002, 3004
- [ ] EC2 instance has at least 2GB RAM (t2.small or larger recommended)
- [ ] EC2 instance has at least 10GB storage

### Local Setup
- [ ] Code is committed to GitHub (or ready to upload via SCP)
- [ ] All files updated with IP 3.227.251.11 (already done ✅)
- [ ] You have SSH client installed (Windows: use PowerShell or PuTTY)

---

## Deployment Steps

### Step 1: AWS Security Group Configuration
- [ ] Logged into AWS Console
- [ ] Navigated to EC2 → Security Groups
- [ ] Added inbound rule: Port 3000 (Prior Authorization)
- [ ] Added inbound rule: Port 3001 (Medication Safety)
- [ ] Added inbound rule: Port 3002 (Patient Communication)
- [ ] Added inbound rule: Port 3004 (AI Clinical Co-Pilot)
- [ ] Added inbound rule: Port 22 (SSH - Your IP only)
- [ ] Saved rules

### Step 2: Connect to EC2
- [ ] Opened terminal/PowerShell
- [ ] Connected via SSH: `ssh -i "your-key.pem" ubuntu@3.227.251.11`
- [ ] Successfully logged in

### Step 3: Upload Code
Choose one:
- [ ] **Option A:** Cloned from GitHub
- [ ] **Option B:** Uploaded via SCP

### Step 4: Run Deployment
- [ ] Navigated to project directory
- [ ] Made deploy script executable: `chmod +x deploy-to-ec2.sh`
- [ ] Ran deployment script: `./deploy-to-ec2.sh`
- [ ] Script completed without errors

### Step 5: Verify Installation
- [ ] Checked PM2 status: `pm2 status`
- [ ] All 4 apps showing as "online"
- [ ] No errors in logs: `pm2 logs`

### Step 6: Test Applications
- [ ] Opened http://3.227.251.11:3004 - AI Clinical Co-Pilot loads
- [ ] Opened http://3.227.251.11:3000 - Prior Authorization loads
- [ ] Opened http://3.227.251.11:3001 - Medication Safety loads
- [ ] Opened http://3.227.251.11:3002 - Patient Communication loads
- [ ] Clicked "Prior Authorization & Claims Agent" button - opens correct page
- [ ] Tested submitting a Prior Auth request
- [ ] Verified claim appears in "View Claims"

---

## Post-Deployment Checklist

### Monitoring
- [ ] PM2 is set to auto-start on reboot: `pm2 startup`
- [ ] PM2 configuration saved: `pm2 save`
- [ ] Tested reboot: `sudo reboot` (then reconnect and check `pm2 status`)

### Documentation
- [ ] Saved SSH key in secure location
- [ ] Documented EC2 instance details (IP, region, instance ID)
- [ ] Shared URLs with team/mentor

### Backup
- [ ] Created AMI snapshot of EC2 instance (optional but recommended)
- [ ] Code backed up on GitHub

---

## Troubleshooting Checklist

If apps don't load:
- [ ] Checked security group rules
- [ ] Verified apps are running: `pm2 status`
- [ ] Checked logs for errors: `pm2 logs`
- [ ] Verified ports are listening: `sudo netstat -tulpn | grep LISTEN`
- [ ] Tried restarting apps: `pm2 restart all`

If SSH connection fails:
- [ ] Verified EC2 instance is running in AWS Console
- [ ] Checked SSH key permissions: `chmod 400 your-key.pem`
- [ ] Verified security group allows SSH from your IP
- [ ] Tried using EC2 Instance Connect from AWS Console

If out of memory:
- [ ] Checked memory usage: `free -h`
- [ ] Considered upgrading instance type
- [ ] Added swap space (see AWS_EC2_DEPLOYMENT_STEPS.md)

---

## Success Criteria

✅ All 4 applications are accessible via public IP
✅ Prior Authorization button connects to correct app
✅ Data persists between page refreshes
✅ Apps auto-restart after server reboot
✅ No errors in PM2 logs
✅ Can share URLs with others and they can access

---

## Next Steps (Optional)

- [ ] Set up custom domain name
- [ ] Configure NGINX reverse proxy (remove port numbers)
- [ ] Set up SSL certificate (HTTPS)
- [ ] Configure CloudWatch monitoring
- [ ] Set up automated backups
- [ ] Add database for persistent storage

---

## Quick Reference Commands

```bash
# Check app status
pm2 status

# View logs
pm2 logs

# Restart all apps
pm2 restart all

# Stop all apps
pm2 stop all

# Monitor resources
pm2 monit

# Check which ports are in use
sudo netstat -tulpn | grep LISTEN

# Check memory usage
free -h

# Check disk usage
df -h
```

---

## Support Contacts

- AWS Support: https://console.aws.amazon.com/support/
- PM2 Documentation: https://pm2.keymetrics.io/docs/
- Next.js Documentation: https://nextjs.org/docs

---

## Deployment Date

- **Date:** _______________
- **Deployed By:** _______________
- **EC2 Instance ID:** _______________
- **Region:** _______________
- **Instance Type:** _______________

---

## Notes

_Add any additional notes or observations here:_

_______________________________________________
_______________________________________________
_______________________________________________
