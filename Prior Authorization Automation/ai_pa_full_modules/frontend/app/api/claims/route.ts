import { NextResponse } from 'next/server'
import { dataStore, addClaim as addClaimToStore } from '../../../lib/dataStore'

// Export for backward compatibility
export const claims = dataStore.claims
export const addClaim = addClaimToStore

// GET - Fetch all claims
export async function GET(request: Request) {
  try {
    return NextResponse.json({
      success: true,
      claims: dataStore.claims,
      total: dataStore.claims.length
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch claims' },
      { status: 500 }
    )
  }
}

// POST - Create new claim
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { patient, patientId, procedure, amount } = body

    if (!patient || !patientId || !procedure) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const newClaim = {
      id: `CLM-${String(dataStore.claims.length + 1).padStart(3, '0')}`,
      patient,
      patientId,
      status: 'Pending',
      amount: amount || '$0',
      date: new Date().toISOString().split('T')[0],
      procedure
    }

    addClaimToStore(newClaim)

    return NextResponse.json({
      success: true,
      claim: newClaim
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create claim' },
      { status: 500 }
    )
  }
}
