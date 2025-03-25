"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { voluntariosAPI, veterinariosAPI } from "@/lib/api"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"
import { SiteHeader } from "@/components/site-header"
import { CheckCircle2 } from "lucide-react"

export default function VoluntariosPage() {
  const [showVoluntarioThankYou, setShowVoluntarioThankYou] = useState(false)
  const [showVeterinarioThankYou, setShowVeterinarioThankYou] = useState(false)
  const [activeTab, setActiveTab] = useState("voluntario")

  // Se qualquer uma das mensagens de agradecimento estiver ativa, mostrar a mensagem correspondente
  if (showVoluntarioThankYou) {
    return (
      <>
        <SiteHeader />
        <ThankYouMessage type="voluntário" onReset={() => setShowVoluntarioThankYou(false)} />
      </>
    )
  }

  if (showVeterinarioThankYou) {
    return (
      <>
        <SiteHeader />
        <ThankYouMessage type="veterinário" onReset={() => setShowVeterinarioThankYou(false)} />
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
          veterinário parceiro.
        </p>

        <Tabs defaultValue="voluntario" value={activeTab} onValueChange={setActiveTab} className="max-w-3xl mx-auto">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="voluntario">Voluntário</TabsTrigger>
            <TabsTrigger value="veterinario">Veterinário</TabsTrigger>
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
        </Tabs>
      </div>
    </>
  )
}

function ThankYouMessage({ type, onReset }) {
  const router = useRouter()

  useEffect(() => {
    // Redirecionar para a página inicial após 5 segundos
    const redirectTimer = setTimeout(() => {
      router.push("/")
    }, 5000)

    // Limpar o temporizador se o componente for desmontado
    return () => clearTimeout(redirectTimer)
  }, [router])

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
          Você será redirecionado para a página inicial em alguns segundos...
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button onClick={() => router.push("/")} variant="default">
            Voltar para a página inicial agora
          </Button>
          <Button onClick={onReset} variant="outline">
            Fazer outro cadastro
          </Button>
        </div>
      </div>
    </div>
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

