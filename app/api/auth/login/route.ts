import { NextRequest } from 'next/server'
import bcrypt from 'bcryptjs'
import { prisma } from '@/lib/prisma'
import { signToken } from '@/lib/auth'
import { successResponse, errorResponse } from '@/lib/response'

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json()

    const user = await prisma.user.findUnique({ where: { email } })

    if (!user || !(await bcrypt.compare(password, user.password)))
      return errorResponse('Invalid email or password', 401)

    const token = signToken(user.id, email)
    return successResponse({ token, email }, 'Login successful')
  } catch {
    return errorResponse('Login failed', 500)
  }
}