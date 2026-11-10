'use client';
import { useState, useEffect } from 'react';

export default function AuditLogs() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLogs();
  }, []);

  const fetchLogs = async () => {
    try {
      const response = await fetch('/api/audit?limit=50');
      const data = await response.json();
      setLogs(data.logs || []);
    } catch (error) {
      console.error('Failed to fetch logs:', error);
    } finally {
      setLoading(false);
    }
  };

  const getActionColor = (action) => {
    switch (action) {
      case 'emergency_detected': return '#ef4444';
      case 'response_generated': return '#10b981';
      case 'message_received': return '#3b82f6';
      case 'error_occurred': return '#f59e0b';
      default: return '#6b7280';
    }
  };

  if (loading) {
    return <div style={{ padding: '40px', color: 'white' }}>Loading audit logs...</div>;
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0a1929', color: 'white', padding: '40px' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        <div style={{ marginBottom: '30px' }}>
          <h1 style={{ fontSize: '32px', marginBottom: '10px' }}>📝 Audit Logs</h1>
          <p style={{ color: '#8b9dc3' }}>BRD Compliance: Complete audit trail for HIPAA compliance</p>
          <a href="/" style={{ color: '#3b82f6', textDecoration: 'none', fontSize: '14px' }}>← Back to Chat</a>
        </div>

        <div style={{ backgroundColor: '#132f4c', padding: '30px', borderRadius: '8px', border: '1px solid #1e3a5f' }}>
          <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h2 style={{ fontSize: '20px' }}>Recent Activity</h2>
            <div style={{ fontSize: '14px', color: '#8b9dc3' }}>Total: {logs.length} entries</div>
          </div>

          {logs.length === 0 ? (
            <div style={{ padding: '40px', textAlign: 'center', color: '#5a6c7d' }}>
              No audit logs yet. Start a conversation to generate logs.
            </div>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid #1e3a5f' }}>
                    <th style={{ padding: '12px', textAlign: 'left', fontSize: '14px', color: '#8b9dc3' }}>Timestamp</th>
                    <th style={{ padding: '12px', textAlign: 'left', fontSize: '14px', color: '#8b9dc3' }}>User ID</th>
                    <th style={{ padding: '12px', textAlign: 'left', fontSize: '14px', color: '#8b9dc3' }}>Action</th>
                    <th style={{ padding: '12px', textAlign: 'left', fontSize: '14px', color: '#8b9dc3' }}>Details</th>
                    <th style={{ padding: '12px', textAlign: 'left', fontSize: '14px', color: '#8b9dc3' }}>IP Address</th>
                  </tr>
                </thead>
                <tbody>
                  {logs.map((log, idx) => (
                    <tr key={log.id || idx} style={{ borderBottom: '1px solid #1e3a5f' }}>
                      <td style={{ padding: '12px', fontSize: '13px' }}>
                        {new Date(log.timestamp).toLocaleString()}
                      </td>
                      <td style={{ padding: '12px', fontSize: '13px' }}>{log.userId}</td>
                      <td style={{ padding: '12px', fontSize: '13px' }}>
                        <span style={{ 
                          padding: '4px 8px', 
                          borderRadius: '4px', 
                          backgroundColor: getActionColor(log.action) + '20',
                          color: getActionColor(log.action),
                          fontSize: '12px'
                        }}>
                          {log.action}
                        </span>
                      </td>
                      <td style={{ padding: '12px', fontSize: '13px', maxWidth: '300px', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {JSON.stringify(log.details)}
                      </td>
                      <td style={{ padding: '12px', fontSize: '13px' }}>{log.ipAddress || 'N/A'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Compliance Notice */}
        <div style={{ marginTop: '30px', padding: '20px', backgroundColor: '#3d2a1a', borderLeft: '3px solid #ff9800', borderRadius: '4px' }}>
          <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>⚠️ HIPAA Compliance Notice</div>
          <div style={{ fontSize: '14px', color: '#ffb74d', lineHeight: '1.6' }}>
            All interactions are logged for compliance and audit purposes. Audit logs include timestamps, user IDs, actions performed, and IP addresses. 
            This meets BRD requirements for audit trails and PHI access controls.
          </div>
        </div>
      </div>
    </div>
  );
}
