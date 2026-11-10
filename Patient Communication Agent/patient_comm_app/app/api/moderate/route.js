import { NextResponse } from 'next/server'
import { RoomServiceClient } from 'livekit-server-sdk'
import fs from 'fs'
import path from 'path'

const LIVEKIT_API_KEY = process.env.LIVEKIT_API_KEY || "demo_key"
const LIVEKIT_SECRET = process.env.LIVEKIT_SECRET || "demo_secret"
const LIVEKIT_URL = process.env.LIVEKIT_URL || "wss://demo.livekit.cloud"

const roomService = new RoomServiceClient(
  LIVEKIT_URL.replace("wss", "https"),
  LIVEKIT_API_KEY,
  LIVEKIT_SECRET
)

export async function POST(request) {
  try {
    const { action, room, identity } = await request.json()

    // Audit log
    const auditEntry = {
      event: "MODERATION_ACTION",
      action,
      room,
      identity,
      timestamp: new Date().toISOString()
    }

    try {
      const logPath = path.join(process.cwd(), 'audit.log')
      fs.appendFileSync(logPath, JSON.stringify(auditEntry) + '\n')
    } catch (err) {
      console.error('Audit log error:', err)
    }

    if (action === 'kick') {
      await roomService.removeParticipant(room, identity)
      return NextResponse.json({ success: true, message: 'Participant removed' })
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 })
  } catch (error) {
    console.error('Moderation error:', error)
    return NextResponse.json(
      { error: 'Moderation action failed' },
      { status: 500 }
    )
  }
}
