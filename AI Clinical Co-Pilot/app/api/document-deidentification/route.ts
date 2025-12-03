import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const { document } = await request.json()

    // De-identify the document by removing PHI
    const deidentified = deidentifyDocument(document)

    return NextResponse.json({
      success: true,
      deidentified,
      phiRemoved: ['Names', 'Dates', 'IDs', 'Addresses', 'Phone Numbers'],
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to de-identify document' },
      { status: 500 }
    )
  }
}

function deidentifyDocument(text: string): string {
  let deidentified = text

  // Remove names (simple pattern matching)
  deidentified = deidentified.replace(/\b[A-Z][a-z]+ [A-Z][a-z]+\b/g, '[NAME]')
  
  // Remove dates
  deidentified = deidentified.replace(/\b\d{1,2}\/\d{1,2}\/\d{2,4}\b/g, '[DATE]')
  deidentified = deidentified.replace(/\b\d{4}-\d{2}-\d{2}\b/g, '[DATE]')
  
  // Remove phone numbers
  deidentified = deidentified.replace(/\b\d{3}[-.]?\d{3}[-.]?\d{4}\b/g, '[PHONE]')
  
  // Remove email addresses
  deidentified = deidentified.replace(/\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g, '[EMAIL]')
  
  // Remove SSN
  deidentified = deidentified.replace(/\b\d{3}-\d{2}-\d{4}\b/g, '[SSN]')
  
  // Remove MRN/ID numbers
  deidentified = deidentified.replace(/\b(MRN|ID|Patient ID):\s*\w+\b/gi, '$1: [REDACTED]')
  
  // Remove addresses (simple pattern)
  deidentified = deidentified.replace(/\b\d+\s+[A-Z][a-z]+\s+(Street|St|Avenue|Ave|Road|Rd|Boulevard|Blvd)\b/gi, '[ADDRESS]')
  
  // Remove zip codes
  deidentified = deidentified.replace(/\b\d{5}(-\d{4})?\b/g, '[ZIP]')

  return deidentified
}
