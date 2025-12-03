import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const { clinicalNote } = await request.json()

    // Generate medical codes based on clinical note
    const codes = generateMedicalCodes(clinicalNote)

    return NextResponse.json(codes)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to generate codes' },
      { status: 500 }
    )
  }
}

function generateMedicalCodes(note: string) {
  const noteLower = note.toLowerCase()
  
  const icd10: any[] = []
  const cpt: any[] = []
  const hcpcs: any[] = []

  // ICD-10 Code Generation
  if (noteLower.includes('myocardial infarction') || noteLower.includes('heart attack')) {
    icd10.push({ code: 'I21.9', description: 'Acute myocardial infarction, unspecified' })
    icd10.push({ code: 'I25.10', description: 'Atherosclerotic heart disease of native coronary artery without angina pectoris' })
  }
  if (noteLower.includes('pneumonia')) {
    icd10.push({ code: 'J18.9', description: 'Pneumonia, unspecified organism' })
  }
  if (noteLower.includes('diabetes')) {
    icd10.push({ code: 'E11.9', description: 'Type 2 diabetes mellitus without complications' })
  }
  if (noteLower.includes('hypertension') || noteLower.includes('high blood pressure')) {
    icd10.push({ code: 'I10', description: 'Essential (primary) hypertension' })
  }
  if (noteLower.includes('chest pain')) {
    icd10.push({ code: 'R07.9', description: 'Chest pain, unspecified' })
  }
  if (noteLower.includes('fever')) {
    icd10.push({ code: 'R50.9', description: 'Fever, unspecified' })
  }

  // CPT Code Generation
  if (noteLower.includes('ekg') || noteLower.includes('ecg') || noteLower.includes('electrocardiogram')) {
    cpt.push({ code: '93000', description: 'Electrocardiogram, routine ECG with at least 12 leads; with interpretation and report' })
  }
  if (noteLower.includes('chest x-ray') || noteLower.includes('cxr')) {
    cpt.push({ code: '71046', description: 'Radiologic examination, chest; 2 views' })
  }
  if (noteLower.includes('troponin')) {
    cpt.push({ code: '84484', description: 'Troponin, quantitative' })
  }
  if (noteLower.includes('complete blood count') || noteLower.includes('cbc')) {
    cpt.push({ code: '85025', description: 'Blood count; complete (CBC), automated and automated differential WBC count' })
  }
  if (noteLower.includes('office visit') || noteLower.includes('consultation')) {
    cpt.push({ code: '99214', description: 'Office or other outpatient visit, established patient, 30-39 minutes' })
  }

  // HCPCS Codes (if applicable)
  if (noteLower.includes('ambulance')) {
    hcpcs.push({ code: 'A0429', description: 'Ambulance service, basic life support, emergency transport' })
  }

  // Default codes if nothing specific found
  if (icd10.length === 0) {
    icd10.push({ code: 'R69', description: 'Illness, unspecified' })
  }
  if (cpt.length === 0) {
    cpt.push({ code: '99213', description: 'Office or other outpatient visit, established patient, 20-29 minutes' })
  }

  return {
    icd10,
    cpt,
    hcpcs,
    summary: `Generated ${icd10.length} ICD-10 code(s), ${cpt.length} CPT code(s), and ${hcpcs.length} HCPCS code(s)`
  }
}
