import { notFound } from 'next/navigation'
import users from '/data/users'

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
      </div>
    </main>
  )
}

function formatSkillName(key) {
  return key.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase())
}
