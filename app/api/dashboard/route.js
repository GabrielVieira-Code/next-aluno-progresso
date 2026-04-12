import { NextResponse } from 'next/server'
import { getDb } from '@/lib/db'

export function GET() {
  const db = getDb()

  const total_alunos    = db.prepare('SELECT COUNT(*) as n FROM alunos').get().n
  const total_respostas = db.prepare('SELECT COUNT(*) as n FROM respostas_atividades').get().n
  const total_correcoes = db.prepare('SELECT COUNT(*) as n FROM correcoes').get().n

  const pendentes = db.prepare(`
    SELECT COUNT(*) as n
    FROM respostas_atividades r
    LEFT JOIN correcoes c ON c.resposta_id = r.id
    WHERE c.id IS NULL
  `).get().n

  const abaixo_media = db.prepare(`
    SELECT COUNT(*) as n FROM (
      SELECT aluno_id FROM estatisticas
      GROUP BY aluno_id
      HAVING AVG(pontuacao) < 50
    )
  `).get().n

  return NextResponse.json({ total_alunos, total_respostas, total_correcoes, pendentes, abaixo_media })
}
