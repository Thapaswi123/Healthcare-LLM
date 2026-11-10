'use client';
import { useState } from 'react';

export default function PatientCommunicationAgent() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [view, setView] = useState('chat'); // 'chat' or 'analytics'

  const handleSend = async () => {
    if (!input.trim()) return;
    
    const userMessage = { role: 'user', content: input };
    setMessages([...messages, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const response = await fetch('/api/patient-communication', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input, history: messages, userId: 'DEMO_USER' })
      });
      const data = await response.json();
      
      // Add assistant message with triage data
      setMessages([...messages, userMessage, { 
        role: 'assistant', 
        content: data.response,
        triage: data.triage,
        responseTime: data.responseTime,
        metadata: data.metadata
      }]);
    } catch (error) {
      console.error(error);
      setMessages([...messages, userMessage, { 
        role: 'assistant', 
        content: 'Sorry, I encountered an error. Please try again.'
      }]);
    } finally {
      setLoading(false);
    }
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'critical': return '#dc2626';
      case 'high': return '#ea580c';
      case 'medium': return '#ca8a04';
      case 'low': return '#16a34a';
      default: return '#6b7280';
    }
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0a1929', color: 'white' }}>
      {/* Header */}
      <header style={{ padding: '20px 40px', borderBottom: '1px solid #1e3a5f' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h1 style={{ margin: 0, fontSize: '24px', fontWeight: 'normal' }}>Patient Communication Agent (BRD-Compliant)</h1>
          <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
            <a href="/analytics" style={{ color: '#3b82f6', textDecoration: 'none', fontSize: '14px' }}>📊 Analytics</a>
            <a href="/audit" style={{ color: '#3b82f6', textDecoration: 'none', fontSize: '14px' }}>📝 Audit Logs</a>
            <div style={{ color: '#8b9dc3', fontSize: '14px' }}>Healthcare LLM Platform</div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main style={{ padding: '60px 40px' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '32px', marginBottom: '30px' }}>Patient Communication Agent</h2>
          
          <div style={{ backgroundColor: '#132f4c', padding: '30px', borderRadius: '8px', border: '1px solid #1e3a5f', minHeight: '500px', display: 'flex', flexDirection: 'column' }}>
            <div style={{ flex: 1, overflowY: 'auto', marginBottom: '20px' }}>
              {messages.length === 0 && (
                <div style={{ textAlign: 'center', padding: '40px', color: '#5a6c7d' }}>
                  <p>Start a conversation with the patient communication agent.</p>
                  <p style={{ fontSize: '14px', marginTop: '10px' }}>Example: "I have a headache and fever. What should I do?"</p>
                </div>
              )}
              {messages.map((msg, i) => (
                <div key={i} style={{ marginBottom: '15px', padding: '15px', backgroundColor: msg.role === 'user' ? '#1e3a5f' : '#0a1929', borderRadius: '4px', borderLeft: msg.role === 'assistant' ? '3px solid #3b82f6' : 'none' }}>
                  <div style={{ fontSize: '12px', color: '#8b9dc3', marginBottom: '5px' }}>
                    {msg.role === 'user' ? 'You' : 'AI Assistant'}
                    {msg.responseTime && <span style={{ marginLeft: '10px' }}>• Response time: {msg.responseTime}ms</span>}
                  </div>
                  <div style={{ color: 'white', lineHeight: '1.6', whiteSpace: 'pre-wrap' }}>{msg.content}</div>
                  
                  {/* Triage Information */}
                  {msg.triage && (
                    <div style={{ marginTop: '15px', padding: '15px', backgroundColor: '#1e3a5f', borderRadius: '4px', borderLeft: `4px solid ${getSeverityColor(msg.triage.severity)}` }}>
                      <div style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '10px', color: getSeverityColor(msg.triage.severity) }}>
                        {msg.triage.recommendation?.icon} TRIAGE ASSESSMENT
                      </div>
                      <div style={{ fontSize: '13px', marginBottom: '8px' }}>
                        <strong>Severity:</strong> <span style={{ color: getSeverityColor(msg.triage.severity) }}>{msg.triage.severity?.toUpperCase()}</span>
                      </div>
                      <div style={{ fontSize: '13px', marginBottom: '8px' }}>
                        <strong>Recommendation:</strong> {msg.triage.recommendation?.description}
                      </div>
                      <div style={{ fontSize: '13px', marginBottom: '8px' }}>
                        <strong>Timeframe:</strong> {msg.triage.recommendation?.timeframe}
                      </div>
                      {msg.triage.reasoning && msg.triage.reasoning.length > 0 && (
                        <div style={{ fontSize: '12px', marginTop: '10px', paddingTop: '10px', borderTop: '1px solid #2d4a6f' }}>
                          <strong>Reasoning:</strong>
                          <ul style={{ marginTop: '5px', paddingLeft: '20px' }}>
                            {msg.triage.reasoning.map((reason, idx) => (
                              <li key={idx} style={{ marginBottom: '3px' }}>{reason}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                      {msg.triage.requiresClinicianReview && (
                        <div style={{ marginTop: '10px', padding: '8px', backgroundColor: '#3d2a1a', borderRadius: '4px', fontSize: '12px', color: '#ffb74d' }}>
                          ⚠️ This interaction has been flagged for clinician review
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
              {loading && (
                <div style={{ padding: '15px', color: '#8b9dc3' }}>AI is typing...</div>
              )}
            </div>
            
            <div style={{ display: 'flex', gap: '10px' }}>
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Type your question..."
                style={{ flex: 1, padding: '12px', backgroundColor: '#0a1929', color: 'white', border: '1px solid #1e3a5f', borderRadius: '4px' }}
              />
              <button
                onClick={handleSend}
                disabled={loading || !input.trim()}
                style={{ padding: '12px 30px', backgroundColor: loading || !input.trim() ? '#1e3a5f' : '#3b82f6', color: 'white', border: 'none', borderRadius: '4px', cursor: loading || !input.trim() ? 'not-allowed' : 'pointer' }}
              >
                Send
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
