import { NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'
import { verifyToken } from '@/lib/auth'
import { successResponse, errorResponse } from '@/lib/response'

function getUserId(req: NextRequest): string | null {
  const auth = req.headers.get('authorization')
  if (!auth?.startsWith('Bearer ')) return null
  const payload = verifyToken(auth.slice(7))
  return payload?.userId ?? null
}

export async function GET(req: NextRequest) {
  const userId = getUserId(req)
  if (!userId) return errorResponse('Unauthorized', 401)

  const applications = await prisma.application.findMany({
    where: { userId },
    orderBy: { appliedAt: 'desc' },
  })

  return successResponse(applications, 'Applications fetched')
}

export async function POST(req: NextRequest) {
  const userId = getUserId(req)
  if (!userId) return errorResponse('Unauthorized', 401)

  const body = await req.json()

  if (!body.company?.trim() || !body.role?.trim())
    return errorResponse('Company and role are required', 400)

  const application = await prisma.application.create({
    data: {
      company: body.company,
      role: body.role,
      status: body.status ?? 'applied',
      jobUrl: body.jobUrl,
      source: body.source,
      salary: body.salary,
      notes: body.notes,
      userId,
    },
  })

  return successResponse(application, 'Application created', 201)
}

export async function PATCH(req: NextRequest) {
  const userId = getUserId(req)
  if (!userId) return errorResponse('Unauthorized', 401)

  const { id, ...data } = await req.json()

  const application = await prisma.application.update({
    where: { id, userId },
    data,
  })

  return successResponse(application, 'Application updated')
}

export async function DELETE(req: NextRequest) {
  const userId = getUserId(req)
  if (!userId) return errorResponse('Unauthorized', 401)

  const { id } = await req.json()

  await prisma.application.delete({
    where: { id, userId },
  })

  return successResponse(null, 'Application deleted')
}

