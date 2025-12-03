# Healthcare LLM Applications Suite

A comprehensive suite of AI-powered healthcare applications built with Next.js, designed to enhance clinical operations and improve patient care.

## 🏥 Applications

### 1. AI Clinical Co-Pilot
- Differential diagnosis generation
- Clinical documentation assistance
- Medical coding automation
- Drug interaction checking

### 2. Prior Authorization Automation
- Automated prior authorization requests
- Claims management
- EHR integration simulator
- Real-time status tracking

### 3. Medication Safety Assistant
- Drug interaction checking
- Dosage guidance
- Allergy alerts
- FDA/RxNorm integration

### 4. Patient Communication Agent
- AI-powered patient chat
- Triage-aware responses
- Appointment reminders
- HIPAA-compliant messaging

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/YOUR-USERNAME/healthcare-llm-apps.git
cd healthcare-llm-apps

# Install dependencies for each app
cd "AI Clinical Co-Pilot"
npm install

cd "../Prior Authorization Automation/ai_pa_full_modules/frontend"
npm install

cd "../../../Medication Safety Assistant/med_safety_app"
npm install

cd "../../Patient Communication Agent/patient_comm_app"
npm install
```

### Running the Applications

```bash
# AI Clinical Co-Pilot (Port 3000)
cd "AI Clinical Co-Pilot"
npm run dev

# Prior Authorization (Port 3001)
cd "Prior Authorization Automation/ai_pa_full_modules/frontend"
npm run dev -- -p 3001

# Medication Safety (Port 3005)
cd "Medication Safety Assistant/med_safety_app"
npm run dev -- -p 3005

# Patient Communication (Port 3006)
cd "Patient Communication Agent/patient_comm_app"
npm run dev -- -p 3006
```

### Access the Applications

- AI Clinical Co-Pilot: http://localhost:3000
- Prior Authorization: http://localhost:3001
- Medication Safety: http://localhost:3005
- Patient Communication: http://localhost:3006

## 📚 Documentation

- [Deployment Guide](./AWS_DEPLOYMENT_PACKAGE/QUICK_START.md)
- [BRD Alignment](./FINAL_BRD_ALIGNMENT_STATUS.md)
- [Implementation Guide](./IMPLEMENTATION_COMPLETE_GUIDE.md)

## 🛠️ Tech Stack

- **Framework:** Next.js 14
- **Language:** TypeScript/JavaScript
- **Styling:** Inline CSS
- **State Management:** React Hooks
- **API:** Next.js API Routes

## ⚠️ Important Notice

These applications are for **demonstration and educational purposes only**. They are not intended for production medical use without proper:
- HIPAA compliance measures
- Security audits
- Clinical validation
- Regulatory approval

## 📄 License

MIT License - See LICENSE file for details

## 🤝 Contributing

Contributions are welcome! Please read our contributing guidelines before submitting PRs.

## 📧 Contact

For questions or support, please open an issue on GitHub.

---

**Built with ❤️ for healthcare innovation**
