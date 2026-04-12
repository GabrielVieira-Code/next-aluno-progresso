'use client'
import { useState, useEffect } from 'react'

const API = '/api'

export default function TrackClient({ userId, skill, titulo, pergunta }) {
  const storageKey = `${userId}-${skill}-submission`
  const [code, setCode] = useState('')
  const [message, setMessage] = useState('')
  const [sending, setSending] = useState(false)

  useEffect(() => {
    try {
      const saved = localStorage.getItem(storageKey)
      if (saved) setCode(saved)
    } catch (e) {
      // ignore localStorage errors
    }
  }, [storageKey])

  async function handleSubmit(e) {
    e.preventDefault()
    if (!code.trim()) {
      setMessage('Escreva sua resposta antes de enviar.')
      return
    }
    setSending(true)
    setMessage('')

    try {
      const res = await fetch(`${API}/resposta`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          aluno_id: userId,
          atividade_id: `${userId}-${skill}`,
          titulo_atividade: titulo || skill,
          assunto: skill,
          pergunta: pergunta || '',
          resposta_aluno: code,
          correta: 0
        })
      })
      const data = await res.json()
      if (data.ok) {
        setMessage('Resposta enviada ao professor!')
      } else {
        throw new Error(data.error || 'Erro desconhecido')
      }
    } catch (err) {
      // Fallback: salva no localStorage se o servidor estiver offline
      try {
        localStorage.setItem(storageKey, code)
        setMessage('Servidor offline — resposta salva localmente.')
      } catch {
        setMessage('Falha ao salvar.')
      }
    } finally {
      setSending(false)
    }
  }

  return (
    <div className="study-submission">
      <form onSubmit={handleSubmit} className="form-row">
        <label className="small">Seu código / tentativa</label>
        <textarea
          className="input"
          value={code}
          onChange={e => setCode(e.target.value)}
          rows={10}
          placeholder="Escreva seu código aqui..."
        />
        <button className="btn" type="submit" disabled={sending}>
          {sending ? 'Enviando...' : 'Enviar para o professor'}
        </button>
        {message && <div className="small">{message}</div>}
      </form>
    </div>
  )
}
