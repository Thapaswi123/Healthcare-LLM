# Video Chat Deployment Guide

## Files to Upload via WinSCP

Upload these new files to your EC2 server:

1. **API Route:**
   - `AI Clinical Co-Pilot/app/api/livekit-token/route.ts`

2. **Video Chat Page:**
   - `AI Clinical Co-Pilot/app/video-chat/page.tsx`

3. **Updated Files:**
   - `AI Clinical Co-Pilot/package.json` (updated with LiveKit dependencies)
   - `AI Clinical Co-Pilot/app/page.tsx` (updated with video chat button)

## Deployment Steps via PuTTY

```bash
# 1. Navigate to AI Clinical Co-Pilot directory
cd "AI Clinical Co-Pilot"

# 2. Install new dependencies
npm install

# 3. Rebuild the application
npm run build

# 4. Restart with PM2
pm2 restart ai-clinical-copilot

# 5. Check status
pm2 logs ai-clinical-copilot
```

## Access URLs

**Main Dashboard:**
```
http://3.227.251.11:3004
```

**Direct Video Chat:**
```
http://3.227.251.11:3004/video-chat
```

**Via Dashboard:**
1. Go to http://3.227.251.11:3004
2. Click "Patient Communication Agent"
3. Click "Start Video Chat" button

## Testing

1. Open the video chat URL in two different browsers/devices
2. Enter different names for each
3. Use the same Room ID
4. Click "Join Video Consultation"
5. You should see each other's video feeds

## Notes

- Uses LiveKit demo server by default (no additional setup needed)
- For production, sign up at https://livekit.io/ and update environment variables
- Video chat requires HTTPS in production (WebRTC requirement)
- Camera/microphone permissions must be granted by browser
