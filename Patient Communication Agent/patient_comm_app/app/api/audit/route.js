import { NextResponse } from 'next/server'
import { getAuditLogs } from '../../../lib/database'

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')
    const action = searchParams.get('action')
    const limit = parseInt(searchParams.get('limit') || '50')
    
    const filters = {}
    if (userId) filters.userId = userId
    if (action) filters.action = action
    
    let logs = getAuditLogs(filters)
    
    // Sort by most recent first
    logs = logs.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
    
    // Limit results
    logs = logs.slice(0, limit)
    
    return NextResponse.json({
      success: true,
      logs,
      total: logs.length
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch audit logs' },
      { status: 500 }
    )
  }
}
