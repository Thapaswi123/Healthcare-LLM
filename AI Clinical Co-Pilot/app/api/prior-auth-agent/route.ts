import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const { document } = await request.json()

    // Extract fields and generate payload
    const result = extractAndGeneratePayload(document)

    return NextResponse.json(result)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to process document' },
      { status: 500 }
    )
  }
}

function extractAndGeneratePayload(document: string) {
  const docLower = document.toLowerCase()
  
  // Extract key fields using pattern matching
  const fields: any = {}

  // Patient Name
  const nameMatch = document.match(/patient[:\s]+([A-Z][a-z]+\s[A-Z][a-z]+)/i)
  fields['Patient Name'] = nameMatch ? nameMatch[1] : 'Not found'

  // Member ID
  const memberIdMatch = document.match(/member\s*id[:\s]+([A-Z0-9]+)/i)
  fields['Member ID'] = memberIdMatch ? memberIdMatch[1] : 'Not found'

  // Date of Birth
  const dobMatch = document.match(/dob[:\s]+(\d{1,2}\/\d{1,2}\/\d{4})/i)
  fields['Date of Birth'] = dobMatch ? dobMatch[1] : 'Not found'

  // Diagnosis
  const diagnosisMatch = document.match(/diagnosis[:\s]+([^\n]+)/i)
  fields['Diagnosis'] = diagnosisMatch ? diagnosisMatch[1].trim() : 'Not found'

  // Procedure
  const procedureMatch = document.match(/procedure[:\s]+([^\n]+)/i)
  fields['Procedure'] = procedureMatch ? procedureMatch[1].trim() : 'Not found'

  // Provider Name
  const providerMatch = document.match(/provider[:\s]+([A-Z][a-z]+\s[A-Z][a-z]+)/i)
  fields['Provider Name'] = providerMatch ? providerMatch[1] : 'Not found'

  // Insurance
  const insuranceMatch = document.match(/insurance[:\s]+([^\n]+)/i)
  fields['Insurance'] = insuranceMatch ? insuranceMatch[1].trim() : 'Not found'

  // Generate structured payload
  const payload = {
    priorAuthorizationRequest: {
      requestId: `PA-${Date.now()}`,
      submissionDate: new Date().toISOString().split('T')[0],
      patient: {
        name: fields['Patient Name'],
        memberId: fields['Member ID'],
        dateOfBirth: fields['Date of Birth']
      },
      clinical: {
        diagnosis: fields['Diagnosis'],
        diagnosisCode: extractICD10Code(fields['Diagnosis']),
        requestedProcedure: fields['Procedure'],
        procedureCode: extractCPTCode(fields['Procedure']),
        clinicalJustification: 'Medical necessity documented in clinical notes'
      },
      provider: {
        name: fields['Provider Name'],
        npi: 'NPI-PLACEHOLDER',
        taxId: 'TAX-PLACEHOLDER'
      },
      insurance: {
        payer: fields['Insurance'],
        planType: 'Commercial',
        groupNumber: 'GROUP-PLACEHOLDER'
      },
      requestType: 'Standard',
      urgency: 'Routine',
      status: 'Pending'
    }
  }

  return {
    fields,
    payload,
    summary: `Extracted ${Object.keys(fields).length} fields and generated structured prior authorization payload`
  }
}

function extractICD10Code(diagnosis: string) {
  const diagLower = diagnosis.toLowerCase()
  if (diagLower.includes('diabetes')) return 'E11.9'
  if (diagLower.includes('hypertension')) return 'I10'
  if (diagLower.includes('pneumonia')) return 'J18.9'
  if (diagLower.includes('copd')) return 'J44.9'
  return 'R69'
}

function extractCPTCode(procedure: string) {
  const procLower = procedure.toLowerCase()
  if (procLower.includes('mri')) return '70553'
  if (procLower.includes('ct scan')) return '71250'
  if (procLower.includes('surgery')) return '99999'
  if (procLower.includes('physical therapy')) return '97110'
  return '99213'
}
