'use client'
import { useState } from 'react'

export default function EHR(){
  const [patientId, setPatientId] = useState('')
  const [patientData, setPatientData] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  
  const handleSearch = async () => {
    if (!patientId) return
    
    setLoading(true)
    setError('')
    setPatientData(null)
    
    try {
      const response = await fetch(`/api/ehr/${patientId}`)
      const data = await response.json()
      
      if (data.success) {
        setPatientData(data.patient)
      } else {
        setError(data.error || 'Patient not found')
      }
    } catch (err) {
      setError('Failed to fetch patient data')
    } finally {
      setLoading(false)
    }
  }
  
  return(<div style={{padding:'40px',fontFamily:'Arial'}}>
    <h1>🏥 EHR Simulator</h1>
    <p style={{color:'#666',marginBottom:'30px'}}>Simulate Electronic Health Record queries</p>
    
    <div style={{backgroundColor:'#f8f9fa',padding:'20px',borderRadius:'8px',marginBottom:'30px'}}>
      <h3>Search Patient Records</h3>
      <div style={{display:'flex',gap:'10px',marginTop:'15px'}}>
        <input 
          value={patientId}
          onChange={e=>setPatientId(e.target.value)}
          placeholder="Enter Patient ID (e.g., P001)"
          style={{flex:1,padding:'10px',fontSize:'16px',border:'1px solid #ccc',borderRadius:'4px'}}
        />
        <button 
          onClick={handleSearch}
          style={{padding:'10px 30px',backgroundColor:'#0070f3',color:'white',border:'none',borderRadius:'4px',cursor:'pointer'}}
        >Search</button>
      </div>
      
      <div style={{marginTop:'15px',fontSize:'14px',color:'#666'}}>
        <strong>Available Patient IDs:</strong> P001, P002, P003
      </div>
    </div>
    
    {loading && (
      <div style={{padding:'40px',textAlign:'center',color:'#666'}}>Loading patient data...</div>
    )}
    
    {patientData && (
      <div style={{backgroundColor:'white',padding:'30px',borderRadius:'8px',boxShadow:'0 2px 8px rgba(0,0,0,0.1)'}}>
        <h2>Patient Record</h2>
        <div style={{marginTop:'20px'}}>
          <div style={{marginBottom:'15px'}}>
            <strong>Patient ID:</strong> {patientData.id}
          </div>
          <div style={{marginBottom:'15px'}}>
            <strong>Name:</strong> {patientData.name}
          </div>
          <div style={{marginBottom:'15px'}}>
            <strong>Age:</strong> {patientData.age} years
          </div>
          <div style={{marginBottom:'15px'}}>
            <strong>Gender:</strong> {patientData.gender}
          </div>
          <div style={{marginBottom:'15px'}}>
            <strong>Diagnosis:</strong> {patientData.diagnosis}
          </div>
          <div style={{marginBottom:'15px'}}>
            <strong>Insurance:</strong> {patientData.insurance}
          </div>
          <div style={{marginBottom:'15px'}}>
            <strong>Last Visit:</strong> {patientData.lastVisit}
          </div>
          <div style={{marginBottom:'15px'}}>
            <strong>Allergies:</strong> {patientData.allergies.join(', ')}
          </div>
          <div style={{marginBottom:'15px'}}>
            <strong>Current Medications:</strong>
            <ul style={{marginTop:'5px'}}>
              {patientData.medications.map((med: string, i: number) => <li key={i}>{med}</li>)}
            </ul>
          </div>
        </div>
      </div>
    )}
    
    {error && (
      <div style={{padding:'20px',backgroundColor:'#f8d7da',color:'#721c24',borderRadius:'8px'}}>
        {error}. Try P001, P002, or P003
      </div>
    )}
    
    <div style={{marginTop:'30px'}}>
      <a href="/dashboard" style={{color:'#0070f3',textDecoration:'none'}}>← Back to Dashboard</a>
    </div>
  </div>)
}