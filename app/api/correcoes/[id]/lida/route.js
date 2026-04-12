import { NextResponse } from 'next/server'
import { getDb } from '@/lib/db'

export async function POST(request, { params }) {
  const { id } = await params
  const db = getDb()
  db.prepare('UPDATE correcoes SET lida = 1 WHERE id = ?').run(Number(id))
  return NextResponse.json({ ok: true })
}
