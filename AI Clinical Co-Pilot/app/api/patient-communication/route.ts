import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const startTime = Date.now()
  
  try {
    const { message, history } = await request.json()

    // Check for emergency keywords first
    const emergencyResponse = checkEmergency(message)
    if (emergencyResponse) {
      return NextResponse.json({ 
        response: emergencyResponse,
        responseTime: Date.now() - startTime
      })
    }

    // Use intelligent response
    const aiResponse = getIntelligentResponse(message, history)
    const responseTime = Date.now() - startTime

    return NextResponse.json({ 
      response: aiResponse,
      responseTime
    })
  } catch (error) {
    console.error('Error:', error)
    
    // Fallback response
    const fallbackResponse = getFallbackResponse()
    
    return NextResponse.json({ 
      response: fallbackResponse,
      responseTime: Date.now() - startTime,
      error: false
    })
  }
}

// Check for emergency keywords
function checkEmergency(message: string) {
  const messageLower = message.toLowerCase()
  const emergencyKeywords = [
    'chest pain', 'heart attack', 'can\'t breathe', 'cannot breathe',
    'severe bleeding', 'unconscious', 'stroke', 'seizure',
    'suicide', 'overdose', 'choking'
  ]

  for (const keyword of emergencyKeywords) {
    if (messageLower.includes(keyword)) {
      return `🚨 EMERGENCY ALERT 🚨

Based on your symptoms, this could be a medical emergency. 

IMMEDIATE ACTION REQUIRED:
• Call 911 or your local emergency number NOW
• Go to the nearest emergency room
• Do not drive yourself - call an ambulance

If you're experiencing:
- Chest pain or pressure
- Difficulty breathing
- Severe bleeding
- Loss of consciousness
- Stroke symptoms (face drooping, arm weakness, speech difficulty)

These require IMMEDIATE medical attention.

⚠️ This is an automated triage system. Please seek emergency care immediately.`
    }
  }
  return null
}

// Intelligent response without OpenAI (rule-based)
function getIntelligentResponse(message: string, history: any[]) {
  const messageLower = message.toLowerCase()
  
  // Fever and headache
  if ((messageLower.includes('fever') || messageLower.includes('temperature')) && 
      (messageLower.includes('headache') || messageLower.includes('head pain'))) {
    return `I understand you're experiencing a fever and headache. Here's what I recommend:

**Immediate Care:**
1. **Monitor your temperature**: Keep track of your fever. If it goes above 103°F (39.4°C) or lasts more than 3 days, contact your doctor.
2. **Stay hydrated**: Drink plenty of fluids like water, herbal tea, or clear broths.
3. **Rest**: Your body needs energy to fight off infection.
4. **Over-the-counter relief**: You can take acetaminophen (Tylenol) or ibuprofen (Advil) as directed for fever and pain relief.

**Watch for Warning Signs:**
- Severe headache or stiff neck
- Confusion or difficulty staying awake
- Persistent vomiting
- Difficulty breathing
- Rash

**When to Seek Care:**
- If fever exceeds 103°F (39.4°C)
- Symptoms worsen or don't improve in 2-3 days
- You develop any warning signs listed above

⚠️ **Medical Disclaimer**: This information is for educational purposes only and is not a substitute for professional medical advice, diagnosis, or treatment. Always consult with a qualified healthcare provider for medical concerns.`
  }
  
  // Headache only
  if (messageLower.includes('headache') || messageLower.includes('head pain')) {
    return `For your headache, here are some helpful recommendations:

**Home Care:**
- Rest in a quiet, dark room
- Apply a cold or warm compress to your head or neck
- Stay hydrated with water
- Avoid caffeine and alcohol
- Practice relaxation techniques

**Over-the-counter options:**
- Acetaminophen (Tylenol)
- Ibuprofen (Advil, Motrin)
- Aspirin (for adults only)

**When to See a Doctor:**
- Sudden, severe headache ("worst headache of your life")
- Headache with fever, stiff neck, confusion, or vision changes
- Headache after a head injury
- Chronic headaches that worsen over time
- Headaches that interfere with daily activities

**Schedule an appointment if:**
- Headaches occur more than 2-3 times per week
- You need to take pain medication more than twice a week
- Pattern of headaches changes

⚠️ **Medical Disclaimer**: This information is for educational purposes only. Please consult a healthcare professional for proper diagnosis and treatment.`
  }
  
  // Cough
  if (messageLower.includes('cough')) {
    return `For your cough, here are some helpful tips:

**Home Care:**
- Stay hydrated with warm liquids (tea with honey, warm water)
- Use a humidifier to add moisture to the air
- Avoid irritants like smoke and strong odors
- Get plenty of rest
- Try honey (for adults and children over 1 year)

**Over-the-counter options:**
- Cough suppressants (dextromethorphan) for dry cough
- Expectorants (guaifenesin) for productive cough
- Throat lozenges

**When to See a Doctor:**
- Cough lasts more than 3 weeks
- Coughing up blood or thick green/yellow mucus
- Fever above 100.4°F (38°C)
- Shortness of breath or wheezing
- Chest pain
- Difficulty breathing

⚠️ **Medical Disclaimer**: This is for informational purposes only. Consult a healthcare provider for proper evaluation and treatment.`
  }

  // Fever
  if (messageLower.includes('fever') || messageLower.includes('temperature')) {
    return `For fever management, here's what I recommend:

**Immediate Care:**
- Monitor your temperature regularly
- Stay hydrated with plenty of fluids
- Rest and avoid strenuous activity
- Dress lightly and keep room cool
- Take acetaminophen or ibuprofen as directed

**When to Seek Medical Care:**
- Fever above 103°F (39.4°C)
- Fever lasting more than 3 days
- Severe symptoms like difficulty breathing
- Signs of dehydration
- Persistent vomiting

**For Children:**
- Fever above 100.4°F (38°C) in infants under 3 months
- Fever above 102°F (38.9°C) in children 3-24 months
- Any fever with concerning symptoms

⚠️ **Medical Disclaimer**: This information is for educational purposes only. Please consult a healthcare professional for proper diagnosis and treatment.`
  }
  
  // General health question
  return `Thank you for your question. I'm here to help provide general health information and guidance.

**For Your Symptoms:**
Based on what you've described, I recommend:
- Monitor your symptoms closely
- Stay hydrated and get adequate rest
- Consider over-the-counter remedies if appropriate
- Contact your healthcare provider if symptoms worsen

**When to Seek Medical Care:**

**Urgent (within 24 hours):**
- High fever (above 103°F/39.4°C)
- Severe pain
- Persistent vomiting or diarrhea
- Signs of dehydration
- Symptoms that are getting worse

**Emergency (call 911):**
- Chest pain or pressure
- Difficulty breathing
- Severe bleeding
- Loss of consciousness
- Stroke symptoms (face drooping, arm weakness, speech difficulty)

**Schedule an appointment:**
- Symptoms lasting more than a week
- Mild to moderate concerns
- Preventive care or check-ups

⚠️ **Medical Disclaimer**: This information is for educational purposes only and is not a substitute for professional medical advice, diagnosis, or treatment. Always consult with a qualified healthcare provider for medical concerns.`
}

// Fallback response
function getFallbackResponse() {
  return `Thank you for your question. I'm here to help provide general health information.

**For immediate assistance:**
- If this is an emergency, call 911
- For urgent concerns, contact your healthcare provider
- For general questions, you can try again in a moment

**Common Resources:**
- CDC Health Information: cdc.gov
- Mayo Clinic: mayoclinic.org
- Your healthcare provider's patient portal

⚠️ **Important**: This is for informational purposes only. Please consult a healthcare professional for medical advice.

Would you like to try your question again?`
}