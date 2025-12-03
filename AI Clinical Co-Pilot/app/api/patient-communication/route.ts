import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const { message, history } = await request.json()

    // Generate patient-friendly response
    const response = generatePatientResponse(message, history)

    return NextResponse.json({ response })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to generate response' },
      { status: 500 }
    )
  }
}

function generatePatientResponse(message: string, history: any[]) {
  const messageLower = message.toLowerCase()

  // Emergency triage
  if (messageLower.includes('chest pain') || messageLower.includes('heart attack') || 
      messageLower.includes('can\'t breathe') || messageLower.includes('severe bleeding')) {
    return `⚠️ URGENT: Based on your symptoms, you should seek immediate medical attention. Please call 911 or go to the nearest emergency room right away. These symptoms could indicate a serious medical condition that requires immediate evaluation.`
  }

  // Fever and common symptoms
  if (messageLower.includes('fever') && messageLower.includes('headache')) {
    return `I understand you're experiencing a fever and headache. Here's what I recommend:

1. **Monitor your temperature**: Keep track of your fever. If it goes above 103°F (39.4°C) or lasts more than 3 days, contact your doctor.

2. **Stay hydrated**: Drink plenty of fluids like water, herbal tea, or clear broths.

3. **Rest**: Your body needs energy to fight off infection.

4. **Over-the-counter relief**: You can take acetaminophen (Tylenol) or ibuprofen (Advil) as directed on the package for fever and pain relief.

5. **Watch for warning signs**: Seek immediate care if you develop:
   - Severe headache or stiff neck
   - Confusion or difficulty staying awake
   - Persistent vomiting
   - Difficulty breathing
   - Rash

If symptoms worsen or don't improve in 2-3 days, please schedule an appointment with your healthcare provider.

Is there anything specific about your symptoms you'd like to discuss?`
  }

  // Cough
  if (messageLower.includes('cough')) {
    return `For your cough, here are some helpful tips:

**Home Care:**
- Stay hydrated with warm liquids (tea with honey, warm water)
- Use a humidifier to add moisture to the air
- Avoid irritants like smoke and strong odors
- Get plenty of rest

**When to See a Doctor:**
- Cough lasts more than 3 weeks
- Coughing up blood or thick green/yellow mucus
- Fever above 100.4°F (38°C)
- Shortness of breath or wheezing
- Chest pain

**Over-the-counter options:**
- Cough suppressants (dextromethorphan)
- Expectorants (guaifenesin)
- Throat lozenges

Would you like more specific guidance based on how long you've had the cough?`
  }

  // General health question
  if (messageLower.includes('should i see a doctor') || messageLower.includes('when to see doctor')) {
    return `You should see a doctor if you experience:

**Urgent (within 24 hours):**
- High fever (above 103°F/39.4°C)
- Severe pain
- Persistent vomiting or diarrhea
- Signs of dehydration
- Symptoms that are getting worse

**Schedule an appointment:**
- Symptoms lasting more than a week
- Mild to moderate pain
- Concerns about existing conditions
- Preventive care or check-ups

**Emergency (call 911):**
- Chest pain or pressure
- Difficulty breathing
- Severe bleeding
- Loss of consciousness
- Stroke symptoms (face drooping, arm weakness, speech difficulty)

Can you tell me more about your specific symptoms so I can provide better guidance?`
  }

  // Default response
  return `Thank you for your question. I'm here to help provide general health information and guidance.

To give you the most helpful response, could you please provide more details about:
- Your specific symptoms
- How long you've been experiencing them
- Any other relevant health information

**Important reminder:** This is for informational purposes only and not a substitute for professional medical advice. If you're experiencing severe symptoms or have concerns about your health, please contact your healthcare provider or seek immediate medical attention.

What specific health concern can I help you with today?`
}
