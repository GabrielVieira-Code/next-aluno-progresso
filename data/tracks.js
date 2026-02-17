const tracks = {
  banco: {
    title: 'Banco de Dados — Fundamentos',
    description: 'Conceitos básicos de banco de dados relacionais: tabelas, chaves primárias/estrangeiras, consultas SELECT, INSERT, UPDATE e DELETE.',
    challenges: [
      {
        id: 1,
        level: 'Fácil',
        title: 'Seleção Simples',
        description: 'Crie uma consulta SQL que selecione TODOS os campos da tabela usuarios.',
        hint: 'Use SELECT * FROM...'
      },
      {
        id: 2,
        level: 'Fácil',
        title: 'Filtro Básico',
        description: 'Selecione apenas o nome e email de usuários com idade maior que 18.',
        hint: 'Use WHERE com operador >'
      },
      {
        id: 3,
        level: 'Médio',
        title: 'Múltiplos Filtros',
        description: 'Selecione usuários com nota maior que 50% E que estejam ativos (status = "ativo").',
        hint: 'Use AND para combinar condições'
      },
      {
        id: 4,
        level: 'Médio',
        title: 'Ordenação e Limite',
        description: 'Selecione os 5 usuários com maior nota, ordenados da maior para a menor.',
        hint: 'Use ORDER BY ... DESC e LIMIT'
      },
      {
        id: 5,
        level: 'Difícil',
        title: 'JOIN de Tabelas',
        description: 'Crie uma consulta que una as tabelas "usuarios" e "cursos" mostrando nome do usuário e nome do curso inscrito.',
        hint: 'Use INNER JOIN ... ON usuarios.id = cursos.usuario_id'
      }
    ]
  },
  
  funcao: {
    title: 'Funções — Boas práticas',
    description: 'Entenda como criar funções reutilizáveis, parâmetros, retorno e escopo. Exercícios práticos em JavaScript.',
    challenges: [
      {
        id: 1,
        level: 'Fácil',
        title: 'Função Simples',
        description: 'Crie uma função chamada "saudacao" que recebe um nome e retorna "Olá, [nome]!"',
        hint: 'function saudacao(nome) { return ... }'
      },
      {
        id: 2,
        level: 'Fácil',
        title: 'Função com Cálculo',
        description: 'Crie uma função que recebe dois números e retorna a soma deles.',
        hint: 'Use o operador +'
      },
      {
        id: 3,
        level: 'Médio',
        title: 'Média Aritmética',
        description: 'Crie uma função que recebe um array de números e retorna a média aritmética.',
        hint: 'Some todos os valores e divida pelo tamanho do array'
      },
      {
        id: 4,
        level: 'Médio',
        title: 'Validação de Email',
        description: 'Crie uma função que recebe uma string e retorna true se for um email válido (contém @ e .).',
        hint: 'Use includes() ou indexOf()'
      },
      {
        id: 5,
        level: 'Difícil',
        title: 'Função de Alta Ordem',
        description: 'Crie uma função "filtrarMaiores" que recebe um array e um valor mínimo, retornando apenas números maiores que o mínimo.',
        hint: 'Use array.filter()'
      }
    ]
  },
  
  request: {
    title: 'Requisições HTTP',
    description: 'Aprenda sobre requisições GET/POST, consumo de APIs e tratamento de respostas/erros.',
    challenges: [
      {
        id: 1,
        level: 'Fácil',
        title: 'Primeira Requisição',
        description: 'Faça uma requisição GET para https://jsonplaceholder.typicode.com/todos/1 e exiba o resultado no console.',
        hint: 'Use fetch().then(res => res.json())'
      },
      {
        id: 2,
        level: 'Fácil',
        title: 'Exibir Título',
        description: 'Busque o primeiro post de https://jsonplaceholder.typicode.com/posts/1 e exiba apenas o título.',
        hint: 'Acesse data.title após converter para JSON'
      },
      {
        id: 3,
        level: 'Médio',
        title: 'Lista de Usuários',
        description: 'Busque todos os usuários (https://jsonplaceholder.typicode.com/users) e exiba apenas os nomes em um array.',
        hint: 'Use map() para extrair apenas os nomes'
      },
      {
        id: 4,
        level: 'Médio',
        title: 'Tratamento de Erro',
        description: 'Faça uma requisição e adicione tratamento de erro com try/catch ou .catch()',
        hint: 'try { ... } catch(erro) { console.error(erro) }'
      },
      {
        id: 5,
        level: 'Difícil',
        title: 'POST com Dados',
        description: 'Envie um POST para https://jsonplaceholder.typicode.com/posts com título e corpo, e exiba a resposta.',
        hint: 'fetch(url, { method: "POST", body: JSON.stringify(...), headers: {...} })'
      }
    ]
  },
  
  variaveis_condicionais: {
    title: 'Variáveis e Condicionais',
    description: 'Tipos de variáveis, operadores lógicos e estruturas condicionais (if/else, switch).',
    challenges: [
      {
        id: 1,
        level: 'Fácil',
        title: 'Declarar Variáveis',
        description: 'Declare uma variável com seu nome usando const, e outra com sua idade usando let. Exiba ambas no console.',
        hint: 'const nome = "..."; let idade = ...;'
      },
      {
        id: 2,
        level: 'Fácil',
        title: 'Par ou Ímpar',
        description: 'Crie uma função que recebe um número e retorna "par" ou "ímpar".',
        hint: 'Use o operador % (módulo) para verificar se divide por 2'
      },
      {
        id: 3,
        level: 'Médio',
        title: 'Classificação de Nota',
        description: 'Crie uma função que recebe uma nota (0-100) e retorna "Reprovado" (<50), "Regular" (50-69), "Bom" (70-89) ou "Excelente" (90+).',
        hint: 'Use if/else if/else ou switch'
      },
      {
        id: 4,
        level: 'Médio',
        title: 'Operadores Lógicos',
        description: 'Crie uma função que verifica se um número está entre 10 e 20 (inclusive). Retorne true ou false.',
        hint: 'Use && (E) para combinar condições'
      },
      {
        id: 5,
        level: 'Difícil',
        title: 'Validador de Senha',
        description: 'Crie uma função que valida se uma senha tem: mínimo 8 caracteres, contém número e contém letra maiúscula.',
        hint: 'Combine múltiplas condições com && e use métodos de string'
      }
    ]
  },
  
  laco_repeticao: {
    title: 'Laços de Repetição',
    description: 'For, while, forEach e suas aplicações em iteração de coleções.',
    challenges: [
      {
        id: 1,
        level: 'Fácil',
        title: 'Loop Básico',
        description: 'Use um loop for para exibir os números de 1 a 10 no console.',
        hint: 'for (let i = 1; i <= 10; i++) { ... }'
      },
      {
        id: 2,
        level: 'Fácil',
        title: 'Percorrer Array',
        description: 'Dado um array ["maçã", "banana", "laranja"], use forEach para exibir cada fruta no console.',
        hint: 'array.forEach(item => console.log(item))'
      },
      {
        id: 3,
        level: 'Médio',
        title: 'Elevar ao Quadrado',
        description: 'Dado um array de números [2, 4, 6, 8], retorne um novo array com cada número elevado ao quadrado.',
        hint: 'Use map() ou um loop com push()'
      },
      {
        id: 4,
        level: 'Médio',
        title: 'Soma de Array',
        description: 'Crie uma função que recebe um array de números e retorna a soma total.',
        hint: 'Use reduce() ou loop com acumulador'
      },
      {
        id: 5,
        level: 'Difícil',
        title: 'Filtrar e Transformar',
        description: 'Dado um array de números [1, 2, 3, 4, 5, 6], retorne apenas os pares, multiplicados por 3.',
        hint: 'Combine filter() e map(), ou use um loop com condição'
      }
    ]
  }
}

export default tracks