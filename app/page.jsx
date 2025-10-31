import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import { Heart, Users, TrendingUp, Shield, Globe, Sparkles } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        <section className="relative py-20 md:py-32 overflow-hidden">
          <div
            className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5"
            aria-hidden="true"
          />
          <div className="container relative px-4">
            <div className="max-w-3xl mx-auto text-center space-y-8">
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-balance">
                Transforme o mundo através do <span className="text-primary">impacto social</span>
              </h1>
              <p className="text-xl text-muted-foreground text-pretty leading-relaxed">
                Conectamos ONGs, voluntários e doadores em uma plataforma única para amplificar o bem e criar mudanças
                reais nas comunidades.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="text-lg">
                  <Link href="/registro">Começar agora</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="text-lg bg-transparent">
                  <Link href="/projetos">Explorar projetos</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24 bg-muted/30">
          <div className="container px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">Como funciona</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty leading-relaxed">
                Uma plataforma completa para conectar quem quer ajudar com quem precisa de apoio
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <Card className="border-2 hover:border-primary transition-colors">
                <CardContent className="pt-6 space-y-4">
                  <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Users className="h-6 w-6 text-primary" aria-hidden="true" />
                  </div>
                  <h3 className="text-xl font-semibold">Para ONGs</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Gerencie projetos, divulgue suas ações, capte recursos e encontre voluntários engajados.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-2 hover:border-secondary transition-colors">
                <CardContent className="pt-6 space-y-4">
                  <div className="h-12 w-12 rounded-lg bg-secondary/10 flex items-center justify-center">
                    <Heart className="h-6 w-6 text-secondary" aria-hidden="true" />
                  </div>
                  <h3 className="text-xl font-semibold">Para Doadores</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Apoie causas que importam, acompanhe o impacto das suas doações e faça a diferença.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-2 hover:border-accent transition-colors">
                <CardContent className="pt-6 space-y-4">
                  <div className="h-12 w-12 rounded-lg bg-accent/10 flex items-center justify-center">
                    <Sparkles className="h-6 w-6 text-accent" aria-hidden="true" />
                  </div>
                  <h3 className="text-xl font-semibold">Para Voluntários</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Encontre oportunidades de voluntariado, conecte-se com ONGs e use suas habilidades para o bem.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24">
          <div className="container px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">Por que escolher o NGO Hub?</h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              <div className="flex flex-col items-center text-center space-y-3 p-6">
                <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center">
                  <Shield className="h-7 w-7 text-primary" aria-hidden="true" />
                </div>
                <h3 className="font-semibold text-lg">Seguro e Confiável</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Verificação de ONGs e transações seguras
                </p>
              </div>

              <div className="flex flex-col items-center text-center space-y-3 p-6">
                <div className="h-14 w-14 rounded-full bg-secondary/10 flex items-center justify-center">
                  <TrendingUp className="h-7 w-7 text-secondary" aria-hidden="true" />
                </div>
                <h3 className="font-semibold text-lg">Impacto Mensurável</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Acompanhe resultados e métricas em tempo real
                </p>
              </div>

              <div className="flex flex-col items-center text-center space-y-3 p-6">
                <div className="h-14 w-14 rounded-full bg-accent/10 flex items-center justify-center">
                  <Globe className="h-7 w-7 text-accent" aria-hidden="true" />
                </div>
                <h3 className="font-semibold text-lg">Alcance Global</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">Conecte-se com causas em todo o Brasil</p>
              </div>

              <div className="flex flex-col items-center text-center space-y-3 p-6">
                <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center">
                  <Users className="h-7 w-7 text-primary" aria-hidden="true" />
                </div>
                <h3 className="font-semibold text-lg">Comunidade Ativa</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">Milhares de pessoas fazendo a diferença</p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24 bg-primary text-primary-foreground">
          <div className="container px-4">
            <div className="max-w-3xl mx-auto text-center space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold text-balance">Pronto para fazer a diferença?</h2>
              <p className="text-lg text-primary-foreground/90 text-pretty leading-relaxed">
                Junte-se a milhares de pessoas e organizações que estão transformando vidas todos os dias.
              </p>
              <Button asChild size="lg" variant="secondary" className="text-lg">
                <Link href="/registro">Criar conta gratuita</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-border py-8 bg-muted/30">
        <div className="container px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <Heart className="h-5 w-5 text-primary fill-primary" aria-hidden="true" />
              <span className="font-semibold">NGO Hub</span>
            </div>
            <p className="text-sm text-muted-foreground">
              2025 NGO Hub. Transformando o mundo através do impacto social.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
