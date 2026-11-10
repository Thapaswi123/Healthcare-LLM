'use client'
import { useState } from 'react'

export default function PA(){
  const [formData, setFormData] = useState({
    patientName: '',
    patientId: '',
    procedure: '',
    diagnosis: '',
    urgency: 'routine'
  })
  const [submitted, setSubmitted] = useState(false)
  const [requestId, setRequestId] = useState('')
  const [loading, setLoading] = useState(false)
  
  const handleSubmit = async (e: any) => {
    e.preventDefault()
    setLoading(true)
    
    try {
      const response = await fetch('/api/prior-auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })
      
      const data = await response.json()
      
      if (data.success) {
        setRequestId(data.priorAuth.id)
        setSubmitted(true)
        
        // Show success message with claim info
        alert(`✅ Success!\n\nPrior Authorization: ${data.priorAuth.id}\nClaim Created: ${data.claim.id}\n\nYou can view the claim in "View Claims" page.`)
        
        setTimeout(() => {
          setSubmitted(false)
          setFormData({patientName:'',patientId:'',procedure:'',diagnosis:'',urgency:'routine'})
        }, 5000)
      }
    } catch (error) {
      console.error('Failed to submit:', error)
    } finally {
      setLoading(false)
    }
  }
  
  return(<div style={{padding:'40px',fontFamily:'Arial',maxWidth:'800px',margin:'0 auto'}}>
    <h1>📋 Prior Authorization Request</h1>
    <p style={{color:'#666',marginBottom:'30px'}}>Submit a new prior authorization request</p>
    
    <form onSubmit={handleSubmit} style={{backgroundColor:'white',padding:'30px',borderRadius:'8px',boxShadow:'0 2px 8px rgba(0,0,0,0.1)'}}>
      <div style={{marginBottom:'20px'}}>
        <label style={{display:'block',marginBottom:'5px',fontWeight:'bold'}}>Patient Name *</label>
        <input 
          required
          value={formData.patientName}
          onChange={e=>setFormData({...formData,patientName:e.target.value})}
          style={{width:'100%',padding:'10px',fontSize:'16px',border:'1px solid #ccc',borderRadius:'4px'}}
          placeholder="Enter patient name"
        />
      </div>
      
      <div style={{marginBottom:'20px'}}>
        <label style={{display:'block',marginBottom:'5px',fontWeight:'bold'}}>Patient ID *</label>
        <input 
          required
          value={formData.patientId}
          onChange={e=>setFormData({...formData,patientId:e.target.value})}
          style={{width:'100%',padding:'10px',fontSize:'16px',border:'1px solid #ccc',borderRadius:'4px'}}
          placeholder="e.g., P001"
        />
      </div>
      
      <div style={{marginBottom:'20px'}}>
        <label style={{display:'block',marginBottom:'5px',fontWeight:'bold'}}>Procedure/Treatment *</label>
        <input 
          required
          value={formData.procedure}
          onChange={e=>setFormData({...formData,procedure:e.target.value})}
          style={{width:'100%',padding:'10px',fontSize:'16px',border:'1px solid #ccc',borderRadius:'4px'}}
          placeholder="e.g., MRI Scan, Surgery, Medication"
        />
      </div>
      
      <div style={{marginBottom:'20px'}}>
        <label style={{display:'block',marginBottom:'5px',fontWeight:'bold'}}>Diagnosis *</label>
        <textarea 
          required
          value={formData.diagnosis}
          onChange={e=>setFormData({...formData,diagnosis:e.target.value})}
          style={{width:'100%',padding:'10px',fontSize:'16px',border:'1px solid #ccc',borderRadius:'4px',minHeight:'100px'}}
          placeholder="Enter diagnosis and clinical justification"
        />
      </div>
      
      <div style={{marginBottom:'20px'}}>
        <label style={{display:'block',marginBottom:'5px',fontWeight:'bold'}}>Urgency Level *</label>
        <select 
          value={formData.urgency}
          onChange={e=>setFormData({...formData,urgency:e.target.value})}
          style={{width:'100%',padding:'10px',fontSize:'16px',border:'1px solid #ccc',borderRadius:'4px'}}
        >
          <option value="routine">Routine</option>
          <option value="urgent">Urgent</option>
          <option value="emergency">Emergency</option>
        </select>
      </div>
      
      {submitted && (
        <div style={{padding:'15px',backgroundColor:'#d4edda',color:'#155724',borderRadius:'4px',marginBottom:'20px'}}>
          ✅ Prior authorization request submitted successfully!<br/>
          <strong>Request ID: {requestId}</strong><br/>
          Status: {formData.urgency === 'emergency' ? 'Auto-Approved' : 'Under Review'}<br/>
          <br/>
          <a href="/claims" style={{display:'inline-block',marginTop:'10px',padding:'8px 16px',backgroundColor:'#155724',color:'white',textDecoration:'none',borderRadius:'4px',fontSize:'14px'}}>
            View in Claims →
          </a>
        </div>
      )}
      
      <div style={{display:'flex',gap:'10px'}}>
        <button 
          type="submit"
          disabled={loading}
          style={{flex:1,padding:'12px',fontSize:'16px',backgroundColor:loading?'#ccc':'#0070f3',color:'white',border:'none',borderRadius:'4px',cursor:loading?'not-allowed':'pointer'}}
        >{loading ? 'Submitting...' : 'Submit Request'}</button>
        <button 
          type="button"
          onClick={()=>setFormData({patientName:'',patientId:'',procedure:'',diagnosis:'',urgency:'routine'})}
          style={{padding:'12px 30px',fontSize:'16px',backgroundColor:'#6c757d',color:'white',border:'none',borderRadius:'4px',cursor:'pointer'}}
        >Clear</button>
      </div>
    </form>
    
    <div style={{marginTop:'30px'}}>
      <a href="/dashboard" style={{color:'#0070f3',textDecoration:'none'}}>← Back to Dashboard</a>
    </div>
  </div>)
}