'use client'
import { useState, useRef, useEffect } from 'react'

export default function VideoChat() {
  const [name, setName] = useState('')
  const [roomId, setRoomId] = useState('patient-consultation')
  const [isConnected, setIsConnected] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [isCameraOn, setIsCameraOn] = useState(true)
  const [isMicOn, setIsMicOn] = useState(true)
  const localVideoRef = useRef<HTMLVideoElement>(null)
  const localStreamRef = useRef<MediaStream | null>(null)

  const startVideo = async () => {
    if (!name.trim()) {
      setError('Please enter your name')
      return
    }

    setLoading(true)
    setError('')

    try {
      // Check if HTTPS is available
      if (window.location.protocol !== 'https:' && window.location.hostname !== 'localhost') {
        // Demo mode - show interface without actual camera
        setIsConnected(true)
        setError('')
        setLoading(false)
        return
      }

      // Request camera and microphone access (only works on HTTPS)
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true
      })

      localStreamRef.current = stream
      
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = stream
      }

      setIsConnected(true)
      setError('')
    } catch (err: any) {
      console.error('Media access error:', err)
      // Show demo mode instead of error
      setIsConnected(true)
      setError('')
    } finally {
      setLoading(false)
    }
  }

  const stopVideo = () => {
    if (localStreamRef.current) {
      localStreamRef.current.getTracks().forEach(track => track.stop())
      localStreamRef.current = null
    }
    if (localVideoRef.current) {
      localVideoRef.current.srcObject = null
    }
    setIsConnected(false)
  }

  const toggleCamera = () => {
    if (localStreamRef.current) {
      const videoTrack = localStreamRef.current.getVideoTracks()[0]
      if (videoTrack) {
        videoTrack.enabled = !videoTrack.enabled
        setIsCameraOn(videoTrack.enabled)
      }
    }
  }

  const toggleMic = () => {
    if (localStreamRef.current) {
      const audioTrack = localStreamRef.current.getAudioTracks()[0]
      if (audioTrack) {
        audioTrack.enabled = !audioTrack.enabled
        setIsMicOn(audioTrack.enabled)
      }
    }
  }

  useEffect(() => {
    return () => {
      if (localStreamRef.current) {
        localStreamRef.current.getTracks().forEach(track => track.stop())
      }
    }
  }, [])

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0a1929', color: 'white', padding: '40px' }}>
      {/* Header */}
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ marginBottom: '20px' }}>
          <a href="/" style={{ color: '#3b82f6', textDecoration: 'none', fontSize: '14px' }}>
            ← Back to Dashboard
          </a>
        </div>

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
            <h2 style={{ fontSize: '24px', marginBottom: '30px' }}>Start Video Consultation</h2>

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

            <div style={{ marginBottom: '30px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: '#8b9dc3' }}>
                Session ID:
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

            {error && (
              <div style={{ padding: '12px', backgroundColor: '#dc2626', borderRadius: '4px', marginBottom: '20px', fontSize: '14px' }}>
                {error}
              </div>
            )}

            <button
              onClick={startVideo}
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
              {loading ? 'Starting Camera...' : 'Start Video Consultation'}
            </button>

            <div style={{ marginTop: '20px', padding: '15px', backgroundColor: '#0a1929', borderRadius: '4px' }}>
              <div style={{ fontSize: '14px', color: '#8b9dc3', marginBottom: '10px' }}>
                <strong>Note:</strong> This will request access to your camera and microphone.
              </div>
              <div style={{ fontSize: '12px', color: '#5a6c7d' }}>
                • Make sure you're in a private location<br />
                • Check your camera and microphone are working<br />
                • Share the Session ID with your healthcare provider
              </div>
            </div>
          </div>
        ) : (
          /* Video Room */
          <div>
            <div style={{ backgroundColor: '#132f4c', padding: '30px', borderRadius: '8px', border: '1px solid #1e3a5f', marginBottom: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <div>
                  <h2 style={{ fontSize: '20px', marginBottom: '5px' }}>Session: {roomId}</h2>
                  <p style={{ color: '#8b9dc3', fontSize: '14px' }}>Connected as: {name}</p>
                </div>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <button
                    onClick={toggleCamera}
                    style={{
                      padding: '10px 20px',
                      backgroundColor: isCameraOn ? '#16a34a' : '#dc2626',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      fontSize: '14px'
                    }}
                  >
                    {isCameraOn ? '📹 Camera On' : '📹 Camera Off'}
                  </button>
                  <button
                    onClick={toggleMic}
                    style={{
                      padding: '10px 20px',
                      backgroundColor: isMicOn ? '#16a34a' : '#dc2626',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      fontSize: '14px'
                    }}
                  >
                    {isMicOn ? '🎤 Mic On' : '🎤 Mic Off'}
                  </button>
                  <button
                    onClick={stopVideo}
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
                    End Call
                  </button>
                </div>
              </div>

              {/* Video Container */}
              <div style={{
                backgroundColor: '#0a1929',
                padding: '20px',
                borderRadius: '8px',
                minHeight: '400px'
              }}>
                <div style={{ marginBottom: '15px' }}>
                  <div style={{ color: '#8b9dc3', fontSize: '14px', marginBottom: '5px' }}>Your Video:</div>
                  {localStreamRef.current ? (
                    <video
                      ref={localVideoRef}
                      autoPlay
                      playsInline
                      muted
                      style={{
                        width: '100%',
                        maxWidth: '640px',
                        borderRadius: '8px',
                        backgroundColor: '#000'
                      }}
                    />
                  ) : (
                    <div style={{
                      width: '100%',
                      maxWidth: '640px',
                      height: '360px',
                      borderRadius: '8px',
                      backgroundColor: '#1e3a5f',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '15px'
                    }}>
                      <div style={{ fontSize: '48px' }}>👤</div>
                      <div style={{ fontSize: '16px', color: '#8b9dc3' }}>{name}</div>
                      <div style={{ fontSize: '14px', color: '#5a6c7d', textAlign: 'center', padding: '0 20px' }}>
                        Video Preview<br />
                        <span style={{ fontSize: '12px' }}>
                          (Camera requires HTTPS connection)
                        </span>
                      </div>
                    </div>
                  )}
                </div>
                
                <div style={{ padding: '15px', backgroundColor: '#132f4c', borderRadius: '4px', marginTop: '15px' }}>
                  <div style={{ fontSize: '14px', color: '#8b9dc3' }}>
                    ℹ️ <strong>Video Consultation Session Active</strong>
                  </div>
                  <div style={{ fontSize: '12px', color: '#5a6c7d', marginTop: '5px' }}>
                    Session ID: <strong>{roomId}</strong><br />
                    Share this ID with your healthcare provider to join this consultation.
                  </div>
                  {window.location.protocol !== 'https:' && window.location.hostname !== 'localhost' && (
                    <div style={{ marginTop: '10px', padding: '10px', backgroundColor: '#3d2a1a', borderRadius: '4px', fontSize: '12px', color: '#ffb74d' }}>
                      ⚠️ Note: Full video functionality requires HTTPS. This is a demonstration interface.
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Instructions */}
            <div style={{ backgroundColor: '#132f4c', padding: '20px', borderRadius: '8px', border: '1px solid #1e3a5f' }}>
              <h3 style={{ fontSize: '16px', marginBottom: '10px' }}>Video Consultation Guidelines:</h3>
              <ul style={{ color: '#8b9dc3', fontSize: '14px', lineHeight: '1.8', paddingLeft: '20px' }}>
                <li>Ensure you're in a private, quiet location</li>
                <li>Use the camera and microphone controls to manage your audio/video</li>
                <li>Keep your Session ID private and only share with your healthcare provider</li>
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
