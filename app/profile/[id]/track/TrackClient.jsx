'use client'
import { useState, useEffect } from 'react'

export default function TrackClient({ userId, skill }) {
  const storageKey = `${userId}-${skill}-submission`
  const [code, setCode] = useState('')
  const [message, setMessage] = useState('')

  useEffect(() => {
    try {
      const saved = localStorage.getItem(storageKey)
      if (saved) setCode(saved)
    } catch (e) {
      // ignore localStorage errors
    }
  }, [storageKey])

  function handleSubmit(e) {
    e.preventDefault()
    try {
      localStorage.setItem(storageKey, code)
      setMessage('Código salvo localmente (localStorage).')
    } catch (err) {
      setMessage('Falha ao salvar (localStorage indisponível).')
    }
  }

  return (
    <div className="study-submission">
      <form onSubmit={handleSubmit} className="form-row">
        <label className="small">Seu código / tentativa</label>
        <textarea className="input" value={code} onChange={e => setCode(e.target.value)} rows={10} placeholder="Escreva seu código aqui..." />
        <button className="btn" type="submit">Enviar (salvar)</button>
        {message && <div className="small">{message}</div>}
      </form>
    </div>
  )
}
