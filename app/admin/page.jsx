'use client'
import { useState, useEffect, useRef } from 'react'
import s from './admin.module.css'

// ── Helpers ──────────────────────────────────────────────────────────────────
const SKILL_LABELS = {
  variaveis_condicionais: 'Variáveis e Condicionais',
  laco_repeticao:         'Laços de Repetição',
  funcao:                 'Funções',
  request:                'Requisições HTTP',
  banco:                  'Banco de Dados',
}

function barColor(pct) {
  if (pct >= 70) return '#22c55e'
  if (pct >= 50) return '#f59e0b'
  return '#ef4444'
}

function fmtDate(str) {
  if (!str) return '—'
  return new Date(str).toLocaleString('pt-BR', {
    day: '2-digit', month: '2-digit', year: '2-digit',
    hour: '2-digit', minute: '2-digit',
  })
}

// ── Componente principal ──────────────────────────────────────────────────────
export default function AdminPage() {
  const [view, setView]           = useState('list') // 'list' | 'detail'
  const [dash, setDash]           = useState(null)
  const [alunos, setAlunos]       = useState([])
  const [search, setSearch]       = useState('')
  const [aluno, setAluno]         = useState(null)   // detalhe selecionado
  const [loading, setLoading]     = useState(false)
  const [professor, setProfessor] = useState('Professor')
  const [toast, setToast]         = useState('')
  const toastTimer = useRef(null)

  // Correções em andamento: { [respostaId]: { text, status, msg } }
  const [corrections, setCorrections] = useState({})

  useEffect(() => {
    fetchDash()
    fetchAlunos()
  }, [])

  function showToast(msg) {
    setToast(msg)
    clearTimeout(toastTimer.current)
    toastTimer.current = setTimeout(() => setToast(''), 2500)
  }

  // ── API calls ──────────────────────────────────────────────────────────────
  async function fetchDash() {
    const res = await fetch('/api/dashboard')
    setDash(await res.json())
  }

  async function fetchAlunos() {
    const res = await fetch('/api/alunos')
    setAlunos(await res.json())
  }

  async function openAluno(id) {
    setView('detail')
    setAluno(null)
    setCorrections({})
    setLoading(true)
    const res = await fetch(`/api/alunos/${encodeURIComponent(id)}`)
    const data = await res.json()
    setLoading(false)

    if (data.error || !data.estatisticas) {
      setAluno(null)
      showToast(data.error ?? 'Erro ao carregar aluno.')
      return
    }

    setAluno(data)

    // Pré-preenche campos com correções existentes
    const initial = {}
    for (const r of data.respostas ?? []) {
      initial[r.id] = { text: r.correcao_msg ?? '', status: '', msg: '' }
    }
    setCorrections(initial)
  }

  async function enviarCorrecao(respostaId, alunoId) {
    const text = (corrections[respostaId]?.text ?? '').trim()
    if (!text) {
      setCorrections(c => ({ ...c, [respostaId]: { ...c[respostaId], status: 'err', msg: 'Escreva um feedback.' } }))
      return
    }
    setCorrections(c => ({ ...c, [respostaId]: { ...c[respostaId], status: 'loading', msg: '' } }))

    const res = await fetch('/api/correcoes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ resposta_id: respostaId, aluno_id: alunoId, mensagem: text, professor }),
    })
    const data = await res.json()

    if (data.ok) {
      setCorrections(c => ({ ...c, [respostaId]: { ...c[respostaId], status: 'ok', msg: 'Correção enviada!' } }))
      showToast('Correção enviada com sucesso.')
      fetchDash()
    } else {
      setCorrections(c => ({ ...c, [respostaId]: { ...c[respostaId], status: 'err', msg: data.error ?? 'Erro.' } }))
    }
  }

  // ── Render: cabeçalho ──────────────────────────────────────────────────────
  const filteredAlunos = alunos.filter(a => a.nome.toLowerCase().includes(search.toLowerCase()))

  return (
    <div className={s.wrap}>
      {/* Topo */}
      <div className={s.pageHeader}>
        <h1>Painel do Professor</h1>
        <div className={s.professorField}>
          <label htmlFor="profName">Professor:</label>
          <input
            id="profName"
            value={professor}
            onChange={e => setProfessor(e.target.value)}
            placeholder="Seu nome"
          />
        </div>
      </div>

      {/* ── LISTA ─────────────────────────────────────────────────────────── */}
      {view === 'list' && (
        <>
          {/* Stats */}
          <div className={s.statsRow}>
            <div className={s.statCard}>
              <div className={s.statLabel}>Total de Alunos</div>
              <div className={s.statValue}>{dash?.total_alunos ?? '—'}</div>
            </div>
            <div className={`${s.statCard} ${s.warn}`}>
              <div className={s.statLabel}>Abaixo da Média</div>
              <div className={s.statValue}>{dash?.abaixo_media ?? '—'}</div>
            </div>
            <div className={s.statCard}>
              <div className={s.statLabel}>Respostas Enviadas</div>
              <div className={s.statValue}>{dash?.total_respostas ?? '—'}</div>
            </div>
            <div className={`${s.statCard} ${s.danger}`}>
              <div className={s.statLabel}>Pendentes de Correção</div>
              <div className={s.statValue}>{dash?.pendentes ?? '—'}</div>
            </div>
            <div className={`${s.statCard} ${s.success}`}>
              <div className={s.statLabel}>Correções Feitas</div>
              <div className={s.statValue}>{dash?.total_correcoes ?? '—'}</div>
            </div>
          </div>

          {/* Tabela */}
          <div className={s.sectionHeader}>
            <h2>Alunos</h2>
            <input
              className={s.searchInput}
              placeholder="Buscar por nome..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>

          <div className="card">
            <div className={s.tableWrap}>
              <table>
                <thead>
                  <tr>
                    <th>Nome</th>
                    <th>Turma</th>
                    <th>Média Geral</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredAlunos.length === 0 && (
                    <tr><td colSpan={4} className={s.empty}>Nenhum aluno encontrado.</td></tr>
                  )}
                  {filteredAlunos.map(a => {
                    const color = barColor(a.media)
                    return (
                      <tr key={a.id} onClick={() => openAluno(a.id)}>
                        <td><strong>{a.nome}</strong></td>
                        <td>
                          <span className={s.badgeNeutral + ' ' + s.badge}>{a.turma || '—'}</span>
                        </td>
                        <td>
                          <div className={s.avgWrap}>
                            <div className={s.avgBg}>
                              <div className={s.avgFill} style={{ width: `${a.media}%`, background: color }} />
                            </div>
                            <span className={s.avgVal} style={{ color }}>{a.media}%</span>
                          </div>
                        </td>
                        <td>
                          <span className={`${s.badge} ${a.abaixo_media ? s.badgeDanger : s.badgeOk}`}>
                            {a.abaixo_media ? 'Abaixo da média' : 'Acima da média'}
                          </span>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}

      {/* ── DETALHE ───────────────────────────────────────────────────────── */}
      {view === 'detail' && (
        <>
          <a
            className="back-link"
            onClick={() => { setView('list'); fetchDash(); fetchAlunos() }}
            style={{ cursor: 'pointer' }}
          >
            ← Voltar à lista
          </a>

          {loading && <div className={s.empty}>Carregando...</div>}

          {aluno && (
            <>
              {/* Cabeçalho do aluno */}
              <div className={`card ${s.alunoHeader}`}>
                <div>
                  <div className={s.alunoName}>{aluno.nome}</div>
                  <div className={s.alunoMeta}>
                    ID: {aluno.id}
                    {aluno.turma ? ` · Turma: ${aluno.turma}` : ''}
                    {aluno.email ? ` · ${aluno.email}` : ''}
                  </div>
                </div>
                <div>
                  <div className={s.mediaLabel}>Média Geral</div>
                  <div className={s.mediaBig} style={{ color: barColor(calcMedia(aluno.estatisticas)) }}>
                    {calcMedia(aluno.estatisticas)}%
                  </div>
                </div>
              </div>

              <div className={s.detailGrid}>
                {/* Stats por assunto */}
                <div className="card" style={{ padding: 0 }}>
                  <div className={s.sectionTitle}>Estatísticas por Assunto</div>
                  <div className={s.tableWrap}><table>
                    <thead>
                      <tr>
                        <th>Assunto</th>
                        <th>Pontuação</th>
                        <th>Acertos</th>
                        <th>Questões</th>
                      </tr>
                    </thead>
                    <tbody>
                      {aluno.estatisticas.map(e => {
                        const color = barColor(e.pontuacao)
                        return (
                          <tr key={e.assunto}>
                            <td style={{ fontSize: '.8rem' }}>{SKILL_LABELS[e.assunto] || e.assunto}</td>
                            <td>
                              <div className={s.skillBarWrap}>
                                <div className={s.skillBarBg}>
                                  <div className={s.skillBarFill} style={{ width: `${e.pontuacao}%`, background: color }} />
                                </div>
                                <span className={s.skillScore} style={{ color }}>{e.pontuacao}%</span>
                              </div>
                            </td>
                            <td style={{ fontSize: '.8rem' }}>{e.acertos}</td>
                            <td style={{ fontSize: '.8rem' }}>{e.total_qs}</td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table></div>
                </div>

                {/* Respostas */}
                <div>
                  <div className={s.sectionHeader} style={{ marginBottom: 12 }}>
                    <h2>Atividades Enviadas</h2>
                    <span className={s.respostaCount}>
                      {aluno.respostas.length} resposta{aluno.respostas.length !== 1 ? 's' : ''}
                    </span>
                  </div>

                  {aluno.respostas.length === 0 && (
                    <div className={`card ${s.empty}`}>Nenhuma atividade enviada ainda.</div>
                  )}

                  {aluno.respostas.map(r => {
                    const cor = corrections[r.id] ?? { text: '', status: '', msg: '' }
                    return (
                      <div key={r.id} className={s.responseCard}>
                        <div className={s.responseHead}>
                          <div>
                            <div className={s.responseTitle}>{r.titulo_atividade || SKILL_LABELS[r.assunto] || 'Atividade'}</div>
                            <div className={s.responseMeta}>
                              {SKILL_LABELS[r.assunto] || r.assunto} · {fmtDate(r.enviado_em)}
                            </div>
                          </div>
                          <span className={`${s.badge} ${r.correta ? s.badgeOk : s.badgeNeutral}`}>
                            {r.correta ? 'Correto' : 'Sem avaliação'}
                          </span>
                        </div>

                        <div className={s.responseBody}>
                          {r.pergunta && (
                            <div className={s.responsePergunta}>Desafio: {r.pergunta}</div>
                          )}
                          <div className={s.responseCode}>{r.resposta_aluno}</div>

                          {r.correcao_msg && (
                            <div className={s.correctionExisting}>
                              <strong>
                                Correção de {r.correcao_professor || 'Professor'} — {fmtDate(r.correcao_em)}
                              </strong>
                              {r.correcao_msg}
                            </div>
                          )}

                          <div className={s.correctionForm}>
                            <textarea
                              className={s.correctionTextarea}
                              placeholder="Escreva um feedback para o aluno..."
                              value={cor.text}
                              onChange={e => setCorrections(c => ({
                                ...c,
                                [r.id]: { ...c[r.id], text: e.target.value, status: '', msg: '' }
                              }))}
                            />
                            <div className={s.correctionActions}>
                              <button
                                className={s.btnCorrection}
                                disabled={cor.status === 'loading'}
                                onClick={() => enviarCorrecao(r.id, aluno.id)}
                              >
                                {cor.status === 'loading' ? 'Enviando...' : (r.correcao_msg ? 'Atualizar correção' : 'Enviar correção')}
                              </button>
                              {cor.status === 'ok'  && <span className={s.correctionOk}>{cor.msg}</span>}
                              {cor.status === 'err' && <span className={s.correctionErr}>{cor.msg}</span>}
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </>
          )}
        </>
      )}

      {/* Toast */}
      {toast && (
        <div className={`${s.toast} ${toast ? s.toastShow : s.toastHide}`}>{toast}</div>
      )}
    </div>
  )
}

function calcMedia(estatisticas) {
  if (!estatisticas?.length) return 0
  return Math.round(estatisticas.reduce((sum, e) => sum + e.pontuacao, 0) / estatisticas.length)
}
