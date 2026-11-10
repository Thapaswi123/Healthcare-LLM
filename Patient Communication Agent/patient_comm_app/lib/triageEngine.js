// Enhanced Triage Engine with Severity Scoring

export function analyzeTriage(message, aiResponse) {
  const severity = calculateSeverity(message)
  const recommendation = getRecommendation(severity, message)
  const reasoning = generateReasoning(message, severity)
  const keywords = extractKeywords(message)
  
  return {
    severity,
    recommendation,
    reasoning,
    keywords,
    requiresClinicianReview: severity === 'critical' || severity === 'high',
    estimatedWaitTime: getEstimatedWaitTime(severity)
  }
}

function calculateSeverity(message) {
  const messageLower = message.toLowerCase()
  
  // Critical - Immediate emergency
  const criticalKeywords = [
    'chest pain', 'heart attack', 'can\'t breathe', 'cannot breathe',
    'severe bleeding', 'unconscious', 'stroke', 'seizure',
    'suicide', 'overdose', 'choking', 'severe head injury'
  ]
  
  for (const keyword of criticalKeywords) {
    if (messageLower.includes(keyword)) {
      return 'critical'
    }
  }
  
  // High - Urgent care needed
  const highKeywords = [
    'high fever', 'severe pain', 'difficulty breathing',
    'persistent vomiting', 'severe headache', 'blood in',
    'broken bone', 'deep cut', 'allergic reaction'
  ]
  
  for (const keyword of highKeywords) {
    if (messageLower.includes(keyword)) {
      return 'high'
    }
  }
  
  // Medium - Should see doctor soon
  const mediumKeywords = [
    'fever', 'pain', 'cough', 'rash', 'swelling',
    'nausea', 'dizziness', 'infection', 'wound'
  ]
  
  for (const keyword of mediumKeywords) {
    if (messageLower.includes(keyword)) {
      return 'medium'
    }
  }
  
  // Low - General health question
  return 'low'
}

function getRecommendation(severity, message) {
  switch (severity) {
    case 'critical':
      return {
        action: 'emergency',
        description: 'Call 911 or go to Emergency Room immediately',
        timeframe: 'Immediate',
        location: 'Emergency Room',
        icon: '🚨'
      }
    
    case 'high':
      return {
        action: 'urgent_care',
        description: 'Seek urgent care within 24 hours',
        timeframe: 'Within 24 hours',
        location: 'Urgent Care or ER',
        icon: '⚠️'
      }
    
    case 'medium':
      return {
        action: 'schedule_appointment',
        description: 'Schedule appointment with your doctor',
        timeframe: 'Within 2-3 days',
        location: 'Primary Care Physician',
        icon: '📅'
      }
    
    case 'low':
      return {
        action: 'self_care',
        description: 'Self-care and monitoring recommended',
        timeframe: 'Monitor symptoms',
        location: 'Home care',
        icon: '🏠'
      }
    
    default:
      return {
        action: 'consult',
        description: 'Consult with healthcare provider',
        timeframe: 'As needed',
        location: 'Telehealth or Office',
        icon: '💬'
      }
  }
}

function generateReasoning(message, severity) {
  const messageLower = message.toLowerCase()
  const reasons = []
  
  // Analyze symptoms mentioned
  if (messageLower.includes('chest pain')) {
    reasons.push('Chest pain can indicate cardiac emergency')
  }
  if (messageLower.includes('fever')) {
    reasons.push('Fever indicates possible infection')
  }
  if (messageLower.includes('severe') || messageLower.includes('intense')) {
    reasons.push('Severity of symptoms warrants medical attention')
  }
  if (messageLower.includes('bleeding')) {
    reasons.push('Bleeding requires assessment and control')
  }
  if (messageLower.includes('breathing')) {
    reasons.push('Respiratory symptoms need immediate evaluation')
  }
  
  // Add severity-based reasoning
  switch (severity) {
    case 'critical':
      reasons.push('Symptoms match emergency criteria requiring immediate intervention')
      break
    case 'high':
      reasons.push('Symptoms suggest urgent medical evaluation needed')
      break
    case 'medium':
      reasons.push('Symptoms warrant professional medical assessment')
      break
    case 'low':
      reasons.push('Symptoms can typically be managed with self-care and monitoring')
      break
  }
  
  return reasons
}

function extractKeywords(message) {
  const messageLower = message.toLowerCase()
  const allKeywords = [
    'chest pain', 'fever', 'headache', 'cough', 'bleeding',
    'breathing', 'pain', 'nausea', 'vomiting', 'dizziness',
    'rash', 'swelling', 'infection', 'injury', 'allergic'
  ]
  
  return allKeywords.filter(keyword => messageLower.includes(keyword))
}

function getEstimatedWaitTime(severity) {
  switch (severity) {
    case 'critical':
      return 'Immediate'
    case 'high':
      return '1-4 hours'
    case 'medium':
      return '1-3 days'
    case 'low':
      return 'As needed'
    default:
      return 'Variable'
  }
}

export function getSeverityColor(severity) {
  switch (severity) {
    case 'critical':
      return '#dc2626' // red
    case 'high':
      return '#ea580c' // orange
    case 'medium':
      return '#ca8a04' // yellow
    case 'low':
      return '#16a34a' // green
    default:
      return '#6b7280' // gray
  }
}

export function getSeverityLabel(severity) {
  switch (severity) {
    case 'critical':
      return 'CRITICAL - Emergency'
    case 'high':
      return 'HIGH - Urgent'
    case 'medium':
      return 'MEDIUM - Soon'
    case 'low':
      return 'LOW - Routine'
    default:
      return 'UNKNOWN'
  }
}
