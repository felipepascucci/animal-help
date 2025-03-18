"use client"

import { useState } from "react"
import { denunciasAPI } from "@/lib/api"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { useToast } from "@/hooks/use-toast"
import { ImageUpload } from "@/components/ui/image-upload"

export default function DenunciasPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-4">Denúncia de Maus-tratos</h1>
      <p className="text-muted-foreground mb-8">
        Use este formulário para denunciar casos de abandono ou maus-tratos a animais. Suas informações são
        confidenciais e ajudarão a salvar vidas.
      </p>

      <Card className="max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle>Formulário de Denúncia</CardTitle>
          <CardDescription>
            Preencha os campos abaixo com o máximo de detalhes possível para que possamos tomar as providências
            necessárias.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <DenunciaForm />
        </CardContent>
      </Card>
    </div>
  )
}

function DenunciaForm() {
  const [formData, setFormData] = useState({
    localizacao: "",
    descricao: "",
    anonimo: true,
  })
  const [fotoFile, setFotoFile] = useState<File | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSwitchChange = (checked) => {
    setFormData((prev) => ({ ...prev, anonimo: checked }))
  }

  const handleImageChange = (file: File | null) => {
    setFotoFile(file)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      setIsSubmitting(true)

      // Usa a nova função que suporta upload de imagens
      await denunciasAPI.cadastrarDenunciaComImagem(formData, fotoFile)

      toast({
        title: "Denúncia enviada com sucesso!",
        description: "Agradecemos sua colaboração. Sua denúncia será analisada o mais breve possível.",
      })

      // Limpar formulário
      setFormData({
        localizacao: "",
        descricao: "",
        anonimo: true,
      })
      setFotoFile(null)
    } catch (error) {
      toast({
        title: "Erro ao enviar denúncia",
        description: error.message || "Ocorreu um erro ao enviar sua denúncia. Tente novamente mais tarde.",
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
          <Label htmlFor="localizacao">Localização</Label>
          <Input
            id="localizacao"
            name="localizacao"
            value={formData.localizacao}
            onChange={handleChange}
            required
            placeholder="Endereço completo ou referências do local"
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="descricao">Descrição da Situação</Label>
          <textarea
            id="descricao"
            name="descricao"
            value={formData.descricao}
            onChange={handleChange}
            required
            className="min-h-[120px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            placeholder="Descreva a situação com o máximo de detalhes possível"
          />
        </div>

        <div className="grid gap-2">
          <Label>Foto da Situação (opcional)</Label>
          <ImageUpload onImageChange={handleImageChange} />
        </div>

        <div className="flex items-center space-x-2">
          <Switch id="anonimo" checked={formData.anonimo} onCheckedChange={handleSwitchChange} />
          <Label htmlFor="anonimo">Fazer denúncia anônima</Label>
        </div>
      </div>

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? "Enviando..." : "Enviar Denúncia"}
      </Button>
    </form>
  )
}

