import { notFound } from 'next/navigation'
import users from '@/data/users'
import tracks from '@/data/tracks'
import TrackClient from '@/components/TrackClient'

export default async function TrackPage({ params }) {
  const resolved = await params
  const { id, skill } = resolved

  const user = users.find(u => u.id === id)
  if (!user) return notFound()

  const track = tracks[skill]
  if (!track) return notFound()

  const progress = user.skills[skill] || 0

  return (
    <main>
      <a className="back-link" href={`/profile/${encodeURIComponent(id)}`}>← Voltar ao perfil</a>
      <div className="card profile-card">

        {/* Cabeçalho */}
        <div className="profile-header">
          <div>
            <h2 className="profile-name">{track.title}</h2>
            <div className="small">Aluno: {user.name} — Habilidade: {skill}</div>
            <p style={{ marginTop: '8px' }}>{track.description}</p>
          </div>
          <div className="adherence">Progresso: {progress}%</div>
        </div>

        {/* TrackClient recebe os desafios e cuida do restante */}
        <TrackClient
          userId={id}
          skill={skill}
          challenges={track.challenges}
        />

      </div>
    </main>
  )
}