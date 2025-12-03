// Shared data store for all APIs
// This ensures data persists across API calls during the same server session

export const dataStore = {
  claims: [
    { id: 'CLM-001', patient: 'John Doe', patientId: 'P001', status: 'Pending', amount: '$1,250', date: '2024-12-01', procedure: 'MRI Scan' },
    { id: 'CLM-002', patient: 'Jane Smith', patientId: 'P002', status: 'Approved', amount: '$890', date: '2024-12-02', procedure: 'Blood Test' },
    { id: 'CLM-003', patient: 'Bob Johnson', patientId: 'P003', status: 'Under Review', amount: '$2,100', date: '2024-12-03', procedure: 'Surgery Consultation' },
  ],
  priorAuths: [] as any[]
}

export function addClaim(claim: any) {
  dataStore.claims.push(claim)
  return claim
}

export function addPriorAuth(priorAuth: any) {
  dataStore.priorAuths.push(priorAuth)
  return priorAuth
}

export function getClaims() {
  return dataStore.claims
}

export function getPriorAuths() {
  return dataStore.priorAuths
}
