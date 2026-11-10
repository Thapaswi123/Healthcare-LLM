// In-memory database for demonstration
// In production, replace with PostgreSQL/MongoDB

export const database = {
  // Users table
  users: [
    { id: 'U001', username: 'patient1', password: 'demo123', role: 'patient', name: 'John Doe', email: 'patient@example.com' },
    { id: 'U002', username: 'doctor1', password: 'demo123', role: 'clinician', name: 'Dr. Sarah Smith', email: 'doctor@example.com' },
    { id: 'U003', username: 'admin1', password: 'demo123', role: 'admin', name: 'Admin User', email: 'admin@example.com' }
  ],

  // Interactions table (patient conversations)
  interactions: [],

  // Audit logs table
  auditLogs: [],

  // Triage records table
  triageRecords: [],

  // Clinician reviews table
  clinicianReviews: []
}

// Helper functions
export function addInteraction(interaction) {
  const id = `INT-${Date.now()}`
  const record = {
    id,
    ...interaction,
    timestamp: new Date().toISOString()
  }
  database.interactions.push(record)
  return record
}

export function addAuditLog(log) {
  const id = `AUD-${Date.now()}`
  const record = {
    id,
    ...log,
    timestamp: new Date().toISOString()
  }
  database.auditLogs.push(record)
  return record
}

export function addTriageRecord(triage) {
  const id = `TRI-${Date.now()}`
  const record = {
    id,
    ...triage,
    timestamp: new Date().toISOString(),
    status: 'pending_review'
  }
  database.triageRecords.push(record)
  return record
}

export function addClinicianReview(review) {
  const id = `REV-${Date.now()}`
  const record = {
    id,
    ...review,
    timestamp: new Date().toISOString()
  }
  database.clinicianReviews.push(record)
  return record
}

export function getUserByUsername(username) {
  return database.users.find(u => u.username === username)
}

export function getUserById(userId) {
  return database.users.find(u => u.id === userId)
}

export function getInteractionsByUser(userId) {
  return database.interactions.filter(i => i.userId === userId)
}

export function getTriageRecordsPendingReview() {
  return database.triageRecords.filter(t => t.status === 'pending_review')
}

export function getAuditLogs(filters = {}) {
  let logs = database.auditLogs
  
  if (filters.userId) {
    logs = logs.filter(l => l.userId === filters.userId)
  }
  
  if (filters.action) {
    logs = logs.filter(l => l.action === filters.action)
  }
  
  if (filters.startDate) {
    logs = logs.filter(l => new Date(l.timestamp) >= new Date(filters.startDate))
  }
  
  return logs
}

export function getAnalytics() {
  return {
    totalInteractions: database.interactions.length,
    totalTriages: database.triageRecords.length,
    pendingReviews: database.triageRecords.filter(t => t.status === 'pending_review').length,
    approvedTriages: database.triageRecords.filter(t => t.status === 'approved').length,
    rejectedTriages: database.triageRecords.filter(t => t.status === 'rejected').length,
    emergencyDetections: database.triageRecords.filter(t => t.severity === 'critical').length,
    averageResponseTime: calculateAverageResponseTime(),
    userSatisfaction: calculateUserSatisfaction()
  }
}

function calculateAverageResponseTime() {
  if (database.interactions.length === 0) return 0
  const total = database.interactions.reduce((sum, i) => sum + (i.responseTime || 0), 0)
  return (total / database.interactions.length).toFixed(2)
}

function calculateUserSatisfaction() {
  const reviews = database.clinicianReviews.filter(r => r.rating)
  if (reviews.length === 0) return 0
  const total = reviews.reduce((sum, r) => sum + r.rating, 0)
  return (total / reviews.length).toFixed(1)
}
