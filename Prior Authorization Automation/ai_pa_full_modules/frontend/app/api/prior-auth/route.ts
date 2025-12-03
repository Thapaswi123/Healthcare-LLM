import { NextResponse } from 'next/server'
import { dataStore, addClaim, addPriorAuth } from '../../../lib/dataStore'

// GET - Fetch all prior authorizations
export async function GET(request: Request) {
  try {
    return NextResponse.json({
      success: true,
      priorAuths: dataStore.priorAuths,
      total: dataStore.priorAuths.length
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch prior authorizations' },
      { status: 500 }
    )
  }
}

// POST - Create new prior authorization request
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { patientName, patientId, procedure, diagnosis, urgency } = body

    // Validate required fields
    if (!patientName || !patientId || !procedure || !diagnosis) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Generate request ID
    const requestId = `PA-${Date.now().toString().slice(-6)}`

    // Determine auto-approval based on urgency
    let status = 'Pending'
    if (urgency === 'emergency') {
      status = 'Auto-Approved'
    } else if (urgency === 'routine') {
      status = 'Under Review'
    }

    const newPriorAuth = {
      id: requestId,
      patientName,
      patientId,
      procedure,
      diagnosis,
      urgency,
      status,
      submittedDate: new Date().toISOString().split('T')[0],
      submittedBy: 'Current User',
      estimatedDecisionDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
    }

    addPriorAuth(newPriorAuth)

    // Also create a corresponding claim
    const newClaim = {
      id: `CLM-${String(dataStore.claims.length + 1).padStart(3, '0')}`,
      patient: patientName,
      patientId,
      status: status === 'Auto-Approved' ? 'Approved' : 'Pending',
      amount: '$0', // Amount will be determined later
      date: new Date().toISOString().split('T')[0],
      procedure,
      priorAuthId: requestId
    }
    
    addClaim(newClaim)

    return NextResponse.json({
      success: true,
      priorAuth: newPriorAuth,
      claim: newClaim,
      message: `Prior authorization ${requestId} submitted successfully. Claim ${newClaim.id} created.`
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create prior authorization' },
      { status: 500 }
    )
  }
}
