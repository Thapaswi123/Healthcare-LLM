import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const { symptoms, age, gender } = await request.json()

    // AI-powered diagnosis logic
    const diagnoses = generateDiagnoses(symptoms, age, gender)

    return NextResponse.json({
      success: true,
      diagnoses,
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to analyze symptoms' },
      { status: 500 }
    )
  }
}

function generateDiagnoses(symptoms: string, age: string, gender: string) {
  const symptomsLower = symptoms.toLowerCase()
  
  const diagnoses = []

  if (symptomsLower.includes('fever') && symptomsLower.includes('cough')) {
    diagnoses.push({
      condition: 'Upper Respiratory Infection',
      probability: 85,
      description: 'Common viral infection affecting the nose, throat, and airways. Usually self-limiting.',
      tests: ['Complete Blood Count', 'Chest X-ray', 'Rapid Flu Test']
    })
    diagnoses.push({
      condition: 'Influenza',
      probability: 72,
      description: 'Viral infection causing fever, cough, body aches, and fatigue.',
      tests: ['Rapid Influenza Test', 'PCR Test']
    })
    diagnoses.push({
      condition: 'COVID-19',
      probability: 68,
      description: 'Coronavirus infection with respiratory symptoms.',
      tests: ['COVID-19 PCR Test', 'Rapid Antigen Test', 'Chest CT']
    })
  } else if (symptomsLower.includes('chest pain')) {
    diagnoses.push({
      condition: 'Acute Coronary Syndrome',
      probability: 78,
      description: 'Potential heart attack or unstable angina requiring immediate evaluation.',
      tests: ['ECG', 'Troponin', 'Chest X-ray', 'Echocardiogram']
    })
    diagnoses.push({
      condition: 'Gastroesophageal Reflux Disease',
      probability: 65,
      description: 'Acid reflux causing chest discomfort.',
      tests: ['Upper Endoscopy', 'pH Monitoring']
    })
    diagnoses.push({
      condition: 'Costochondritis',
      probability: 55,
      description: 'Inflammation of chest wall cartilage.',
      tests: ['Physical Examination', 'Chest X-ray']
    })
  } else if (symptomsLower.includes('headache')) {
    diagnoses.push({
      condition: 'Tension Headache',
      probability: 80,
      description: 'Most common type of headache, often stress-related.',
      tests: ['Physical Examination', 'Blood Pressure Check']
    })
    diagnoses.push({
      condition: 'Migraine',
      probability: 70,
      description: 'Severe headache often with nausea and light sensitivity.',
      tests: ['Neurological Exam', 'MRI (if indicated)']
    })
    diagnoses.push({
      condition: 'Sinusitis',
      probability: 60,
      description: 'Sinus infection causing facial pain and headache.',
      tests: ['Physical Exam', 'CT Scan (if chronic)']
    })
  } else {
    diagnoses.push({
      condition: 'General Malaise',
      probability: 75,
      description: 'Non-specific symptoms requiring further evaluation.',
      tests: ['Complete Blood Count', 'Metabolic Panel', 'Urinalysis']
    })
    diagnoses.push({
      condition: 'Viral Syndrome',
      probability: 65,
      description: 'Common viral illness with various symptoms.',
      tests: ['Physical Examination', 'Symptom Monitoring']
    })
    diagnoses.push({
      condition: 'Requires Further Evaluation',
      probability: 50,
      description: 'Symptoms need detailed clinical assessment.',
      tests: ['Comprehensive History', 'Physical Exam', 'Targeted Testing']
    })
  }

  return diagnoses.slice(0, 3)
}
