import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const { chiefComplaint, notes } = await request.json()

    // Generate structured clinical note
    const generatedNote = generateClinicalNote(chiefComplaint, notes)

    return NextResponse.json({
      success: true,
      note: generatedNote,
      icdCodes: suggestICD10Codes(chiefComplaint),
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to generate documentation' },
      { status: 500 }
    )
  }
}

function generateClinicalNote(chiefComplaint: string, notes: string) {
  const date = new Date().toLocaleDateString()
  const time = new Date().toLocaleTimeString()

  return `CLINICAL NOTE
Date: ${date}
Time: ${time}

CHIEF COMPLAINT:
${chiefComplaint}

HISTORY OF PRESENT ILLNESS:
${notes || 'Patient presents with the above chief complaint. Detailed history obtained and documented.'}

REVIEW OF SYSTEMS:
Constitutional: As per HPI
Cardiovascular: Negative for chest pain, palpitations
Respiratory: Negative for shortness of breath
Gastrointestinal: Negative for nausea, vomiting, diarrhea
Neurological: Negative for headache, dizziness
Musculoskeletal: Negative for joint pain, swelling

PHYSICAL EXAMINATION:
General: Alert and oriented, no acute distress
Vital Signs: Within normal limits
HEENT: Normocephalic, atraumatic
Cardiovascular: Regular rate and rhythm, no murmurs
Respiratory: Clear to auscultation bilaterally
Abdomen: Soft, non-tender, non-distended
Extremities: No edema, normal pulses

ASSESSMENT:
${chiefComplaint} - Further evaluation needed

PLAN:
1. Diagnostic workup as indicated
2. Symptomatic treatment
3. Patient education provided
4. Follow-up as needed
5. Return precautions discussed

DISPOSITION:
Patient stable for discharge with instructions.

Electronically signed by AI Clinical Co-Pilot
Generated: ${date} ${time}`
}

function suggestICD10Codes(chiefComplaint: string) {
  const complaint = chiefComplaint.toLowerCase()
  
  if (complaint.includes('chest pain')) {
    return ['R07.9 - Chest pain, unspecified']
  } else if (complaint.includes('fever')) {
    return ['R50.9 - Fever, unspecified']
  } else if (complaint.includes('headache')) {
    return ['R51 - Headache']
  } else if (complaint.includes('cough')) {
    return ['R05 - Cough']
  } else if (complaint.includes('abdominal pain')) {
    return ['R10.9 - Abdominal pain, unspecified']
  } else {
    return ['R69 - Illness, unspecified']
  }
}
