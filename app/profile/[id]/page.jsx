import { notFound } from 'next/navigation'
import users from '/data/users'
import tracks from '/data/tracks'

/**
 * Página de perfil do aluno.
 *
 * Exibe:
 * - Nome e ID do aluno
 * - Índice de aderência
 * - Percentual de habilidades
 * - Trilhas extras liberadas automaticamente
 *
 * Regras de negócio:
 * - Se o aluno não existir → 404
 * - Habilidades com valor <= 50 liberam trilhas de estudo
 */

export default async function ProfilePage({ params }) {
  const resolvedParams = await params
  const { id } = resolvedParams

  const user = users.find(u => u.id === id)
  if (!user) return notFound()

  return (
    <main className="container">
      <a className="back-link" href="/">← Voltar</a>
      <div className="card profile-card">
        <div className="profile-header">
          <div>
            <div className="profile-name">{user.name}</div>
            <div className="small">ID: {user.id}</div>
          </div>
          <div className="adherence">Aderência: {user.adherence}</div>
        </div>

        <div className="skills">
          <h3>Habilidades</h3>
          {Object.entries(user.skills).map(([key, val]) => (
            <div className="skill" key={key}>
              <div className="skill-row">
                <div>{formatSkillName(key)}</div>
                <div>{val}%</div>
              </div>
              <div className="skill-bar">
                <div className="skill-fill" style={{ width: `${val}%` }} />
              </div>
            </div>
          ))}
        </div>

        <div className="tracks">
          <h3>Trilhas de estudo</h3>
          {/* Define threshold: skills with value <= 50 liberam trilha */}
          {Object.entries(user.skills).filter(([, val]) => val <= 50).length === 0 && (
            <div className="small">Nenhuma trilha disponível — todas as habilidades estão acima do limite.</div>
          )}
          {Object.entries(user.skills)
            .filter(([, val]) => val <= 50)
            .map(([key, val]) => (
              <div className="track-card" key={key}>
                <div className="track-info">
                  <div className="track-title">{tracks[key]?.title ?? formatSkillName(key)}</div>
                  <div className="small">Progresso: {val}% — Clique para abrir a trilha</div>
                </div>
                <a className="btn" href={`/profile/${encodeURIComponent(user.id)}/track/${encodeURIComponent(key)}`}>Abrir</a>
              </div>
            ))}
        </div>
      </div>
      <button>teste</button>
    </main>
  )
}
/**
 * Define o nome legível de uma habilidade a partir da chave.
 *
 * Exemplo:
 * "logica_programacao" → "Logica Programacao"
 */
function formatSkillName(key) {
  return key.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase())
}
