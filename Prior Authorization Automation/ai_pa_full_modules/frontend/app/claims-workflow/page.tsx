'use client'
import { useState } from 'react'
import Link from 'next/link'

export default function ClaimsWorkflow() {
  const [activeStep, setActiveStep] = useState(0)
  const [patientData, setPatientData] = useState({
    name: '',
    insuranceId: '',
    copay: '',
    eligibilityStatus: 'pending'
  })

  const workflowSteps = [
    {
      id: 1,
      title: 'Patient Registration & Eligibility',
      icon: '👤',
      status: 'active',
      timeline: 'Day 0',
      description: 'Patient schedules appointment, presents insurance card and ID'
    },
    {
      id: 2,
      title: 'Clinical Encounter & Documentation',
      icon: '🏥',
      status: 'pending',
      timeline: 'Day 0',
      description: 'Doctor examines patient, records diagnosis and treatment in EHR'
    },
    {
      id: 3,
      title: 'Medical Coding & Charge Capture',
      icon: '📋',
      status: 'pending',
      timeline: 'Day 1-3',
      description: 'Convert clinical notes into ICD-10 and CPT/HCPCS codes'
    },
    {
      id: 4,
      title: 'Claim Creation & Clearinghouse',
      icon: '📤',
      status: 'pending',
      timeline: 'Day 3-7',
      description: 'Generate EDI 837 claim and submit through clearinghouse'
    },
    {
      id: 5,
      title: 'Insurance Adjudication',
      icon: '🔍',
      status: 'pending',
      timeline: 'Day 7-45',
      description: 'Insurance verifies eligibility and decides payment'
    },
    {
      id: 6,
      title: 'Payment & Remittance',
      icon: '💰',
      status: 'pending',
      timeline: 'Day 45-60',
      description: 'Insurer sends EFT and ERA, provider posts payment'
    },
    {
      id: 7,
      title: 'Patient Billing & Collections',
      icon: '📧',
      status: 'pending',
      timeline: 'Day 60-90',
      description: 'Patient receives final bill and pays remaining balance'
    },
    {
      id: 8,
      title: 'Denials & Appeals',
      icon: '⚖️',
      status: 'pending',
      timeline: 'As needed',
      description: 'Appeal denied or underpaid claims with documentation'
    }
  ]

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0a1929', color: 'white', padding: '40px' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ marginBottom: '30px' }}>
          <Link href="/" style={{ color: '#3b82f6', textDecoration: 'none', fontSize: '14px' }}>
            ← Back to Dashboard
          </Link>
          <h1 style={{ fontSize: '32px', marginTop: '20px', marginBottom: '10px' }}>
            Medical Claims Process - End-to-End Workflow
          </h1>
          <p style={{ color: '#8b9dc3', fontSize: '16px' }}>
            Complete workflow from patient registration to payment processing
          </p>
        </div>

        {/* Workflow Timeline */}
        <div style={{ backgroundColor: '#132f4c', padding: '30px', borderRadius: '8px', border: '1px solid #1e3a5f', marginBottom: '30px' }}>
          <h2 style={{ fontSize: '20px', marginBottom: '25px' }}>Workflow Progress</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
            {workflowSteps.map((step, index) => (
              <div
                key={step.id}
                onClick={() => setActiveStep(index)}
                style={{
                  backgroundColor: activeStep === index ? '#1e3a5f' : '#0a1929',
                  padding: '20px',
                  borderRadius: '8px',
                  border: activeStep === index ? '2px solid #3b82f6' : '1px solid #1e3a5f',
                  cursor: 'pointer',
                  transition: 'all 0.3s'
                }}
              >
                <div style={{ fontSize: '32px', marginBottom: '10px' }}>{step.icon}</div>
                <div style={{ fontSize: '14px', fontWeight: '600', marginBottom: '5px' }}>
                  Step {step.id}: {step.title}
                </div>
                <div style={{ fontSize: '12px', color: '#8b9dc3', marginBottom: '8px' }}>
                  {step.description}
                </div>
                <div style={{ fontSize: '11px', color: '#5a6c7d' }}>
                  Timeline: {step.timeline}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Active Step Details */}
        <div style={{ backgroundColor: '#132f4c', padding: '30px', borderRadius: '8px', border: '1px solid #1e3a5f', marginBottom: '30px' }}>
          <h2 style={{ fontSize: '24px', marginBottom: '20px' }}>
            {workflowSteps[activeStep].icon} {workflowSteps[activeStep].title}
          </h2>
          
          {activeStep === 0 && <Step1PatientRegistration patientData={patientData} setPatientData={setPatientData} />}
          {activeStep === 1 && <Step2ClinicalEncounter />}
          {activeStep === 2 && <Step3MedicalCoding />}
          {activeStep === 3 && <Step4ClaimSubmission />}
          {activeStep === 4 && <Step5Adjudication />}
          {activeStep === 5 && <Step6Payment />}
          {activeStep === 6 && <Step7PatientBilling />}
          {activeStep === 7 && <Step8Denials />}

          <div style={{ marginTop: '30px', display: 'flex', gap: '10px', justifyContent: 'space-between' }}>
            <button
              onClick={() => setActiveStep(Math.max(0, activeStep - 1))}
              disabled={activeStep === 0}
              style={{
                padding: '12px 24px',
                backgroundColor: activeStep === 0 ? '#1e3a5f' : '#3b82f6',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: activeStep === 0 ? 'not-allowed' : 'pointer'
              }}
            >
              ← Previous Step
            </button>
            <button
              onClick={() => setActiveStep(Math.min(workflowSteps.length - 1, activeStep + 1))}
              disabled={activeStep === workflowSteps.length - 1}
              style={{
                padding: '12px 24px',
                backgroundColor: activeStep === workflowSteps.length - 1 ? '#1e3a5f' : '#16a34a',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: activeStep === workflowSteps.length - 1 ? 'not-allowed' : 'pointer'
              }}
            >
              Next Step →
            </button>
          </div>
        </div>

        {/* Key Stakeholders */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px', marginBottom: '30px' }}>
          <div style={{ backgroundColor: '#132f4c', padding: '20px', borderRadius: '8px', border: '1px solid #1e3a5f' }}>
            <h3 style={{ fontSize: '18px', marginBottom: '15px' }}>👥 Key Stakeholders</h3>
            <ul style={{ color: '#8b9dc3', fontSize: '14px', lineHeight: '2', paddingLeft: '20px' }}>
              <li>Patient</li>
              <li>Doctor/Hospital</li>
              <li>Insurance Company</li>
              <li>Clearinghouse</li>
              <li>Billing & RCM Team</li>
            </ul>
          </div>

          <div style={{ backgroundColor: '#132f4c', padding: '20px', borderRadius: '8px', border: '1px solid #1e3a5f' }}>
            <h3 style={{ fontSize: '18px', marginBottom: '15px' }}>⚠️ Common Failure Points</h3>
            <ul style={{ color: '#8b9dc3', fontSize: '14px', lineHeight: '2', paddingLeft: '20px' }}>
              <li>Eligibility errors</li>
              <li>Missing authorization</li>
              <li>Coding errors</li>
              <li>Medical necessity denials</li>
              <li>Late filing</li>
            </ul>
          </div>

          <div style={{ backgroundColor: '#132f4c', padding: '20px', borderRadius: '8px', border: '1px solid #1e3a5f' }}>
            <h3 style={{ fontSize: '18px', marginBottom: '15px' }}>⏱️ Typical Timeline</h3>
            <ul style={{ color: '#8b9dc3', fontSize: '14px', lineHeight: '2', paddingLeft: '20px' }}>
              <li>Visit to submission: 1–7 days</li>
              <li>Adjudication: 7–45 days</li>
              <li>Patient billing: 30–90 days</li>
              <li>Total cycle: 38–142 days</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

// Step 1: Patient Registration & Eligibility Verification
function Step1PatientRegistration({ patientData, setPatientData }: any) {
  const [eligibilityChecked, setEligibilityChecked] = useState(false)

  const checkEligibility = () => {
    setEligibilityChecked(true)
    setPatientData({ ...patientData, eligibilityStatus: 'verified' })
  }

  return (
    <div>
      <div style={{ backgroundColor: '#0a1929', padding: '20px', borderRadius: '8px', marginBottom: '20px' }}>
        <h3 style={{ fontSize: '18px', marginBottom: '15px' }}>Patient Information</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px', color: '#8b9dc3' }}>
              Patient Name:
            </label>
            <input
              type="text"
              value={patientData.name}
              onChange={(e) => setPatientData({ ...patientData, name: e.target.value })}
              placeholder="John Doe"
              style={{
                width: '100%',
                padding: '10px',
                backgroundColor: '#132f4c',
                color: 'white',
                border: '1px solid #1e3a5f',
                borderRadius: '4px'
              }}
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px', color: '#8b9dc3' }}>
              Insurance ID:
            </label>
            <input
              type="text"
              value={patientData.insuranceId}
              onChange={(e) => setPatientData({ ...patientData, insuranceId: e.target.value })}
              placeholder="INS123456789"
              style={{
                width: '100%',
                padding: '10px',
                backgroundColor: '#132f4c',
                color: 'white',
                border: '1px solid #1e3a5f',
                borderRadius: '4px'
              }}
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px', color: '#8b9dc3' }}>
              Copay Amount:
            </label>
            <input
              type="text"
              value={patientData.copay}
              onChange={(e) => setPatientData({ ...patientData, copay: e.target.value })}
              placeholder="$25.00"
              style={{
                width: '100%',
                padding: '10px',
                backgroundColor: '#132f4c',
                color: 'white',
                border: '1px solid #1e3a5f',
                borderRadius: '4px'
              }}
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px', color: '#8b9dc3' }}>
              Eligibility Status:
            </label>
            <div style={{
              padding: '10px',
              backgroundColor: patientData.eligibilityStatus === 'verified' ? '#16a34a' : '#ca8a04',
              borderRadius: '4px',
              textAlign: 'center',
              fontWeight: '600'
            }}>
              {patientData.eligibilityStatus === 'verified' ? '✓ Verified' : '⏳ Pending'}
            </div>
          </div>
        </div>
        <button
          onClick={checkEligibility}
          disabled={eligibilityChecked}
          style={{
            marginTop: '15px',
            padding: '10px 20px',
            backgroundColor: eligibilityChecked ? '#1e3a5f' : '#3b82f6',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: eligibilityChecked ? 'not-allowed' : 'pointer'
          }}
        >
          {eligibilityChecked ? '✓ Eligibility Verified' : 'Check Eligibility'}
        </button>
      </div>

      <div style={{ backgroundColor: '#0a1929', padding: '15px', borderRadius: '8px' }}>
        <h4 style={{ fontSize: '16px', marginBottom: '10px' }}>Required Actions:</h4>
        <ul style={{ color: '#8b9dc3', fontSize: '14px', lineHeight: '1.8', paddingLeft: '20px' }}>
          <li>Verify patient insurance card and ID</li>
          <li>Check insurance eligibility and benefits</li>
          <li>Collect copay payment</li>
          <li>Obtain consent forms and HIPAA authorization</li>
          <li>Update patient demographics in system</li>
        </ul>
      </div>
    </div>
  )
}

// Step 2: Clinical Encounter & Documentation
function Step2ClinicalEncounter() {
  return (
    <div>
      <div style={{ backgroundColor: '#0a1929', padding: '20px', borderRadius: '8px', marginBottom: '20px' }}>
        <h3 style={{ fontSize: '18px', marginBottom: '15px' }}>Clinical Documentation</h3>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px', color: '#8b9dc3' }}>
            Chief Complaint:
          </label>
          <input
            type="text"
            placeholder="e.g., Chest pain, shortness of breath"
            style={{
              width: '100%',
              padding: '10px',
              backgroundColor: '#132f4c',
              color: 'white',
              border: '1px solid #1e3a5f',
              borderRadius: '4px'
            }}
          />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px', color: '#8b9dc3' }}>
            Diagnosis:
          </label>
          <textarea
            placeholder="Enter diagnosis and clinical findings..."
            style={{
              width: '100%',
              minHeight: '100px',
              padding: '10px',
              backgroundColor: '#132f4c',
              color: 'white',
              border: '1px solid #1e3a5f',
              borderRadius: '4px'
            }}
          />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px', color: '#8b9dc3' }}>
            Treatment Plan:
          </label>
          <textarea
            placeholder="Enter treatment plan and procedures..."
            style={{
              width: '100%',
              minHeight: '100px',
              padding: '10px',
              backgroundColor: '#132f4c',
              color: 'white',
              border: '1px solid #1e3a5f',
              borderRadius: '4px'
            }}
          />
        </div>
      </div>

      <div style={{ backgroundColor: '#0a1929', padding: '15px', borderRadius: '8px' }}>
        <h4 style={{ fontSize: '16px', marginBottom: '10px' }}>Required Actions:</h4>
        <ul style={{ color: '#8b9dc3', fontSize: '14px', lineHeight: '1.8', paddingLeft: '20px' }}>
          <li>Conduct patient examination</li>
          <li>Document chief complaint and history</li>
          <li>Record diagnosis and clinical findings in EHR</li>
          <li>Establish medical necessity for treatment</li>
          <li>Create treatment plan and orders</li>
        </ul>
      </div>
    </div>
  )
}

// Step 3: Medical Coding & Charge Capture
function Step3MedicalCoding() {
  return (
    <div>
      <div style={{ backgroundColor: '#0a1929', padding: '20px', borderRadius: '8px', marginBottom: '20px' }}>
        <h3 style={{ fontSize: '18px', marginBottom: '15px' }}>Medical Codes</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
          <div>
            <h4 style={{ fontSize: '16px', marginBottom: '10px', color: '#3b82f6' }}>ICD-10 Diagnosis Codes:</h4>
            <div style={{ backgroundColor: '#132f4c', padding: '10px', borderRadius: '4px', marginBottom: '10px' }}>
              <div style={{ fontWeight: '600' }}>I21.9</div>
              <div style={{ fontSize: '14px', color: '#8b9dc3' }}>Acute myocardial infarction, unspecified</div>
            </div>
            <div style={{ backgroundColor: '#132f4c', padding: '10px', borderRadius: '4px' }}>
              <div style={{ fontWeight: '600' }}>I50.9</div>
              <div style={{ fontSize: '14px', color: '#8b9dc3' }}>Heart failure, unspecified</div>
            </div>
          </div>
          <div>
            <h4 style={{ fontSize: '16px', marginBottom: '10px', color: '#3b82f6' }}>CPT Procedure Codes:</h4>
            <div style={{ backgroundColor: '#132f4c', padding: '10px', borderRadius: '4px', marginBottom: '10px' }}>
              <div style={{ fontWeight: '600' }}>99285</div>
              <div style={{ fontSize: '14px', color: '#8b9dc3' }}>Emergency department visit, high complexity</div>
            </div>
            <div style={{ backgroundColor: '#132f4c', padding: '10px', borderRadius: '4px' }}>
              <div style={{ fontWeight: '600' }}>93000</div>
              <div style={{ fontSize: '14px', color: '#8b9dc3' }}>Electrocardiogram, complete</div>
            </div>
          </div>
        </div>
      </div>

      <div style={{ backgroundColor: '#0a1929', padding: '15px', borderRadius: '8px' }}>
        <h4 style={{ fontSize: '16px', marginBottom: '10px' }}>Required Actions:</h4>
        <ul style={{ color: '#8b9dc3', fontSize: '14px', lineHeight: '1.8', paddingLeft: '20px' }}>
          <li>Review clinical documentation</li>
          <li>Assign appropriate ICD-10 diagnosis codes</li>
          <li>Assign CPT/HCPCS procedure codes</li>
          <li>Verify code accuracy and medical necessity</li>
          <li>Submit charges to billing system</li>
        </ul>
      </div>
    </div>
  )
}

// Step 4: Claim Creation & Clearinghouse Submission
function Step4ClaimSubmission() {
  return (
    <div>
      <div style={{ backgroundColor: '#0a1929', padding: '20px', borderRadius: '8px', marginBottom: '20px' }}>
        <h3 style={{ fontSize: '18px', marginBottom: '15px' }}>EDI 837 Claim Details</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
          <div>
            <div style={{ marginBottom: '10px' }}>
              <span style={{ color: '#8b9dc3' }}>Claim ID:</span>
              <span style={{ marginLeft: '10px', fontWeight: '600' }}>CLM-2024-001234</span>
            </div>
            <div style={{ marginBottom: '10px' }}>
              <span style={{ color: '#8b9dc3' }}>Submission Date:</span>
              <span style={{ marginLeft: '10px', fontWeight: '600' }}>12/09/2025</span>
            </div>
            <div style={{ marginBottom: '10px' }}>
              <span style={{ color: '#8b9dc3' }}>Clearinghouse:</span>
              <span style={{ marginLeft: '10px', fontWeight: '600' }}>Change Healthcare</span>
            </div>
          </div>
          <div>
            <div style={{ marginBottom: '10px' }}>
              <span style={{ color: '#8b9dc3' }}>Total Charges:</span>
              <span style={{ marginLeft: '10px', fontWeight: '600' }}>$2,450.00</span>
            </div>
            <div style={{ marginBottom: '10px' }}>
              <span style={{ color: '#8b9dc3' }}>Status:</span>
              <span style={{ marginLeft: '10px', padding: '4px 8px', backgroundColor: '#16a34a', borderRadius: '4px', fontSize: '14px' }}>
                Submitted
              </span>
            </div>
          </div>
        </div>
      </div>

      <div style={{ backgroundColor: '#0a1929', padding: '15px', borderRadius: '8px' }}>
        <h4 style={{ fontSize: '16px', marginBottom: '10px' }}>Required Actions:</h4>
        <ul style={{ color: '#8b9dc3', fontSize: '14px', lineHeight: '1.8', paddingLeft: '20px' }}>
          <li>Generate EDI 837 electronic claim file</li>
          <li>Validate claim data completeness</li>
          <li>Submit to clearinghouse for scrubbing</li>
          <li>Review clearinghouse validation report</li>
          <li>Forward clean claims to insurance payer</li>
        </ul>
      </div>
    </div>
  )
}

// Step 5: Insurance Adjudication
function Step5Adjudication() {
  return (
    <div>
      <div style={{ backgroundColor: '#0a1929', padding: '20px', borderRadius: '8px', marginBottom: '20px' }}>
        <h3 style={{ fontSize: '18px', marginBottom: '15px' }}>Adjudication Process</h3>
        <div style={{ marginBottom: '15px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
            <span style={{ color: '#8b9dc3' }}>Eligibility Verification</span>
            <span style={{ color: '#16a34a' }}>✓ Passed</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
            <span style={{ color: '#8b9dc3' }}>Benefits Check</span>
            <span style={{ color: '#16a34a' }}>✓ Passed</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
            <span style={{ color: '#8b9dc3' }}>Fraud Detection</span>
            <span style={{ color: '#16a34a' }}>✓ Passed</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
            <span style={{ color: '#8b9dc3' }}>Medical Necessity Review</span>
            <span style={{ color: '#ca8a04' }}>⏳ In Progress</span>
          </div>
        </div>
        <div style={{ backgroundColor: '#132f4c', padding: '15px', borderRadius: '4px' }}>
          <h4 style={{ fontSize: '16px', marginBottom: '10px' }}>Payment Decision:</h4>
          <div style={{ marginBottom: '8px' }}>
            <span style={{ color: '#8b9dc3' }}>Billed Amount:</span>
            <span style={{ marginLeft: '10px', fontWeight: '600' }}>$2,450.00</span>
          </div>
          <div style={{ marginBottom: '8px' }}>
            <span style={{ color: '#8b9dc3' }}>Allowed Amount:</span>
            <span style={{ marginLeft: '10px', fontWeight: '600' }}>$2,100.00</span>
          </div>
          <div style={{ marginBottom: '8px' }}>
            <span style={{ color: '#8b9dc3' }}>Insurance Payment:</span>
            <span style={{ marginLeft: '10px', fontWeight: '600', color: '#16a34a' }}>$1,680.00</span>
          </div>
          <div>
            <span style={{ color: '#8b9dc3' }}>Patient Responsibility:</span>
            <span style={{ marginLeft: '10px', fontWeight: '600', color: '#ca8a04' }}>$420.00</span>
          </div>
        </div>
      </div>

      <div style={{ backgroundColor: '#0a1929', padding: '15px', borderRadius: '8px' }}>
        <h4 style={{ fontSize: '16px', marginBottom: '10px' }}>Adjudication Steps:</h4>
        <ul style={{ color: '#8b9dc3', fontSize: '14px', lineHeight: '1.8', paddingLeft: '20px' }}>
          <li>Verify patient eligibility and coverage</li>
          <li>Apply benefit plan rules and limitations</li>
          <li>Check for fraud and abuse indicators</li>
          <li>Review medical necessity documentation</li>
          <li>Calculate payment based on contract rates</li>
        </ul>
      </div>
    </div>
  )
}

// Step 6: Payment & Remittance Processing
function Step6Payment() {
  return (
    <div>
      <div style={{ backgroundColor: '#0a1929', padding: '20px', borderRadius: '8px', marginBottom: '20px' }}>
        <h3 style={{ fontSize: '18px', marginBottom: '15px' }}>Payment Details (ERA 835)</h3>
        <div style={{ backgroundColor: '#132f4c', padding: '15px', borderRadius: '4px', marginBottom: '15px' }}>
          <div style={{ marginBottom: '10px' }}>
            <span style={{ color: '#8b9dc3' }}>Payment Method:</span>
            <span style={{ marginLeft: '10px', fontWeight: '600' }}>EFT (Electronic Funds Transfer)</span>
          </div>
          <div style={{ marginBottom: '10px' }}>
            <span style={{ color: '#8b9dc3' }}>Payment Date:</span>
            <span style={{ marginLeft: '10px', fontWeight: '600' }}>12/15/2025</span>
          </div>
          <div style={{ marginBottom: '10px' }}>
            <span style={{ color: '#8b9dc3' }}>Check/EFT Number:</span>
            <span style={{ marginLeft: '10px', fontWeight: '600' }}>EFT-789456123</span>
          </div>
          <div>
            <span style={{ color: '#8b9dc3' }}>Payment Amount:</span>
            <span style={{ marginLeft: '10px', fontWeight: '600', fontSize: '18px', color: '#16a34a' }}>$1,680.00</span>
          </div>
        </div>

        <div style={{ backgroundColor: '#132f4c', padding: '15px', borderRadius: '4px' }}>
          <h4 style={{ fontSize: '16px', marginBottom: '10px' }}>Remittance Advice:</h4>
          <table style={{ width: '100%', fontSize: '14px' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #1e3a5f' }}>
                <th style={{ padding: '8px', textAlign: 'left', color: '#8b9dc3' }}>Service</th>
                <th style={{ padding: '8px', textAlign: 'right', color: '#8b9dc3' }}>Billed</th>
                <th style={{ padding: '8px', textAlign: 'right', color: '#8b9dc3' }}>Allowed</th>
                <th style={{ padding: '8px', textAlign: 'right', color: '#8b9dc3' }}>Paid</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ padding: '8px' }}>99285 - ED Visit</td>
                <td style={{ padding: '8px', textAlign: 'right' }}>$1,800.00</td>
                <td style={{ padding: '8px', textAlign: 'right' }}>$1,500.00</td>
                <td style={{ padding: '8px', textAlign: 'right' }}>$1,200.00</td>
              </tr>
              <tr>
                <td style={{ padding: '8px' }}>93000 - EKG</td>
                <td style={{ padding: '8px', textAlign: 'right' }}>$650.00</td>
                <td style={{ padding: '8px', textAlign: 'right' }}>$600.00</td>
                <td style={{ padding: '8px', textAlign: 'right' }}>$480.00</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div style={{ backgroundColor: '#0a1929', padding: '15px', borderRadius: '8px' }}>
        <h4 style={{ fontSize: '16px', marginBottom: '10px' }}>Required Actions:</h4>
        <ul style={{ color: '#8b9dc3', fontSize: '14px', lineHeight: '1.8', paddingLeft: '20px' }}>
          <li>Receive EFT payment from insurance</li>
          <li>Download and process ERA (835) file</li>
          <li>Post payment to patient account</li>
          <li>Update account balance</li>
          <li>Reconcile payments with claims</li>
        </ul>
      </div>
    </div>
  )
}

// Step 7: Patient Billing & Collections
function Step7PatientBilling() {
  return (
    <div>
      <div style={{ backgroundColor: '#0a1929', padding: '20px', borderRadius: '8px', marginBottom: '20px' }}>
        <h3 style={{ fontSize: '18px', marginBottom: '15px' }}>Patient Statement</h3>
        <div style={{ backgroundColor: '#132f4c', padding: '15px', borderRadius: '4px', marginBottom: '15px' }}>
          <div style={{ marginBottom: '10px' }}>
            <span style={{ color: '#8b9dc3' }}>Statement Date:</span>
            <span style={{ marginLeft: '10px', fontWeight: '600' }}>12/20/2025</span>
          </div>
          <div style={{ marginBottom: '10px' }}>
            <span style={{ color: '#8b9dc3' }}>Total Charges:</span>
            <span style={{ marginLeft: '10px', fontWeight: '600' }}>$2,450.00</span>
          </div>
          <div style={{ marginBottom: '10px' }}>
            <span style={{ color: '#8b9dc3' }}>Insurance Payment:</span>
            <span style={{ marginLeft: '10px', fontWeight: '600' }}>-$1,680.00</span>
          </div>
          <div style={{ marginBottom: '10px' }}>
            <span style={{ color: '#8b9dc3' }}>Adjustments:</span>
            <span style={{ marginLeft: '10px', fontWeight: '600' }}>-$350.00</span>
          </div>
          <div style={{ borderTop: '1px solid #1e3a5f', paddingTop: '10px', marginTop: '10px' }}>
            <span style={{ color: '#8b9dc3', fontSize: '16px' }}>Patient Balance Due:</span>
            <span style={{ marginLeft: '10px', fontWeight: '600', fontSize: '20px', color: '#ca8a04' }}>$420.00</span>
          </div>
        </div>

        <div style={{ backgroundColor: '#132f4c', padding: '15px', borderRadius: '4px' }}>
          <h4 style={{ fontSize: '16px', marginBottom: '10px' }}>Payment Options:</h4>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            <button style={{ padding: '10px', backgroundColor: '#3b82f6', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
              Pay Online
            </button>
            <button style={{ padding: '10px', backgroundColor: '#16a34a', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
              Payment Plan
            </button>
          </div>
        </div>
      </div>

      <div style={{ backgroundColor: '#0a1929', padding: '15px', borderRadius: '8px' }}>
        <h4 style={{ fontSize: '16px', marginBottom: '10px' }}>Required Actions:</h4>
        <ul style={{ color: '#8b9dc3', fontSize: '14px', lineHeight: '1.8', paddingLeft: '20px' }}>
          <li>Generate patient statement</li>
          <li>Send statement via mail/email/portal</li>
          <li>Process patient payments</li>
          <li>Set up payment plans if needed</li>
          <li>Follow up on unpaid balances (30/60/90 days)</li>
          <li>Send to collections if necessary</li>
        </ul>
      </div>
    </div>
  )
}

// Step 8: Denials & Appeals
function Step8Denials() {
  return (
    <div>
      <div style={{ backgroundColor: '#0a1929', padding: '20px', borderRadius: '8px', marginBottom: '20px' }}>
        <h3 style={{ fontSize: '18px', marginBottom: '15px' }}>Denial Management</h3>
        <div style={{ backgroundColor: '#dc2626', padding: '15px', borderRadius: '4px', marginBottom: '15px' }}>
          <div style={{ fontWeight: '600', marginBottom: '10px' }}>⚠️ Claim Denied</div>
          <div style={{ marginBottom: '8px' }}>
            <span style={{ color: '#fca5a5' }}>Denial Code:</span>
            <span style={{ marginLeft: '10px', fontWeight: '600' }}>CO-50</span>
          </div>
          <div style={{ marginBottom: '8px' }}>
            <span style={{ color: '#fca5a5' }}>Reason:</span>
            <span style={{ marginLeft: '10px' }}>Lack of medical necessity documentation</span>
          </div>
          <div>
            <span style={{ color: '#fca5a5' }}>Denied Amount:</span>
            <span style={{ marginLeft: '10px', fontWeight: '600' }}>$2,450.00</span>
          </div>
        </div>

        <div style={{ backgroundColor: '#132f4c', padding: '15px', borderRadius: '4px' }}>
          <h4 style={{ fontSize: '16px', marginBottom: '10px' }}>Appeal Process:</h4>
          <div style={{ marginBottom: '10px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px', color: '#8b9dc3' }}>
              Corrective Action:
            </label>
            <select style={{
              width: '100%',
              padding: '10px',
              backgroundColor: '#0a1929',
              color: 'white',
              border: '1px solid #1e3a5f',
              borderRadius: '4px'
            }}>
              <option>Submit additional clinical documentation</option>
              <option>Correct coding errors</option>
              <option>Provide medical necessity justification</option>
              <option>Request peer-to-peer review</option>
            </select>
          </div>
          <button style={{
            marginTop: '10px',
            padding: '10px 20px',
            backgroundColor: '#3b82f6',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}>
            Submit Appeal
          </button>
        </div>
      </div>

      <div style={{ backgroundColor: '#0a1929', padding: '15px', borderRadius: '8px' }}>
        <h4 style={{ fontSize: '16px', marginBottom: '10px' }}>Required Actions:</h4>
        <ul style={{ color: '#8b9dc3', fontSize: '14px', lineHeight: '1.8', paddingLeft: '20px' }}>
          <li>Review denial reason codes</li>
          <li>Identify root cause of denial</li>
          <li>Gather additional documentation</li>
          <li>Correct coding or billing errors</li>
          <li>Submit formal appeal with evidence</li>
          <li>Track appeal status and follow up</li>
        </ul>
      </div>
    </div>
  )
}
