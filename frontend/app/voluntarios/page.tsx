"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { voluntariosAPI, veterinariosAPI } from "@/lib/api"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"
import { SiteHeader } from "@/components/site-header"
import { CheckCircle2, User, Stethoscope } from "lucide-react"

export default function VoluntariosPage() {
  const [showVoluntarioThankYou, setShowVoluntarioThankYou] = useState(false)
  const [showVeterinarioThankYou, setShowVeterinarioThankYou] = useState(false)
  const [activeTab, setActiveTab] = useState("voluntario")
  const [voluntarios, setVoluntarios] = useState([])
  const [veterinarios, setVeterinarios] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const { toast } = useToast()

  // Carregar dados de voluntários e veterinários
  useEffect(() => {
    async function carregarDados() {
      try {
        setIsLoading(true)
        const [voluntariosData, veterinariosData] = await Promise.all([
          voluntariosAPI.listarVoluntarios(),
          veterinariosAPI.listarVeterinarios(),
        ])

        setVoluntarios(voluntariosData)
        setVeterinarios(veterinariosData)
      } catch (error) {
        console.error("Erro ao carregar dados:", error)
        toast({
          title: "Erro ao carregar dados",
          description: "Não foi possível carregar a lista de voluntários e veterinários.",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    carregarDados()
  }, [toast])

  // Função para recarregar os dados após um cadastro bem-sucedido
  const recarregarDados = async () => {
    try {
      if (activeTab === "voluntario" || activeTab === "lista-voluntarios") {
        const voluntariosData = await voluntariosAPI.listarVoluntarios()
        setVoluntarios(voluntariosData)
        setActiveTab("lista-voluntarios")
      } else if (activeTab === "veterinario" || activeTab === "lista-veterinarios") {
        const veterinariosData = await veterinariosAPI.listarVeterinarios()
        setVeterinarios(veterinariosData)
        setActiveTab("lista-veterinarios")
      }
    } catch (error) {
      console.error("Erro ao recarregar dados:", error)
    }
  }

  // Se qualquer uma das mensagens de agradecimento estiver ativa, mostrar a mensagem correspondente
  if (showVoluntarioThankYou) {
    return (
      <>
        <SiteHeader />
        <ThankYouMessage
          type="voluntário"
          onReset={() => setShowVoluntarioThankYou(false)}
          onSuccess={() => {
            setShowVoluntarioThankYou(false)
            recarregarDados()
          }}
        />
      </>
    )
  }

  if (showVeterinarioThankYou) {
    return (
      <>
        <SiteHeader />
        <ThankYouMessage
          type="veterinário"
          onReset={() => setShowVeterinarioThankYou(false)}
          onSuccess={() => {
            setShowVeterinarioThankYou(false)
            recarregarDados()
          }}
        />
      </>
    )
  }

  return (
    <>
      <SiteHeader />
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-4">Voluntários e Veterinários</h1>
        <p className="text-muted-foreground mb-8">
          Junte-se à nossa rede de pessoas comprometidas com o bem-estar animal. Cadastre-se como voluntário ou
          veterinário parceiro, ou veja quem já faz parte da nossa equipe.
        </p>

        <Tabs defaultValue="voluntario" value={activeTab} onValueChange={setActiveTab} className="max-w-4xl mx-auto">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="voluntario">Cadastrar Voluntário</TabsTrigger>
            <TabsTrigger value="veterinario">Cadastrar Veterinário</TabsTrigger>
            <TabsTrigger value="lista-voluntarios">Ver Voluntários</TabsTrigger>
            <TabsTrigger value="lista-veterinarios">Ver Veterinários</TabsTrigger>
          </TabsList>

          <TabsContent value="voluntario">
            <Card>
              <CardHeader>
                <CardTitle>Cadastro de Voluntário</CardTitle>
                <CardDescription>
                  Preencha o formulário abaixo para se cadastrar como voluntário. Sua ajuda é fundamental para o
                  bem-estar dos animais.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <VoluntarioForm onSuccess={() => setShowVoluntarioThankYou(true)} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="veterinario">
            <Card>
              <CardHeader>
                <CardTitle>Cadastro de Veterinário</CardTitle>
                <CardDescription>
                  Cadastre-se como veterinário parceiro para ajudar animais em situação de vulnerabilidade.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <VeterinarioForm onSuccess={() => setShowVeterinarioThankYou(true)} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="lista-voluntarios">
            <Card>
              <CardHeader>
                <CardTitle>Voluntários Cadastrados</CardTitle>
                <CardDescription>Conheça as pessoas que dedicam seu tempo para ajudar os animais.</CardDescription>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="text-center py-8">Carregando voluntários...</div>
                ) : voluntarios.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">Nenhum voluntário cadastrado ainda.</p>
                    <Button onClick={() => setActiveTab("voluntario")} variant="outline" className="mt-4">
                      Seja o primeiro a se cadastrar
                    </Button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {voluntarios.map((voluntario) => (
                      <VoluntarioCard key={voluntario.id} voluntario={voluntario} />
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="lista-veterinarios">
            <Card>
              <CardHeader>
                <CardTitle>Veterinários Parceiros</CardTitle>
                <CardDescription>
                  Conheça os profissionais que cuidam da saúde dos animais em nossa rede.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="text-center py-8">Carregando veterinários...</div>
                ) : veterinarios.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">Nenhum veterinário cadastrado ainda.</p>
                    <Button onClick={() => setActiveTab("veterinario")} variant="outline" className="mt-4">
                      Seja o primeiro a se cadastrar
                    </Button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {veterinarios.map((veterinario) => (
                      <VeterinarioCard key={veterinario.id} veterinario={veterinario} />
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </>
  )
}

function ThankYouMessage({ type, onReset, onSuccess }) {
  const router = useRouter()

  useEffect(() => {
    // Redirecionar para a página inicial após 5 segundos
    const redirectTimer = setTimeout(() => {
      onSuccess()
    }, 5000)

    // Limpar o temporizador se o componente for desmontado
    return () => clearTimeout(redirectTimer)
  }, [router, onSuccess])

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center py-12 max-w-2xl mx-auto">
        <div className="flex justify-center mb-6">
          <CheckCircle2 className="h-20 w-20 text-green-500" />
        </div>
        <h2 className="text-3xl font-bold mb-4">Cadastro Realizado!</h2>
        <p className="text-xl mb-6">
          Agradecemos seu interesse em ser {type} parceiro. Entraremos em contato em breve para dar continuidade ao
          processo.
        </p>
        <p className="text-muted-foreground mb-8">
          Você será redirecionado para a lista de cadastros em alguns segundos...
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button onClick={onSuccess} variant="default">
            Ver lista de cadastros agora
          </Button>
          <Button onClick={onReset} variant="outline">
            Fazer outro cadastro
          </Button>
        </div>
      </div>
    </div>
  )
}

function VoluntarioCard({ voluntario }) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2">
          <User className="h-5 w-5 text-primary" />
          <CardTitle className="text-lg">{voluntario.nome}</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="space-y-2 text-sm">
          <div>
            <span className="font-medium">Telefone:</span> {voluntario.telefone}
          </div>
          <div>
            <span className="font-medium">Endereço:</span> {voluntario.endereco}
          </div>
          <div>
            <span className="font-medium">Disponibilidade:</span>{" "}
            {voluntario.disponibilidade === "dias_uteis" && "Dias úteis"}
            {voluntario.disponibilidade === "finais_semana" && "Finais de semana"}
            {voluntario.disponibilidade === "ambos" && "Dias úteis e finais de semana"}
            {voluntario.disponibilidade === "sob_demanda" && "Sob demanda"}
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <p className="text-xs text-muted-foreground">
          <span className="font-medium">Experiência:</span> {voluntario.experiencia}
        </p>
      </CardFooter>
    </Card>
  )
}

function VeterinarioCard({ veterinario }) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2">
          <Stethoscope className="h-5 w-5 text-primary" />
          <CardTitle className="text-lg">{veterinario.nome}</CardTitle>
        </div>
        <CardDescription>{veterinario.especialidade}</CardDescription>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="space-y-2 text-sm">
          <div>
            <span className="font-medium">Telefone:</span> {veterinario.telefone}
          </div>
          <div>
            <span className="font-medium">Localização:</span> {veterinario.localizacao}
          </div>
          <div>
            <span className="font-medium">Disponibilidade:</span>{" "}
            {veterinario.disponibilidade === "horario_comercial" && "Horário comercial"}
            {veterinario.disponibilidade === "plantao" && "Plantão"}
            {veterinario.disponibilidade === "emergencias" && "Apenas emergências"}
            {veterinario.disponibilidade === "agendamento" && "Mediante agendamento"}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function VoluntarioForm({ onSuccess }) {
  const [formData, setFormData] = useState({
    nome: "",
    endereco: "",
    telefone: "",
    disponibilidade: "",
    experiencia: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      setIsSubmitting(true)
      console.log("Enviando cadastro de voluntário:", formData)
      await voluntariosAPI.cadastrarVoluntario(formData)

      // Chama a função de sucesso para mostrar a mensagem de agradecimento
      onSuccess()
    } catch (error) {
      toast({
        title: "Erro ao realizar cadastro",
        description: error.message || "Ocorreu um erro ao enviar seu cadastro. Tente novamente mais tarde.",
        variant: "destructive",
      })
      console.error("Erro detalhado:", error)
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="nome">Nome Completo</Label>
          <Input id="nome" name="nome" value={formData.nome} onChange={handleChange} required />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="telefone">Telefone</Label>
          <Input
            id="telefone"
            name="telefone"
            value={formData.telefone}
            onChange={handleChange}
            placeholder="(00) 00000-0000"
            required
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="endereco">Endereço</Label>
          <Input id="endereco" name="endereco" value={formData.endereco} onChange={handleChange} required />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="disponibilidade">Disponibilidade</Label>
          <Select
            value={formData.disponibilidade}
            onValueChange={(value) => handleSelectChange("disponibilidade", value)}
            required
          >
            <SelectTrigger id="disponibilidade">
              <SelectValue placeholder="Selecione sua disponibilidade" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="dias_uteis">Dias úteis</SelectItem>
              <SelectItem value="finais_semana">Finais de semana</SelectItem>
              <SelectItem value="ambos">Ambos</SelectItem>
              <SelectItem value="sob_demanda">Sob demanda</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid gap-2">
          <Label htmlFor="experiencia">Experiência com Animais</Label>
          <textarea
            id="experiencia"
            name="experiencia"
            value={formData.experiencia}
            onChange={handleChange}
            required
            className="min-h-[100px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            placeholder="Descreva sua experiência com animais"
          />
        </div>
      </div>

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? "Enviando..." : "Cadastrar como Voluntário"}
      </Button>
    </form>
  )
}

function VeterinarioForm({ onSuccess }) {
  const [formData, setFormData] = useState({
    nome: "",
    especialidade: "",
    telefone: "",
    disponibilidade: "",
    localizacao: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      setIsSubmitting(true)
      console.log("Enviando cadastro de veterinário:", formData)
      await veterinariosAPI.cadastrarVeterinario(formData)

      // Chama a função de sucesso para mostrar a mensagem de agradecimento
      onSuccess()
    } catch (error) {
      toast({
        title: "Erro ao realizar cadastro",
        description: error.message || "Ocorreu um erro ao enviar seu cadastro. Tente novamente mais tarde.",
        variant: "destructive",
      })
      console.error("Erro detalhado:", error)
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="nome">Nome Completo</Label>
          <Input id="nome" name="nome" value={formData.nome} onChange={handleChange} required />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="telefone">Telefone</Label>
          <Input
            id="telefone"
            name="telefone"
            value={formData.telefone}
            onChange={handleChange}
            placeholder="(00) 00000-0000"
            required
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="especialidade">Especialidade</Label>
          <Input
            id="especialidade"
            name="especialidade"
            value={formData.especialidade}
            onChange={handleChange}
            required
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="disponibilidade">Disponibilidade</Label>
          <Select
            value={formData.disponibilidade}
            onValueChange={(value) => handleSelectChange("disponibilidade", value)}
            required
          >
            <SelectTrigger id="disponibilidade">
              <SelectValue placeholder="Selecione sua disponibilidade" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="horario_comercial">Horário comercial</SelectItem>
              <SelectItem value="plantao">Plantão</SelectItem>
              <SelectItem value="emergencias">Apenas emergências</SelectItem>
              <SelectItem value="agendamento">Mediante agendamento</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid gap-2">
          <Label htmlFor="localizacao">Localização/Clínica</Label>
          <Input
            id="localizacao"
            name="localizacao"
            value={formData.localizacao}
            onChange={handleChange}
            required
            placeholder="Nome e endereço da clínica ou consultório"
          />
        </div>
      </div>

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? "Enviando..." : "Cadastrar como Veterinário"}
      </Button>
    </form>
  )
}

