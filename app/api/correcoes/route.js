import { NextResponse } from 'next/server'
import { getDb } from '@/lib/db'

export async function POST(request) {
  const data = await request.json()
  const { resposta_id, aluno_id, mensagem, professor = 'Professor' } = data

  if (!resposta_id || !aluno_id || !mensagem?.trim()) {
    return NextResponse.json({ error: 'Campos obrigatórios: resposta_id, aluno_id, mensagem' }, { status: 400 })
  }

  const db = getDb()
  // Upsert: uma correção por resposta — substitui se já existir
  db.prepare('DELETE FROM correcoes WHERE resposta_id = ?').run(resposta_id)
  db.prepare(`
    INSERT INTO correcoes (resposta_id, aluno_id, mensagem, professor, lida, enviado_em)
    VALUES (?, ?, ?, ?, 0, datetime('now'))
  `).run(resposta_id, aluno_id, mensagem.trim(), (professor || 'Professor').trim())

  return NextResponse.json({ ok: true })
}
