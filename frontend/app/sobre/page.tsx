"use client"

import Image from "next/image"
import { SiteHeader } from "@/components/site-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { PawPrint, Heart, Users, AlertTriangle, BookOpen } from "lucide-react"
import Link from "next/link"

export default function SobrePage() {
  return (
    <>
      <SiteHeader />
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-4">Sobre o Patas do Bem</h1>
        <p className="text-muted-foreground mb-8 text-lg">
          Conheça nossa história, missão e as pessoas por trás do nosso trabalho em prol do bem-estar animal.
        </p>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="relative h-[400px] rounded-lg overflow-hidden">
            <Image
              src="/foto_sobre.png?height=800&width=600"
              alt="Equipe Patas do Bem com animais resgatados"
              fill
              className="object-cover"
            />
          </div>
          <div className="flex flex-col justify-center">
            <h2 className="text-2xl font-bold mb-4">Nossa História</h2>
            <p className="mb-4">
              O Patas do Bem nasceu em 2020, fruto da união de um grupo de amantes de animais preocupados com o crescente
              número de casos de abandono e maus-tratos na região. O que começou como um pequeno projeto de resgate e
              adoção, rapidamente se expandiu para uma plataforma completa de apoio à causa animal.
            </p>
            <p>
              Ao longo dos anos, desenvolvemos parcerias com clínicas veterinárias, abrigos e profissionais dedicados,
              criando uma rede de proteção para animais em situação de vulnerabilidade. Hoje, o Patas do Bem é reconhecido
              como uma referência no cuidado e proteção animal, tendo ajudado centenas de pets a encontrarem lares
              amorosos e responsáveis.
            </p>
          </div>
        </div>

        <MissaoVisaoValores />

        <Impacto />

        <FAQ />

        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold mb-6">Faça Parte Dessa História</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Existem diversas formas de contribuir com nossa causa. Seja adotando, denunciando maus-tratos,
            voluntariando-se ou compartilhando conhecimento, cada ação faz diferença.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button variant="outline" asChild>
              <Link href="/voluntarios">Seja Voluntário</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/adocao">Conheça os Animais</Link>
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}

function MissaoVisaoValores() {
  const items = [
    {
      icon: <Heart className="h-10 w-10 text-primary" />,
      title: "Missão",
      description:
        "Promover o bem-estar animal através da conscientização, educação e ações práticas que garantam uma vida digna para todos os animais, especialmente os que se encontram em situação de vulnerabilidade.",
    },
    {
      icon: <PawPrint className="h-10 w-10 text-primary" />,
      title: "Visão",
      description:
        "Ser reconhecida como uma organização de referência na proteção e defesa dos direitos dos animais, contribuindo para a construção de uma sociedade mais consciente e responsável em relação à causa animal.",
    },
    {
      icon: <Users className="h-10 w-10 text-primary" />,
      title: "Valores",
      description:
        "Respeito à vida animal, responsabilidade social, transparência em nossas ações, comprometimento com a causa, trabalho em equipe e educação como ferramenta de transformação.",
    },
  ]

  return (
    <div className="mb-16">
      <h2 className="text-2xl font-bold mb-8 text-center">Missão, Visão e Valores</h2>
      <div className="grid md:grid-cols-3 gap-6">
        {items.map((item, index) => (
          <Card key={index} className="text-center">
            <CardHeader>
              <div className="flex justify-center mb-4">{item.icon}</div>
              <CardTitle>{item.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{item.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

function Impacto() {
  const estatisticas = [
    {
      numero: "250+",
      descricao: "Animais adotados",
      icone: <Heart className="h-8 w-8 text-primary" />,
    },
    {
      numero: "120+",
      descricao: "Denúncias atendidas",
      icone: <AlertTriangle className="h-8 w-8 text-primary" />,
    },
    {
      numero: "50+",
      descricao: "Voluntários ativos",
      icone: <Users className="h-8 w-8 text-primary" />,
    },
    {
      numero: "30+",
      descricao: "Dicas publicadas",
      icone: <BookOpen className="h-8 w-8 text-primary" />,
    },
  ]

  return (
    <div className="mb-16 bg-muted/30 py-12 px-6 rounded-lg">
      <h2 className="text-2xl font-bold mb-8 text-center">Nosso Impacto</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        {estatisticas.map((stat, index) => (
          <div key={index} className="flex flex-col items-center text-center">
            {stat.icone}
            <h3 className="text-3xl font-bold mt-4">{stat.numero}</h3>
            <p className="text-muted-foreground">{stat.descricao}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

function FAQ() {
  const perguntas = [
    {
      pergunta: "Como posso adotar um animal pelo Patas do Bem?",
      resposta:
        "Para adotar um animal, você deve se cadastrar em nossa plataforma, navegar pelos perfis de animais disponíveis, escolher o que mais combina com seu perfil e preencher o formulário de adoção. Nossa equipe entrará em contato para agendar uma entrevista e visita, se necessário.",
    },
    {
      pergunta: "Quais são os requisitos para adoção?",
      resposta:
        "Os requisitos básicos incluem ser maior de 18 anos, passar por uma entrevista de avaliação, ter condições de oferecer um lar seguro e adequado ao animal, e assinar um termo de responsabilidade. Alguns animais podem ter requisitos específicos adicionais.",
    },
    {
      pergunta: "Como posso denunciar casos de maus-tratos?",
      resposta:
        "Você pode fazer denúncias através da nossa plataforma, na seção 'Denúncias'. Preencha o formulário com o máximo de detalhes possível e, se possível, anexe fotos. Você pode optar por fazer a denúncia de forma anônima.",
    },
    {
      pergunta: "Quero ser voluntário. Como faço?",
      resposta:
        "Para se tornar voluntário, acesse a seção 'Voluntários' em nosso site e preencha o formulário de cadastro. Nossa equipe entrará em contato para explicar as diferentes áreas de atuação e verificar onde seu perfil melhor se encaixa.",
    },
    {
      pergunta: "O Patas do Bem oferece serviços veterinários gratuitos?",
      resposta:
        "O Patas do Bem não é uma clínica veterinária, mas temos parcerias com veterinários que oferecem descontos e, em alguns casos, atendimentos gratuitos para animais resgatados. Entre em contato conosco para mais informações.",
    },
    {
      pergunta: "Como posso contribuir financeiramente com o Patas do Bem?",
      resposta:
        "Você pode fazer doações através de nossa página de doações, tornando-se um apoiador mensal ou fazendo contribuições pontuais. Também realizamos campanhas específicas para casos emergenciais.",
    },
  ]

  return (
    <div className="mb-16">
      <h2 className="text-2xl font-bold mb-8 text-center">Perguntas Frequentes</h2>
      <Accordion type="single" collapsible className="w-full">
        {perguntas.map((item, index) => (
          <AccordionItem key={index} value={`item-${index}`}>
            <AccordionTrigger className="text-left">{item.pergunta}</AccordionTrigger>
            <AccordionContent>
              <p>{item.resposta}</p>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  )
}

