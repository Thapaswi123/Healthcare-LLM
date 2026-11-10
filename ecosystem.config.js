module.exports = {
  apps: [
    {
      name: 'ai-clinical-copilot',
      cwd: '/home/ubuntu/healthcare-llm-applications/AI Clinical Co-Pilot',
      script: 'npm',
      args: 'start',
      env: {
        PORT: 3004,
        NODE_ENV: 'production',
        HOST: '0.0.0.0'
      },
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G'
    },
    {
      name: 'prior-authorization',
      cwd: '/home/ubuntu/healthcare-llm-applications/Prior Authorization Automation/ai_pa_full_modules/frontend',
      script: 'npm',
      args: 'start',
      env: {
        PORT: 3000,
        NODE_ENV: 'production',
        HOST: '0.0.0.0'
      },
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G'
    },
    {
      name: 'medication-safety',
      cwd: '/home/ubuntu/healthcare-llm-applications/Medication Safety Assistant/med_safety_app',
      script: 'npm',
      args: 'start',
      env: {
        PORT: 3001,
        NODE_ENV: 'production',
        HOST: '0.0.0.0'
      },
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G'
    },
    {
      name: 'patient-communication',
      cwd: '/home/ubuntu/healthcare-llm-applications/Patient Communication Agent/patient_comm_app',
      script: 'npm',
      args: 'start',
      env: {
        PORT: 3002,
        NODE_ENV: 'production',
        HOST: '0.0.0.0'
      },
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G'
    }
  ]
}
