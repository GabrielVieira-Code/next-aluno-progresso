import { NextResponse } from 'next/server'
import { getDb } from '@/lib/db'

export function GET() {
  const db = getDb()
  const alunos = db.prepare('SELECT * FROM alunos ORDER BY nome').all()

  const result = alunos.map(a => {
    const row = db.prepare('SELECT AVG(pontuacao) as media FROM estatisticas WHERE aluno_id = ?').get(a.id)
    const media = Math.round(row?.media ?? 0)
    return { id: a.id, nome: a.nome, turma: a.turma, media, abaixo_media: media < 50 }
  })

  return NextResponse.json(result)
}
