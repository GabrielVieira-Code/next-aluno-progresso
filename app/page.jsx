'use client'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function LoginPage(){
  const router = useRouter()
  const [id, setId] = useState('')
  const [error, setError] = useState('')

  function handleSubmit(e){
    e.preventDefault()
    if(!id.trim()){ setError('Digite seu id'); return }
    router.push(`/profile/${encodeURIComponent(id.trim())}`)
  }

  return (
    <main>
      <div className="login-card">
        <h1>Entrar — Plataforma de Progresso</h1>
        <form onSubmit={handleSubmit} style={{display:'grid',gap:12,marginTop:12}}>
          <label className="small">ID do aluno</label>
          <input
            className="input"
            value={id}
            onChange={e=>{setId(e.target.value); setError('')}}
            placeholder="ex: agnes-de-queiroz-silva"
          />
          {error && <div style={{color:'crimson'}}>{error}</div>}
          <button className="btn" type="submit">Acessar</button>

        </form>
      </div>
    </main>
  )
}
