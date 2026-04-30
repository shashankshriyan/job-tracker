import { NextResponse } from 'next/server'

export function successResponse(data: unknown, message = 'Success', status = 200) {
  return NextResponse.json({ success: true, data, message }, { status })
}

export function errorResponse(error: string, status = 400) {
  return NextResponse.json({ success: false, error }, { status })
}