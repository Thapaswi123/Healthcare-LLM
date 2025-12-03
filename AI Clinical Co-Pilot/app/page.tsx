'use client'
import { useState } from 'react'

// Reusable HIPAA Compliance Disclaimer Component
function HIPAADisclaimer() {
  return (
    <div style={{padding:'15px',backgroundColor:'#3d2a1a',borderLeft:'3px solid #ff9800',marginBottom:'20px',borderRadius:'4px'}}>
      <div style={{fontWeight:'bold',marginBottom:'5px'}}>⚠️ Important Notice</div>
      <div style={{fontSize:'14px',color:'#ffb74d',lineHeight:'1.6'}}>
        This system is for demonstration and educational purposes only. Not a substitute for professional medical advice, diagnosis, or treatment. 
        All outputs must be verified by licensed healthcare professionals. HIPAA-compliant in production environments only.
      </div>
    </div>
  )
}

export default function Home() {
  const [selectedModule, setSelectedModule] = useState<string | null>(null)

  return (
    <div style={{minHeight:'100vh',backgroundColor:'#0a1929',color:'white'}}>
      {/* Header */}
      <header style={{padding:'20px 40px',borderBottom:'1px solid #1e3a5f'}}>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
          <h1 style={{margin:0,fontSize:'24px',fontWeight:'normal'}}>AI Clinical Co-Pilot</h1>
          <div style={{color:'#8b9dc3',fontSize:'14px'}}>Healthcare LLM Platform</div>
        </div>
      </header>

      {/* Main Content */}
      <main style={{padding:'60px 40px'}}>
        {!selectedModule ? (
          <div style={{maxWidth:'1200px',margin:'0 auto'}}>
            <h2 style={{fontSize:'36px',marginBottom:'20px',fontWeight:'normal'}}>Healthcare LLM Platform</h2>
            <p style={{fontSize:'16px',color:'#8b9dc3',marginBottom:'60px',maxWidth:'700px'}}>
              Comprehensive suite of 10 AI-powered healthcare applications designed to enhance clinical operations, improve efficiency, reduce administrative burden, and ensure safe, compliant AI usage within healthcare settings.
            </p>

            {/* Module Cards */}
            <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit, minmax(300px, 1fr))',gap:'20px'}}>
              
              {/* Module 1: AI Clinical Co-Pilot */}
              <div 
                onClick={() => setSelectedModule('clinical-copilot')}
                style={{
                  backgroundColor:'#132f4c',
                  border:'1px solid #1e3a5f',
                  borderRadius:'8px',
                  padding:'30px',
                  cursor:'pointer',
                  transition:'all 0.3s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.borderColor = '#3b82f6'}
                onMouseLeave={(e) => e.currentTarget.style.borderColor = '#1e3a5f'}
              >
                <h3 style={{fontSize:'18px',marginBottom:'15px',fontWeight:'600'}}>AI Clinical Co-Pilot</h3>
                <p style={{fontSize:'14px',color:'#8b9dc3',lineHeight:'1.6'}}>
                  Enter symptoms or upload notes to generate differential diagnosis, summaries, and clinical insights.
                </p>
              </div>

              {/* Module 2: Automated Medical Coding */}
              <div 
                onClick={() => setSelectedModule('medical-coding')}
                style={{
                  backgroundColor:'#132f4c',
                  border:'1px solid #1e3a5f',
                  borderRadius:'8px',
                  padding:'30px',
                  cursor:'pointer',
                  transition:'all 0.3s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.borderColor = '#3b82f6'}
                onMouseLeave={(e) => e.currentTarget.style.borderColor = '#1e3a5f'}
              >
                <h3 style={{fontSize:'18px',marginBottom:'15px',fontWeight:'600'}}>Automated Medical Coding Assistant</h3>
                <p style={{fontSize:'14px',color:'#8b9dc3',lineHeight:'1.6'}}>
                  Map clinical notes to ICD-10, CPT, and HCPCS codes with human-readable descriptions.
                </p>
              </div>

              {/* Module 3: Patient Communication Agent */}
              <div 
                onClick={() => setSelectedModule('patient-communication')}
                style={{
                  backgroundColor:'#132f4c',
                  border:'1px solid #1e3a5f',
                  borderRadius:'8px',
                  padding:'30px',
                  cursor:'pointer',
                  transition:'all 0.3s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.borderColor = '#3b82f6'}
                onMouseLeave={(e) => e.currentTarget.style.borderColor = '#1e3a5f'}
              >
                <h3 style={{fontSize:'18px',marginBottom:'15px',fontWeight:'600'}}>Patient Communication Agent</h3>
                <p style={{fontSize:'14px',color:'#8b9dc3',lineHeight:'1.6'}}>
                  Safe, triage-aware chat interface for common patient questions and symptom guidance.
                </p>
              </div>

              {/* Module 4: Prior Authorization & Claims */}
              <div 
                onClick={() => window.open('http://localhost:3001', '_blank')}
                style={{
                  backgroundColor:'#132f4c',
                  border:'1px solid #1e3a5f',
                  borderRadius:'8px',
                  padding:'30px',
                  cursor:'pointer',
                  transition:'all 0.3s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.borderColor = '#3b82f6'}
                onMouseLeave={(e) => e.currentTarget.style.borderColor = '#1e3a5f'}
              >
                <h3 style={{fontSize:'18px',marginBottom:'15px',fontWeight:'600'}}>Prior Authorization & Claims Agent</h3>
                <p style={{fontSize:'14px',color:'#8b9dc3',lineHeight:'1.6'}}>
                  Full-featured Prior Authorization system with authentication, claims management, EHR simulator, and workflow automation.
                </p>
                <div style={{marginTop:'10px',fontSize:'12px',color:'#3b82f6'}}>
                  → Opens full application in new tab
                </div>
              </div>

              {/* Module 5: Clinical Trials Intelligence */}
              <div 
                onClick={() => setSelectedModule('clinical-trials')}
                style={{
                  backgroundColor:'#132f4c',
                  border:'1px solid #1e3a5f',
                  borderRadius:'8px',
                  padding:'30px',
                  cursor:'pointer',
                  transition:'all 0.3s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.borderColor = '#3b82f6'}
                onMouseLeave={(e) => e.currentTarget.style.borderColor = '#1e3a5f'}
              >
                <h3 style={{fontSize:'18px',marginBottom:'15px',fontWeight:'600'}}>Clinical Trials Intelligence</h3>
                <p style={{fontSize:'14px',color:'#8b9dc3',lineHeight:'1.6'}}>
                  Search for relevant clinical trials based on condition, demographics, and location.
                </p>
              </div>

              {/* Module 6: Radiology Workflow Assistant */}
              <div 
                onClick={() => setSelectedModule('radiology-workflow')}
                style={{
                  backgroundColor:'#132f4c',
                  border:'1px solid #1e3a5f',
                  borderRadius:'8px',
                  padding:'30px',
                  cursor:'pointer',
                  transition:'all 0.3s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.borderColor = '#3b82f6'}
                onMouseLeave={(e) => e.currentTarget.style.borderColor = '#1e3a5f'}
              >
                <h3 style={{fontSize:'18px',marginBottom:'15px',fontWeight:'600'}}>Radiology Workflow Assistant</h3>
                <p style={{fontSize:'14px',color:'#8b9dc3',lineHeight:'1.6'}}>
                  Text-based radiology report generation, findings summarization, and workflow optimization.
                </p>
              </div>

              {/* Module 7: Clinical Document De-Identification */}
              <div 
                onClick={() => setSelectedModule('document-deidentification')}
                style={{
                  backgroundColor:'#132f4c',
                  border:'1px solid #1e3a5f',
                  borderRadius:'8px',
                  padding:'30px',
                  cursor:'pointer',
                  transition:'all 0.3s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.borderColor = '#3b82f6'}
                onMouseLeave={(e) => e.currentTarget.style.borderColor = '#1e3a5f'}
              >
                <h3 style={{fontSize:'18px',marginBottom:'15px',fontWeight:'600'}}>Clinical Document De-Identification</h3>
                <p style={{fontSize:'14px',color:'#8b9dc3',lineHeight:'1.6'}}>
                  HIPAA-compliant removal of PHI from clinical documents while maintaining clinical utility.
                </p>
              </div>

              {/* Module 8: Medication Safety Assistant */}
              <div 
                onClick={() => setSelectedModule('medication-safety')}
                style={{
                  backgroundColor:'#132f4c',
                  border:'1px solid #1e3a5f',
                  borderRadius:'8px',
                  padding:'30px',
                  cursor:'pointer',
                  transition:'all 0.3s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.borderColor = '#3b82f6'}
                onMouseLeave={(e) => e.currentTarget.style.borderColor = '#1e3a5f'}
              >
                <h3 style={{fontSize:'18px',marginBottom:'15px',fontWeight:'600'}}>Medication Safety Assistant</h3>
                <p style={{fontSize:'14px',color:'#8b9dc3',lineHeight:'1.6'}}>
                  Drug interaction checks, dosage guidance, allergy alerts, and medication adherence tracking with FDA/RxNorm integration.
                </p>
              </div>

              {/* Module 9: Healthcare Knowledge Graph + LLM Q&A */}
              <div 
                onClick={() => setSelectedModule('knowledge-graph')}
                style={{
                  backgroundColor:'#132f4c',
                  border:'1px solid #1e3a5f',
                  borderRadius:'8px',
                  padding:'30px',
                  cursor:'pointer',
                  transition:'all 0.3s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.borderColor = '#3b82f6'}
                onMouseLeave={(e) => e.currentTarget.style.borderColor = '#1e3a5f'}
              >
                <h3 style={{fontSize:'18px',marginBottom:'15px',fontWeight:'600'}}>Healthcare Knowledge Graph + LLM Q&A</h3>
                <p style={{fontSize:'14px',color:'#8b9dc3',lineHeight:'1.6'}}>
                  Intelligent medical knowledge retrieval and question answering using structured knowledge graphs and LLMs.
                </p>
              </div>

              {/* Module 10: AI Nursing Workflow Automation */}
              <div 
                onClick={() => setSelectedModule('nursing-workflow')}
                style={{
                  backgroundColor:'#132f4c',
                  border:'1px solid #1e3a5f',
                  borderRadius:'8px',
                  padding:'30px',
                  cursor:'pointer',
                  transition:'all 0.3s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.borderColor = '#3b82f6'}
                onMouseLeave={(e) => e.currentTarget.style.borderColor = '#1e3a5f'}
              >
                <h3 style={{fontSize:'18px',marginBottom:'15px',fontWeight:'600'}}>AI Nursing Workflow Automation</h3>
                <p style={{fontSize:'14px',color:'#8b9dc3',lineHeight:'1.6'}}>
                  Automated nursing documentation, task prioritization, handoff reports, and workflow optimization.
                </p>
              </div>

            </div>

            {/* Footer Note */}
            <div style={{marginTop:'60px',padding:'20px',textAlign:'center',color:'#5a6c7d',fontSize:'12px'}}>
              <div>For demonstration and educational purposes only.</div>
              <div style={{marginTop:'5px'}}>Not a medical device. Not for clinical use.</div>
            </div>
          </div>
        ) : (
          <div>
            {selectedModule === 'clinical-copilot' && <ClinicalCopilotModule onBack={() => setSelectedModule(null)} />}
            {selectedModule === 'medical-coding' && <MedicalCodingModule onBack={() => setSelectedModule(null)} />}
            {selectedModule === 'patient-communication' && <PatientCommunicationModule onBack={() => setSelectedModule(null)} />}
            {selectedModule === 'clinical-trials' && <ClinicalTrialsModule onBack={() => setSelectedModule(null)} />}
            {selectedModule === 'radiology-workflow' && <RadiologyWorkflowModule onBack={() => setSelectedModule(null)} />}
            {selectedModule === 'document-deidentification' && <DocumentDeIdentificationModule onBack={() => setSelectedModule(null)} />}
            {selectedModule === 'medication-safety' && <MedicationSafetyModule onBack={() => setSelectedModule(null)} />}
            {selectedModule === 'knowledge-graph' && <KnowledgeGraphModule onBack={() => setSelectedModule(null)} />}
            {selectedModule === 'nursing-workflow' && <NursingWorkflowModule onBack={() => setSelectedModule(null)} />}
          </div>
        )}
      </main>
    </div>
  )
}

// Module 1: AI Clinical Co-Pilot
function ClinicalCopilotModule({ onBack }: { onBack: () => void }) {
  const [input, setInput] = useState('')
  const [result, setResult] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  const handleAnalyze = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/clinical-copilot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ input })
      })
      const data = await response.json()
      setResult(data)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{maxWidth:'1000px',margin:'0 auto'}}>
      <button onClick={onBack} style={{marginBottom:'20px',padding:'10px 20px',backgroundColor:'#1e3a5f',color:'white',border:'none',borderRadius:'4px',cursor:'pointer'}}>
        ← Back to Modules
      </button>
      
      <h2 style={{fontSize:'32px',marginBottom:'30px'}}>AI Clinical Co-Pilot</h2>
      
      <div style={{backgroundColor:'#132f4c',padding:'30px',borderRadius:'8px',border:'1px solid #1e3a5f'}}>
        <label style={{display:'block',marginBottom:'10px',fontSize:'14px',color:'#8b9dc3'}}>
          Enter patient symptoms or clinical notes:
        </label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="e.g., 45-year-old male with chest pain, shortness of breath, and diaphoresis for 2 hours..."
          style={{width:'100%',minHeight:'150px',padding:'15px',backgroundColor:'#0a1929',color:'white',border:'1px solid #1e3a5f',borderRadius:'4px',fontSize:'14px'}}
        />
        <button
          onClick={handleAnalyze}
          disabled={loading || !input}
          style={{marginTop:'20px',padding:'12px 30px',backgroundColor:loading||!input?'#1e3a5f':'#3b82f6',color:'white',border:'none',borderRadius:'4px',cursor:loading||!input?'not-allowed':'pointer'}}
        >
          {loading ? 'Analyzing...' : 'Generate Differential Diagnosis'}
        </button>
      </div>

      {result && (
        <div style={{marginTop:'30px',backgroundColor:'#132f4c',padding:'30px',borderRadius:'8px',border:'1px solid #1e3a5f'}}>
          <h3 style={{marginBottom:'20px'}}>Clinical Insights</h3>
          <div style={{marginBottom:'20px'}}>
            <h4 style={{color:'#3b82f6',marginBottom:'10px'}}>Summary:</h4>
            <p style={{color:'#8b9dc3',lineHeight:'1.6'}}>{result.summary}</p>
          </div>
          <div>
            <h4 style={{color:'#3b82f6',marginBottom:'10px'}}>Differential Diagnosis:</h4>
            {result.diagnoses?.map((d: any, i: number) => (
              <div key={i} style={{marginBottom:'15px',padding:'15px',backgroundColor:'#0a1929',borderRadius:'4px',borderLeft:'3px solid #3b82f6'}}>
                <div style={{fontWeight:'600',marginBottom:'5px'}}>{i + 1}. {d.condition}</div>
                <div style={{fontSize:'14px',color:'#8b9dc3'}}>{d.rationale}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

// Module 2: Medical Coding Assistant
function MedicalCodingModule({ onBack }: { onBack: () => void }) {
  const [clinicalNote, setClinicalNote] = useState('')
  const [codes, setCodes] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  const handleGenerate = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/medical-coding', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ clinicalNote })
      })
      const data = await response.json()
      setCodes(data)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{maxWidth:'1000px',margin:'0 auto'}}>
      <button onClick={onBack} style={{marginBottom:'20px',padding:'10px 20px',backgroundColor:'#1e3a5f',color:'white',border:'none',borderRadius:'4px',cursor:'pointer'}}>
        ← Back to Modules
      </button>
      
      <h2 style={{fontSize:'32px',marginBottom:'30px'}}>Automated Medical Coding Assistant</h2>
      
      <div style={{backgroundColor:'#132f4c',padding:'30px',borderRadius:'8px',border:'1px solid #1e3a5f'}}>
        <label style={{display:'block',marginBottom:'10px',fontSize:'14px',color:'#8b9dc3'}}>
          Enter clinical documentation:
        </label>
        <textarea
          value={clinicalNote}
          onChange={(e) => setClinicalNote(e.target.value)}
          placeholder="e.g., Patient presents with acute myocardial infarction. EKG shows ST elevation. Troponin elevated..."
          style={{width:'100%',minHeight:'150px',padding:'15px',backgroundColor:'#0a1929',color:'white',border:'1px solid #1e3a5f',borderRadius:'4px',fontSize:'14px'}}
        />
        <button
          onClick={handleGenerate}
          disabled={loading || !clinicalNote}
          style={{marginTop:'20px',padding:'12px 30px',backgroundColor:loading||!clinicalNote?'#1e3a5f':'#3b82f6',color:'white',border:'none',borderRadius:'4px',cursor:loading||!clinicalNote?'not-allowed':'pointer'}}
        >
          {loading ? 'Generating Codes...' : 'Generate Medical Codes'}
        </button>
      </div>

      {codes && (
        <div style={{marginTop:'30px',backgroundColor:'#132f4c',padding:'30px',borderRadius:'8px',border:'1px solid #1e3a5f'}}>
          <h3 style={{marginBottom:'20px'}}>Generated Codes</h3>
          
          <div style={{marginBottom:'25px'}}>
            <h4 style={{color:'#3b82f6',marginBottom:'15px'}}>ICD-10 Codes:</h4>
            {codes.icd10?.map((code: any, i: number) => (
              <div key={i} style={{marginBottom:'10px',padding:'12px',backgroundColor:'#0a1929',borderRadius:'4px'}}>
                <span style={{fontWeight:'600',color:'#3b82f6'}}>{code.code}</span>
                <span style={{marginLeft:'15px',color:'#8b9dc3'}}>{code.description}</span>
              </div>
            ))}
          </div>

          <div style={{marginBottom:'25px'}}>
            <h4 style={{color:'#3b82f6',marginBottom:'15px'}}>CPT Codes:</h4>
            {codes.cpt?.map((code: any, i: number) => (
              <div key={i} style={{marginBottom:'10px',padding:'12px',backgroundColor:'#0a1929',borderRadius:'4px'}}>
                <span style={{fontWeight:'600',color:'#3b82f6'}}>{code.code}</span>
                <span style={{marginLeft:'15px',color:'#8b9dc3'}}>{code.description}</span>
              </div>
            ))}
          </div>

          {codes.hcpcs && codes.hcpcs.length > 0 && (
            <div>
              <h4 style={{color:'#3b82f6',marginBottom:'15px'}}>HCPCS Codes:</h4>
              {codes.hcpcs.map((code: any, i: number) => (
                <div key={i} style={{marginBottom:'10px',padding:'12px',backgroundColor:'#0a1929',borderRadius:'4px'}}>
                  <span style={{fontWeight:'600',color:'#3b82f6'}}>{code.code}</span>
                  <span style={{marginLeft:'15px',color:'#8b9dc3'}}>{code.description}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

// Module 3: Patient Communication Agent
function PatientCommunicationModule({ onBack }: { onBack: () => void }) {
  const [messages, setMessages] = useState<any[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSend = async () => {
    if (!input.trim()) return
    
    const userMessage = { role: 'user', content: input }
    setMessages([...messages, userMessage])
    setInput('')
    setLoading(true)

    try {
      const response = await fetch('/api/patient-communication', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input, history: messages })
      })
      const data = await response.json()
      setMessages([...messages, userMessage, { role: 'assistant', content: data.response }])
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{maxWidth:'1000px',margin:'0 auto'}}>
      <button onClick={onBack} style={{marginBottom:'20px',padding:'10px 20px',backgroundColor:'#1e3a5f',color:'white',border:'none',borderRadius:'4px',cursor:'pointer'}}>
        ← Back to Modules
      </button>
      
      <h2 style={{fontSize:'32px',marginBottom:'30px'}}>Patient Communication Agent</h2>
      
      <div style={{backgroundColor:'#132f4c',padding:'30px',borderRadius:'8px',border:'1px solid #1e3a5f',minHeight:'500px',display:'flex',flexDirection:'column'}}>
        <div style={{flex:1,overflowY:'auto',marginBottom:'20px'}}>
          {messages.length === 0 && (
            <div style={{textAlign:'center',padding:'40px',color:'#5a6c7d'}}>
              <p>Start a conversation with the patient communication agent.</p>
              <p style={{fontSize:'14px',marginTop:'10px'}}>Example: "I have a headache and fever. What should I do?"</p>
            </div>
          )}
          {messages.map((msg, i) => (
            <div key={i} style={{marginBottom:'15px',padding:'15px',backgroundColor:msg.role==='user'?'#1e3a5f':'#0a1929',borderRadius:'4px',borderLeft:msg.role==='assistant'?'3px solid #3b82f6':'none'}}>
              <div style={{fontSize:'12px',color:'#8b9dc3',marginBottom:'5px'}}>{msg.role === 'user' ? 'You' : 'AI Assistant'}</div>
              <div style={{color:'white',lineHeight:'1.6'}}>{msg.content}</div>
            </div>
          ))}
          {loading && (
            <div style={{padding:'15px',color:'#8b9dc3'}}>AI is typing...</div>
          )}
        </div>
        
        <div style={{display:'flex',gap:'10px'}}>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Type your question..."
            style={{flex:1,padding:'12px',backgroundColor:'#0a1929',color:'white',border:'1px solid #1e3a5f',borderRadius:'4px'}}
          />
          <button
            onClick={handleSend}
            disabled={loading || !input.trim()}
            style={{padding:'12px 30px',backgroundColor:loading||!input.trim()?'#1e3a5f':'#3b82f6',color:'white',border:'none',borderRadius:'4px',cursor:loading||!input.trim()?'not-allowed':'pointer'}}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  )
}

// Module 4: Prior Authorization & Claims Agent
// This module redirects to the full Prior Authorization app on port 3001

// Module 5: Clinical Trials Intelligence
function ClinicalTrialsModule({ onBack }: { onBack: () => void }) {
  const [condition, setCondition] = useState('')
  const [age, setAge] = useState('')
  const [location, setLocation] = useState('')
  const [trials, setTrials] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  const handleSearch = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/clinical-trials', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ condition, age, location })
      })
      const data = await response.json()
      setTrials(data)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{maxWidth:'1000px',margin:'0 auto'}}>
      <button onClick={onBack} style={{marginBottom:'20px',padding:'10px 20px',backgroundColor:'#1e3a5f',color:'white',border:'none',borderRadius:'4px',cursor:'pointer'}}>
        ← Back to Modules
      </button>
      
      <h2 style={{fontSize:'32px',marginBottom:'30px'}}>Clinical Trials Intelligence</h2>
      
      <div style={{backgroundColor:'#132f4c',padding:'30px',borderRadius:'8px',border:'1px solid #1e3a5f'}}>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:'15px',marginBottom:'20px'}}>
          <div>
            <label style={{display:'block',marginBottom:'5px',fontSize:'14px',color:'#8b9dc3'}}>Condition:</label>
            <input
              value={condition}
              onChange={(e) => setCondition(e.target.value)}
              placeholder="e.g., Lung Cancer"
              style={{width:'100%',padding:'10px',backgroundColor:'#0a1929',color:'white',border:'1px solid #1e3a5f',borderRadius:'4px'}}
            />
          </div>
          <div>
            <label style={{display:'block',marginBottom:'5px',fontSize:'14px',color:'#8b9dc3'}}>Age:</label>
            <input
              value={age}
              onChange={(e) => setAge(e.target.value)}
              placeholder="e.g., 55"
              style={{width:'100%',padding:'10px',backgroundColor:'#0a1929',color:'white',border:'1px solid #1e3a5f',borderRadius:'4px'}}
            />
          </div>
          <div>
            <label style={{display:'block',marginBottom:'5px',fontSize:'14px',color:'#8b9dc3'}}>Location:</label>
            <input
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="e.g., New York"
              style={{width:'100%',padding:'10px',backgroundColor:'#0a1929',color:'white',border:'1px solid #1e3a5f',borderRadius:'4px'}}
            />
          </div>
        </div>
        <button
          onClick={handleSearch}
          disabled={loading || !condition}
          style={{padding:'12px 30px',backgroundColor:loading||!condition?'#1e3a5f':'#3b82f6',color:'white',border:'none',borderRadius:'4px',cursor:loading||!condition?'not-allowed':'pointer'}}
        >
          {loading ? 'Searching...' : 'Search Clinical Trials'}
        </button>
      </div>

      {trials && (
        <div style={{marginTop:'30px'}}>
          <h3 style={{marginBottom:'20px'}}>Found {trials.results?.length || 0} Clinical Trials</h3>
          {trials.results?.map((trial: any, i: number) => (
            <div key={i} style={{marginBottom:'20px',backgroundColor:'#132f4c',padding:'25px',borderRadius:'8px',border:'1px solid #1e3a5f'}}>
              <h4 style={{color:'#3b82f6',marginBottom:'10px'}}>{trial.title}</h4>
              <div style={{fontSize:'14px',color:'#8b9dc3',marginBottom:'15px'}}>{trial.description}</div>
              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'10px',fontSize:'13px'}}>
                <div><span style={{color:'#8b9dc3'}}>Phase:</span> <span style={{color:'white'}}>{trial.phase}</span></div>
                <div><span style={{color:'#8b9dc3'}}>Status:</span> <span style={{color:'white'}}>{trial.status}</span></div>
                <div><span style={{color:'#8b9dc3'}}>Location:</span> <span style={{color:'white'}}>{trial.location}</span></div>
                <div><span style={{color:'#8b9dc3'}}>NCT ID:</span> <span style={{color:'white'}}>{trial.nctId}</span></div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}


// Module 6: Radiology Workflow Assistant
function RadiologyWorkflowModule({ onBack }: { onBack: () => void }) {
  const [symptoms, setSymptoms] = useState('')
  const [age, setAge] = useState('')
  const [gender, setGender] = useState('male')
  const [results, setResults] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  const handleAnalyze = async () => {
    if (!symptoms) return
    setLoading(true)
    
    try {
      const response = await fetch('/api/diagnosis-assistant', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({symptoms, age, gender})
      })
      const data = await response.json()
      setResults(data)
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{maxWidth:'1000px',margin:'0 auto'}}>
      <button onClick={onBack} style={{marginBottom:'20px',padding:'10px 20px',backgroundColor:'#1e3a5f',color:'white',border:'none',borderRadius:'4px',cursor:'pointer'}}>
        ← Back to Modules
      </button>
      
      <h2 style={{fontSize:'32px',marginBottom:'30px'}}>Diagnosis Assistant</h2>
      
      <div style={{backgroundColor:'#132f4c',padding:'30px',borderRadius:'8px',border:'1px solid #1e3a5f',marginBottom:'30px'}}>
        <h3>Patient Information</h3>
        
        <div style={{marginTop:'20px'}}>
          <label style={{display:'block',marginBottom:'5px',fontWeight:'bold'}}>Symptoms *</label>
          <textarea
            value={symptoms}
            onChange={e=>setSymptoms(e.target.value)}
            placeholder="Enter patient symptoms (e.g., fever, cough, headache, fatigue)"
            style={{width:'100%',padding:'12px',fontSize:'16px',backgroundColor:'#0a1929',color:'white',border:'1px solid #1e3a5f',borderRadius:'4px',minHeight:'120px'}}
          />
        </div>

        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'20px',marginTop:'20px'}}>
          <div>
            <label style={{display:'block',marginBottom:'5px',fontWeight:'bold'}}>Age</label>
            <input
              type="number"
              value={age}
              onChange={e=>setAge(e.target.value)}
              placeholder="Patient age"
              style={{width:'100%',padding:'12px',fontSize:'16px',backgroundColor:'#0a1929',color:'white',border:'1px solid #1e3a5f',borderRadius:'4px'}}
            />
          </div>
          <div>
            <label style={{display:'block',marginBottom:'5px',fontWeight:'bold'}}>Gender</label>
            <select
              value={gender}
              onChange={e=>setGender(e.target.value)}
              style={{width:'100%',padding:'12px',fontSize:'16px',backgroundColor:'#0a1929',color:'white',border:'1px solid #1e3a5f',borderRadius:'4px'}}
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>

        <button
          onClick={handleAnalyze}
          disabled={loading || !symptoms}
          style={{marginTop:'20px',padding:'12px 40px',fontSize:'16px',backgroundColor:loading||!symptoms?'#1e3a5f':'#3b82f6',color:'white',border:'none',borderRadius:'4px',cursor:loading||!symptoms?'not-allowed':'pointer'}}
        >
          {loading ? 'Analyzing...' : 'Analyze Symptoms'}
        </button>
      </div>

      {results && (
        <div style={{backgroundColor:'#132f4c',padding:'30px',borderRadius:'8px',border:'1px solid #1e3a5f'}}>
          <h3>Differential Diagnosis</h3>
          {results.diagnoses?.map((diag: any, i: number) => (
            <div key={i} style={{padding:'20px',marginTop:'15px',backgroundColor:'#0a1929',borderRadius:'8px',borderLeft:`4px solid ${i===0?'#f44336':i===1?'#ff9800':'#4caf50'}`}}>
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                <h4 style={{margin:0}}>{diag.condition}</h4>
                <span style={{padding:'5px 15px',backgroundColor:i===0?'#ffebee':i===1?'#fff3e0':'#e8f5e9',color:i===0?'#c62828':i===1?'#e65100':'#2e7d32',borderRadius:'20px',fontSize:'14px',fontWeight:'bold'}}>
                  {diag.probability}% Match
                </span>
              </div>
              <p style={{marginTop:'10px',color:'#8b9dc3'}}>{diag.description}</p>
              <div style={{marginTop:'10px'}}>
                <strong>Recommended Tests:</strong> {diag.tests.join(', ')}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

// Module 7: Smart Documentation
function SmartDocumentationModule({ onBack }: { onBack: () => void }) {
  const [chiefComplaint, setChiefComplaint] = useState('')
  const [notes, setNotes] = useState('')
  const [generatedNote, setGeneratedNote] = useState('')
  const [loading, setLoading] = useState(false)

  const handleGenerate = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/smart-documentation', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({chiefComplaint, notes})
      })
      const data = await response.json()
      setGeneratedNote(data.note)
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedNote)
    alert('Copied to clipboard!')
  }

  return (
    <div style={{maxWidth:'1200px',margin:'0 auto'}}>
      <button onClick={onBack} style={{marginBottom:'20px',padding:'10px 20px',backgroundColor:'#1e3a5f',color:'white',border:'none',borderRadius:'4px',cursor:'pointer'}}>
        ← Back to Modules
      </button>
      
      <h2 style={{fontSize:'32px',marginBottom:'30px'}}>Smart Documentation Assistant</h2>
      
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'20px'}}>
        <div style={{backgroundColor:'#132f4c',padding:'30px',borderRadius:'8px',border:'1px solid #1e3a5f'}}>
          <h3>Input</h3>
          
          <div style={{marginTop:'20px'}}>
            <label style={{display:'block',marginBottom:'5px',fontWeight:'bold'}}>Chief Complaint</label>
            <input
              value={chiefComplaint}
              onChange={e=>setChiefComplaint(e.target.value)}
              placeholder="e.g., Chest pain"
              style={{width:'100%',padding:'12px',fontSize:'16px',backgroundColor:'#0a1929',color:'white',border:'1px solid #1e3a5f',borderRadius:'4px'}}
            />
          </div>

          <div style={{marginTop:'20px'}}>
            <label style={{display:'block',marginBottom:'5px',fontWeight:'bold'}}>Clinical Notes</label>
            <textarea
              value={notes}
              onChange={e=>setNotes(e.target.value)}
              placeholder="Enter your clinical observations..."
              style={{width:'100%',padding:'12px',fontSize:'16px',backgroundColor:'#0a1929',color:'white',border:'1px solid #1e3a5f',borderRadius:'4px',minHeight:'200px'}}
            />
          </div>

          <button
            onClick={handleGenerate}
            disabled={loading || !chiefComplaint}
            style={{marginTop:'20px',width:'100%',padding:'12px',fontSize:'16px',backgroundColor:loading||!chiefComplaint?'#1e3a5f':'#3b82f6',color:'white',border:'none',borderRadius:'4px',cursor:loading||!chiefComplaint?'not-allowed':'pointer'}}
          >
            {loading ? 'Generating...' : 'Generate Clinical Note'}
          </button>
        </div>

        <div style={{backgroundColor:'#132f4c',padding:'30px',borderRadius:'8px',border:'1px solid #1e3a5f'}}>
          <h3>Generated Note</h3>
          {generatedNote ? (
            <>
              <div style={{marginTop:'20px',padding:'20px',backgroundColor:'#0a1929',borderRadius:'8px',whiteSpace:'pre-wrap',fontSize:'14px',lineHeight:'1.6',maxHeight:'400px',overflowY:'auto'}}>
                {generatedNote}
              </div>
              <button 
                onClick={copyToClipboard}
                style={{marginTop:'20px',width:'100%',padding:'12px',fontSize:'16px',backgroundColor:'#4caf50',color:'white',border:'none',borderRadius:'4px',cursor:'pointer'}}
              >
                Copy to Clipboard
              </button>
            </>
          ) : (
            <div style={{marginTop:'20px',padding:'40px',textAlign:'center',color:'#5a6c7d',border:'2px dashed #1e3a5f',borderRadius:'8px'}}>
              Generated clinical note will appear here
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// Module 8: Drug Interaction Checker
function DrugInteractionModule({ onBack }: { onBack: () => void }) {
  const [medications, setMedications] = useState<string[]>([])
  const [newMed, setNewMed] = useState('')
  const [interactions, setInteractions] = useState<any>(null)

  const addMedication = () => {
    if (newMed && !medications.includes(newMed)) {
      const updated = [...medications, newMed]
      setMedications(updated)
      setNewMed('')
      checkInteractions(updated)
    }
  }

  const removeMedication = (med: string) => {
    const updated = medications.filter(m => m !== med)
    setMedications(updated)
    if (updated.length > 0) {
      checkInteractions(updated)
    } else {
      setInteractions(null)
    }
  }

  const checkInteractions = async (meds: string[]) => {
    try {
      const response = await fetch('/api/drug-interactions', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({medications: meds})
      })
      const data = await response.json()
      setInteractions(data)
    } catch (error) {
      console.error('Error:', error)
    }
  }

  return (
    <div style={{maxWidth:'1000px',margin:'0 auto'}}>
      <button onClick={onBack} style={{marginBottom:'20px',padding:'10px 20px',backgroundColor:'#1e3a5f',color:'white',border:'none',borderRadius:'4px',cursor:'pointer'}}>
        ← Back to Modules
      </button>
      
      <h2 style={{fontSize:'32px',marginBottom:'30px'}}>Drug Interaction Checker</h2>
      
      <div style={{backgroundColor:'#132f4c',padding:'30px',borderRadius:'8px',border:'1px solid #1e3a5f',marginBottom:'30px'}}>
        <h3>Add Medications</h3>
        <div style={{display:'flex',gap:'10px',marginTop:'20px'}}>
          <input
            value={newMed}
            onChange={e=>setNewMed(e.target.value)}
            onKeyPress={e=>e.key==='Enter'&&addMedication()}
            placeholder="Enter medication name"
            style={{flex:1,padding:'12px',fontSize:'16px',backgroundColor:'#0a1929',color:'white',border:'1px solid #1e3a5f',borderRadius:'4px'}}
          />
          <button
            onClick={addMedication}
            style={{padding:'12px 30px',fontSize:'16px',backgroundColor:'#3b82f6',color:'white',border:'none',borderRadius:'4px',cursor:'pointer'}}
          >
            Add
          </button>
        </div>

        {medications.length > 0 && (
          <div style={{marginTop:'20px'}}>
            <h4>Current Medications:</h4>
            <div style={{display:'flex',flexWrap:'wrap',gap:'10px',marginTop:'10px'}}>
              {medications.map(med => (
                <div key={med} style={{padding:'8px 15px',backgroundColor:'#1e3a5f',borderRadius:'20px',display:'flex',alignItems:'center',gap:'10px'}}>
                  <span>{med}</span>
                  <button onClick={()=>removeMedication(med)} style={{backgroundColor:'transparent',border:'none',color:'#3b82f6',cursor:'pointer',fontSize:'18px'}}>×</button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {interactions && (
        <div style={{backgroundColor:'#132f4c',padding:'30px',borderRadius:'8px',border:'1px solid #1e3a5f'}}>
          <h3>Interaction Analysis</h3>
          
          {interactions.interactions?.length > 0 ? (
            interactions.interactions.map((interaction: any, i: number) => (
              <div key={i} style={{padding:'20px',marginTop:'15px',backgroundColor:interaction.severity==='high'?'#3d1a1a':interaction.severity==='moderate'?'#3d2a1a':'#1a3d1a',borderRadius:'8px',borderLeft:`4px solid ${interaction.severity==='high'?'#f44336':interaction.severity==='moderate'?'#ff9800':'#4caf50'}`}}>
                <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                  <h4 style={{margin:0}}>{interaction.drug1} + {interaction.drug2}</h4>
                  <span style={{padding:'5px 15px',backgroundColor:interaction.severity==='high'?'#c62828':interaction.severity==='moderate'?'#e65100':'#2e7d32',color:'white',borderRadius:'20px',fontSize:'12px',fontWeight:'bold',textTransform:'uppercase'}}>
                    {interaction.severity}
                  </span>
                </div>
                <p style={{marginTop:'10px',color:'#8b9dc3'}}>{interaction.description}</p>
                <div style={{marginTop:'10px'}}>
                  <strong>Recommendation:</strong> {interaction.recommendation}
                </div>
              </div>
            ))
          ) : (
            <div style={{padding:'30px',textAlign:'center',color:'#4caf50',backgroundColor:'#1a3d1a',borderRadius:'8px'}}>
              ✅ No significant interactions detected
            </div>
          )}
        </div>
      )}
    </div>
  )
}


// Module 7: Clinical Document De-Identification
function DocumentDeIdentificationModule({ onBack }: { onBack: () => void }) {
  const [document, setDocument] = useState('')
  const [deidentified, setDeidentified] = useState('')
  const [loading, setLoading] = useState(false)

  const handleDeidentify = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/document-deidentification', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({document})
      })
      const data = await response.json()
      setDeidentified(data.deidentified)
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{maxWidth:'1000px',margin:'0 auto'}}>
      <button onClick={onBack} style={{marginBottom:'20px',padding:'10px 20px',backgroundColor:'#1e3a5f',color:'white',border:'none',borderRadius:'4px',cursor:'pointer'}}>
        ← Back to Modules
      </button>
      
      <HIPAADisclaimer />
      
      <h2 style={{fontSize:'32px',marginBottom:'30px'}}>Clinical Document De-Identification</h2>
      
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'20px'}}>
        <div style={{backgroundColor:'#132f4c',padding:'30px',borderRadius:'8px',border:'1px solid #1e3a5f'}}>
          <h3>Original Document</h3>
          <textarea
            value={document}
            onChange={e=>setDocument(e.target.value)}
            placeholder="Paste clinical document here..."
            style={{width:'100%',minHeight:'300px',padding:'15px',backgroundColor:'#0a1929',color:'white',border:'1px solid #1e3a5f',borderRadius:'4px',fontSize:'14px',marginTop:'15px'}}
          />
          <button
            onClick={handleDeidentify}
            disabled={loading || !document}
            style={{marginTop:'20px',width:'100%',padding:'12px',fontSize:'16px',backgroundColor:loading||!document?'#1e3a5f':'#3b82f6',color:'white',border:'none',borderRadius:'4px',cursor:loading||!document?'not-allowed':'pointer'}}
          >
            {loading ? 'De-identifying...' : 'Remove PHI'}
          </button>
        </div>

        <div style={{backgroundColor:'#132f4c',padding:'30px',borderRadius:'8px',border:'1px solid #1e3a5f'}}>
          <h3>De-identified Document</h3>
          {deidentified ? (
            <div style={{marginTop:'15px',padding:'15px',backgroundColor:'#0a1929',borderRadius:'4px',minHeight:'300px',whiteSpace:'pre-wrap',fontSize:'14px'}}>
              {deidentified}
            </div>
          ) : (
            <div style={{marginTop:'15px',padding:'40px',textAlign:'center',color:'#5a6c7d',border:'2px dashed #1e3a5f',borderRadius:'8px',minHeight:'300px',display:'flex',alignItems:'center',justifyContent:'center'}}>
              De-identified document will appear here
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// Module 8: Medication Safety Assistant  
function MedicationSafetyModule({ onBack }: { onBack: () => void }) {
  const [medications, setMedications] = useState<string[]>([])
  const [newMed, setNewMed] = useState('')
  const [interactions, setInteractions] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  const addMedication = () => {
    if (newMed && !medications.includes(newMed)) {
      const updated = [...medications, newMed]
      setMedications(updated)
      setNewMed('')
      checkInteractions(updated)
    }
  }

  const removeMedication = (med: string) => {
    const updated = medications.filter(m => m !== med)
    setMedications(updated)
    if (updated.length > 0) {
      checkInteractions(updated)
    } else {
      setInteractions(null)
    }
  }

  const checkInteractions = async (meds: string[]) => {
    setLoading(true)
    try {
      const response = await fetch('/api/medication-safety', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({medications: meds})
      })
      const data = await response.json()
      setInteractions(data)
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{maxWidth:'1000px',margin:'0 auto'}}>
      <button onClick={onBack} style={{marginBottom:'20px',padding:'10px 20px',backgroundColor:'#1e3a5f',color:'white',border:'none',borderRadius:'4px',cursor:'pointer'}}>
        ← Back to Modules
      </button>
      
      <HIPAADisclaimer />
      
      <h2 style={{fontSize:'32px',marginBottom:'30px'}}>Medication Safety Assistant</h2>
      
      <div style={{backgroundColor:'#132f4c',padding:'30px',borderRadius:'8px',border:'1px solid #1e3a5f',marginBottom:'30px'}}>
        <h3>Add Medications</h3>
        <div style={{display:'flex',gap:'10px',marginTop:'20px'}}>
          <input
            value={newMed}
            onChange={e=>setNewMed(e.target.value)}
            onKeyPress={e=>e.key==='Enter'&&addMedication()}
            placeholder="Enter medication name (e.g., Aspirin, Warfarin)"
            style={{flex:1,padding:'12px',fontSize:'16px',backgroundColor:'#0a1929',color:'white',border:'1px solid #1e3a5f',borderRadius:'4px'}}
          />
          <button
            onClick={addMedication}
            style={{padding:'12px 30px',fontSize:'16px',backgroundColor:'#3b82f6',color:'white',border:'none',borderRadius:'4px',cursor:'pointer'}}
          >
            Add
          </button>
        </div>

        {medications.length > 0 && (
          <div style={{marginTop:'20px'}}>
            <h4>Current Medications:</h4>
            <div style={{display:'flex',flexWrap:'wrap',gap:'10px',marginTop:'10px'}}>
              {medications.map(med => (
                <div key={med} style={{padding:'8px 15px',backgroundColor:'#1e3a5f',borderRadius:'20px',display:'flex',alignItems:'center',gap:'10px'}}>
                  <span>{med}</span>
                  <button onClick={()=>removeMedication(med)} style={{backgroundColor:'transparent',border:'none',color:'#3b82f6',cursor:'pointer',fontSize:'18px'}}>×</button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {loading && <div style={{textAlign:'center',padding:'20px',color:'#8b9dc3'}}>Checking interactions...</div>}

      {interactions && !loading && (
        <div style={{backgroundColor:'#132f4c',padding:'30px',borderRadius:'8px',border:'1px solid #1e3a5f'}}>
          <h3>Interaction Analysis</h3>
          {interactions.interactions?.length > 0 ? (
            interactions.interactions.map((interaction: any, i: number) => (
              <div key={i} style={{padding:'20px',marginTop:'15px',backgroundColor:interaction.severity==='high'?'#3d1a1a':interaction.severity==='moderate'?'#3d2a1a':'#1a3d1a',borderRadius:'8px',borderLeft:`4px solid ${interaction.severity==='high'?'#f44336':interaction.severity==='moderate'?'#ff9800':'#4caf50'}`}}>
                <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                  <h4 style={{margin:0}}>{interaction.drug1} + {interaction.drug2}</h4>
                  <span style={{padding:'5px 15px',backgroundColor:interaction.severity==='high'?'#c62828':interaction.severity==='moderate'?'#e65100':'#2e7d32',color:'white',borderRadius:'20px',fontSize:'12px',fontWeight:'bold',textTransform:'uppercase'}}>
                    {interaction.severity}
                  </span>
                </div>
                <p style={{marginTop:'10px',color:'#8b9dc3'}}>{interaction.description}</p>
                <div style={{marginTop:'10px'}}>
                  <strong>Recommendation:</strong> {interaction.recommendation}
                </div>
              </div>
            ))
          ) : (
            <div style={{padding:'30px',textAlign:'center',color:'#4caf50',backgroundColor:'#1a3d1a',borderRadius:'8px'}}>
              ✅ No significant interactions detected
            </div>
          )}
        </div>
      )}
    </div>
  )
}

// Module 9: Healthcare Knowledge Graph + LLM Q&A
function KnowledgeGraphModule({ onBack }: { onBack: () => void }) {
  const [question, setQuestion] = useState('')
  const [answer, setAnswer] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  const handleAsk = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/knowledge-graph', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({question})
      })
      const data = await response.json()
      setAnswer(data)
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{maxWidth:'1000px',margin:'0 auto'}}>
      <button onClick={onBack} style={{marginBottom:'20px',padding:'10px 20px',backgroundColor:'#1e3a5f',color:'white',border:'none',borderRadius:'4px',cursor:'pointer'}}>
        ← Back to Modules
      </button>
      
      <HIPAADisclaimer />
      
      <h2 style={{fontSize:'32px',marginBottom:'30px'}}>Healthcare Knowledge Graph + LLM Q&A</h2>
      
      <div style={{backgroundColor:'#132f4c',padding:'30px',borderRadius:'8px',border:'1px solid #1e3a5f',marginBottom:'30px'}}>
        <h3>Ask a Medical Question</h3>
        <textarea
          value={question}
          onChange={e=>setQuestion(e.target.value)}
          placeholder="e.g., What are the treatment options for Type 2 Diabetes?"
          style={{width:'100%',minHeight:'100px',padding:'15px',backgroundColor:'#0a1929',color:'white',border:'1px solid #1e3a5f',borderRadius:'4px',fontSize:'16px',marginTop:'15px'}}
        />
        <button
          onClick={handleAsk}
          disabled={loading || !question}
          style={{marginTop:'20px',padding:'12px 40px',fontSize:'16px',backgroundColor:loading||!question?'#1e3a5f':'#3b82f6',color:'white',border:'none',borderRadius:'4px',cursor:loading||!question?'not-allowed':'pointer'}}
        >
          {loading ? 'Searching...' : 'Search Knowledge Base'}
        </button>
      </div>

      {answer && (
        <div style={{backgroundColor:'#132f4c',padding:'30px',borderRadius:'8px',border:'1px solid #1e3a5f'}}>
          <h3>Answer</h3>
          <div style={{marginTop:'15px',padding:'20px',backgroundColor:'#0a1929',borderRadius:'8px',lineHeight:'1.8'}}>
            {answer.answer}
          </div>
          {answer.sources && (
            <div style={{marginTop:'20px'}}>
              <h4 style={{color:'#3b82f6'}}>Sources:</h4>
              <ul style={{marginTop:'10px',color:'#8b9dc3'}}>
                {answer.sources.map((source: string, i: number) => (
                  <li key={i} style={{marginBottom:'5px'}}>{source}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

// Module 10: AI Nursing Workflow Automation
function NursingWorkflowModule({ onBack }: { onBack: () => void }) {
  const [taskType, setTaskType] = useState('note')
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [loading, setLoading] = useState(false)

  const handleGenerate = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/nursing-workflow', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({taskType, input})
      })
      const data = await response.json()
      setOutput(data.output)
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{maxWidth:'1000px',margin:'0 auto'}}>
      <button onClick={onBack} style={{marginBottom:'20px',padding:'10px 20px',backgroundColor:'#1e3a5f',color:'white',border:'none',borderRadius:'4px',cursor:'pointer'}}>
        ← Back to Modules
      </button>
      
      <HIPAADisclaimer />
      
      <h2 style={{fontSize:'32px',marginBottom:'30px'}}>AI Nursing Workflow Automation</h2>
      
      <div style={{backgroundColor:'#132f4c',padding:'30px',borderRadius:'8px',border:'1px solid #1e3a5f',marginBottom:'30px'}}>
        <h3>Select Task Type</h3>
        <select
          value={taskType}
          onChange={e=>setTaskType(e.target.value)}
          style={{width:'100%',padding:'12px',fontSize:'16px',backgroundColor:'#0a1929',color:'white',border:'1px solid #1e3a5f',borderRadius:'4px',marginTop:'15px'}}
        >
          <option value="note">Nursing Note</option>
          <option value="handoff">Handoff Report</option>
          <option value="assessment">Patient Assessment</option>
          <option value="care-plan">Care Plan Update</option>
        </select>

        <textarea
          value={input}
          onChange={e=>setInput(e.target.value)}
          placeholder="Enter patient information and observations..."
          style={{width:'100%',minHeight:'150px',padding:'15px',backgroundColor:'#0a1929',color:'white',border:'1px solid #1e3a5f',borderRadius:'4px',fontSize:'14px',marginTop:'20px'}}
        />

        <button
          onClick={handleGenerate}
          disabled={loading || !input}
          style={{marginTop:'20px',padding:'12px 40px',fontSize:'16px',backgroundColor:loading||!input?'#1e3a5f':'#3b82f6',color:'white',border:'none',borderRadius:'4px',cursor:loading||!input?'not-allowed':'pointer'}}
        >
          {loading ? 'Generating...' : 'Generate Documentation'}
        </button>
      </div>

      {output && (
        <div style={{backgroundColor:'#132f4c',padding:'30px',borderRadius:'8px',border:'1px solid #1e3a5f'}}>
          <h3>Generated {taskType === 'note' ? 'Nursing Note' : taskType === 'handoff' ? 'Handoff Report' : taskType === 'assessment' ? 'Assessment' : 'Care Plan'}</h3>
          <div style={{marginTop:'15px',padding:'20px',backgroundColor:'#0a1929',borderRadius:'8px',whiteSpace:'pre-wrap',fontSize:'14px',lineHeight:'1.6'}}>
            {output}
          </div>
          <button style={{marginTop:'20px',padding:'10px 30px',backgroundColor:'#4caf50',color:'white',border:'none',borderRadius:'4px',cursor:'pointer'}}>
            Copy to EHR
          </button>
        </div>
      )}
    </div>
  )
}
