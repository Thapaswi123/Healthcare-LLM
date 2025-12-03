'use client';
import { useState } from 'react';

export default function PatientCommunicationAgent() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

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
        body: JSON.stringify({ message: input, history: messages })
      });
      const data = await response.json();
      setMessages([...messages, userMessage, { role: 'assistant', content: data.response }]);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0a1929', color: 'white' }}>
      {/* Header */}
      <header style={{ padding: '20px 40px', borderBottom: '1px solid #1e3a5f' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h1 style={{ margin: 0, fontSize: '24px', fontWeight: 'normal' }}>Patient Communication Agent</h1>
          <div style={{ color: '#8b9dc3', fontSize: '14px' }}>Healthcare LLM Platform</div>
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
                  <div style={{ fontSize: '12px', color: '#8b9dc3', marginBottom: '5px' }}>{msg.role === 'user' ? 'You' : 'AI Assistant'}</div>
                  <div style={{ color: 'white', lineHeight: '1.6', whiteSpace: 'pre-wrap' }}>{msg.content}</div>
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
