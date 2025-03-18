"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { dicasAPI } from "@/lib/api"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { TabsList, TabsTrigger, Tabs, TabsContent } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"
import { SiteHeader } from "@/components/site-header"

export default function DicasPage() {
  const [dicas, setDicas] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [categoriaAtiva, setCategoriaAtiva] = useState("todas")
  const { toast } = useToast()

  useEffect(() => {
    async function carregarDicas() {
      try {
        setIsLoading(true)
        const data = await dicasAPI.listarDicas()
        setDicas(data)
      } catch (error) {
        toast({
          title: "Erro ao carregar dicas",
          description: "Não foi possível carregar as dicas. Tente novamente mais tarde.",
          variant: "destructive",
        })
        console.error(error)
      } finally {
        setIsLoading(false)
      }
    }

    carregarDicas()
  }, [toast])

  const categorias = [
    { id: "todas", nome: "Todas" },
    { id: "cuidados_basicos", nome: "Cuidados Básicos" },
    { id: "alimentacao", nome: "Alimentação" },
    { id: "saude", nome: "Saúde" },
    { id: "comportamento", nome: "Comportamento" },
    { id: "adocao", nome: "Adoção" },
  ]

  const dicasFiltradas = categoriaAtiva === "todas" ? dicas : dicas.filter((dica) => dica.categoria === categoriaAtiva)

  return (
    <>
      <SiteHeader />
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-4">Dicas e Cuidados</h1>
        <p className="text-muted-foreground mb-8">
          Aprenda mais sobre como cuidar adequadamente dos animais e promover seu bem-estar.
        </p>

        <Tabs value={categoriaAtiva} onValueChange={setCategoriaAtiva} className="mb-8">
          <TabsList className="flex flex-wrap">
            {categorias.map((categoria) => (
              <TabsTrigger key={categoria.id} value={categoria.id}>
                {categoria.nome}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value={categoriaAtiva}>
            {isLoading ? (
              <div className="text-center py-12">Carregando dicas...</div>
            ) : dicasFiltradas.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {dicasFiltradas.map((dica) => (
                  <Card key={dica.id}>
                    <CardHeader className="p-0">
                      <div className="relative h-48 w-full">
                        <Image
                          src={dica.imagem_url || "/placeholder.svg?height=200&width=300"}
                          alt={dica.titulo}
                          fill
                          className="object-cover rounded-t-lg"
                        />
                      </div>
                    </CardHeader>
                    <CardContent className="p-6">
                      <CardTitle className="mb-2">{dica.titulo}</CardTitle>
                      <CardDescription>
                        <span className="inline-block bg-muted text-muted-foreground text-xs px-2 py-1 rounded mb-2">
                          {dica.categoria}
                        </span>
                      </CardDescription>
                      <p className="mt-2 line-clamp-3">{dica.resumo}</p>
                    </CardContent>
                    <CardFooter>
                      <Button asChild className="w-full">
                        <Link href={`/dicas/${dica.id}`}>Ler mais</Link>
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground">Nenhuma dica encontrada nesta categoria.</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </>
  )
}

