# OpenAI Integration Setup Guide

## ✅ What Was Updated

**File Modified**: `Patient Communication Agent/patient_comm_app/app/api/patient-communication/route.js`

**Changes**:
- ✅ Integrated OpenAI GPT-3.5-turbo API
- ✅ Added emergency triage detection
- ✅ Conversation history support
- ✅ Medical disclaimers
- ✅ Fallback responses if API fails
- ✅ Secure API key handling

---

## 🔑 Step 1: Add Your OpenAI API Key

### On Your Local Machine (Windows):

1. Open the file: `Patient Communication Agent/patient_comm_app/.env.local`
2. Replace `YOUR_OPENAI_API_KEY` with your actual API key
3. Save the file

Example:
```
OPENAI_API_KEY=sk-proj-abc123xyz...
```

---

## 🚀 Step 2: Test Locally (Optional)

```bash
cd "Patient Communication Agent/patient_comm_app"
npm install
npm run dev
```

Open: http://localhost:3002

---

## ☁️ Step 3: Deploy to EC2

### A. Upload Updated Files via WinSCP

1. Open WinSCP and connect to your server
2. Navigate to: `/home/ubuntu/healthcare-llm-applications/Patient Communication Agent/patient_comm_app/`
3. Upload these files:
   - `app/api/patient-communication/route.js` (updated)
   - `.env.local` (new file with your API key)

### B. Set Environment Variable on EC2

In PuTTY, run:

```bash
cd "/home/ubuntu/healthcare-llm-applications/Patient Communication Agent/patient_comm_app"
nano .env.local
```

Paste your API key:
```
OPENAI_API_KEY=sk-proj-your-actual-key-here
```

Save: Ctrl+X, Y, Enter

### C. Restart the App

```bash
pm2 restart patient-communication
pm2 logs patient-communication
```

---

## 🧪 Step 4: Test the Integration

1. Open: http://3.227.251.11:3002
2. Try these test messages:

**Test 1 - General Question**:
```
I have a headache and fever. What should I do?
```

**Test 2 - Emergency (should trigger immediate alert)**:
```
I'm having chest pain
```

**Test 3 - Follow-up**:
```
How long should I rest?
```

---

## ✨ Features

### 1. Emergency Detection
- Detects keywords: chest pain, can't breathe, severe bleeding
- Bypasses AI for immediate 911 alert
- No delay in emergency situations

### 2. AI-Powered Responses
- Uses OpenAI GPT-3.5-turbo
- Context-aware (remembers conversation)
- Medical triage guidance
- When to seek care advice

### 3. Safety Features
- Always includes medical disclaimers
- Recommends professional consultation
- Never diagnoses or prescribes
- Fallback if API fails

---

## 💰 Cost Estimate

- Model: GPT-3.5-turbo
- Cost: ~$0.002 per request
- Free credits: $5 (≈2,500 requests)
- Perfect for demonstration!

---

## 🔒 Security Notes

- API key stored in `.env.local` (not in code)
- File is in `.gitignore` (won't be committed)
- Only accessible on server
- Can rotate key anytime

---

## 🐛 Troubleshooting

**Error: "OpenAI API error: 401"**
- Check API key is correct
- Verify key has credits
- Check key permissions

**Error: "Failed to generate response"**
- App falls back to basic responses
- Check internet connection on EC2
- Verify OpenAI service status

**No response from AI**:
```bash
# Check logs
pm2 logs patient-communication

# Restart app
pm2 restart patient-communication
```

---

## 📊 Monitoring Usage

Check your OpenAI usage:
https://platform.openai.com/usage

---

Ready to deploy? Follow Steps 1-4 above!
