import { NextResponse } from 'next/server'
import { getAnalytics, database } from '../../../lib/database'

export async function GET(request) {
  try {
    const analytics = getAnalytics()
    
    // Add recent interactions
    const recentInteractions = database.interactions.slice(-10).reverse()
    
    // Add triage breakdown
    const triageBreakdown = {
      critical: database.triageRecords.filter(t => t.severity === 'critical').length,
      high: database.triageRecords.filter(t => t.severity === 'high').length,
      medium: database.triageRecords.filter(t => t.severity === 'medium').length,
      low: database.triageRecords.filter(t => t.severity === 'low').length
    }
    
    return NextResponse.json({
      success: true,
      analytics: {
        ...analytics,
        triageBreakdown,
        recentInteractions: recentInteractions.map(i => ({
          id: i.id,
          timestamp: i.timestamp,
          severity: i.triageData?.severity,
          responseTime: i.responseTime
        }))
      }
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch analytics' },
      { status: 500 }
    )
  }
}
