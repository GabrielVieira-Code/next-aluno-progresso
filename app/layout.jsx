import './globals.css'

/**
 * Layout raiz da aplicação.
 *
 * ATENÇÃO: este é o único layout válido do projeto.
 * O arquivo layout.tsx gerado pelo create-next-app deve ser deletado,
 * pois conflita com este arquivo e define idioma "en" incorretamente.
 */
export const metadata = {
  title: 'Plataforma de Progresso',
  description: 'Acompanhe seu desempenho',
}

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>
        <div className="container">{children}</div>
      </body>
    </html>
  )
}
