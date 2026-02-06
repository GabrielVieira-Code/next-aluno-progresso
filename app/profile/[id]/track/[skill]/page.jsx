import { notFound } from 'next/navigation'
import users from '/data/users'
import tracks from '/data/tracks'
import TrackClient from '../TrackClient'

export default async function TrackPage({ params }) {
  const resolved = await params
  const { id, skill } = resolved

  const user = users.find(u => u.id === id)
  if (!user) return notFound()

  const track = tracks[skill]
  if (!track) return notFound()

  return (
    <main className="container">
      <a className="back-link" href={`/profile/${encodeURIComponent(id)}`}>← Voltar ao perfil</a>
      <div className="card">
        <h2>{track.title}</h2>
        <div className="small">Aluno: {user.name} — Habilidade: {skill}</div>
        <p>{track.description}</p>
        <h3>Desafio</h3>
        <p><code>{track.challenge}</code></p>

        <TrackClient userId={id} skill={skill} />
      </div>
        <button>teste</button>
    </main>
  )
}