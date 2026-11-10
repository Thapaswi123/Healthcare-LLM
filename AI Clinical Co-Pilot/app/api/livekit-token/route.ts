import { NextResponse } from 'next/server'
import { AccessToken } from 'livekit-server-sdk'

const LIVEKIT_API_KEY = process.env.LIVEKIT_API_KEY || "APIwMuQEYbRHZaT"
const LIVEKIT_SECRET = process.env.LIVEKIT_SECRET || "gCq8ovz5RzfJkBMXVYvNGhkjXtf8Zt3lfqzmFN8aNvs"
const LIVEKIT_URL = process.env.LIVEKIT_URL || "wss://meet.livekit.cloud"

export async function GET(request: Request) {
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

    console.log('Token generated for:', { name, room, role })

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
