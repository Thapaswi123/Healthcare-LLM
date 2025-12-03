import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const { question } = await request.json()

    // Generate answer from knowledge graph
    const result = queryKnowledgeGraph(question)

    return NextResponse.json(result)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to query knowledge graph' },
      { status: 500 }
    )
  }
}

function queryKnowledgeGraph(question: string) {
  const questionLower = question.toLowerCase()
  
  // Simple knowledge base
  if (questionLower.includes('diabetes') || questionLower.includes('type 2')) {
    return {
      answer: 'Type 2 Diabetes treatment typically involves a combination of lifestyle modifications and medications. First-line treatment includes metformin, along with diet and exercise. Additional medications may include sulfonylureas, DPP-4 inhibitors, GLP-1 receptor agonists, or SGLT2 inhibitors. Insulin therapy may be required in advanced cases.',
      sources: [
        'American Diabetes Association Guidelines 2024',
        'WHO Diabetes Treatment Protocol',
        'Clinical Practice Guidelines for Type 2 Diabetes'
      ],
      relatedConcepts: ['Metformin', 'Insulin Resistance', 'HbA1c', 'Glycemic Control']
    }
  } else if (questionLower.includes('hypertension') || questionLower.includes('blood pressure')) {
    return {
      answer: 'Hypertension management includes lifestyle modifications (diet, exercise, weight loss) and pharmacotherapy. First-line medications include ACE inhibitors, ARBs, calcium channel blockers, and thiazide diuretics. Target blood pressure is typically <130/80 mmHg for most patients.',
      sources: [
        'ACC/AHA Hypertension Guidelines',
        'JNC 8 Guidelines',
        'European Society of Cardiology Guidelines'
      ],
      relatedConcepts: ['ACE Inhibitors', 'Systolic BP', 'Diastolic BP', 'Cardiovascular Risk']
    }
  } else {
    return {
      answer: 'Based on your question, I recommend consulting evidence-based clinical guidelines and peer-reviewed literature. For specific medical conditions, treatment should be individualized based on patient factors, comorbidities, and current best practices.',
      sources: [
        'UpToDate Clinical Database',
        'PubMed Medical Literature',
        'Clinical Practice Guidelines'
      ],
      relatedConcepts: ['Evidence-Based Medicine', 'Clinical Guidelines', 'Patient-Centered Care']
    }
  }
}
