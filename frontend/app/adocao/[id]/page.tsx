"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import Image from "next/image"
import { animaisAPI } from "@/lib/api"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { ArrowLeft } from "lucide-react"
import { SiteHeader } from "@/components/site-header"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"

export default function DetalhesAnimalPage() {
  const params = useParams()
  const router = useRouter()
  const { toast } = useToast()
  const [animal, setAnimal] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [showAdocaoDialog, setShowAdocaoDialog] = useState(false)

  useEffect(() => {
    async function carregarAnimal() {
      try {
        setIsLoading(true)
        const id = Number(params.id)
        const data = await animaisAPI.obterAnimal(id)
        setAnimal(data)
      } catch (error) {
        toast({
          title: "Erro ao carregar animal",
          description: "Não foi possível carregar os detalhes do animal.",
          variant: "destructive",
        })
        console.error(error)
      } finally {
        setIsLoading(false)
      }
    }

    carregarAnimal()
  }, [params.id, toast])

  if (isLoading) {
    return (
      <>
        <SiteHeader />
        <div className="container mx-auto px-4 py-12">
          <div className="text-center">Carregando detalhes do animal...</div>
        </div>
      </>
    )
  }

  if (!animal) {
    return (
      <>
        <SiteHeader />
        <div className="container mx-auto px-4 py-12">
          <div className="text-center">Animal não encontrado.</div>
          <Button className="mt-4" onClick={() => router.push("/adocao")}>
            <ArrowLeft className="mr-2 h-4 w-4" /> Voltar para lista
          </Button>
        </div>
      </>
    )
  }

  return (
    <>
      <SiteHeader />
      <div className="container mx-auto px-4 py-12">
        <Button variant="outline" className="mb-6" onClick={() => router.push("/adocao")}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Voltar para lista
        </Button>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div className="relative h-[400px] w-full rounded-lg overflow-hidden">
              <Image
                src={animal.fotos || "/placeholder.svg?height=400&width=600"}
                alt={animal.nome}
                fill
                className="object-cover"
              />
            </div>

            {/* Fotos adicionais em uma linha */}
            <div className="grid grid-cols-2 gap-4">
              {animal.fotos2 && (
                <div className="relative h-[180px] w-full rounded-lg overflow-hidden">
                  <Image
                    src={animal.fotos2 || "/placeholder.svg"}
                    alt={`${animal.nome} - foto adicional 1`}
                    fill
                    className="object-cover"
                  />
                </div>
              )}

              {animal.fotos3 && (
                <div className="relative h-[180px] w-full rounded-lg overflow-hidden">
                  <Image
                    src={animal.fotos3 || "/placeholder.svg"}
                    alt={`${animal.nome} - foto adicional 2`}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-3xl">{animal.nome}</CardTitle>
              <CardDescription>
                <div className="flex flex-wrap gap-2 mt-2">
                  <span className="bg-primary/10 text-primary px-2 py-1 rounded-full text-sm">{animal.raca}</span>
                  <span className="bg-primary/10 text-primary px-2 py-1 rounded-full text-sm">
                    {animal.idade} {animal.idade === 1 ? "ano" : "anos"}
                  </span>
                  <span className="bg-primary/10 text-primary px-2 py-1 rounded-full text-sm">
                    Porte {animal.porte}
                  </span>
                </div>
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold text-lg mb-2">Características Físicas</h3>
                <p>{animal.caracteristicas_fisicas}</p>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-2">Comportamento</h3>
                <p>{animal.comportamento}</p>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-2">Histórico de Saúde</h3>
                <p>{animal.historico_saude}</p>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-2">Requisitos para Adoção / Necessidade de Ajuda</h3>
                <p>{animal.requisitos_adoção}</p>
              </div>

              <Button className="w-full mt-6" onClick={() => setShowAdocaoDialog(true)}>
                Quero Adotar / Quero Ajudar
              </Button>
            </CardContent>
          </Card>
        </div>

        <Dialog open={showAdocaoDialog} onOpenChange={setShowAdocaoDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Interesse em adoção ou ajuda</DialogTitle>
              <DialogDescription>Obrigado por se interessar em adotar {animal.nome}!</DialogDescription>
            </DialogHeader>
            <div className="py-4">
              <p className="mb-4">
                Para dar continuidade ao processo de adoção ou auxilio para o animal, entre em contato conosco através dos seguintes canais:
              </p>
              <div className="space-y-2 text-sm">
                <p>
                  <strong>Email:</strong> contato@patasdobem.com
                </p>
                <p>
                  <strong>Telefone:</strong> (11) 97290-2646
                </p>
                <p>
                  <strong>WhatsApp:</strong> (11) 97290-2646
                </p>
              </div>
              <p className="mt-4 text-muted-foreground">
                Informe o nome e ID do animal ({animal.nome} - #{animal.id}) para agilizar o processo.
              </p>
            </div>
            <DialogFooter>
              <Button onClick={() => setShowAdocaoDialog(false)}>Entendi</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </>
  )
}

