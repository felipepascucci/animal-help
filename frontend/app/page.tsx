"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight, Heart, AlertTriangle, Users, BookOpen, PawPrint, Menu, X } from "lucide-react"
import { useState } from "react"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <StatisticsSection />
        <FeaturesSection />
        <TestimonialsSection />
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
    <section className="py-20 md:py-32 relative overflow-hidden">
      {/* Background image with overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/placeholder.svg?height=1080&width=1920"
          alt="Pets background"
          fill
          className="object-cover opacity-15"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/90 to-background/70"></div>
      </div>

      <div className="container mx-auto px-4 text-center relative z-10">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="text-left">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">Ajude a transformar vidas de animais</h1>
            <p className="text-xl text-muted-foreground mb-10">
              Nossa plataforma conecta animais que precisam de um lar, voluntários dispostos a ajudar e profissionais
              veterinários comprometidos com o bem-estar animal.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
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
          <div className="hidden md:block relative h-[500px] rounded-lg overflow-hidden shadow-xl">
            <Image
              src="/pag_inicial.jpg?height=600&width=600"
              alt="Cachorro feliz"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  )
}

function StatisticsSection() {
  const stats = [
    { value: "250+", label: "Animais adotados", icon: <Heart className="h-8 w-8 text-primary" /> },
    { value: "120+", label: "Denúncias atendidas", icon: <AlertTriangle className="h-8 w-8 text-primary" /> },
    { value: "50+", label: "Voluntários ativos", icon: <Users className="h-8 w-8 text-primary" /> },
    { value: "30+", label: "Dicas publicadas", icon: <BookOpen className="h-8 w-8 text-primary" /> },
  ]

  return (
    <section className="py-12 bg-primary/5">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              {stat.icon}
              <h3 className="text-3xl font-bold mt-4">{stat.value}</h3>
              <p className="text-muted-foreground">{stat.label}</p>
            </div>
          ))}
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
      icon: <Heart className="h-10 w-10 text-primary mb-4" />,
      image: "/adocao.png?height=300&width=400",
    },
    {
      title: "Denúncias de Maus-tratos",
      description: "Denuncie casos de abandono ou maus-tratos de forma rápida e segura, ajudando a salvar vidas.",
      link: "/denuncias",
      icon: <AlertTriangle className="h-10 w-10 text-primary mb-4" />,
      image: "/denuncia.png?height=300&width=400",
    },
    {
      title: "Rede de Voluntários",
      description:
        "Junte-se à nossa rede de voluntários e veterinários para ajudar animais em situação de vulnerabilidade.",
      link: "/voluntarios",
      icon: <Users className="h-10 w-10 text-primary mb-4" />,
      image: "/voluntario.png?height=300&width=400",
    },
    {
      title: "Dicas e Cuidados",
      description:
        "Acesse conteúdo educativo sobre cuidados, alimentação e bem-estar animal para cuidar melhor do seu pet.",
      link: "/dicas",
      icon: <BookOpen className="h-10 w-10 text-primary mb-4" />,
      image: "/dicas.png?height=300&width=400",
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
            <div key={index} className="bg-background p-6 rounded-lg border hover:shadow-md transition-shadow">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="relative w-full md:w-1/3 h-40 rounded-md overflow-hidden">
                  <Image src={feature.image || "/placeholder.svg"} alt={feature.title} fill className="object-cover" />
                </div>
                <div className="md:w-2/3">
                  <div className="flex flex-col items-start">
                    {feature.icon}
                    <h3 className="font-bold text-xl mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground mb-4">{feature.description}</p>
                    <Button variant="outline" asChild className="mt-auto">
                      <Link href={feature.link}>Saiba mais</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function TestimonialsSection() {
  const testimonials = [
    {
      quote:
        "Adotei meu cachorro através do Patas do Bem e foi a melhor decisão que já tomei. O processo foi simples e transparente.",
      author: "Maria Silva",
      role: "Adotante",
      avatar: "/pessoa1.png?height=100&width=100",
    },
    {
      quote:
        "Como veterinário parceiro, posso dizer que o trabalho do Patas do Bem é essencial para o bem-estar dos animais da nossa cidade.",
      author: "Dr. Carlos Mendes",
      role: "Veterinário",
      avatar: "/pessoa2.png?height=100&width=100",
    },
    {
      quote: "Ser voluntária me trouxe uma nova perspectiva de vida. Ajudar os animais é uma experiência incrível.",
      author: "Ana Santos",
      role: "Voluntária",
      avatar: "/pessoa3.png?height=100&width=100",
    },
  ]

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">O que dizem sobre nós</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Conheça as histórias de quem já faz parte da nossa comunidade.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-muted/30 p-6 rounded-lg border">
              <div className="flex flex-col h-full">
                <p className="italic mb-6">"{testimonial.quote}"</p>
                <div className="mt-auto flex items-center">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden mr-4">
                    <Image
                      src={testimonial.avatar || "/placeholder.svg"}
                      alt={testimonial.author}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-semibold">{testimonial.author}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function CtaSection() {
  return (
    <section className="py-20 md:py-32 relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src="/placeholder.svg?height=800&width=1600"
          alt="Pets background"
          fill
          className="object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/90 to-background/70"></div>
      </div>

      <div className="container mx-auto px-4 text-center relative z-10">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Faça a diferença hoje</h2>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
          Cada ação conta. Seja adotando, denunciando maus-tratos ou se voluntariando, você pode ajudar a transformar a
          vida de um animal.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" asChild>
            <Link href="/voluntarios">Seja um voluntario agora!</Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href="/adocao">Ver animais disponíveis</Link>
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
            <div className="flex items-center gap-2 mb-4">
              <PawPrint className="h-6 w-6 text-primary" />
              <h3 className="font-bold text-lg">Patas do Bem</h3>
            </div>
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
                <span className="text-muted-foreground">Telefone: (11) 97290-2646</span>
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
        </div>
      </div>
    </footer>
  )
}

