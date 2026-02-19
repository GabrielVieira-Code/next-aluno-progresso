'use client'

import { useState, useEffect } from 'react'

/**
 * Componente client-side da trilha de estudo.
 *
 * Funcionalidades:
 * - Exibe lista de desafios clicáveis com seleção
 * - Área de código aparece apenas após selecionar um desafio
 * - Salva rascunho localmente (localStorage) por enquanto
 *
 * Preparado para backend:
 * - A função submitSolution() já está isolada e comentada
 * - Quando migrar para BD, substitua apenas essa função
 * - Cada submission carrega: userId, skill, challengeId, code
 */

export default function TrackClient({ userId, skill, challenges }) {
  const [selectedChallenge, setSelectedChallenge] = useState(null)
  const [code, setCode] = useState('')
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState('idle') // 'idle' | 'saving' | 'saved' | 'error'

  // Carrega rascunho do desafio selecionado
  useEffect(() => {
    if (!selectedChallenge) return
    try {
      const key = storageKey(selectedChallenge.id)
      const saved = localStorage.getItem(key)
      setCode(saved || '')
      setMessage('')
      setStatus('idle')
    } catch (e) {
      setCode('')
    }
  }, [selectedChallenge])

  function storageKey(challengeId) {
    return `${userId}-${skill}-challenge${challengeId}`
  }

  function handleSelectChallenge(challenge) {
    setSelectedChallenge(challenge)
    setMessage('')
    setStatus('idle')
  }

  // ─────────────────────────────────────────────────────────────
  // FUNÇÃO DE SUBMIT — isolada para facilitar migração pro backend
  //
  // AGORA (localStorage):
  //   Salva localmente no navegador.
  //
  // QUANDO MIGRAR PARA BD:
  //   1. Crie uma API route em: app/api/submissions/route.js
  //   2. Substitua o bloco localStorage abaixo por:
  //
  //   const res = await fetch('/api/submissions', {
  //     method: 'POST',
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify({ userId, skill, challengeId, code })
  //   })
  //   if (!res.ok) throw new Error('Falha ao salvar')
  //
  // ─────────────────────────────────────────────────────────────
  async function submitSolution(e) {
    e.preventDefault()
    if (!selectedChallenge) return

    setStatus('saving')
    setMessage('')

    try {
      // ▼ SUBSTITUIR AQUI quando migrar para BD ▼
      await new Promise(r => setTimeout(r, 400)) // simula latência de rede
      localStorage.setItem(storageKey(selectedChallenge.id), code)
      // ▲ FIM DO BLOCO A SUBSTITUIR ▲

      setStatus('saved')
      setMessage('✅ Solução salva com sucesso!')
    } catch (err) {
      setStatus('error')
      setMessage('❌ Falha ao salvar. Tente novamente.')
    }
  }

  const badgeColor = (level) => ({
    'Fácil':  { bg: '#10b981', text: '#fff' },
    'Médio':  { bg: '#f59e0b', text: '#fff' },
    'Difícil':{ bg: '#ef4444', text: '#fff' },
  }[level] || { bg: '#6b7280', text: '#fff' })

  return (
    <div style={{ marginTop: '32px' }}>

      {/* ── Lista de desafios ── */}
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '24px' }}>
        <h3 style={{ marginBottom: '8px', fontSize: '18px' }}>
          Desafios ({challenges.length})
        </h3>
        <p className="small" style={{ marginBottom: '16px' }}>
          Selecione um desafio para começar.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {challenges.map((challenge) => {
            const isSelected = selectedChallenge?.id === challenge.id
            const badge = badgeColor(challenge.level)

            return (
              <button
                key={challenge.id}
                onClick={() => handleSelectChallenge(challenge)}
                style={{
                  all: 'unset',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '14px',
                  padding: '16px 18px',
                  borderRadius: '10px',
                  border: `2px solid ${isSelected ? 'var(--primary)' : 'rgba(255,255,255,0.08)'}`,
                  background: isSelected ? 'rgba(11,116,255,0.10)' : 'rgba(255,255,255,0.02)',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  textAlign: 'left',
                  width: '100%',
                  boxSizing: 'border-box',
                }}
                onMouseEnter={e => {
                  if (!isSelected) e.currentTarget.style.borderColor = 'rgba(11,116,255,0.4)'
                }}
                onMouseLeave={e => {
                  if (!isSelected) e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'
                }}
              >
                {/* Número do desafio */}
                <div style={{
                  minWidth: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  background: isSelected ? 'var(--primary)' : 'rgba(255,255,255,0.08)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '13px',
                  fontWeight: '700',
                  color: isSelected ? '#fff' : 'var(--muted)',
                  flexShrink: 0,
                  marginTop: '1px',
                }}>
                  {challenge.id}
                </div>

                {/* Conteúdo */}
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px', flexWrap: 'wrap' }}>
                    <span style={{ fontWeight: '600', fontSize: '14px', color: 'var(--text)' }}>
                      {challenge.title}
                    </span>
                    <span style={{
                      fontSize: '11px',
                      fontWeight: '700',
                      padding: '2px 8px',
                      borderRadius: '99px',
                      background: badge.bg,
                      color: badge.text,
                    }}>
                      {challenge.level}
                    </span>
                  </div>
                  <div className="small" style={{ lineHeight: '1.5' }}>
                    {challenge.description}
                  </div>
                  {challenge.hint && (
                    <div className="small" style={{ marginTop: '6px', fontStyle: 'italic', color: 'var(--muted)' }}>
                      💡 {challenge.hint}
                    </div>
                  )}
                </div>

                {/* Seta indicadora */}
                <div style={{
                  fontSize: '18px',
                  color: isSelected ? 'var(--primary)' : 'var(--muted)',
                  flexShrink: 0,
                  marginTop: '4px',
                  transition: 'transform 0.2s',
                  transform: isSelected ? 'translateX(3px)' : 'none',
                }}>
                  →
                </div>
              </button>
            )
          })}
        </div>
      </div>

      {/* ── Área de código (aparece só quando um desafio é selecionado) ── */}
      {selectedChallenge && (
        <div style={{
          marginTop: '28px',
          borderTop: '1px solid rgba(255,255,255,0.08)',
          paddingTop: '24px',
        }}>
          <div style={{ marginBottom: '12px' }}>
            <h3 style={{ fontSize: '16px', marginBottom: '4px' }}>
              Desafio {selectedChallenge.id}: {selectedChallenge.title}
            </h3>
            <p className="small">{selectedChallenge.description}</p>
          </div>

          <form onSubmit={submitSolution} className="form-row">
            <label className="small">Seu código / resposta</label>
            <textarea
              className="input"
              value={code}
              onChange={e => { setCode(e.target.value); setStatus('idle'); setMessage('') }}
              rows={10}
              placeholder="Escreva sua solução aqui..."
              style={{ fontFamily: 'ui-monospace, monospace', lineHeight: '1.6' }}
            />

            <button
              className="btn"
              type="submit"
              disabled={status === 'saving'}
              style={{ opacity: status === 'saving' ? 0.7 : 1 }}
            >
              {status === 'saving' ? 'Salvando...' : 'Enviar solução'}
            </button>

            {message && (
              <div className="small" style={{
                color: status === 'saved' ? '#10b981' : '#ef4444',
                fontWeight: '600',
              }}>
                {message}
              </div>
            )}

            <div className="small" style={{ color: 'var(--muted)' }}>
              💾 Salvo localmente por enquanto — em breve integração com banco de dados.
            </div>
          </form>
        </div>
      )}
    </div>
  )
}