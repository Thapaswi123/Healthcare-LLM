'use client'
import { useEffect, useState } from 'react'

export default function Claims(){
  const [claims, setClaims] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    fetchClaims()
  }, [])
  
  const fetchClaims = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/claims', {
        cache: 'no-store' // Prevent caching
      })
      const data = await response.json()
      if (data.success) {
        setClaims(data.claims)
        console.log('Claims refreshed:', data.claims.length, 'claims found')
      }
    } catch (error) {
      console.error('Failed to fetch claims:', error)
      alert('Failed to refresh claims. Check console for details.')
    } finally {
      setLoading(false)
    }
  }
  
  const handleNewClaim = () => {
    alert('New Claim form would open here. This is a demo - full implementation would show a modal or navigate to a form.')
  }
  
  const handleExport = () => {
    // Convert claims to CSV
    const csv = [
      ['Claim ID', 'Patient', 'Status', 'Amount', 'Date'],
      ...claims.map(c => [c.id, c.patient, c.status, c.amount, c.date])
    ].map(row => row.join(',')).join('\n')
    
    // Download CSV
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `claims-${new Date().toISOString().split('T')[0]}.csv`
    a.click()
    window.URL.revokeObjectURL(url)
  }
  
  return(<div style={{padding:'40px',fontFamily:'Arial'}}>
    <h1>Claims Management</h1>
    <p style={{color:'#666',marginBottom:'30px'}}>View and manage insurance claims</p>
    
    <div style={{marginBottom:'20px'}}>
      <button onClick={handleNewClaim} style={{padding:'10px 20px',backgroundColor:'#0070f3',color:'white',border:'none',borderRadius:'4px',cursor:'pointer',marginRight:'10px'}}>+ New Claim</button>
      <button onClick={fetchClaims} style={{padding:'10px 20px',backgroundColor:'#28a745',color:'white',border:'none',borderRadius:'4px',cursor:'pointer',marginRight:'10px'}}>Refresh</button>
      <button onClick={handleExport} style={{padding:'10px 20px',backgroundColor:'#6c757d',color:'white',border:'none',borderRadius:'4px',cursor:'pointer'}}>Export</button>
    </div>
    
    {loading ? (
      <div style={{padding:'40px',textAlign:'center',color:'#666'}}>Loading claims...</div>
    ) : (
    <table style={{width:'100%',borderCollapse:'collapse',backgroundColor:'white',boxShadow:'0 2px 4px rgba(0,0,0,0.1)'}}>
      <thead>
        <tr style={{backgroundColor:'#f8f9fa',borderBottom:'2px solid #dee2e6'}}>
          <th style={{padding:'15px',textAlign:'left'}}>Claim ID</th>
          <th style={{padding:'15px',textAlign:'left'}}>Patient</th>
          <th style={{padding:'15px',textAlign:'left'}}>Status</th>
          <th style={{padding:'15px',textAlign:'left'}}>Amount</th>
          <th style={{padding:'15px',textAlign:'left'}}>Date</th>
        </tr>
      </thead>
      <tbody>
        {claims.map(claim => (
          <tr key={claim.id} style={{borderBottom:'1px solid #dee2e6'}}>
            <td style={{padding:'15px'}}>{claim.id}</td>
            <td style={{padding:'15px'}}>{claim.patient}</td>
            <td style={{padding:'15px'}}>
              <span style={{
                padding:'5px 10px',
                borderRadius:'4px',
                backgroundColor: claim.status === 'Approved' ? '#d4edda' : claim.status === 'Pending' ? '#fff3cd' : '#d1ecf1',
                color: claim.status === 'Approved' ? '#155724' : claim.status === 'Pending' ? '#856404' : '#0c5460'
              }}>{claim.status}</span>
            </td>
            <td style={{padding:'15px'}}>{claim.amount}</td>
            <td style={{padding:'15px'}}>{claim.date}</td>
          </tr>
        ))}
      </tbody>
    </table>
    )}
    
    <div style={{marginTop:'20px'}}>
      <a href="/dashboard" style={{color:'#0070f3',textDecoration:'none'}}>← Back to Dashboard</a>
    </div>
  </div>)
}