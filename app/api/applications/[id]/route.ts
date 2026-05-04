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

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const userId = getUserId(req)
  if (!userId) return errorResponse('Unauthorized', 401)

  const application = await prisma.application.findFirst({
    where: { id: params.id, userId },
  })

  if (!application) return errorResponse('Not found', 404)

  return successResponse(application, 'Application fetched')
}