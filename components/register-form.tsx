"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { signIn } from "next-auth/react"
import { useState } from "react"

export function RegisterForm({ className, ...props }: React.ComponentProps<"form">) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    const form = e.target as HTMLFormElement
    const formData = new FormData(form)
    const name = String(formData.get('name') || '')
    const email = String(formData.get('email') || '')
    const password = String(formData.get('password') || '')
    const password2 = String(formData.get('password2') || '')

    if (!email || !password) {
      setError('Email and password are required')
      return
    }
    if (password !== password2) {
      setError('Passwords do not match')
      return
    }

    setLoading(true)
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      })
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        setError(data?.message || 'Registration failed')
        setLoading(false)
        return
      }

      // Auto sign in after successful registration
      const sig = await signIn('credentials', { redirect: false, email, password })
      if (sig?.ok) {
        window.location.href = '/dashboard'
      } else {
        setError('Registration succeeded but sign-in failed')
      }
    } catch {
      setError('Registration failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form className={cn('flex flex-col gap-6', className)} onSubmit={onSubmit} {...props}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Create your account</h1>
        <p className="text-muted-foreground text-sm text-balance">Enter your details to create an account</p>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-3">
          <Label htmlFor="name">Full name</Label>
          <Input id="name" name="name" placeholder="Your name" />
        </div>
        <div className="grid gap-3">
          <Label htmlFor="email">Email</Label>
          <Input id="email" name="email" type="email" placeholder="m@example.com" />
        </div>
        <div className="grid gap-3">
          <Label htmlFor="password">Password</Label>
          <Input id="password" name="password" type="password" required />
        </div>
        <div className="grid gap-3">
          <Label htmlFor="password2">Confirm password</Label>
          <Input id="password2" name="password2" type="password" required />
        </div>
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? 'Creating...' : 'Create account'}
        </Button>
        {error && <div className="text-sm text-destructive">{error}</div>}
      </div>
    </form>
  )
}
