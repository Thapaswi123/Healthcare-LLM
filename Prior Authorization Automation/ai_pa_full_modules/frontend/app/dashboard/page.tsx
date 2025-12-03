'use client'
import { useEffect, useState } from 'react'

export default function Dash(){
  const [user, setUser] = useState('')
  const [token, setToken] = useState('')
  
  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    const storedToken = localStorage.getItem('token')
    setUser(storedUser || 'Guest')
    setToken(storedToken || 'Not logged in')
  }, [])
  
  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    window.location.href='/login'
  }
  
  return(<div style={{padding:'40px',fontFamily:'Arial'}}>
    <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'30px'}}>
      <h1>Dashboard</h1>
      <button onClick={handleLogout} style={{padding:'10px 20px',backgroundColor:'#dc3545',color:'white',border:'none',borderRadius:'4px',cursor:'pointer'}}>Logout</button>
    </div>
    
    <div style={{backgroundColor:'#e3f2fd',padding:'20px',borderRadius:'8px',marginBottom:'20px'}}>
      <h3>Welcome, {user}!</h3>
      <p style={{color:'#666',fontSize:'14px'}}>Token: {token.substring(0,30)}...</p>
    </div>
    
    <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit, minmax(250px, 1fr))',gap:'20px'}}>
      <div style={{padding:'20px',backgroundColor:'#fff3cd',borderRadius:'8px',border:'1px solid #ffc107'}}>
        <h3>📋 Prior Authorizations</h3>
        <p style={{fontSize:'32px',fontWeight:'bold',color:'#856404'}}>24</p>
        <p style={{color:'#666'}}>Pending requests</p>
      </div>
      
      <div style={{padding:'20px',backgroundColor:'#d1ecf1',borderRadius:'8px',border:'1px solid #17a2b8'}}>
        <h3>✅ Approved</h3>
        <p style={{fontSize:'32px',fontWeight:'bold',color:'#0c5460'}}>156</p>
        <p style={{color:'#666'}}>This month</p>
      </div>
      
      <div style={{padding:'20px',backgroundColor:'#d4edda',borderRadius:'8px',border:'1px solid #28a745'}}>
        <h3>📊 Claims</h3>
        <p style={{fontSize:'32px',fontWeight:'bold',color:'#155724'}}>89</p>
        <p style={{color:'#666'}}>Active claims</p>
      </div>
      
      <div style={{padding:'20px',backgroundColor:'#f8d7da',borderRadius:'8px',border:'1px solid #dc3545'}}>
        <h3>⏰ Urgent</h3>
        <p style={{fontSize:'32px',fontWeight:'bold',color:'#721c24'}}>5</p>
        <p style={{color:'#666'}}>Need attention</p>
      </div>
    </div>
    
    <div style={{marginTop:'30px'}}>
      <h2>Quick Actions</h2>
      <div style={{display:'flex',gap:'10px',marginTop:'15px'}}>
        <a href="/prior-auth" style={{padding:'12px 24px',backgroundColor:'#0070f3',color:'white',textDecoration:'none',borderRadius:'4px'}}>New Prior Auth</a>
        <a href="/claims" style={{padding:'12px 24px',backgroundColor:'#28a745',color:'white',textDecoration:'none',borderRadius:'4px'}}>View Claims</a>
        <a href="/ehr-sim" style={{padding:'12px 24px',backgroundColor:'#17a2b8',color:'white',textDecoration:'none',borderRadius:'4px'}}>EHR Simulator</a>
      </div>
    </div>
  </div>)
}