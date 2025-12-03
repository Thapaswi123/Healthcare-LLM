import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const { input } = await request.json()

    // Generate differential diagnosis based on input
    const result = generateDifferentialDiagnosis(input)

    return NextResponse.json(result)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to generate diagnosis' },
      { status: 500 }
    )
  }
}

function generateDifferentialDiagnosis(input: string) {
  const inputLower = input.toLowerCase()
  
  // Extract key symptoms
  const hasChestPain = inputLower.includes('chest pain') || inputLower.includes('chest discomfort')
  const hasSOB = inputLower.includes('shortness of breath') || inputLower.includes('dyspnea')
  const hasDiaphoresis = inputLower.includes('sweating') || inputLower.includes('diaphoresis')
  const hasFever = inputLower.includes('fever')
  const hasCough = inputLower.includes('cough')

  let diagnoses = []
  let summary = ''

  if (hasChestPain && hasSOB && hasDiaphoresis) {
    summary = 'Patient presents with classic symptoms suggestive of acute coronary syndrome. Immediate evaluation recommended.'
    diagnoses = [
      {
        condition: 'Acute Myocardial Infarction (STEMI/NSTEMI)',
        rationale: 'Chest pain with diaphoresis and dyspnea are classic presentations. Requires immediate ECG and troponin levels.'
      },
      {
        condition: 'Unstable Angina',
        rationale: 'Similar presentation but without myocardial necrosis. Requires cardiac workup and risk stratification.'
      },
      {
        condition: 'Pulmonary Embolism',
        rationale: 'Can present with chest pain and dyspnea. Consider D-dimer and CT angiography if risk factors present.'
      }
    ]
  } else if (hasFever && hasCough) {
    summary = 'Patient presents with respiratory symptoms consistent with infectious etiology.'
    diagnoses = [
      {
        condition: 'Community-Acquired Pneumonia',
        rationale: 'Fever and cough are hallmark symptoms. Chest X-ray and sputum culture recommended.'
      },
      {
        condition: 'Acute Bronchitis',
        rationale: 'Common viral infection. Usually self-limiting but may require symptomatic treatment.'
      },
      {
        condition: 'COVID-19',
        rationale: 'Consider SARS-CoV-2 testing given current epidemiology.'
      }
    ]
  } else {
    summary = 'Patient presents with symptoms requiring further clinical evaluation and diagnostic workup.'
    diagnoses = [
      {
        condition: 'Requires Clinical Correlation',
        rationale: 'Symptoms are non-specific. Detailed history, physical examination, and targeted testing needed.'
      },
      {
        condition: 'Consider Common Differentials',
        rationale: 'Based on symptom pattern, consider infectious, inflammatory, or systemic causes.'
      }
    ]
  }

  return {
    summary,
    diagnoses,
    recommendations: [
      'Obtain detailed patient history',
      'Perform thorough physical examination',
      'Order appropriate diagnostic tests',
      'Consider specialist consultation if indicated'
    ]
  }
}
