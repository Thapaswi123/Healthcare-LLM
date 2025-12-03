import { NextResponse } from 'next/server'

// Mock EHR database
const patients = {
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
    const patient = patients[patientId as keyof typeof patients]

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
