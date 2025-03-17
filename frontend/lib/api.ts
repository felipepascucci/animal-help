// Atualize o início do arquivo api.ts para usar as configurações
import { API_BASE_URL, defaultFetchOptions, addAuthHeader, handleApiError } from "./api-config"

// Serviço para comunicação com o backend FastAPI

// URL base da API
const API_BASE_URL_OLD = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"

// Dados simulados para desenvolvimento (quando o backend não está disponível)
const mockData = {
  animais: [
    {
      id: 1,
      nome: "Rex",
      idade: 2,
      raca: "Vira-lata",
      porte: "medio",
      caracteristicas_fisicas: "Pelagem marrom e branca, orelhas caídas, porte médio.",
      historico_saude: "Vacinado e castrado. Sem problemas de saúde conhecidos.",
      fotos: "/placeholder.svg?height=300&width=400",
      comportamento: "Dócil e brincalhão. Adora passear e brincar com outros cães.",
      requisitos_adoção: "Precisa de espaço para correr e brincar. Ideal para casas com quintal.",
    },
    {
      id: 2,
      nome: "Luna",
      idade: 1,
      raca: "Siamês",
      porte: "pequeno",
      caracteristicas_fisicas: "Pelagem clara com extremidades mais escuras, olhos azuis.",
      historico_saude: "Vacinada e castrada. Sem problemas de saúde conhecidos.",
      fotos: "/placeholder.svg?height=300&width=400",
      comportamento: "Carinhosa e tranquila. Gosta de ficar no colo e dormir em lugares altos.",
      requisitos_adoção: "Ambiente seguro, sem acesso à rua. Ideal para apartamentos.",
    },
    {
      id: 3,
      nome: "Thor",
      idade: 3,
      raca: "Labrador",
      porte: "grande",
      caracteristicas_fisicas: "Pelagem dourada, porte grande e robusto.",
      historico_saude:
        "Vacinado e castrado. Teve uma fratura na pata dianteira quando filhote, mas está completamente recuperado.",
      fotos: "/placeholder.svg?height=300&width=400",
      comportamento: "Muito amigável e protetor. Ótimo com crianças e outros animais.",
      requisitos_adoção: "Casa com quintal grande. Família que possa dar atenção e passeios diários.",
    },
  ],
  denuncias: [
    {
      id: 1,
      localizacao: "Rua das Flores, 123 - Centro",
      descricao: "Cachorro abandonado em terreno baldio, aparentemente sem comida ou água.",
      fotos: "/placeholder.svg?height=300&width=400",
      anonimo: true,
    },
    {
      id: 2,
      localizacao: "Avenida Principal, próximo ao número 500",
      descricao: "Gatos em situação de maus-tratos, presos em gaiolas pequenas.",
      fotos: "/placeholder.svg?height=300&width=400",
      anonimo: false,
    },
  ],
  voluntarios: [
    {
      id: 1,
      nome: "Maria Silva",
      endereco: "Rua das Acácias, 45 - Jardim Primavera",
      disponibilidade: "finais_semana",
      experiencia: "Experiência com resgate de animais de rua e cuidados básicos de saúde.",
    },
    {
      id: 2,
      nome: "João Pereira",
      endereco: "Avenida Central, 789 - Centro",
      disponibilidade: "dias_uteis",
      experiencia: "Trabalhou como auxiliar em clínica veterinária por 2 anos.",
    },
  ],
  veterinarios: [
    {
      id: 1,
      nome: "Dra. Ana Santos",
      especialidade: "Clínica Geral",
      disponibilidade: "horario_comercial",
      localizacao: "Clínica PetVida - Rua das Margaridas, 100",
    },
    {
      id: 2,
      nome: "Dr. Carlos Mendes",
      especialidade: "Cirurgia",
      disponibilidade: "emergencias",
      localizacao: "Hospital Veterinário Central - Av. Principal, 1500",
    },
  ],
  dicas: [
    {
      id: 1,
      titulo: "Como escovar os dentes do seu pet",
      categoria: "cuidados_basicos",
      resumo:
        "Aprenda a importância da higiene bucal e como escovar os dentes do seu animal de estimação corretamente.",
      conteudo: "A higiene bucal é fundamental para a saúde do seu pet...",
      imagem_url: "/placeholder.svg?height=300&width=400",
    },
    {
      id: 2,
      titulo: "Alimentação adequada para cães idosos",
      categoria: "alimentacao",
      resumo: "Descubra quais alimentos são mais indicados para cães na terceira idade e como adaptar a dieta.",
      conteudo: "À medida que os cães envelhecem, suas necessidades nutricionais mudam...",
      imagem_url: "/placeholder.svg?height=300&width=400",
    },
    {
      id: 3,
      titulo: "Sinais de que seu gato pode estar doente",
      categoria: "saude",
      resumo:
        "Conheça os principais sinais que podem indicar problemas de saúde em gatos e quando procurar um veterinário.",
      conteudo: "Os gatos são mestres em esconder doenças e desconfortos...",
      imagem_url: "/placeholder.svg?height=300&width=400",
    },
  ],
}

// Verifica se estamos em modo de desenvolvimento e se o backend está disponível
let useMockData = process.env.NODE_ENV === "development"

// Função auxiliar para fazer requisições HTTP
async function fetchAPI(endpoint: string, options: RequestInit = {}) {
  const url = `${API_BASE_URL}${endpoint}`

  // Combina as opções padrão com as opções fornecidas
  const fetchOptions = {
    ...defaultFetchOptions,
    ...options,
    headers: {
      ...defaultFetchOptions.headers,
      ...options.headers,
    },
  }

  // Adiciona cabeçalhos de autenticação, se necessário
  const authOptions = addAuthHeader(fetchOptions)

  try {
    // Tenta fazer a requisição para o backend
    const response = await fetch(url, authOptions)

    if (!response.ok) {
      const error = await response.json().catch(() => ({
        detail: `Erro ${response.status}: ${response.statusText}`,
      }))
      throw error
    }

    return await response.json()
  } catch (error) {
    console.warn(`Erro ao acessar a API (${url}):`, error)

    // Se estamos em desenvolvimento e a requisição falhou, usamos dados simulados
    if (process.env.NODE_ENV === "development") {
      useMockData = true
      console.info("Usando dados simulados para desenvolvimento.")

      // Extrai o nome do recurso do endpoint (ex: /animais -> animais)
      const resource = endpoint.split("/")[1]

      // Se for uma requisição GET para um recurso conhecido, retorna os dados simulados
      if (!options.method || options.method === "GET") {
        // Se o endpoint tem um ID específico (ex: /animais/1)
        if (endpoint.split("/").length > 2) {
          const id = Number.parseInt(endpoint.split("/")[2])
          const item = mockData[resource]?.find((item) => item.id === id)
          if (item) return item
        }

        // Se é uma listagem (ex: /animais)
        if (mockData[resource]) {
          return mockData[resource]
        }
      }

      // Para outros métodos (POST, PUT, DELETE), simula uma resposta de sucesso
      if (options.method === "POST") {
        return { success: true, message: "Recurso criado com sucesso (simulado)" }
      }

      if (options.method === "PUT") {
        return { success: true, message: "Recurso atualizado com sucesso (simulado)" }
      }

      if (options.method === "DELETE") {
        return { success: true, message: "Recurso removido com sucesso (simulado)" }
      }
    }

    // Se não estamos em desenvolvimento ou não conseguimos simular, trata o erro
    return handleApiError(error)
  }
}

// API de Animais para Adoção
export const animaisAPI = {
  // Listar todos os animais disponíveis para adoção
  listarAnimais: () => fetchAPI("/animais"),

  // Obter detalhes de um animal específico
  obterAnimal: (id: number) => fetchAPI(`/animais/${id}`),

  // Cadastrar um novo animal para adoção
  cadastrarAnimal: (dados: any) =>
    fetchAPI("/animais", {
      method: "POST",
      body: JSON.stringify(dados),
    }),

  // Atualizar informações de um animal
  atualizarAnimal: (id: number, dados: any) =>
    fetchAPI(`/animais/${id}`, {
      method: "PUT",
      body: JSON.stringify(dados),
    }),

  // Remover um animal da lista de adoção
  removerAnimal: (id: number) =>
    fetchAPI(`/animais/${id}`, {
      method: "DELETE",
    }),
}

// API de Denúncias
export const denunciasAPI = {
  // Listar todas as denúncias (para administradores)
  listarDenuncias: () => fetchAPI("/denuncias"),

  // Obter detalhes de uma denúncia específica
  obterDenuncia: (id: number) => fetchAPI(`/denuncias/${id}`),

  // Cadastrar uma nova denúncia
  cadastrarDenuncia: (dados: any) =>
    fetchAPI("/denuncias", {
      method: "POST",
      body: JSON.stringify(dados),
    }),

  // Atualizar status de uma denúncia
  atualizarDenuncia: (id: number, dados: any) =>
    fetchAPI(`/denuncias/${id}`, {
      method: "PUT",
      body: JSON.stringify(dados),
    }),
}

// API de Voluntários
export const voluntariosAPI = {
  // Listar todos os voluntários
  listarVoluntarios: () => fetchAPI("/voluntarios"),

  // Obter detalhes de um voluntário específico
  obterVoluntario: (id: number) => fetchAPI(`/voluntarios/${id}`),

  // Cadastrar um novo voluntário
  cadastrarVoluntario: (dados: any) =>
    fetchAPI("/voluntarios", {
      method: "POST",
      body: JSON.stringify(dados),
    }),

  // Atualizar informações de um voluntário
  atualizarVoluntario: (id: number, dados: any) =>
    fetchAPI(`/voluntarios/${id}`, {
      method: "PUT",
      body: JSON.stringify(dados),
    }),
}

// API de Veterinários
export const veterinariosAPI = {
  // Listar todos os veterinários
  listarVeterinarios: () => fetchAPI("/veterinarios"),

  // Obter detalhes de um veterinário específico
  obterVeterinario: (id: number) => fetchAPI(`/veterinarios/${id}`),

  // Cadastrar um novo veterinário
  cadastrarVeterinario: (dados: any) =>
    fetchAPI("/veterinarios", {
      method: "POST",
      body: JSON.stringify(dados),
    }),

  // Atualizar informações de um veterinário
  atualizarVeterinario: (id: number, dados: any) =>
    fetchAPI(`/veterinarios/${id}`, {
      method: "PUT",
      body: JSON.stringify(dados),
    }),
}

// API de Dicas
export const dicasAPI = {
  // Listar todas as dicas
  listarDicas: () => fetchAPI("/dicas"),

  // Obter detalhes de uma dica específica
  obterDica: (id: number) => fetchAPI(`/dicas/${id}`),

  // Cadastrar uma nova dica (para administradores)
  cadastrarDica: (dados: any) =>
    fetchAPI("/dicas", {
      method: "POST",
      body: JSON.stringify(dados),
    }),

  // Atualizar uma dica
  atualizarDica: (id: number, dados: any) =>
    fetchAPI(`/dicas/${id}`, {
      method: "PUT",
      body: JSON.stringify(dados),
    }),

  // Remover uma dica
  removerDica: (id: number) =>
    fetchAPI(`/dicas/${id}`, {
      method: "DELETE",
    }),
}

