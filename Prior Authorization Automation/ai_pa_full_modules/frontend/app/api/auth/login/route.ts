import { NextResponse } from 'next/server'

// Mock user database
const users = [
  { email: 'admin@hospital.com', password: 'admin123', role: 'admin', name: 'Dr. Admin' },
  { email: 'doctor@hospital.com', password: 'doctor123', role: 'doctor', name: 'Dr. Smith' },
  { email: 'nurse@hospital.com', password: 'nurse123', role: 'nurse', name: 'Nurse Johnson' },
]

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email, pwd } = body

    // Validate input
    if (!email || !pwd) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      )
    }

    // Find user
    const user = users.find(u => u.email === email && u.password === pwd)

    if (!user) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      )
    }

    // Generate token (in production, use JWT)
    const token = `token_${user.email}_${Date.now()}`

    return NextResponse.json({
      success: true,
      token,
      user: {
        email: user.email,
        name: user.name,
        role: user.role
      }
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
