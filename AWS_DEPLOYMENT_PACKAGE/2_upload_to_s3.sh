#!/bin/bash
# Upload static builds to S3 buckets

# Configuration - UPDATE THESE VALUES
BUCKET_PREFIX="healthcare-llm"
AWS_REGION="us-east-1"

echo "=========================================="
echo "Uploading to S3 Buckets"
echo "=========================================="

# Create S3 buckets
echo "Creating S3 buckets..."
aws s3 mb s3://${BUCKET_PREFIX}-clinical-copilot --region ${AWS_REGION}
aws s3 mb s3://${BUCKET_PREFIX}-prior-auth --region ${AWS_REGION}
aws s3 mb s3://${BUCKET_PREFIX}-medication-safety --region ${AWS_REGION}
aws s3 mb s3://${BUCKET_PREFIX}-patient-communication --region ${AWS_REGION}

# Upload files
echo "Uploading AI Clinical Co-Pilot..."
aws s3 sync ./s3_builds/clinical-copilot s3://${BUCKET_PREFIX}-clinical-copilot --delete

echo "Uploading Prior Authorization..."
aws s3 sync ./s3_builds/prior-auth s3://${BUCKET_PREFIX}-prior-auth --delete

echo "Uploading Medication Safety..."
aws s3 sync ./s3_builds/medication-safety s3://${BUCKET_PREFIX}-medication-safety --delete

echo "Uploading Patient Communication..."
aws s3 sync ./s3_builds/patient-communication s3://${BUCKET_PREFIX}-patient-communication --delete

# Enable static website hosting
echo "Enabling static website hosting..."
aws s3 website s3://${BUCKET_PREFIX}-clinical-copilot --index-document index.html --error-document index.html
aws s3 website s3://${BUCKET_PREFIX}-prior-auth --index-document index.html --error-document index.html
aws s3 website s3://${BUCKET_PREFIX}-medication-safety --index-document index.html --error-document index.html
aws s3 website s3://${BUCKET_PREFIX}-patient-communication --index-document index.html --error-document index.html

# Set bucket policies for public read
echo "Setting bucket policies..."
for bucket in clinical-copilot prior-auth medication-safety patient-communication; do
  cat > /tmp/policy.json <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::${BUCKET_PREFIX}-${bucket}/*"
    }
  ]
}
EOF
  aws s3api put-bucket-policy --bucket ${BUCKET_PREFIX}-${bucket} --policy file:///tmp/policy.json
done

echo "=========================================="
echo "Upload Complete!"
echo "=========================================="
echo "Website URLs:"
echo "Clinical Co-Pilot: http://${BUCKET_PREFIX}-clinical-copilot.s3-website-${AWS_REGION}.amazonaws.com"
echo "Prior Auth: http://${BUCKET_PREFIX}-prior-auth.s3-website-${AWS_REGION}.amazonaws.com"
echo "Medication Safety: http://${BUCKET_PREFIX}-medication-safety.s3-website-${AWS_REGION}.amazonaws.com"
echo "Patient Communication: http://${BUCKET_PREFIX}-patient-communication.s3-website-${AWS_REGION}.amazonaws.com"
echo "=========================================="
