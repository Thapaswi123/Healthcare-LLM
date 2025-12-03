# AWS S3 Deployment Guide - Healthcare LLM Applications

## Overview
This guide will help you deploy your Healthcare LLM portfolio to AWS S3 using only the web browser (no CLI needed).

## What You'll Deploy
- 8 Healthcare LLM Application Projects
- Documentation (BRDs, Technical Packages)
- Diagrams (UML, DFD, Architecture)
- Working Applications (3 complete systems)
- Prototype Code

---

## Step 1: Create AWS Account (If you don't have one)

1. Go to: https://aws.amazon.com
2. Click "Create an AWS Account"
3. Fill in:
   - Email address
   - Password
   - AWS account name (e.g., "Healthcare-LLM-Portfolio")
4. Choose "Personal" account type
5. Enter payment information (required but won't be charged on free tier)
6. Verify phone number
7. Select "Free" support plan

**Free Tier Includes:**
- 5 GB S3 storage
- 20,000 GET requests
- 2,000 PUT requests per month
- Valid for 12 months

---

## Step 2: Sign in to AWS Console

1. Go to: https://console.aws.amazon.com
2. Sign in with your email and password
3. You'll see the AWS Management Console dashboard

---

## Step 3: Create S3 Bucket

1. In the AWS Console search bar, type "S3" and click on it
2. Click the orange "Create bucket" button
3. Configure your bucket:

### Bucket Settings:
```
Bucket name: healthcare-llm-portfolio-[your-name]
  (must be globally unique, use lowercase, no spaces)
  Example: healthcare-llm-portfolio-john-doe

AWS Region: Choose closest to you
  - US East (N. Virginia) - us-east-1
  - US West (Oregon) - us-west-2
  - Europe (Ireland) - eu-west-1
```

### Access Settings:
**For Public Portfolio (anyone can view):**
- ☐ Uncheck "Block all public access"
- ☑ Check the acknowledgment box

**For Private Portfolio (only you can view):**
- ☑ Keep "Block all public access" checked

### Other Settings:
- Bucket Versioning: Enable (recommended)
- Tags: Add if you want (optional)
- Default encryption: Enable (recommended)
- Object Lock: Disable

4. Click "Create bucket" at the bottom

---

## Step 4: Organize Your Files for Upload

Create this folder structure on your local computer:

```
Healthcare-LLM-Portfolio/
├── 01-Documentation/
│   ├── Healthcare_LLM_Applications.docx
│   ├── Healthcare_LLM_Applications_BRD.docx
│   └── README.md
├── 02-Patient-Communication-Agent/
│   ├── Documentation/
│   ├── Diagrams/
│   ├── Prototype/
│   └── Deliverables/
├── 03-Medication-Safety-Assistant/
│   ├── BRD/
│   ├── API-Documentation/
│   └── Application/
├── 04-Prior-Authorization-Automation/
│   ├── BRD/
│   └── Applications/
├── 05-AI-Clinical-CoPilot/
├── 06-Clinical-Document-DeID/
├── 07-Clinical-Trials-Intelligence/
├── 08-Healthcare-Knowledge-Graph/
└── 09-Nursing-Workflow-Automation/
```

---

## Step 5: Upload Files to S3

### Method A: Drag and Drop (Easiest)

1. Click on your bucket name
2. Click "Upload" button
3. Drag and drop folders/files from your computer
4. Click "Upload" at the bottom
5. Wait for upload to complete

### Method B: Manual Upload

1. Click on your bucket name
2. Click "Create folder" to make folders
3. Click "Upload" to add files
4. Select files from your computer
5. Click "Upload"

---

## Step 6: Make Files Public (Optional)

**Only if you want a public portfolio:**

### Option A: Make Entire Bucket Public
1. Go to your bucket
2. Click "Permissions" tab
3. Scroll to "Bucket policy"
4. Click "Edit"
5. Paste this policy (replace YOUR-BUCKET-NAME):

```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "PublicReadGetObject",
            "Effect": "Allow",
            "Principal": "*",
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::YOUR-BUCKET-NAME/*"
        }
    ]
}
```

6. Click "Save changes"

### Option B: Make Individual Files Public
1. Select file(s) in your bucket
2. Click "Actions" dropdown
3. Click "Make public using ACL"
4. Confirm

---

## Step 7: Enable Static Website Hosting (Optional)

**If you want to host documentation as a website:**

1. Go to your bucket
2. Click "Properties" tab
3. Scroll to "Static website hosting"
4. Click "Edit"
5. Select "Enable"
6. Index document: `index.html`
7. Error document: `error.html` (optional)
8. Click "Save changes"
9. Note the "Bucket website endpoint" URL

---

## Step 8: Access Your Files

### For Public Files:
```
Format: https://YOUR-BUCKET-NAME.s3.REGION.amazonaws.com/path/to/file

Example:
https://healthcare-llm-portfolio-john.s3.us-east-1.amazonaws.com/01-Documentation/Healthcare_LLM_Applications.docx
```

### For Private Files:
1. Go to your bucket
2. Click on the file
3. Click "Open" or "Download"
4. Or click "Object actions" → "Share with a presigned URL"
5. Set expiration time
6. Copy the temporary URL to share

---

## Step 9: Share Your Portfolio

### Option 1: Share Bucket URL
```
https://YOUR-BUCKET-NAME.s3.REGION.amazonaws.com/
```

### Option 2: Create Index Page
Create an `index.html` file with links to all your projects

### Option 3: Share Individual File URLs
Create a document with links to specific files

---

## Cost Estimation

**Free Tier (First 12 months):**
- Storage: 5 GB free
- Requests: 20,000 GET, 2,000 PUT free
- Data transfer: 15 GB out free

**Your Portfolio Size:** ~500 MB (estimated)
**Monthly Cost:** $0.00 (within free tier)

**After Free Tier:**
- Storage: ~$0.023 per GB/month
- Your cost: ~$0.01/month

---

## Security Best Practices

1. **Enable MFA** on your AWS account
2. **Don't share AWS credentials** (only share S3 URLs)
3. **Use presigned URLs** for temporary access
4. **Enable versioning** to prevent accidental deletion
5. **Enable encryption** for sensitive data
6. **Review permissions** regularly

---

## Troubleshooting

### "Access Denied" Error
- Check bucket policy
- Verify file permissions
- Ensure "Block public access" is off (for public files)

### "Bucket name already exists"
- Bucket names are globally unique
- Try adding your name or numbers

### Files won't upload
- Check file size (max 5GB per file via console)
- Check internet connection
- Try smaller batches

### Can't find uploaded files
- Check you're in the correct region
- Refresh the page
- Check folder structure

---

## Next Steps After Deployment

1. ✅ Test all file URLs
2. ✅ Create an index/README with links
3. ✅ Share portfolio URL with mentor
4. ✅ Set up CloudFront CDN (optional, for faster access)
5. ✅ Configure custom domain (optional)

---

## Support Resources

- AWS S3 Documentation: https://docs.aws.amazon.com/s3/
- AWS Free Tier: https://aws.amazon.com/free/
- AWS Support: https://console.aws.amazon.com/support/

---

## Questions?

If you encounter any issues:
1. Check the troubleshooting section above
2. Review AWS S3 documentation
3. Check AWS service health dashboard
4. Contact AWS support (free tier includes basic support)
