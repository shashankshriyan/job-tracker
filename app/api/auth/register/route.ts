import { NextRequest } from 'next/server'
import bcrypt from 'bcryptjs'
import { prisma } from '@/lib/prisma'
import { signToken } from '@/lib/auth'
import { successResponse, errorResponse } from '@/lib/response'

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json()

    if (!email || !password)
      return errorResponse('Email and password required', 400)

    const existing = await prisma.user.findUnique({ where: { email } })

    if (existing)
      return errorResponse('Email already in use', 409)

    const hashed = await bcrypt.hash(password, 10)
    const user = await prisma.user.create({
      data: { email, password: hashed },
    })

    const token = signToken(user.id, email)
    return successResponse({ token, email }, 'Registered successfully', 201)
  } catch {
    return errorResponse('Registration failed', 500)
  }
}