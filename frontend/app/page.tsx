"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { Menu, X } from "lucide-react"
import { useState } from "react"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <FeaturesSection />
        <CtaSection />
      </main>
      <Footer />
    </div>
  )
}

function Header() {
  return (
    <header className="border-b bg-background">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="font-bold text-xl flex items-center gap-2">
          <Image src="/logo.png" alt="Logo" width={100} height={100} />
          Patas do Bem
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          <Link href="/adocao" className="text-sm font-medium hover:text-primary">
            Adoção
          </Link>
          <Link href="/denuncias" className="text-sm font-medium hover:text-primary">
            Denúncias
          </Link>
          <Link href="/voluntarios" className="text-sm font-medium hover:text-primary">
            Voluntários
          </Link>
          <Link href="/dicas" className="text-sm font-medium hover:text-primary">
            Dicas
          </Link>
          <Link href="/sobre" className="text-sm font-medium hover:text-primary">
            Sobre
          </Link>
        </nav>

        <MobileMenu />
      </div>
    </header>
  )
}

function MobileMenu() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <>
      <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
        {isMenuOpen ? <X /> : <Menu />}
      </button>

      {isMenuOpen && (
        <div className="md:hidden px-4 py-4 border-t absolute top-16 left-0 right-0 bg-background z-50">
          <nav className="flex flex-col gap-4">
            <Link href="/adocao" className="text-sm font-medium hover:text-primary">
              Adoção
            </Link>
            <Link href="/denuncias" className="text-sm font-medium hover:text-primary">
              Denúncias
            </Link>
            <Link href="/voluntarios" className="text-sm font-medium hover:text-primary">
              Voluntários
            </Link>
            <Link href="/dicas" className="text-sm font-medium hover:text-primary">
              Dicas
            </Link>
            <Link href="/sobre" className="text-sm font-medium hover:text-primary">
              Sobre
            </Link>
          </nav>
        </div>
      )}
    </>
  )
}

function HeroSection() {
  return (
    <section className="py-20 md:py-32">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">Ajude a transformar vidas de animais</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-10">
          Nossa plataforma conecta animais que precisam de um lar, voluntários dispostos a ajudar e profissionais
          veterinários comprometidos com o bem-estar animal.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" className="gap-2" asChild>
            <Link href="/adocao">
              Adotar um animal <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href="/denuncias">Fazer uma denúncia</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}

function FeaturesSection() {
  const features = [
    {
      title: "Adoção Responsável",
      description:
        "Cadastre animais para adoção ou encontre seu novo companheiro entre os diversos perfis disponíveis.",
      link: "/adocao",
    },
    {
      title: "Denúncias de Maus-tratos",
      description: "Denuncie casos de abandono ou maus-tratos de forma rápida e segura, ajudando a salvar vidas.",
      link: "/denuncias",
    },
    {
      title: "Rede de Voluntários",
      description:
        "Junte-se à nossa rede de voluntários e veterinários para ajudar animais em situação de vulnerabilidade.",
      link: "/voluntarios",
    },
    {
      title: "Dicas e Cuidados",
      description:
        "Acesse conteúdo educativo sobre cuidados, alimentação e bem-estar animal para cuidar melhor do seu pet.",
      link: "/dicas",
    },
  ]

  return (
    <section className="py-20 bg-muted/40">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Como podemos ajudar</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Nossa plataforma oferece diversas ferramentas para promover o bem-estar animal e conectar quem precisa de
            ajuda.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-background p-6 rounded-lg border">
              <h3 className="font-bold text-xl mb-2">{feature.title}</h3>
              <p className="text-muted-foreground mb-4">{feature.description}</p>
              <Button variant="outline" asChild>
                <Link href={feature.link}>Saiba mais</Link>
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function CtaSection() {
  return (
    <section className="py-20 md:py-32">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Faça a diferença hoje</h2>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
          Cada ação conta. Seja adotando, denunciando maus-tratos ou se voluntariando, você pode ajudar a transformar a
          vida de um animal.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" asChild>
            <Link href="/voluntarios">Seja um voluntário!</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold text-lg mb-4">Patas do Bem</h3>
            <p className="text-muted-foreground">Promovendo o bem-estar animal e a adoção responsável.</p>
          </div>

          <div>
            <h4 className="font-bold mb-4">Navegação</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/adocao" className="text-muted-foreground hover:text-foreground">
                  Adoção
                </Link>
              </li>
              <li>
                <Link href="/denuncias" className="text-muted-foreground hover:text-foreground">
                  Denúncias
                </Link>
              </li>
              <li>
                <Link href="/voluntarios" className="text-muted-foreground hover:text-foreground">
                  Voluntários
                </Link>
              </li>
              <li>
                <Link href="/dicas" className="text-muted-foreground hover:text-foreground">
                  Dicas
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4">Contato</h4>
            <ul className="space-y-2">
              <li>
                <span className="text-muted-foreground">Email: contato@patasdobem.com</span>
              </li>
              <li>
                <span className="text-muted-foreground">Telefone: (00) 0000-0000</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4">Redes Sociais</h4>
            <div className="flex gap-4">
              <Link href="#" className="text-muted-foreground hover:text-foreground">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
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
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-instagram"
                >
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
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
                <span className="sr-only">Twitter</span>
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t mt-10 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} Patas do Bem. Todos os direitos reservados.
          </p>
          <div className="flex gap-4">
            <Link href="/termos" className="text-sm text-muted-foreground hover:text-foreground">
              Termos
            </Link>
            <Link href="/privacidade" className="text-sm text-muted-foreground hover:text-foreground">
              Privacidade
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

