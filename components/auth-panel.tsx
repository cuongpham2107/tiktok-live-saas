"use client"

import { useState } from "react"
import { LoginForm } from "@/components/login-form"
import { RegisterForm } from "@/components/register-form"

export function AuthPanel() {
  const [mode, setMode] = useState<'login' | 'register'>('login')

  return (
    <div>
      <div className="mb-4 flex items-center justify-center gap-2">
        <button className={`px-3 py-1 ${mode === 'login' ? 'font-bold' : ''}`} onClick={() => setMode('login')}>Login</button>
        <button className={`px-3 py-1 ${mode === 'register' ? 'font-bold' : ''}`} onClick={() => setMode('register')}>Register</button>
      </div>
      {mode === 'login' ? <LoginForm /> : <RegisterForm />}
    </div>
  )
}
