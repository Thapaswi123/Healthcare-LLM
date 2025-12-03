# AI Clinical Co-Pilot

**Unified healthcare LLM workbench with agents for clinical decision support, medical coding, patient communication, prior authorization, and clinical trials exploration.**

## Overview

AI Clinical Co-Pilot is a comprehensive healthcare platform that integrates multiple AI-powered agents to assist healthcare professionals across various workflows.

## Features

### 1. 🩺 AI Clinical Co-Pilot
Enter symptoms or upload notes to generate differential diagnosis, summaries, and clinical insights.

**Capabilities:**
- Differential diagnosis generation
- Clinical summaries
- Evidence-based recommendations
- Symptom analysis

### 2. 📋 Automated Medical Coding Assistant
Map clinical notes to ICD-10, CPT, and HCPCS codes with human-readable descriptions.

**Capabilities:**
- ICD-10 code generation
- CPT procedure codes
- HCPCS codes
- Automated code mapping

### 3. 💬 Patient Communication Agent
Safe, triage-aware chat interface for common patient questions and symptom guidance.

**Capabilities:**
- Patient Q&A
- Symptom triage
- Health education
- Emergency detection

### 4. 📄 Prior Authorization & Claims Agent
Extract key fields from insurance documents and generate structured prior auth payloads.

**Capabilities:**
- Document field extraction
- Structured payload generation
- Insurance form processing
- Automated data entry

### 5. 🔬 Clinical Trials Intelligence
Search for relevant clinical trials based on condition, demographics, and location.

**Capabilities:**
- Trial matching
- Eligibility screening
- Location-based search
- Phase and status filtering

## Tech Stack

- **Frontend:** Next.js 14, React, TypeScript
- **Backend:** Next.js API Routes
- **Styling:** Custom CSS (Dark theme)
- **Port:** 3004

## Installation

```bash
cd "AI Clinical Co-Pilot"
npm install
```

## Running the Application

```bash
npm run dev
```

The application will be available at: **http://localhost:3004**

## API Endpoints

### POST /api/clinical-copilot
Generate differential diagnosis from clinical input.

### POST /api/medical-coding
Generate ICD-10, CPT, and HCPCS codes from clinical notes.

### POST /api/patient-communication
Patient-friendly Q&A with triage awareness.

### POST /api/prior-auth-agent
Extract fields and generate prior authorization payloads.

### POST /api/clinical-trials
Search clinical trials by condition, age, and location.

## Usage Examples

### Clinical Co-Pilot
```
Input: "45-year-old male with chest pain, shortness of breath, and diaphoresis for 2 hours"
Output: Differential diagnosis with top 3 conditions and clinical rationale
```

### Medical Coding
```
Input: "Patient presents with acute myocardial infarction. EKG shows ST elevation."
Output: ICD-10: I21.9, CPT: 93000, 71046, 84484
```

### Patient Communication
```
Input: "I have a fever and headache. What should I do?"
Output: Triage-aware guidance with home care tips and warning signs
```

### Prior Authorization
```
Input: Insurance document text
Output: Extracted fields + structured JSON payload
```

### Clinical Trials
```
Input: Condition: "Lung Cancer", Age: "55", Location: "New York"
Output: List of matching clinical trials with details
```

## Design

The application features a dark theme inspired by modern healthcare platforms:
- Dark blue background (#0a1929)
- Card-based module layout
- Hover effects for interactivity
- Clean, professional typography

## Disclaimer

⚠️ **For demonstration and educational purposes only.**

**Not a medical device. Not for clinical use.**

This application is a prototype and should not be used for actual clinical decision-making without proper validation, regulatory approval, and integration with certified medical systems.

## Future Enhancements

- [ ] Integration with real EHR systems (HL7, FHIR)
- [ ] OpenAI/Claude API integration for enhanced AI
- [ ] Real clinical trials database (ClinicalTrials.gov API)
- [ ] HIPAA-compliant infrastructure
- [ ] Multi-language support
- [ ] Voice input capabilities
- [ ] Mobile app version

## License

This is a demonstration project for educational purposes.
