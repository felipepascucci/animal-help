"use client"

import { useState } from "react"
import { voluntariosAPI, veterinariosAPI } from "@/lib/api"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"
import { SiteHeader } from "@/components/site-header"

export default function VoluntariosPage() {
  return (
    <>
      <SiteHeader />
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-4">Voluntários e Veterinários</h1>
        <p className="text-muted-foreground mb-8">
          Junte-se à nossa rede de pessoas comprometidas com o bem-estar animal. Cadastre-se como voluntário ou
          veterinário parceiro.
        </p>

        <Tabs defaultValue="voluntario" className="max-w-3xl mx-auto">
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
                <VoluntarioForm />
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
                <VeterinarioForm />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </>
  )
}

function VoluntarioForm() {
  const [formData, setFormData] = useState({
    nome: "",
    endereco: "",
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
      await voluntariosAPI.cadastrarVoluntario(formData)

      toast({
        title: "Cadastro realizado com sucesso!",
        description: "Agradecemos seu interesse em ser voluntário. Entraremos em contato em breve.",
      })

      // Limpar formulário
      setFormData({
        nome: "",
        endereco: "",
        disponibilidade: "",
        experiencia: "",
      })
    } catch (error) {
      toast({
        title: "Erro ao realizar cadastro",
        description: error.message || "Ocorreu um erro ao enviar seu cadastro. Tente novamente mais tarde.",
        variant: "destructive",
      })
      console.error(error)
    } finally {
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

function VeterinarioForm() {
  const [formData, setFormData] = useState({
    nome: "",
    especialidade: "",
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
      await veterinariosAPI.cadastrarVeterinario(formData)

      toast({
        title: "Cadastro realizado com sucesso!",
        description: "Agradecemos seu interesse em ser veterinário parceiro. Entraremos em contato em breve.",
      })

      // Limpar formulário
      setFormData({
        nome: "",
        especialidade: "",
        disponibilidade: "",
        localizacao: "",
      })
    } catch (error) {
      toast({
        title: "Erro ao realizar cadastro",
        description: error.message || "Ocorreu um erro ao enviar seu cadastro. Tente novamente mais tarde.",
        variant: "destructive",
      })
      console.error(error)
    } finally {
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

