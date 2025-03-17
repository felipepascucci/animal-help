// Configurações para conexão com a API
// Você pode ajustar este arquivo conforme necessário

// URL base da API
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"

// Configurações padrão para requisições fetch
export const defaultFetchOptions: RequestInit = {
  headers: {
    "Content-Type": "application/json",
    // Adicione outros headers padrão aqui, se necessário
    // 'Authorization': 'Bearer seu-token',
  },
  // Você pode adicionar outras configurações padrão aqui
  // credentials: 'include', // Para enviar cookies
  // mode: 'cors',
}

// Função para adicionar token de autenticação (se necessário)
export function addAuthHeader(options: RequestInit = {}): RequestInit {
  // Exemplo: obter token do localStorage
  const token = typeof window !== "undefined" ? localStorage.getItem("authToken") : null

  if (!token) return options

  return {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${token}`,
    },
  }
}

// Função para lidar com erros da API
export function handleApiError(error: any): never {
  // Você pode personalizar o tratamento de erros aqui
  console.error("Erro na API:", error)

  // Exemplo: redirecionar para página de login em caso de erro de autenticação
  if (error.status === 401 && typeof window !== "undefined") {
    // window.location.href = '/login';
  }

  throw new Error(error.message || "Ocorreu um erro ao comunicar com o servidor")
}

