import React, { useState } from 'react';
export default function App() {
  const [text, setText] = useState('');
  const send = async () => {
    const res = await fetch('http://localhost:5000/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ patient_id: 'P001', text })
    });
    alert(await res.text());
  };
  return (<div><h2>Patient Communication Agent</h2>
    <textarea value={text} onChange={e=>setText(e.target.value)} />
    <button onClick={send}>Send</button></div>);
}