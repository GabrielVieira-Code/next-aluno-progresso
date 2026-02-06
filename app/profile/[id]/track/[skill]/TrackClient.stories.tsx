import type { Meta, StoryObj } from '@storybook/react'
import TrackClient from '../TrackClient'

const meta: Meta<typeof TrackClient> = {
  title: 'Plataforma/Trilhas/TrackClient',
  component: TrackClient,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
Componente responsável pela interação do aluno com a trilha de estudo.

Permite que o aluno:
- Escreva sua solução ou tentativa de código
- Salve o progresso localmente via localStorage
- Retorne posteriormente sem perder o conteúdo

Este componente é **Client-side** e depende de:
- useState
- useEffect
- localStorage
        `,
      },
    },
  },
}

export default meta

type Story = StoryObj<typeof TrackClient>

/**
 * Estado padrão do componente.
 * Simula um aluno acessando uma trilha específica.
 */
export const Padrao: Story = {
  args: {
    userId: 'agnes-de-queiroz-silva',
    skill: 'logica_programacao',
  },
}

/**
 * Exemplo com outra habilidade.
 * Útil para validar o isolamento de dados no localStorage.
 */
export const OutraHabilidade: Story = {
  args: {
    userId: 'agnes-de-queiroz-silva',
    skill: 'estruturas_de_dados',
  },
}

/**
 * Exemplo simulando outro aluno.
 */
export const OutroAluno: Story = {
  args: {
    userId: 'joao-silva',
    skill: 'logica_programacao',
  },
}
