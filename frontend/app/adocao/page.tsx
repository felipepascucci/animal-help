"use client"

import { useState, useEffect, useCallback } from "react"
import Link from "next/link"
import Image from "next/image"
import { animaisAPI } from "@/lib/api"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"
import { ImageUpload } from "@/components/ui/image-upload"
import { SiteHeader } from "@/components/site-header"
import { CheckCircle2 } from "lucide-react"

export default function AdocaoPage() {
  const [animais, setAnimais] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [filtro, setFiltro] = useState({ tipo: "todos", porte: "todos" })
  const [activeTab, setActiveTab] = useState("listar")
  const [showThankYou, setShowThankYou] = useState(false)
  const { toast } = useToast()

  // Função para carregar animais que pode ser chamada quando necessário
  const carregarAnimais = useCallback(async () => {
    try {
      setIsLoading(true)
      const data = await animaisAPI.listarAnimais()
      setAnimais(data)
    } catch (error) {
      toast({
        title: "Erro ao carregar animais",
        description: "Não foi possível carregar a lista de animais para adoção.",
        variant: "destructive",
      })
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }, [toast])

  // Carregar animais na montagem do componente
  useEffect(() => {
    carregarAnimais()
  }, [carregarAnimais])

  const animaisFiltrados = animais.filter((animal) => {
    if (filtro.porte !== "todos" && animal.porte !== filtro.porte) return false
    return true
  })

  // Função para lidar com o redirecionamento após o cadastro
  const handleCadastroSuccess = () => {
    setShowThankYou(true)
  }

  // Função para lidar com o redirecionamento após a mensagem de agradecimento
  const handleThankYouComplete = async () => {
    setShowThankYou(false)
    setActiveTab("listar")
    // Recarregar a lista de animais para mostrar o animal recém-cadastrado
    await carregarAnimais()
  }

  // Se a mensagem de agradecimento estiver ativa, mostrar apenas ela
  if (showThankYou) {
    return (
      <>
        <SiteHeader />
        <ThankYouMessage onComplete={handleThankYouComplete} />
      </>
    )
  }

  return (
    <>
      <SiteHeader />
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-8">Adoção de Animais</h1>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-10">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="listar">Encontrar um Pet</TabsTrigger>
            <TabsTrigger value="cadastrar">Cadastrar para Adoção</TabsTrigger>
          </TabsList>

          <TabsContent value="listar">
            <div className="grid gap-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="grid gap-2 flex-1">
                  <Label htmlFor="porte">Porte</Label>
                  <Select value={filtro.porte} onValueChange={(value) => setFiltro({ ...filtro, porte: value })}>
                    <SelectTrigger id="porte">
                      <SelectValue placeholder="Selecione o porte" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="todos">Todos</SelectItem>
                      <SelectItem value="pequeno">Pequeno</SelectItem>
                      <SelectItem value="medio">Médio</SelectItem>
                      <SelectItem value="grande">Grande</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {isLoading ? (
                <div className="text-center py-12">Carregando animais...</div>
              ) : animaisFiltrados.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {animaisFiltrados.map((animal) => (
                    <Card key={animal.id}>
                      <CardHeader className="p-0">
                        <div className="relative h-48 w-full">
                          <Image
                            src={animal.fotos || "/placeholder.svg?height=200&width=300"}
                            alt={animal.nome}
                            fill
                            className="object-cover rounded-t-lg"
                          />
                        </div>
                      </CardHeader>
                      <CardContent className="p-6">
                        <CardTitle className="mb-2">{animal.nome}</CardTitle>
                        <CardDescription>
                          <strong>Idade:</strong> {animal.idade} {animal.idade === 1 ? "ano" : "anos"}
                          <br />
                          <strong>Raça:</strong> {animal.raca}
                          <br />
                          <strong>Porte:</strong> {animal.porte}
                        </CardDescription>
                        <p className="mt-4 line-clamp-3">{animal.comportamento}</p>
                      </CardContent>
                      <CardFooter>
                        <Button asChild className="w-full">
                          <Link href={`/adocao/${animal.id}`}>Ver detalhes</Link>
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">Nenhum animal encontrado com os filtros selecionados.</p>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="cadastrar">
            <CadastroAnimalForm onSuccess={handleCadastroSuccess} />
          </TabsContent>
        </Tabs>
      </div>
    </>
  )
}

function ThankYouMessage({ onComplete }) {
  useEffect(() => {
    // Redirecionar para a aba "Encontrar um Pet" após 5 segundos
    const redirectTimer = setTimeout(() => {
      onComplete()
    }, 5000)

    // Limpar o temporizador se o componente for desmontado
    return () => clearTimeout(redirectTimer)
  }, [onComplete])

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center py-12 max-w-2xl mx-auto">
        <div className="flex justify-center mb-6">
          <CheckCircle2 className="h-20 w-20 text-green-500" />
        </div>
        <h2 className="text-3xl font-bold mb-4">Animal Cadastrado com Sucesso!</h2>
        <p className="text-xl mb-6">
          Obrigado por cadastrar um animal para adoção. Ele já está disponível para que outras pessoas possam
          conhecê-lo.
        </p>
        <p className="text-muted-foreground mb-8">
          Você será redirecionado para a lista de animais disponíveis em alguns segundos...
        </p>
        <Button onClick={onComplete} variant="default">
          Ver animais disponíveis agora
        </Button>
      </div>
    </div>
  )
}

function CadastroAnimalForm({ onSuccess }) {
  const [formData, setFormData] = useState({
    nome: "",
    idade: "",
    raca: "",
    porte: "",
    caracteristicas_fisicas: "",
    historico_saude: "",
    comportamento: "",
    requisitos_adoção: "",
  })
  const [fotoFile, setFotoFile] = useState<File | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleImageChange = (file: File | null) => {
    setFotoFile(file)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Converte idade para número
    const dadosParaEnviar = {
      ...formData,
      idade: Number.parseInt(formData.idade),
    }

    try {
      setIsSubmitting(true)
      console.log("Enviando cadastro de animal:", dadosParaEnviar)
      console.log("Foto anexada:", fotoFile ? "Sim" : "Não")

      // Usa a nova função que suporta upload de imagens
      await animaisAPI.cadastrarAnimalComImagem(dadosParaEnviar, fotoFile)

      // Chama a função de sucesso para mostrar a mensagem de agradecimento
      onSuccess()

      // Limpar formulário (embora não seja imediatamente visível devido à mensagem de agradecimento)
      setFormData({
        nome: "",
        idade: "",
        raca: "",
        porte: "",
        caracteristicas_fisicas: "",
        historico_saude: "",
        comportamento: "",
        requisitos_adoção: "",
      })
      setFotoFile(null)
    } catch (error) {
      toast({
        title: "Erro ao cadastrar animal",
        description: error.message || "Ocorreu um erro ao cadastrar o animal.",
        variant: "destructive",
      })
      console.error("Erro detalhado:", error)
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        <div className="grid gap-2">
          <Label htmlFor="nome">Nome do Animal</Label>
          <Input id="nome" name="nome" value={formData.nome} onChange={handleChange} required />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="idade">Idade (em anos)</Label>
          <Input
            id="idade"
            name="idade"
            type="number"
            min="0"
            value={formData.idade}
            onChange={handleChange}
            required
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="raca">Raça</Label>
          <Input id="raca" name="raca" value={formData.raca} onChange={handleChange} required />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="porte">Porte</Label>
          <Select value={formData.porte} onValueChange={(value) => handleSelectChange("porte", value)} required>
            <SelectTrigger id="porte">
              <SelectValue placeholder="Selecione o porte" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="pequeno">Pequeno</SelectItem>
              <SelectItem value="medio">Médio</SelectItem>
              <SelectItem value="grande">Grande</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid gap-2 md:col-span-2">
          <Label>Foto do Animal</Label>
          <ImageUpload onImageChange={handleImageChange} />
        </div>

        <div className="grid gap-2 md:col-span-2">
          <Label htmlFor="caracteristicas_fisicas">Características Físicas</Label>
          <textarea
            id="caracteristicas_fisicas"
            name="caracteristicas_fisicas"
            value={formData.caracteristicas_fisicas}
            onChange={handleChange}
            required
            className="min-h-[100px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            placeholder="Descreva as características físicas do animal (pelagem, cor, tamanho, etc.)"
          />
        </div>

        <div className="grid gap-2 md:col-span-2">
          <Label htmlFor="historico_saude">Histórico de Saúde</Label>
          <textarea
            id="historico_saude"
            name="historico_saude"
            value={formData.historico_saude}
            onChange={handleChange}
            required
            className="min-h-[100px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            placeholder="Informe o histórico de saúde do animal (vacinas, castração, doenças, etc.)"
          />
        </div>

        <div className="grid gap-2 md:col-span-2">
          <Label htmlFor="comportamento">Comportamento</Label>
          <textarea
            id="comportamento"
            name="comportamento"
            value={formData.comportamento}
            onChange={handleChange}
            required
            className="min-h-[100px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            placeholder="Descreva o comportamento do animal (temperamento, socialização, etc.)"
          />
        </div>

        <div className="grid gap-2 md:col-span-2">
          <Label htmlFor="requisitos_adoção">Requisitos para Adoção / Necessidade de Ajuda</Label>
          <textarea
            id="requisitos_adoção"
            name="requisitos_adoção"
            value={formData.requisitos_adoção}
            onChange={handleChange}
            required
            className="min-h-[100px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            placeholder="Informe os requisitos para adoção (espaço necessário, experiência prévia, etc.)"
          />
        </div>
      </div>

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? "Cadastrando..." : "Cadastrar Animal para Adoção"}
      </Button>
    </form>
  )
}

