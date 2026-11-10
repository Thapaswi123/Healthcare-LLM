# How to Deploy Healthcare LLM Applications Online

## Quick Deployment to Vercel (Recommended - FREE)

### Prerequisites
1. GitHub account (you already have the code on GitHub)
2. Vercel account (free) - Sign up at https://vercel.com

### Step 1: Deploy AI Clinical Co-Pilot
1. Go to https://vercel.com and sign in with GitHub
2. Click "Add New Project"
3. Import your GitHub repository: `sthagasavi/healthcare-llm-applications`
4. Configure the project:
   - **Framework Preset**: Next.js
   - **Root Directory**: `AI Clinical Co-Pilot`
   - Click "Deploy"
5. Wait 2-3 minutes for deployment
6. You'll get a URL like: `https://ai-clinical-copilot.vercel.app`

### Step 2: Deploy Prior Authorization Automation
1. Click "Add New Project" again
2. Import the same repository
3. Configure:
   - **Framework Preset**: Next.js
   - **Root Directory**: `Prior Authorization Automation/ai_pa_full_modules/frontend`
   - Click "Deploy"
4. You'll get a URL like: `https://prior-auth.vercel.app`

### Step 3: Deploy Other Apps (Optional)
Repeat for:
- **Patient Communication Agent**: Root Directory = `Patient Communication Agent/patient_comm_app`
- **Medication Safety Assistant**: Root Directory = `Medication Safety Assistant/med_safety_app`

### Step 4: Update Links
After deployment, update the Prior Authorization button in AI Clinical Co-Pilot:
- Edit `AI Clinical Co-Pilot/app/page.tsx`
- Change line 103 from:
  ```javascript
  onClick={() => window.open('http://localhost:3000', '_blank')}
  ```
  To:
  ```javascript
  onClick={() => window.open('https://your-prior-auth-url.vercel.app', '_blank')}
  ```
- Commit and push to GitHub
- Vercel will auto-redeploy

### Step 5: Share Your Link!
Share the AI Clinical Co-Pilot URL with anyone:
`https://ai-clinical-copilot.vercel.app`

---

## Option 2: Deploy to Netlify (Alternative - FREE)

1. Go to https://netlify.com
2. Sign in with GitHub
3. Click "Add new site" → "Import an existing project"
4. Select your GitHub repository
5. Configure build settings:
   - **Base directory**: `AI Clinical Co-Pilot`
   - **Build command**: `npm run build`
   - **Publish directory**: `.next`
6. Deploy!

---

## Option 3: Deploy to AWS (Your Previous Plan)

Follow the guides in the `AWS_DEPLOYMENT_PACKAGE` folder for EC2 deployment.
This gives you more control but requires:
- AWS account
- EC2 instance setup
- Domain configuration
- More technical setup

---

## Recommended Approach

**For Quick Sharing (5 minutes):**
→ Use Vercel (Option 1)

**For Production/Enterprise:**
→ Use AWS (Option 3)

---

## After Deployment

Your friend can access the app by:
1. Opening the Vercel URL in any browser
2. No installation needed
3. Works on any device (laptop, phone, tablet)

Example: `https://ai-clinical-copilot.vercel.app`
