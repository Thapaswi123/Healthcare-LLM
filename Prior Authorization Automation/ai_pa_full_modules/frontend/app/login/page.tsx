
'use client'
import { useState } from 'react'
export default function Login(){
 const [email,setEmail]=useState('')
 const [pwd,setPwd]=useState('')
 const [error,setError]=useState('')
 const [success,setSuccess]=useState('')
 
 const handleLogin = async () => {
   setError('')
   setSuccess('')
   
   if(!email || !pwd){
     setError('Please enter both email and password')
     return
   }
   
   try {
     // Call real backend API
     const response = await fetch('/api/auth/login', {
       method: 'POST',
       headers: { 'Content-Type': 'application/json' },
       body: JSON.stringify({ email, pwd })
     })
     
     const data = await response.json()
     
     if (data.success) {
       localStorage.setItem('token', data.token)
       localStorage.setItem('user', data.user.email)
       localStorage.setItem('userName', data.user.name)
       localStorage.setItem('userRole', data.user.role)
       
       setSuccess('Login successful! Redirecting...')
       
       setTimeout(() => {
         window.location.href='/dashboard'
       }, 1000)
     } else {
       setError(data.error || 'Login failed')
     }
   } catch (err) {
     setError('Login failed. Please try again.')
   }
 }
 
 return(<div style={{padding:'40px',maxWidth:'400px',margin:'0 auto',fontFamily:'Arial'}}>
  <h2>Login</h2>
  <p style={{color:'#666',marginBottom:'20px'}}>Login with your credentials</p>
  
  <div style={{marginBottom:'15px'}}>
    <label style={{display:'block',marginBottom:'5px'}}>Email:</label>
    <input 
      onChange={e=>setEmail(e.target.value)} 
      placeholder="email@example.com"
      style={{width:'100%',padding:'10px',fontSize:'16px',border:'1px solid #ccc',borderRadius:'4px'}}
    />
  </div>
  
  <div style={{marginBottom:'15px'}}>
    <label style={{display:'block',marginBottom:'5px'}}>Password:</label>
    <input 
      onChange={e=>setPwd(e.target.value)} 
      placeholder="password" 
      type="password"
      style={{width:'100%',padding:'10px',fontSize:'16px',border:'1px solid #ccc',borderRadius:'4px'}}
    />
  </div>
  
  {error && <div style={{padding:'10px',backgroundColor:'#ffebee',color:'#c62828',borderRadius:'4px',marginBottom:'15px'}}>{error}</div>}
  {success && <div style={{padding:'10px',backgroundColor:'#e8f5e9',color:'#2e7d32',borderRadius:'4px',marginBottom:'15px'}}>{success}</div>}
  
  <button 
    onClick={handleLogin}
    style={{width:'100%',padding:'12px',fontSize:'16px',backgroundColor:'#0070f3',color:'white',border:'none',borderRadius:'4px',cursor:'pointer'}}
  >Login</button>
  
  <div style={{marginTop:'20px',padding:'15px',backgroundColor:'#f5f5f5',borderRadius:'4px',fontSize:'14px'}}>
    <strong>Demo Credentials:</strong><br/>
    Admin: admin@hospital.com / admin123<br/>
    Doctor: doctor@hospital.com / doctor123<br/>
    Nurse: nurse@hospital.com / nurse123
  </div>
 </div>)
}
