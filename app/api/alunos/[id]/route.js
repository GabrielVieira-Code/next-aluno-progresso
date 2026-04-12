import { NextResponse } from 'next/server'
import { getDb } from '@/lib/db'

export async function GET(request, { params }) {
  const { id } = await params
  const db = getDb()

  const aluno = db.prepare('SELECT * FROM alunos WHERE id = ?').get(id)
  if (!aluno) return NextResponse.json({ error: 'Aluno não encontrado' }, { status: 404 })

  const estatisticas = db
    .prepare('SELECT assunto, pontuacao, total_qs, acertos FROM estatisticas WHERE aluno_id = ? ORDER BY assunto')
    .all(id)

  const respostas = db.prepare(`
    SELECT r.*,
           c.id         AS correcao_id,
           c.mensagem   AS correcao_msg,
           c.professor  AS correcao_professor,
           c.lida       AS correcao_lida,
           c.enviado_em AS correcao_em
    FROM respostas_atividades r
    LEFT JOIN correcoes c ON c.resposta_id = r.id
    WHERE r.aluno_id = ?
    ORDER BY r.enviado_em DESC
  `).all(id)

  return NextResponse.json({ id: aluno.id, nome: aluno.nome, turma: aluno.turma, email: aluno.email, estatisticas, respostas })
}
