import './globals.css'

export const metadata = {
  title: 'Plataforma de Progresso',
  description: 'Acompanhe seu desempenho',
}

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br">
      <body>
        <div className="container">{children}</div>
      </body>
    </html>
  )
}
