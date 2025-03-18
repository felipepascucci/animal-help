// Este serviço lida com o upload de arquivos para o backend

// Função para converter um arquivo em base64
export async function fileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => resolve(reader.result as string)
      reader.onerror = (error) => reject(error)
    })
  }
  
  // Função para enviar um arquivo para o backend
  export async function uploadFileToServer(file: File, endpoint: string): Promise<string> {
    try {
      // Converte o arquivo para base64
      const base64Data = await fileToBase64(file)
  
      // Em um ambiente real, você enviaria o arquivo para seu backend
      // usando FormData ou outro método suportado pelo seu backend
  
      // Exemplo com FormData:
      const formData = new FormData()
      formData.append("file", file)
  
      const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: "POST",
        body: formData,
      })
  
      if (!response.ok) {
        throw new Error("Falha ao fazer upload do arquivo")
      }
  
      const data = await response.json()
      return data.url // URL do arquivo no servidor
    } catch (error) {
      console.error("Erro ao fazer upload do arquivo:", error)
  
      // Para desenvolvimento, retorna a URL base64 do arquivo
      if (process.env.NODE_ENV === "development") {
        return await fileToBase64(file)
      }
  
      throw error
    }
  }
  
  