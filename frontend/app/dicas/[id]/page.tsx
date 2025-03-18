"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import Image from "next/image"
import { dicasAPI } from "@/lib/api"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { ArrowLeft } from "lucide-react"
import { SiteHeader } from "@/components/site-header"

export default function DetalhesDicaPage() {
  const params = useParams()
  const router = useRouter()
  const { toast } = useToast()
  const [dica, setDica] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function carregarDica() {
      try {
        setIsLoading(true)
        const id = Number(params.id)
        const data = await dicasAPI.obterDica(id)
        setDica(data)
      } catch (error) {
        toast({
          title: "Erro ao carregar dica",
          description: "Não foi possível carregar os detalhes da dica.",
          variant: "destructive",
        })
        console.error(error)
      } finally {
        setIsLoading(false)
      }
    }

    carregarDica()
  }, [params.id, toast])

  if (isLoading) {
    return (
      <>
        <SiteHeader />
        <div className="container mx-auto px-4 py-12">
          <div className="text-center">Carregando detalhes da dica...</div>
        </div>
      </>
    )
  }

  if (!dica) {
    return (
      <>
        <SiteHeader />
        <div className="container mx-auto px-4 py-12">
          <div className="text-center">Dica não encontrada.</div>
          <Button className="mt-4" onClick={() => router.push("/dicas")}>
            <ArrowLeft className="mr-2 h-4 w-4" /> Voltar para lista
          </Button>
        </div>
      </>
    )
  }

  // Conteúdo padrão para complementar o conteúdo da dica
  const conteudoCompleto =
    dica.conteudo +
    `

É importante lembrar que cada animal tem suas particularidades e necessidades específicas. 
Consulte sempre um médico veterinário para obter orientações personalizadas para o seu pet.

Cuidar adequadamente do seu animal de estimação não apenas melhora a qualidade de vida dele, 
mas também fortalece o vínculo entre vocês. Dedique tempo e atenção ao seu pet, e ele 
retribuirá com amor e companheirismo incondicionais.

Lembre-se: adotar um animal é um compromisso para toda a vida dele. Seja responsável!
`

  return (
    <>
      <SiteHeader />
      <div className="container mx-auto px-4 py-12">
        <Button variant="outline" className="mb-6" onClick={() => router.push("/dicas")}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Voltar para lista
        </Button>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-1">
            <div className="relative h-[300px] w-full rounded-lg overflow-hidden mb-4">
              <Image
                src={dica.imagem_url || "/placeholder.svg?height=300&width=400"}
                alt={dica.titulo}
                fill
                className="object-cover"
              />
            </div>

            <Card className="mb-4">
              <CardHeader>
                <CardTitle className="text-lg">Categoria</CardTitle>
              </CardHeader>
              <CardContent>
                <span className="bg-primary/10 text-primary px-3 py-1 rounded-full">{dica.categoria}</span>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Compartilhar</CardTitle>
              </CardHeader>
              <CardContent className="flex gap-4">
                <Button variant="outline" size="icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-facebook"
                  >
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                  </svg>
                </Button>
                <Button variant="outline" size="icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-twitter"
                  >
                    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                  </svg>
                </Button>
                <Button variant="outline" size="icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-mail"
                  >
                    <rect width="20" height="16" x="2" y="4" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-3xl">{dica.titulo}</CardTitle>
                <CardDescription className="text-lg mt-2">{dica.resumo}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="prose max-w-none">
                  {conteudoCompleto.split("\n").map((paragraph, index) => (
                    <p key={index} className={paragraph.trim() === "" ? "my-4" : "mb-4"}>
                      {paragraph}
                    </p>
                  ))}
                </div>

                <div className="mt-8 p-4 bg-muted rounded-lg">
                  <h3 className="font-semibold text-lg mb-2">Dicas relacionadas</h3>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Como escolher a alimentação ideal para seu pet</li>
                    <li>Exercícios recomendados para animais de estimação</li>
                    <li>Sinais de que seu pet precisa de atenção veterinária</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  )
}

