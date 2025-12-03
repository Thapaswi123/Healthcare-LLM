export default function Home() {
  return (
    <div style={{ padding: '40px', fontFamily: 'Arial, sans-serif' }}>
      <h1>AI Prior Authorization - Full Modules</h1>
      <p>Welcome to the AI Prior Authorization System</p>
      
      <div style={{ marginTop: '30px' }}>
        <h2>Available Modules:</h2>
        <ul style={{ fontSize: '18px', lineHeight: '2' }}>
          <li><a href="/dashboard" style={{ color: '#0070f3' }}>📊 Dashboard</a></li>
          <li><a href="/claims" style={{ color: '#0070f3' }}>📝 Claims Management</a></li>
          <li><a href="/ehr-sim" style={{ color: '#0070f3' }}>🏥 EHR Simulator</a></li>
          <li><a href="/login" style={{ color: '#0070f3' }}>🔐 Login</a></li>
          <li><a href="/prior-auth" style={{ color: '#0070f3' }}>📋 Prior Authorization</a></li>
        </ul>
      </div>
      
      <div style={{ marginTop: '30px', padding: '20px', backgroundColor: '#f0f0f0', borderRadius: '8px' }}>
        <h3>System Features:</h3>
        <ul>
          <li>✅ Dashboard with analytics</li>
          <li>✅ Claims processing and management</li>
          <li>✅ EHR system simulator</li>
          <li>✅ User authentication (JWT)</li>
          <li>✅ Prior authorization workflow</li>
        </ul>
      </div>
    </div>
  )
}
