import { NextResponse } from 'next/server'
import { hash } from 'bcryptjs'
import { prisma } from '@/lib/prisma'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { name, email, password } = body
    if (!email || !password) return NextResponse.json({ message: 'Missing fields' }, { status: 400 })

    const existing = await prisma.user.findUnique({ where: { email } })
    if (existing) return NextResponse.json({ message: 'User already exists' }, { status: 409 })

    const hashed = await hash(password, 10)
    await prisma.user.create({ data: { name, email, password: hashed } })

    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ message: 'Server error' }, { status: 500 })
  }
}
