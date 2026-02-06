'use client'

/**
 * Página inicial da plataforma.
 *
 * Permite que o aluno informe seu ID e seja redirecionado
 * para a página de perfil correspondente.
 *
 * Responsabilidades:
 * - Capturar o ID do aluno
 * - Validar se o campo foi preenchido
 * - Redirecionar para /profile/[id]
 */
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
    <main className="container">
      <div className="card login-card">
        <h1>Entrar — Plataforma de Progresso</h1>
        <form onSubmit={handleSubmit} className="form-row">
          <label className="small">ID do aluno</label>
          <input className="input" value={id} onChange={e=>{setId(e.target.value); setError('')}} placeholder="ex: agnes-de-queiroz-silva" />
          {error && <div style={{color:'crimson'}}>{error}</div>}
          <button className="btn" type="submit">Acessar</button>
          <div className="small">Dica: use um id existente em <code>data/users.js</code></div>
        </form>
      </div>
    </main>
  )
}
