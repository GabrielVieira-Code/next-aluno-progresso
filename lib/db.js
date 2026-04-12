import Database from 'better-sqlite3'
import path from 'path'

const DB_PATH = path.join(process.cwd(), 'escola.db')

// Singleton: evita múltiplas conexões no hot-reload do Next.js dev
export function getDb() {
  if (!globalThis.__db) {
    const db = new Database(DB_PATH)
    db.pragma('journal_mode = WAL')
    _initTables(db)
    _seed(db)
    globalThis.__db = db
  }
  return globalThis.__db
}

function _initTables(db) {
  db.exec(`
    CREATE TABLE IF NOT EXISTS alunos (
      id        TEXT PRIMARY KEY,
      nome      TEXT NOT NULL,
      email     TEXT DEFAULT '',
      turma     TEXT DEFAULT '',
      criado_em TEXT DEFAULT (datetime('now'))
    );
    CREATE TABLE IF NOT EXISTS estatisticas (
      aluno_id   TEXT,
      assunto    TEXT,
      pontuacao  INTEGER DEFAULT 0,
      total_qs   INTEGER DEFAULT 0,
      acertos    INTEGER DEFAULT 0,
      atualizado TEXT DEFAULT (datetime('now')),
      PRIMARY KEY (aluno_id, assunto)
    );
    CREATE TABLE IF NOT EXISTS respostas_atividades (
      id               INTEGER PRIMARY KEY AUTOINCREMENT,
      aluno_id         TEXT,
      atividade_id     TEXT,
      titulo_atividade TEXT,
      assunto          TEXT,
      pergunta         TEXT,
      resposta_aluno   TEXT,
      correta          INTEGER DEFAULT 0,
      enviado_em       TEXT DEFAULT (datetime('now'))
    );
    CREATE TABLE IF NOT EXISTS correcoes (
      id          INTEGER PRIMARY KEY AUTOINCREMENT,
      resposta_id INTEGER,
      aluno_id    TEXT,
      mensagem    TEXT,
      professor   TEXT,
      lida        INTEGER DEFAULT 0,
      enviado_em  TEXT DEFAULT (datetime('now'))
    );
  `)
}

const USERS_SEED = [
  { id: 'agnes-de-queiroz-silva',              nome: 'AGNES DE QUEIROZ SILVA',                    skills: { variaveis_condicionais: 100, laco_repeticao: 70,  funcao: 60, request: 60,  banco: 80  } },
  { id: 'ana-julia-silva-moreno',               nome: 'ANA JULIA SILVA MORENO',                    skills: { variaveis_condicionais: 100, laco_repeticao: 70,  funcao: 0,  request: 40,  banco: 0   } },
  { id: 'artur-antonini-miziara-de-oliveira',   nome: 'ARTUR ANTONINI MIZIARA DE OLIVEIRA',        skills: { variaveis_condicionais: 100, laco_repeticao: 100, funcao: 99, request: 100, banco: 99  } },
  { id: 'beatriz-moraes-amorim',                nome: 'BEATRIZ MORAES AMORIM',                     skills: { variaveis_condicionais: 100, laco_repeticao: 70,  funcao: 70, request: 60,  banco: 99  } },
  { id: 'geovanna-ribeiro-de-souza',            nome: 'GEOVANNA RIBEIRO DE SOUZA',                 skills: { variaveis_condicionais: 65,  laco_repeticao: 20,  funcao: 20, request: 30,  banco: 40  } },
  { id: 'guilherme-souza-oliveira',             nome: 'GUILHERME SOUZA OLIVEIRA',                  skills: { variaveis_condicionais: 100, laco_repeticao: 80,  funcao: 0,  request: 30,  banco: 0   } },
  { id: 'gustavo-silva-menezes',                nome: 'GUSTAVO SILVA MENEZES',                     skills: { variaveis_condicionais: 100, laco_repeticao: 70,  funcao: 40, request: 40,  banco: 0   } },
  { id: 'henrique-mattos-rodrigues',            nome: 'HENRIQUE MATTOS RODRIGUES',                 skills: { variaveis_condicionais: 100, laco_repeticao: 80,  funcao: 0,  request: 100, banco: 0   } },
  { id: 'ian-benevenuto-garcia',                nome: 'IAN BENEVENUTO GARCIA',                     skills: { variaveis_condicionais: 65,  laco_repeticao: 20,  funcao: 0,  request: 20,  banco: 0   } },
  { id: 'isabely-goncalves-de-almeida',         nome: 'ISABELY GONÇALVES DE ALMEIDA',              skills: { variaveis_condicionais: 100, laco_repeticao: 50,  funcao: 30, request: 30,  banco: 0   } },
  { id: 'julia-maria-dos-santos',               nome: 'JULIA MARIA DOS SANTOS',                    skills: { variaveis_condicionais: 100, laco_repeticao: 70,  funcao: 0,  request: 60,  banco: 0   } },
  { id: 'kaua-dias-de-souza',                   nome: 'KAUÃ DIAS DE SOUZA',                        skills: { variaveis_condicionais: 65,  laco_repeticao: 20,  funcao: 0,  request: 20,  banco: 0   } },
  { id: 'laura-damasceno-machado',              nome: 'LAURA DAMASCENO MACHADO',                   skills: { variaveis_condicionais: 100, laco_repeticao: 70,  funcao: 80, request: 80,  banco: 99  } },
  { id: 'luiza-cardoso-da-silva',               nome: 'LUIZA CARDOSO DA SILVA',                    skills: { variaveis_condicionais: 65,  laco_repeticao: 20,  funcao: 0,  request: 20,  banco: 0   } },
  { id: 'maria-luiza-de-oliveira',              nome: 'MARIA LUIZA DE OLIVEIRA',                   skills: { variaveis_condicionais: 65,  laco_repeticao: 20,  funcao: 0,  request: 20,  banco: 0   } },
  { id: 'maria-vitoria-lopes-da-silva',         nome: 'MARIA VITÓRIA LOPES DA SILVA',              skills: { variaveis_condicionais: 100, laco_repeticao: 70,  funcao: 60, request: 80,  banco: 75  } },
  { id: 'murilo',                               nome: 'MURILO - Briga - Coda - e anda de bike',    skills: { variaveis_condicionais: 100, laco_repeticao: 75,  funcao: 80, request: 99,  banco: 99  } },
  { id: 'raissa-pereira-silva',                 nome: 'RAISSA PEREIRA SILVA',                      skills: { variaveis_condicionais: 65,  laco_repeticao: 20,  funcao: 0,  request: 20,  banco: 0   } },
  { id: 'sophia-de-melo-barbosa',               nome: 'SOPHIA DE MELO BARBOSA',                    skills: { variaveis_condicionais: 65,  laco_repeticao: 20,  funcao: 0,  request: 20,  banco: 0   } },
  { id: 'vinicius-de-souza-silva',              nome: 'VINICIUS DE SOUZA SILVA',                   skills: { variaveis_condicionais: 100, laco_repeticao: 50,  funcao: 0,  request: 40,  banco: 0   } },
  { id: 'deyvid-willian',                       nome: 'DEYVID WILLIAN',                            skills: { variaveis_condicionais: 100, laco_repeticao: 80,  funcao: 80, request: 90,  banco: 99  } },
  { id: 'YasmimA',                              nome: 'YASMIM TOPIZEIRA',                          skills: { variaveis_condicionais: 100, laco_repeticao: 80,  funcao: 80, request: 90,  banco: 99  } },
  { id: 'Sergio',                               nome: 'SERGIÃO MESTRE SAGRADO',                    skills: { variaveis_condicionais: 100, laco_repeticao: 70,  funcao: 75, request: 90,  banco: 99  } },
  { id: 'julia-marques',                        nome: 'MESTRA JULIA',                              skills: { variaveis_condicionais: 100, laco_repeticao: 70,  funcao: 70, request: 80,  banco: 85  } },
]

function _seed(db) {
  const insertAluno = db.prepare('INSERT OR IGNORE INTO alunos (id, nome) VALUES (?, ?)')
  const insertStat  = db.prepare('INSERT OR IGNORE INTO estatisticas (aluno_id, assunto, pontuacao) VALUES (?, ?, ?)')

  db.transaction(() => {
    for (const u of USERS_SEED) {
      insertAluno.run(u.id, u.nome)
      for (const [skill, score] of Object.entries(u.skills)) {
        insertStat.run(u.id, skill, score)
      }
    }
  })()
}
