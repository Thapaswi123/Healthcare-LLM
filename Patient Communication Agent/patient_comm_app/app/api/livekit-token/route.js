import { NextResponse } from 'next/server'
import { AccessToken } from 'livekit-server-sdk'
import fs from 'fs'
import path from 'path'

const LIVEKIT_API_KEY = process.env.LIVEKIT_API_KEY || "demo_key"
const LIVEKIT_SECRET = process.env.LIVEKIT_SECRET || "demo_secret"
const LIVEKIT_URL = process.env.LIVEKIT_URL || "wss://demo.livekit.cloud"

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const name = searchParams.get('name') || 'Guest'
    const room = searchParams.get('room') || 'patient-consultation'
    const role = searchParams.get('role') || 'patient'

    // Create access token
    const at = new AccessToken(LIVEKIT_API_KEY, LIVEKIT_SECRET, { 
      identity: name 
    })
    
    at.addGrant({ 
      roomJoin: true, 
      room, 
      canPublish: role !== "viewer",
      canSubscribe: true
    })

    // Audit log
    const auditEntry = {
      event: "VIDEO_JOIN",
      name,
      room,
      role,
      timestamp: new Date().toISOString(),
      ipAddress: request.headers.get('x-forwarded-for') || 'unknown'
    }

    // Log to file (in production, use proper logging service)
    try {
      const logPath = path.join(process.cwd(), 'audit.log')
      fs.appendFileSync(logPath, JSON.stringify(auditEntry) + '\n')
    } catch (err) {
      console.error('Audit log error:', err)
    }

    return NextResponse.json({ 
      token: at.toJwt(), 
      url: LIVEKIT_URL 
    })
  } catch (error) {
    console.error('Token generation error:', error)
    return NextResponse.json(
      { error: 'Failed to generate token' },
      { status: 500 }
    )
  }
}
