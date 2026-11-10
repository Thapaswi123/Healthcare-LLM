import { NextResponse } from 'next/server'
import { dataStore } from '../../../../lib/dataStore'

// Mock EHR database
const patients: Record<string, any> = {
  'P001': {
    id: 'P001',
    name: 'John Doe',
    age: 45,
    gender: 'Male',
    diagnosis: 'Hypertension',
    medications: ['Lisinopril 10mg', 'Aspirin 81mg'],
    allergies: ['Penicillin'],
    lastVisit: '2024-11-15',
    insurance: 'Blue Cross Blue Shield'
  },
  'P002': {
    id: 'P002',
    name: 'Jane Smith',
    age: 32,
    gender: 'Female',
    diagnosis: 'Type 2 Diabetes',
    medications: ['Metformin 500mg', 'Insulin Glargine'],
    allergies: ['None'],
    lastVisit: '2024-11-20',
    insurance: 'Aetna'
  },
  'P003': {
    id: 'P003',
    name: 'Bob Johnson',
    age: 58,
    gender: 'Male',
    diagnosis: 'COPD',
    medications: ['Albuterol Inhaler', 'Prednisone 10mg'],
    allergies: ['Sulfa drugs'],
    lastVisit: '2024-11-25',
    insurance: 'Medicare'
  },
}

export async function GET(
  request: Request,
  { params }: { params: { patientId: string } }
) {
  try {
    const patientId = params.patientId
    
    // First check static patients
    let patient = patients[patientId]
    
    // If not found, check dynamically created patients from Prior Auth
    if (!patient) {
      // Look for patient in claims
      const claim = dataStore.claims.find(c => c.patientId === patientId)
      
      if (claim) {
        // Create patient record from claim data
        patient = {
          id: claim.patientId,
          name: claim.patient,
          age: 'N/A',
          gender: 'N/A',
          diagnosis: claim.procedure || 'N/A',
          medications: [],
          allergies: [],
          lastVisit: claim.date,
          insurance: 'N/A'
        }
      }
      
      // Also check priorAuths for more complete data
      const priorAuth = dataStore.priorAuths.find(pa => pa.patientId === patientId)
      
      if (priorAuth) {
        patient = {
          id: priorAuth.patientId,
          name: priorAuth.patientName,
          age: 'N/A',
          gender: 'N/A',
          diagnosis: priorAuth.diagnosis,
          medications: [],
          allergies: [],
          lastVisit: priorAuth.submittedDate,
          insurance: 'N/A',
          procedure: priorAuth.procedure,
          urgency: priorAuth.urgency,
          status: priorAuth.status
        }
      }
    }

    if (!patient) {
      return NextResponse.json(
        { error: 'Patient not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      patient
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch patient data' },
      { status: 500 }
    )
  }
}
