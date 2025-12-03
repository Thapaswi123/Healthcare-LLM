import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const { condition, age, location } = await request.json()

    // Search for clinical trials
    const results = searchClinicalTrials(condition, age, location)

    return NextResponse.json({ results, count: results.length })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to search trials' },
      { status: 500 }
    )
  }
}

function searchClinicalTrials(condition: string, age: string, location: string) {
  const conditionLower = condition.toLowerCase()
  const trials: any[] = []

  // Mock clinical trials database
  const allTrials = [
    {
      nctId: 'NCT05123456',
      title: 'Phase III Study of Novel Immunotherapy for Advanced Lung Cancer',
      description: 'A randomized, double-blind study evaluating the efficacy and safety of a novel PD-L1 inhibitor in patients with advanced non-small cell lung cancer.',
      condition: 'Lung Cancer',
      phase: 'Phase 3',
      status: 'Recruiting',
      location: 'New York, NY',
      ageRange: '18-75',
      sponsor: 'Memorial Sloan Kettering Cancer Center'
    },
    {
      nctId: 'NCT05234567',
      title: 'Targeted Therapy for EGFR-Positive Lung Cancer',
      description: 'Study of targeted therapy in patients with EGFR mutation-positive non-small cell lung cancer.',
      condition: 'Lung Cancer',
      phase: 'Phase 2',
      status: 'Recruiting',
      location: 'Boston, MA',
      ageRange: '21-80',
      sponsor: 'Dana-Farber Cancer Institute'
    },
    {
      nctId: 'NCT05345678',
      title: 'Diabetes Prevention Program with Novel GLP-1 Agonist',
      description: 'Multicenter trial evaluating a new GLP-1 receptor agonist for prevention of type 2 diabetes in high-risk individuals.',
      condition: 'Diabetes',
      phase: 'Phase 3',
      status: 'Recruiting',
      location: 'Multiple Locations',
      ageRange: '30-70',
      sponsor: 'National Institute of Diabetes'
    },
    {
      nctId: 'NCT05456789',
      title: 'Cardiovascular Outcomes Study in Heart Failure',
      description: 'Long-term study of cardiovascular outcomes in patients with heart failure with reduced ejection fraction.',
      condition: 'Heart Failure',
      phase: 'Phase 4',
      status: 'Active, not recruiting',
      location: 'Cleveland, OH',
      ageRange: '40-85',
      sponsor: 'Cleveland Clinic'
    },
    {
      nctId: 'NCT05567890',
      title: 'Novel Anticoagulant for Atrial Fibrillation',
      description: 'Comparison of a novel oral anticoagulant versus warfarin in patients with atrial fibrillation.',
      condition: 'Atrial Fibrillation',
      phase: 'Phase 3',
      status: 'Recruiting',
      location: 'Multiple Locations',
      ageRange: '18-90',
      sponsor: 'Duke University Medical Center'
    },
    {
      nctId: 'NCT05678901',
      title: 'Alzheimer\'s Disease Prevention Trial',
      description: 'Study of a novel amyloid-targeting therapy for prevention of Alzheimer\'s disease in high-risk individuals.',
      condition: 'Alzheimer\'s Disease',
      phase: 'Phase 2',
      status: 'Recruiting',
      location: 'San Francisco, CA',
      ageRange: '55-80',
      sponsor: 'UCSF Memory and Aging Center'
    }
  ]

  // Filter trials based on condition
  const filteredTrials = allTrials.filter(trial => 
    trial.condition.toLowerCase().includes(conditionLower) ||
    trial.title.toLowerCase().includes(conditionLower) ||
    trial.description.toLowerCase().includes(conditionLower)
  )

  // If age provided, filter by age range
  if (age && filteredTrials.length > 0) {
    const ageNum = parseInt(age)
    return filteredTrials.filter(trial => {
      const [minAge, maxAge] = trial.ageRange.split('-').map(a => parseInt(a))
      return ageNum >= minAge && ageNum <= maxAge
    })
  }

  // If location provided, prioritize matching location
  if (location && filteredTrials.length > 0) {
    const locationLower = location.toLowerCase()
    const matchingLocation = filteredTrials.filter(trial => 
      trial.location.toLowerCase().includes(locationLower)
    )
    if (matchingLocation.length > 0) {
      return matchingLocation
    }
  }

  // Return filtered trials or all if no match
  return filteredTrials.length > 0 ? filteredTrials : allTrials.slice(0, 3)
}
