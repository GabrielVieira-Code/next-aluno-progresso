import { NextResponse } from 'next/server'
import { getDb } from '@/lib/db'

export async function POST(request) {
  const data = await request.json()
  const {
    aluno_id,
    resposta_aluno,
    atividade_id     = '',
    titulo_atividade = '',
    assunto          = '',
    pergunta         = '',
    correta          = 0,
  } = data

  if (!aluno_id || !resposta_aluno?.trim()) {
    return NextResponse.json({ error: 'aluno_id e resposta_aluno são obrigatórios' }, { status: 400 })
  }

  const db = getDb()
  const aluno = db.prepare('SELECT id FROM alunos WHERE id = ?').get(aluno_id)
  if (!aluno) return NextResponse.json({ error: 'Aluno não encontrado' }, { status: 404 })

  const result = db.prepare(`
    INSERT INTO respostas_atividades
      (aluno_id, atividade_id, titulo_atividade, assunto, pergunta, resposta_aluno, correta)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `).run(aluno_id, atividade_id, titulo_atividade, assunto, pergunta, resposta_aluno, correta ? 1 : 0)

  return NextResponse.json({ ok: true, id: result.lastInsertRowid })
}
