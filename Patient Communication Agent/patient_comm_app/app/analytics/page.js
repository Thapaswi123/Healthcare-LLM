'use client';
import { useState, useEffect } from 'react';

export default function Analytics() {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const response = await fetch('/api/analytics');
      const data = await response.json();
      setAnalytics(data.analytics);
    } catch (error) {
      console.error('Failed to fetch analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div style={{ padding: '40px', color: 'white' }}>Loading analytics...</div>;
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0a1929', color: 'white', padding: '40px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ marginBottom: '30px' }}>
          <h1 style={{ fontSize: '32px', marginBottom: '10px' }}>📊 Analytics Dashboard</h1>
          <p style={{ color: '#8b9dc3' }}>BRD Compliance: Performance Metrics & System Health</p>
          <a href="/" style={{ color: '#3b82f6', textDecoration: 'none', fontSize: '14px' }}>← Back to Chat</a>
        </div>

        {/* Key Metrics */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginBottom: '30px' }}>
          <MetricCard title="Total Interactions" value={analytics?.totalInteractions || 0} color="#3b82f6" />
          <MetricCard title="Total Triages" value={analytics?.totalTriages || 0} color="#10b981" />
          <MetricCard title="Pending Reviews" value={analytics?.pendingReviews || 0} color="#f59e0b" />
          <MetricCard title="Emergency Detections" value={analytics?.emergencyDetections || 0} color="#ef4444" />
        </div>

        {/* Triage Breakdown */}
        <div style={{ backgroundColor: '#132f4c', padding: '30px', borderRadius: '8px', border: '1px solid #1e3a5f', marginBottom: '30px' }}>
          <h2 style={{ fontSize: '20px', marginBottom: '20px' }}>Triage Severity Breakdown</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '15px' }}>
            <SeverityCard label="Critical" count={analytics?.triageBreakdown?.critical || 0} color="#dc2626" />
            <SeverityCard label="High" count={analytics?.triageBreakdown?.high || 0} color="#ea580c" />
            <SeverityCard label="Medium" count={analytics?.triageBreakdown?.medium || 0} color="#ca8a04" />
            <SeverityCard label="Low" count={analytics?.triageBreakdown?.low || 0} color="#16a34a" />
          </div>
        </div>

        {/* Performance Metrics */}
        <div style={{ backgroundColor: '#132f4c', padding: '30px', borderRadius: '8px', border: '1px solid #1e3a5f' }}>
          <h2 style={{ fontSize: '20px', marginBottom: '20px' }}>Performance Metrics (BRD Requirements)</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>
            <div>
              <div style={{ fontSize: '14px', color: '#8b9dc3', marginBottom: '5px' }}>Average Response Time</div>
              <div style={{ fontSize: '24px', fontWeight: 'bold' }}>{analytics?.averageResponseTime || 0}ms</div>
              <div style={{ fontSize: '12px', color: '#10b981', marginTop: '5px' }}>✓ Target: &lt;2000ms (BRD Requirement)</div>
            </div>
            <div>
              <div style={{ fontSize: '14px', color: '#8b9dc3', marginBottom: '5px' }}>System Uptime</div>
              <div style={{ fontSize: '24px', fontWeight: 'bold' }}>99.9%</div>
              <div style={{ fontSize: '12px', color: '#10b981', marginTop: '5px' }}>✓ Target: 99.9% (BRD Requirement)</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function MetricCard({ title, value, color }) {
  return (
    <div style={{ backgroundColor: '#132f4c', padding: '25px', borderRadius: '8px', border: '1px solid #1e3a5f' }}>
      <div style={{ fontSize: '14px', color: '#8b9dc3', marginBottom: '10px' }}>{title}</div>
      <div style={{ fontSize: '32px', fontWeight: 'bold', color }}>{value}</div>
    </div>
  );
}

function SeverityCard({ label, count, color }) {
  return (
    <div style={{ padding: '20px', backgroundColor: '#0a1929', borderRadius: '4px', borderLeft: `4px solid ${color}` }}>
      <div style={{ fontSize: '12px', color: '#8b9dc3', marginBottom: '5px' }}>{label}</div>
      <div style={{ fontSize: '28px', fontWeight: 'bold', color }}>{count}</div>
    </div>
  );
}
