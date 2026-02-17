import { notFound } from 'next/navigation'
import users from '../../../../../data/users'
import tracks from '../../../../../data/tracks'
import TrackClient from '../TrackClient'

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

        {/* Lista de desafios */}
        <div className="tracks">
          <h3>Desafios ({track.challenges.length})</h3>
          <div className="small" style={{ marginBottom: '16px' }}>
            Complete os desafios em ordem — do mais fácil ao mais difícil.
          </div>

          {track.challenges.map((challenge) => {
            const badgeColor =
              challenge.level === 'Fácil' ? '#10b981' :
              challenge.level === 'Médio' ? '#f59e0b' : '#ef4444'

            return (
              <div className="track-card" key={challenge.id} style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                  <span style={{ fontSize: '15px', fontWeight: '700' }}>
                    {challenge.id}. {challenge.title}
                  </span>
                  <span style={{
                    fontSize: '11px',
                    fontWeight: '700',
                    padding: '2px 10px',
                    borderRadius: '99px',
                    background: badgeColor,
                    color: 'white',
                  }}>
                    {challenge.level}
                  </span>
                </div>

                <div className="small" style={{ marginBottom: '6px' }}>
                  {challenge.description}
                </div>

                {challenge.hint && (
                  <div className="small" style={{ fontStyle: 'italic', color: 'var(--muted)' }}>
                    💡 Dica: {challenge.hint}
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* Área de envio */}
        <TrackClient userId={id} skill={skill} />
      </div>
    </main>
  )
}