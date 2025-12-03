import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const { medications } = await request.json()

    // Check for drug interactions
    const interactions = checkDrugInteractions(medications)

    return NextResponse.json({
      success: true,
      interactions,
      medicationCount: medications.length,
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to check interactions' },
      { status: 500 }
    )
  }
}

function checkDrugInteractions(medications: string[]) {
  const interactions: any[] = []
  
  // Known drug interaction database
  const interactionDatabase: any = {
    'warfarin-aspirin': {
      severity: 'high',
      description: 'Increased risk of bleeding when warfarin and aspirin are used together.',
      recommendation: 'Monitor INR closely. Consider alternative antiplatelet if possible.'
    },
    'warfarin-ibuprofen': {
      severity: 'high',
      description: 'NSAIDs like ibuprofen increase bleeding risk with warfarin.',
      recommendation: 'Avoid concurrent use. Use acetaminophen for pain relief instead.'
    },
    'lisinopril-potassium': {
      severity: 'moderate',
      description: 'ACE inhibitors can increase potassium levels.',
      recommendation: 'Monitor serum potassium levels regularly.'
    },
    'metformin-alcohol': {
      severity: 'moderate',
      description: 'Alcohol increases risk of lactic acidosis with metformin.',
      recommendation: 'Advise patient to limit alcohol consumption.'
    }
  }

  // Check all medication pairs
  for (let i = 0; i < medications.length; i++) {
    for (let j = i + 1; j < medications.length; j++) {
      const med1 = medications[i].toLowerCase()
      const med2 = medications[j].toLowerCase()
      
      const key1 = `${med1}-${med2}`
      const key2 = `${med2}-${med1}`
      
      if (interactionDatabase[key1]) {
        interactions.push({
          drug1: medications[i],
          drug2: medications[j],
          ...interactionDatabase[key1]
        })
      } else if (interactionDatabase[key2]) {
        interactions.push({
          drug1: medications[i],
          drug2: medications[j],
          ...interactionDatabase[key2]
        })
      }
    }
  }

  return interactions
}
