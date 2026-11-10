'use client'
import { useState, useEffect, useRef } from 'react'

export default function VideoChat() {
  const [name, setName] = useState('')
  const [roomId, setRoomId] = useState('patient-consultation')
  const [role, setRole] = useState('patient')
  const [isConnected, setIsConnected] = useState(false)
  const [room, setRoom] = useState(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const videoContainerRef = useRef(null)

  const joinRoom = async () => {
    if (!name.trim()) {
      setError('Please enter your name')
      return
    }

    setLoading(true)
    setError('')

    try {
      // Get token from backend
      const response = await fetch(`/api/livekit-token?name=${encodeURIComponent(name)}&room=${encodeURIComponent(roomId)}&role=${role}`)
      const { token, url } = await response.json()

      // Dynamically import LiveKit client
      const { connect, createLocalTracks } = await import('livekit-client')

      // Connect to room
      const lkRoom = await connect(url, token, {
        audio: true,
        video: true
      })

      setRoom(lkRoom)
      setIsConnected(true)

      // Publish local tracks if not viewer
      if (role !== 'viewer') {
        const tracks = await createLocalTracks({
          audio: true,
          video: true
        })

        tracks.forEach(track => {
          lkRoom.localParticipant.publishTrack(track)
          const element = track.attach()
          element.style.width = '100%'
          element.style.borderRadius = '8px'
          element.style.marginBottom = '10px'
          videoContainerRef.current?.appendChild(element)
        })
      }

      // Subscribe to remote tracks
      lkRoom.on('trackSubscribed', (track, publication, participant) => {
        const element = track.attach()
        element.style.width = '100%'
        element.style.borderRadius = '8px'
        element.style.marginBottom = '10px'
        
        const container = document.createElement('div')
        container.style.marginBottom = '15px'
        
        const label = document.createElement('div')
        label.textContent = participant.identity
        label.style.color = '#8b9dc3'
        label.style.fontSize = '14px'
        label.style.marginBottom = '5px'
        
        container.appendChild(label)
        container.appendChild(element)
        videoContainerRef.current?.appendChild(container)
      })

      // Handle participant disconnection
      lkRoom.on('participantDisconnected', (participant) => {
        console.log('Participant disconnected:', participant.identity)
      })

    } catch (err) {
      console.error('Connection error:', err)
      setError('Failed to connect to video chat. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const leaveRoom = () => {
    if (room) {
      room.disconnect()
      setRoom(null)
      setIsConnected(false)
      if (videoContainerRef.current) {
        videoContainerRef.current.innerHTML = ''
      }
    }
  }

  const startScreenShare = async () => {
    if (!room) return

    try {
      const { createLocalScreenTracks } = await import('livekit-client')
      const screenTracks = await createLocalScreenTracks({ audio: true })
      
      screenTracks.forEach(track => {
        room.localParticipant.publishTrack(track)
        const element = track.attach()
        element.style.width = '100%'
        element.style.borderRadius = '8px'
        element.style.marginBottom = '10px'
        videoContainerRef.current?.appendChild(element)
      })
    } catch (err) {
      console.error('Screen share error:', err)
      setError('Failed to start screen sharing')
    }
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0a1929', color: 'white', padding: '40px' }}>
      {/* Header */}
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '32px', marginBottom: '10px' }}>Patient Communication Agent - Video Chat</h1>
        <p style={{ color: '#8b9dc3', marginBottom: '40px' }}>
          HIPAA-compliant video consultation for patient-provider communication
        </p>

        {/* HIPAA Notice */}
        <div style={{ padding: '15px', backgroundColor: '#3d2a1a', borderLeft: '3px solid #ff9800', marginBottom: '30px', borderRadius: '4px' }}>
          <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>⚠️ HIPAA Compliance Notice</div>
          <div style={{ fontSize: '14px', color: '#ffb74d', lineHeight: '1.6' }}>
            This video consultation system is for demonstration purposes. In production, ensure end-to-end encryption,
            secure authentication, and proper audit logging are implemented for HIPAA compliance.
          </div>
        </div>

        {!isConnected ? (
          /* Join Form */
          <div style={{ backgroundColor: '#132f4c', padding: '40px', borderRadius: '8px', border: '1px solid #1e3a5f', maxWidth: '600px' }}>
            <h2 style={{ fontSize: '24px', marginBottom: '30px' }}>Join Video Consultation</h2>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: '#8b9dc3' }}>
                Your Name:
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                style={{
                  width: '100%',
                  padding: '12px',
                  backgroundColor: '#0a1929',
                  color: 'white',
                  border: '1px solid #1e3a5f',
                  borderRadius: '4px',
                  fontSize: '14px'
                }}
              />
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: '#8b9dc3' }}>
                Room ID:
              </label>
              <input
                type="text"
                value={roomId}
                onChange={(e) => setRoomId(e.target.value)}
                placeholder="patient-consultation"
                style={{
                  width: '100%',
                  padding: '12px',
                  backgroundColor: '#0a1929',
                  color: 'white',
                  border: '1px solid #1e3a5f',
                  borderRadius: '4px',
                  fontSize: '14px'
                }}
              />
            </div>

            <div style={{ marginBottom: '30px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: '#8b9dc3' }}>
                Join as:
              </label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px',
                  backgroundColor: '#0a1929',
                  color: 'white',
                  border: '1px solid #1e3a5f',
                  borderRadius: '4px',
                  fontSize: '14px'
                }}
              >
                <option value="patient">Patient</option>
                <option value="provider">Healthcare Provider</option>
                <option value="viewer">Viewer (No Camera/Mic)</option>
              </select>
            </div>

            {error && (
              <div style={{ padding: '12px', backgroundColor: '#dc2626', borderRadius: '4px', marginBottom: '20px', fontSize: '14px' }}>
                {error}
              </div>
            )}

            <button
              onClick={joinRoom}
              disabled={loading}
              style={{
                width: '100%',
                padding: '14px',
                backgroundColor: loading ? '#1e3a5f' : '#3b82f6',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                fontSize: '16px',
                fontWeight: '600',
                cursor: loading ? 'not-allowed' : 'pointer'
              }}
            >
              {loading ? 'Connecting...' : 'Join Video Consultation'}
            </button>
          </div>
        ) : (
          /* Video Room */
          <div>
            <div style={{ backgroundColor: '#132f4c', padding: '30px', borderRadius: '8px', border: '1px solid #1e3a5f', marginBottom: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <div>
                  <h2 style={{ fontSize: '20px', marginBottom: '5px' }}>Room: {roomId}</h2>
                  <p style={{ color: '#8b9dc3', fontSize: '14px' }}>Connected as: {name} ({role})</p>
                </div>
                <div style={{ display: 'flex', gap: '10px' }}>
                  {role !== 'viewer' && (
                    <button
                      onClick={startScreenShare}
                      style={{
                        padding: '10px 20px',
                        backgroundColor: '#16a34a',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontSize: '14px'
                      }}
                    >
                      Share Screen
                    </button>
                  )}
                  <button
                    onClick={leaveRoom}
                    style={{
                      padding: '10px 20px',
                      backgroundColor: '#dc2626',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      fontSize: '14px'
                    }}
                  >
                    Leave Room
                  </button>
                </div>
              </div>

              {/* Video Container */}
              <div
                ref={videoContainerRef}
                style={{
                  backgroundColor: '#0a1929',
                  padding: '20px',
                  borderRadius: '8px',
                  minHeight: '400px'
                }}
              />
            </div>

            {/* Instructions */}
            <div style={{ backgroundColor: '#132f4c', padding: '20px', borderRadius: '8px', border: '1px solid #1e3a5f' }}>
              <h3 style={{ fontSize: '16px', marginBottom: '10px' }}>Video Consultation Guidelines:</h3>
              <ul style={{ color: '#8b9dc3', fontSize: '14px', lineHeight: '1.8', paddingLeft: '20px' }}>
                <li>Ensure you're in a private, quiet location</li>
                <li>Check your camera and microphone are working</li>
                <li>Share your screen if you need to show documents or test results</li>
                <li>All sessions are logged for HIPAA compliance and quality assurance</li>
                <li>If you experience technical issues, try refreshing the page</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
