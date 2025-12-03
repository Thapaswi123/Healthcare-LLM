import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  try {
    // Mock dashboard statistics
    const stats = {
      pendingPriorAuths: 24,
      approved: 156,
      activeClaims: 89,
      urgent: 5,
      totalPatients: 342,
      avgProcessingTime: '2.3 days',
      approvalRate: '87%',
      recentActivity: [
        { action: 'Prior Auth Approved', patient: 'John Doe', time: '10 mins ago' },
        { action: 'Claim Submitted', patient: 'Jane Smith', time: '25 mins ago' },
        { action: 'EHR Updated', patient: 'Bob Johnson', time: '1 hour ago' },
      ]
    }

    return NextResponse.json({
      success: true,
      stats
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch dashboard stats' },
      { status: 500 }
    )
  }
}
