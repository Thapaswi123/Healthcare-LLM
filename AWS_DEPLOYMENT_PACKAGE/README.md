# Healthcare LLM Applications - AWS Deployment Guide

## Architecture Overview
```
User Browser → S3 Static Website → EC2 Backend (Node.js) → Optional Database
```

## Applications to Deploy
1. AI Clinical Co-Pilot (Port 3000)
2. Prior Authorization Automation (Port 3001)
3. Medication Safety Assistant (Port 3005)
4. Patient Communication Agent (Port 3006)

## Deployment Strategy

### Phase 1: Build Static Frontends for S3
- Export Next.js apps as static HTML/CSS/JS
- Upload to S3 buckets with static website hosting

### Phase 2: Deploy Backend APIs to EC2
- Launch EC2 instance (t3.medium or larger)
- Install Node.js runtime
- Deploy all API routes
- Use PM2 for process management
- Configure Security Groups

### Phase 3: Connect Frontend to Backend
- Update frontend API endpoints to EC2 public DNS
- Configure CORS on EC2
- Optional: Add CloudFront + Route 53

## Prerequisites
- AWS Account with appropriate permissions
- AWS CLI installed and configured
- Node.js 18+ installed locally
- SSH key pair for EC2 access

## Estimated Costs (Monthly)
- S3: $0.50 - $5 (depending on traffic)
- EC2 t3.medium: ~$30
- Data Transfer: $5 - $20
- Total: ~$35 - $55/month

## Security Considerations
- HIPAA compliance requires additional configuration
- Enable encryption at rest (S3, EBS)
- Use VPC with private subnets
- Implement proper IAM roles
- Enable CloudTrail logging
- Use AWS WAF for protection

---
**Note:** These are demonstration applications. Production deployment requires additional security hardening, monitoring, and compliance measures.
