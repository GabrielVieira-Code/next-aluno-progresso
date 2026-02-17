import { notFound } from 'next/navigation'
import users from '../../../../../data/users'
import tracks from '../../../../../data/tracks'
import TrackClient from '@/components/TrackClient'

/**
 * Página de trilha de estudo.
 * 
 * Exibe:
 * - Título e descrição da trilha
 * - Lista de 5 desafios progressivos
 * - Área para escrever e salvar solução
 * 
 * Rota: /profile/[userId]/track/[skill]
 */

export default async function TrackPage({ params }) {
  const resolvedParams = await params
  const { id: userId, skill } = resolvedParams

  // Valida se usuário existe
  const user = users.find(u => u.id === userId)
  if (!user) return notFound()

  // Valida se trilha existe
  const track = tracks[skill]
  if (!track) return notFound()

  // Pega o progresso atual do aluno nesta skill
  const progress = user.skills[skill] || 0

  return (
    <main>
      <a className="back-link" href={`/profile/${userId}`}>← Voltar ao perfil</a>
      
      <div className="card profile-card">
        {/* Cabeçalho da trilha */}
        <div className="profile-header">
          <div>
            <h1 className="profile-name">{track.title}</h1>
            <div className="small">{track.description}</div>
          </div>
          <div className="adherence">Progresso: {progress}%</div>
        </div>

        {/* Lista de desafios */}
        <div className="tracks">
          <h3>Desafios ({track.challenges.length})</h3>
          <div className="small" style={{ marginBottom: '16px' }}>
            Complete os desafios em ordem para dominar este conteúdo.
          </div>

          {track.challenges.map((challenge) => (
            <div className="track-card" key={challenge.id}>
              <div className="track-info">
                <div className="track-title">
                  {challenge.id}. {challenge.title}
                  <span style={{ 
                    marginLeft: '12px', 
                    fontSize: '12px', 
                    padding: '2px 8px', 
                    borderRadius: '4px',
                    background: challenge.level === 'Fácil' ? '#10b981' : 
                               challenge.level === 'Médio' ? '#f59e0b' : '#ef4444',
                    color: 'white',
                    fontWeight: '600'
                  }}>
                    {challenge.level}
                  </span>
                </div>
                <div className="small" style={{ marginTop: '8px' }}>
                  {challenge.description}
                </div>
                {challenge.hint && (
                  <div className="small" style={{ 
                    marginTop: '8px', 
                    fontStyle: 'italic',
                    color: 'var(--muted)'
                  }}>
                    💡 Dica: {challenge.hint}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Área de envio de solução */}
        <TrackClient userId={userId} skill={skill} />
      </div>
    </main>
  )
}