"use client"

import { use, useState, useEffect } from "react"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MapPin, Users, Heart, CheckCircle2, Mail, Globe, Phone } from "lucide-react"
import { getProjects } from "@/lib/projects-data"
import { getPostsByNGO } from "@/lib/feed-data"
import { ProjectCard } from "@/components/project-card"

const MOCK_NGOS = {
  ngo1: {
    id: "ngo1",
    name: "Instituto Alimentar",
    description: "Combatendo a fome e promovendo segurança alimentar em comunidades vulneráveis",
    fullDescription:
      "O Instituto Alimentar é uma organização sem fins lucrativos fundada em 2018 com a missão de combater a fome e promover a segurança alimentar em comunidades vulneráveis. Através de parcerias estratégicas e doações, distribuímos cestas básicas, preparamos refeições nutritivas e oferecemos oficinas de educação nutricional.",
    avatar: "/food-institute-logo.jpg",
    cover: "/food-distribution-community.jpg",
    category: "Alimentação",
    location: "São Paulo, SP",
    followers: 1234,
    following: 45,
    projects: 8,
    verified: true,
    email: "contato@institutoalimentar.org.br",
    phone: "(11) 98765-4321",
    website: "www.institutoalimentar.org.br",
    founded: "2018",
    mission: "Erradicar a fome e promover segurança alimentar para todos",
  },
  ngo2: {
    id: "ngo2",
    name: "TechFuturo",
    description: "Democratizando o acesso à educação tecnológica para jovens de baixa renda",
    fullDescription:
      "TechFuturo é uma ONG dedicada a democratizar o acesso à educação tecnológica. Oferecemos cursos gratuitos de programação, design e marketing digital para jovens de 15 a 25 anos em situação de vulnerabilidade social, preparando-os para o mercado de trabalho digital.",
    avatar: "/tech-education-logo.jpg",
    cover: "/students-learning-technology.png",
    category: "Educação",
    location: "Rio de Janeiro, RJ",
    followers: 2156,
    following: 67,
    projects: 5,
    verified: true,
    email: "contato@techfuturo.org.br",
    phone: "(21) 97654-3210",
    website: "www.techfuturo.org.br",
    founded: "2019",
    mission: "Transformar vidas através da educação tecnológica",
  },
  ngo3: {
    id: "ngo3",
    name: "Verde Vivo",
    description: "Preservação ambiental e reflorestamento da Mata Atlântica",
    fullDescription:
      "Verde Vivo atua na preservação ambiental e recuperação de áreas degradadas da Mata Atlântica. Realizamos plantio de árvores nativas, educação ambiental e envolvemos comunidades locais em ações de conservação. Já plantamos mais de 50 mil árvores.",
    avatar: "/green-forest-logo.jpg",
    cover: "/forest-conservation-nature.jpg",
    category: "Meio Ambiente",
    location: "Curitiba, PR",
    followers: 3421,
    following: 89,
    projects: 12,
    verified: true,
    email: "contato@verdevivo.org.br",
    phone: "(41) 96543-2109",
    website: "www.verdevivo.org.br",
    founded: "2017",
    mission: "Restaurar e preservar a Mata Atlântica para as futuras gerações",
  },
  ngo4: {
    id: "ngo4",
    name: "Patinhas Felizes",
    description: "Resgate e adoção responsável de animais abandonados",
    fullDescription:
      "Patinhas Felizes é um abrigo que resgata, trata e promove a adoção responsável de cães e gatos abandonados. Realizamos campanhas de castração, vacinação e conscientização sobre posse responsável. Já resgatamos mais de 300 animais.",
    avatar: "/paw-print-logo.png",
    cover: "/happy-rescued-dogs-cats.jpg",
    category: "Animais",
    location: "Belo Horizonte, MG",
    followers: 4567,
    following: 123,
    projects: 6,
    verified: true,
    email: "contato@patinhasfelizes.org.br",
    phone: "(31) 95432-1098",
    website: "www.patinhasfelizes.org.br",
    founded: "2016",
    mission: "Garantir uma vida digna para todos os animais",
  },
  ngo5: {
    id: "ngo5",
    name: "Rede de Apoio Feminino",
    description: "Apoio integral a mulheres vítimas de violência doméstica",
    fullDescription:
      "A Rede de Apoio Feminino oferece acolhimento, apoio psicológico, jurídico e social para mulheres em situação de violência doméstica. Trabalhamos na reconstrução da autoestima e autonomia financeira através de cursos profissionalizantes.",
    avatar: "/women-support-logo.jpg",
    cover: "/women-empowerment-support.jpg",
    category: "Direitos Humanos",
    location: "Salvador, BA",
    followers: 2890,
    following: 78,
    projects: 7,
    verified: true,
    email: "contato@redeapoiofeminino.org.br",
    phone: "(71) 94321-0987",
    website: "www.redeapoiofeminino.org.br",
    founded: "2015",
    mission: "Empoderar mulheres e combater a violência de gênero",
  },
  ngo6: {
    id: "ngo6",
    name: "Esporte para Todos",
    description: "Promovendo inclusão social através do esporte para crianças",
    fullDescription:
      "Esporte para Todos oferece aulas gratuitas de diversas modalidades esportivas para crianças de 6 a 14 anos em comunidades carentes. Além do esporte, trabalhamos valores como respeito, disciplina e trabalho em equipe.",
    avatar: "/sports-ball-logo.jpg",
    cover: "/placeholder.svg?height=300&width=800",
    category: "Esporte",
    location: "Recife, PE",
    followers: 1876,
    following: 56,
    projects: 4,
    verified: true,
    email: "contato@esporteparatodos.org.br",
    phone: "(81) 93210-9876",
    website: "www.esporteparatodos.org.br",
    founded: "2020",
    mission: "Transformar vidas através do esporte e educação",
  },
}

export default function NGOProfilePage({ params }) {
  const { id } = use(params)
  const ngo = MOCK_NGOS[id]
  const [isFollowing, setIsFollowing] = useState(false)
  const [projects, setProjects] = useState([])
  const [posts, setPosts] = useState([])

  useEffect(() => {
    if (ngo) {
      const allProjects = getProjects()
      const ngoProjects = allProjects.filter((p) => p.ngoId === ngo.id)
      setProjects(ngoProjects)

      const ngoPosts = getPostsByNGO(ngo.id)
      setPosts(ngoPosts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)))
    }
  }, [ngo])

  if (!ngo) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <p className="text-muted-foreground">ONG não encontrada</p>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 bg-muted/30">
        {/* Cover e Avatar */}
        <div className="relative">
          <div className="h-64 md:h-80 bg-muted overflow-hidden">
            <img src={ngo.cover || "/placeholder.svg"} alt={ngo.name} className="w-full h-full object-cover" />
          </div>

          <div className="container px-4">
            <div className="relative -mt-16 md:-mt-20 mb-6">
              <Avatar className="h-32 w-32 md:h-40 md:w-40 border-4 border-background">
                <AvatarImage src={ngo.avatar || "/placeholder.svg"} alt={ngo.name} />
                <AvatarFallback className="text-4xl">{ngo.name[0]}</AvatarFallback>
              </Avatar>
            </div>

            {/* Info da ONG */}
            <div className="pb-6 border-b">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h1 className="text-2xl md:text-3xl font-bold">{ngo.name}</h1>
                    {ngo.verified && <CheckCircle2 className="h-6 w-6 text-primary" aria-label="Verificado" />}
                  </div>
                  <Badge variant="secondary" className="mb-3">
                    {ngo.category}
                  </Badge>
                  <p className="text-muted-foreground text-pretty leading-relaxed mb-4">{ngo.description}</p>
                </div>

                <div className="flex gap-2">
                  <Button
                    onClick={() => setIsFollowing(!isFollowing)}
                    variant={isFollowing ? "outline" : "default"}
                    className="min-w-[120px]"
                  >
                    {isFollowing ? "Seguindo" : "Seguir"}
                  </Button>
                  <Button variant="outline">
                    <Mail className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="flex flex-wrap gap-6 text-sm mb-4">
                <div className="flex items-center gap-1 text-muted-foreground">
                  <MapPin className="h-4 w-4" aria-hidden="true" />
                  {ngo.location}
                </div>
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4" aria-hidden="true" />
                  <span className="font-semibold">{ngo.followers.toLocaleString("pt-BR")}</span> seguidores
                </div>
                <div className="flex items-center gap-1">
                  <Heart className="h-4 w-4" aria-hidden="true" />
                  <span className="font-semibold">{ngo.projects}</span> projetos
                </div>
              </div>

              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                {ngo.website && (
                  <a
                    href={`https://${ngo.website}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 hover:text-primary transition-colors"
                  >
                    <Globe className="h-4 w-4" />
                    {ngo.website}
                  </a>
                )}
                {ngo.email && (
                  <a
                    href={`mailto:${ngo.email}`}
                    className="flex items-center gap-1 hover:text-primary transition-colors"
                  >
                    <Mail className="h-4 w-4" />
                    {ngo.email}
                  </a>
                )}
                {ngo.phone && (
                  <a href={`tel:${ngo.phone}`} className="flex items-center gap-1 hover:text-primary transition-colors">
                    <Phone className="h-4 w-4" />
                    {ngo.phone}
                  </a>
                )}
              </div>
            </div>

            {/* Tabs */}
            <Tabs defaultValue="posts" className="py-6">
              <TabsList className="w-full justify-start mb-6">
                <TabsTrigger value="posts">Posts</TabsTrigger>
                <TabsTrigger value="projetos">Projetos</TabsTrigger>
                <TabsTrigger value="sobre">Sobre</TabsTrigger>
              </TabsList>

              <TabsContent value="posts" className="space-y-6">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {posts.length > 0 ? (
                    posts.map((post) => (
                      <div
                        key={post.id}
                        className="aspect-square relative overflow-hidden rounded-lg cursor-pointer group"
                      >
                        {post.images && post.images.length > 0 ? (
                          <img
                            src={post.images[0] || "/placeholder.svg"}
                            alt="Post"
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                          />
                        ) : (
                          <div className="w-full h-full bg-muted flex items-center justify-center p-6">
                            <p className="text-sm text-center line-clamp-6">{post.content}</p>
                          </div>
                        )}
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-6 text-white">
                          <span className="flex items-center gap-2">
                            <Heart className="h-5 w-5 fill-current" />
                            {post.likes}
                          </span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <Card className="col-span-full">
                      <CardContent className="py-12 text-center">
                        <p className="text-muted-foreground">Nenhum post ainda</p>
                      </CardContent>
                    </Card>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="projetos" className="space-y-6">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {projects.length > 0 ? (
                    projects.map((project) => <ProjectCard key={project.id} project={project} />)
                  ) : (
                    <Card className="col-span-full">
                      <CardContent className="py-12 text-center">
                        <p className="text-muted-foreground">Nenhum projeto cadastrado</p>
                      </CardContent>
                    </Card>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="sobre">
                <Card>
                  <CardContent className="p-6 space-y-6">
                    <div>
                      <h3 className="font-semibold mb-2">Sobre</h3>
                      <p className="text-muted-foreground text-pretty leading-relaxed">{ngo.fullDescription}</p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold mb-2">Missão</h4>
                        <p className="text-muted-foreground text-pretty leading-relaxed">{ngo.mission}</p>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">Fundação</h4>
                        <p className="text-muted-foreground">{ngo.founded}</p>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-3">Contato</h4>
                      <div className="space-y-2 text-sm">
                        {ngo.email && (
                          <div className="flex items-center gap-2">
                            <Mail className="h-4 w-4 text-muted-foreground" />
                            <a href={`mailto:${ngo.email}`} className="hover:underline">
                              {ngo.email}
                            </a>
                          </div>
                        )}
                        {ngo.phone && (
                          <div className="flex items-center gap-2">
                            <Phone className="h-4 w-4 text-muted-foreground" />
                            <a href={`tel:${ngo.phone}`} className="hover:underline">
                              {ngo.phone}
                            </a>
                          </div>
                        )}
                        {ngo.website && (
                          <div className="flex items-center gap-2">
                            <Globe className="h-4 w-4 text-muted-foreground" />
                            <a
                              href={`https://${ngo.website}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="hover:underline"
                            >
                              {ngo.website}
                            </a>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
    </div>
  )
}
