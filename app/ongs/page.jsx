"use client"

import { Header } from "@/components/header"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { MapPin, Users } from "lucide-react"

const MOCK_NGOS = [
  {
    id: "ngo1",
    name: "Instituto Alimentar",
    description: "Combatendo a fome e promovendo segurança alimentar em comunidades vulneráveis",
    avatar: "/food-institute-logo.jpg",
    cover: "/food-distribution-community.jpg",
    category: "Alimentação",
    location: "São Paulo, SP",
    followers: 1234,
    projects: 8,
    verified: true,
  },
  {
    id: "ngo2",
    name: "TechFuturo",
    description: "Democratizando o acesso à educação tecnológica para jovens de baixa renda",
    avatar: "/tech-education-logo.jpg",
    cover: "/students-learning-technology.png",
    category: "Educação",
    location: "Rio de Janeiro, RJ",
    followers: 2156,
    projects: 5,
    verified: true,
  },
  {
    id: "ngo3",
    name: "Verde Vivo",
    description: "Preservação ambiental e reflorestamento da Mata Atlântica",
    avatar: "/green-forest-logo.jpg",
    cover: "/forest-conservation-nature.jpg",
    category: "Meio Ambiente",
    location: "Curitiba, PR",
    followers: 3421,
    projects: 12,
    verified: true,
  },
  {
    id: "ngo4",
    name: "Patinhas Felizes",
    description: "Resgate e adoção responsável de animais abandonados",
    avatar: "/paw-print-logo.png",
    cover: "/happy-rescued-dogs-cats.jpg",
    category: "Animais",
    location: "Belo Horizonte, MG",
    followers: 4567,
    projects: 6,
    verified: true,
  },
  {
    id: "ngo5",
    name: "Rede de Apoio Feminino",
    description: "Apoio integral a mulheres vítimas de violência doméstica",
    avatar: "/women-support-logo.jpg",
    cover: "/women-empowerment-support.jpg",
    category: "Direitos Humanos",
    location: "Salvador, BA",
    followers: 2890,
    projects: 7,
    verified: true,
  },
  {
    id: "ngo6",
    name: "Esporte para Todos",
    description: "Promovendo inclusão social através do esporte para crianças",
    avatar: "/sports-ball-logo.jpg",
    cover: "/placeholder.svg?height=300&width=800",
    category: "Esporte",
    location: "Recife, PE",
    followers: 1876,
    projects: 4,
    verified: true,
  },
]

export default function NGOsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 py-8 bg-muted/30">
        <div className="container px-4">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">ONGs Parceiras</h1>
            <p className="text-muted-foreground text-pretty leading-relaxed">
              Conheça as organizações que estão transformando vidas e comunidades
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {MOCK_NGOS.map((ngo) => (
              <Card key={ngo.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="h-32 relative overflow-hidden bg-muted">
                  <img src={ngo.cover || "/placeholder.svg"} alt={ngo.name} className="object-cover w-full h-full" />
                </div>

                <CardContent className="p-6 space-y-4">
                  <div className="flex items-start gap-4">
                    <Avatar className="h-16 w-16 border-4 border-background -mt-12">
                      <AvatarImage src={ngo.avatar || "/placeholder.svg"} alt={ngo.name} />
                      <AvatarFallback>{ngo.name[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0 pt-2">
                      <Link href={`/ongs/${ngo.id}`} className="font-semibold text-lg hover:underline block truncate">
                        {ngo.name}
                      </Link>
                      <Badge variant="secondary" className="mt-1">
                        {ngo.category}
                      </Badge>
                    </div>
                  </div>

                  <p className="text-sm text-muted-foreground line-clamp-2 text-pretty leading-relaxed">
                    {ngo.description}
                  </p>

                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" aria-hidden="true" />
                      {ngo.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="h-4 w-4" aria-hidden="true" />
                      {ngo.followers.toLocaleString("pt-BR")}
                    </span>
                  </div>

                  <div className="flex gap-2 pt-2">
                    <Button className="flex-1" asChild>
                      <Link href={`/ongs/${ngo.id}`}>Ver perfil</Link>
                    </Button>
                    <Button variant="outline">Seguir</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
