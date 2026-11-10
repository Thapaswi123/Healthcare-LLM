# Patient Communication Agent - Video Chat Setup

## Overview
This Patient Communication Agent now includes **LiveKit-based video chat** functionality for HIPAA-compliant patient-provider video consultations.

## Features
- ✅ Real-time video and audio communication
- ✅ Screen sharing capability
- ✅ Role-based access (Patient, Provider, Viewer)
- ✅ Audit logging for HIPAA compliance
- ✅ Room-based consultations
- ✅ Moderation controls

## Setup Instructions

### 1. Install Dependencies
```bash
cd "Patient Communication Agent/patient_comm_app"
npm install
```

### 2. Configure LiveKit

#### Option A: Use Demo Server (Quick Start)
The app comes pre-configured with LiveKit's demo server. No additional setup needed!

#### Option B: Use Your Own LiveKit Server (Production)
1. Sign up for LiveKit Cloud: https://livekit.io/
2. Get your API Key and Secret from the dashboard
3. Update `.env.local`:
```env
LIVEKIT_API_KEY=your_api_key_here
LIVEKIT_SECRET=your_secret_here
LIVEKIT_URL=wss://your-project.livekit.cloud
```

### 3. Run the Application
```bash
# Development mode
npm run dev

# Production mode
npm run build
npm start
```

### 4. Access Video Chat
- Main app: `http://localhost:3000`
- Video chat: `http://localhost:3000/video-chat`

## Usage

### For Patients:
1. Navigate to `/video-chat`
2. Enter your name
3. Enter room ID (provided by healthcare provider)
4. Select role: "Patient"
5. Click "Join Video Consultation"

### For Healthcare Providers:
1. Navigate to `/video-chat`
2. Enter your name
3. Create or enter room ID
4. Select role: "Healthcare Provider"
5. Click "Join Video Consultation"
6. Share room ID with patient

### For Viewers (Observers):
1. Select role: "Viewer (No Camera/Mic)"
2. Join room to observe without publishing video/audio

## API Endpoints

### GET /api/livekit-token
Generate access token for video room
- Query params: `name`, `room`, `role`
- Returns: `{ token, url }`

### POST /api/moderate
Moderate video room (kick participants, etc.)
- Body: `{ action, room, identity }`
- Actions: `kick`

## HIPAA Compliance Features

### Implemented:
- ✅ Audit logging (all joins/actions logged to `audit.log`)
- ✅ Role-based access control
- ✅ Secure token-based authentication
- ✅ End-to-end encryption (via LiveKit)

### For Production:
- [ ] Use production LiveKit server with proper security
- [ ] Implement user authentication (OAuth, SAML)
- [ ] Store audit logs in secure database
- [ ] Add session recording with consent
- [ ] Implement data retention policies
- [ ] Add Business Associate Agreement (BAA) with LiveKit

## Deployment

### AWS EC2 Deployment:
```bash
# Upload files via WinSCP
# SSH into server via PuTTY

cd "Patient Communication Agent/patient_comm_app"
npm install
npm run build

# Start with PM2
pm2 start npm --name "patient-comm" -- start -- --port 3006

# Or use ecosystem file
pm2 start ecosystem.config.js
```

### Environment Variables on Server:
```bash
# Create .env.local on server
nano .env.local

# Add your LiveKit credentials
LIVEKIT_API_KEY=your_key
LIVEKIT_SECRET=your_secret
LIVEKIT_URL=wss://your-server.livekit.cloud
```

## Troubleshooting

### Video not showing:
- Check browser permissions for camera/microphone
- Ensure HTTPS is used (required for WebRTC)
- Check firewall settings

### Connection failed:
- Verify LiveKit credentials in `.env.local`
- Check network connectivity
- Ensure WebSocket ports are open

### Audio issues:
- Check microphone permissions
- Test with different browsers
- Verify audio device is selected

## Security Notes

⚠️ **Important for Production:**
1. Never commit `.env.local` to version control
2. Use HTTPS in production (required for WebRTC)
3. Implement proper user authentication
4. Set up proper CORS policies
5. Enable rate limiting on API endpoints
6. Regular security audits

## Support
For LiveKit documentation: https://docs.livekit.io/
For HIPAA compliance: https://www.hhs.gov/hipaa/
