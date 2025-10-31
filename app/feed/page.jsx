"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { FeedPostCard } from "@/components/feed-post-card"
import { getFeedPosts } from "@/lib/feed-data"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const MOCK_NGOS = [
  {
    id: "ngo1",
    name: "Instituto Alimentar",
    avatar: "/food-institute-logo.jpg",
    category: "Alimentação",
  },
  {
    id: "ngo2",
    name: "TechFuturo",
    avatar: "/tech-education-logo.jpg",
    category: "Educação",
  },
  {
    id: "ngo3",
    name: "Verde Vivo",
    avatar: "/green-forest-logo.jpg",
    category: "Meio Ambiente",
  },
  {
    id: "ngo4",
    name: "Patinhas Felizes",
    avatar: "/paw-print-logo.png",
    category: "Animais",
  },
  {
    id: "ngo5",
    name: "Rede de Apoio Feminino",
    avatar: "/women-support-logo.jpg",
    category: "Direitos Humanos",
  },
  {
    id: "ngo6",
    name: "Esporte para Todos",
    avatar: "/sports-ball-logo.jpg",
    category: "Esporte",
  },
]

export default function FeedPage() {
  const [posts, setPosts] = useState([])
  const [updateTrigger, setUpdateTrigger] = useState(0)

  useEffect(() => {
    const feedPosts = getFeedPosts()
    setPosts(feedPosts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)))
  }, [updateTrigger])

  const handleUpdate = () => {
    setUpdateTrigger((prev) => prev + 1)
  }

  return (
    <div className="min-h-screen flex flex-col bg-muted/30">
      <Header />

      <main className="flex-1 py-6">
        <div className="container px-4">
          <div className="grid lg:grid-cols-[1fr_350px] gap-8 max-w-6xl mx-auto">
            {/* Feed principal */}
            <div className="space-y-6">
              <Tabs defaultValue="todos" className="w-full">
                <TabsList className="w-full justify-start mb-6">
                  <TabsTrigger value="todos">Todos</TabsTrigger>
                  <TabsTrigger value="seguindo">Seguindo</TabsTrigger>
                </TabsList>

                <TabsContent value="todos" className="space-y-6">
                  {posts.map((post) => (
                    <FeedPostCard key={post.id} post={post} onUpdate={handleUpdate} />
                  ))}
                </TabsContent>

                <TabsContent value="seguindo" className="space-y-6">
                  <Card>
                    <CardContent className="py-12 text-center">
                      <p className="text-muted-foreground mb-4">Você ainda não segue nenhuma ONG</p>
                      <Button asChild>
                        <Link href="/ongs">Descobrir ONGs</Link>
                      </Button>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>

            {/* Sidebar */}
            <aside className="hidden lg:block space-y-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-4">ONGs Sugeridas</h3>
                  <div className="space-y-4">
                    {MOCK_NGOS.slice(0, 5).map((ngo) => (
                      <div key={ngo.id} className="flex items-center gap-3">
                        <Link href={`/ongs/${ngo.id}`}>
                          <Avatar className="h-10 w-10 cursor-pointer hover:opacity-80 transition-opacity">
                            <AvatarImage src={ngo.avatar || "/placeholder.svg"} alt={ngo.name} />
                            <AvatarFallback>{ngo.name[0]}</AvatarFallback>
                          </Avatar>
                        </Link>
                        <div className="flex-1 min-w-0">
                          <Link href={`/ongs/${ngo.id}`} className="font-medium text-sm hover:underline block truncate">
                            {ngo.name}
                          </Link>
                          <p className="text-xs text-muted-foreground truncate">{ngo.category}</p>
                        </div>
                        <Button size="sm" variant="outline">
                          Seguir
                        </Button>
                      </div>
                    ))}
                  </div>
                  <Button variant="link" className="w-full mt-4" asChild>
                    <Link href="/ongs">Ver todas</Link>
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-2">Sobre o NGO Hub</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed mb-4">
                    Plataforma que conecta ONGs, voluntários e doadores para transformar vidas e comunidades.
                  </p>
                  <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
                    <Link href="#" className="hover:underline">
                      Sobre
                    </Link>
                    <span>·</span>
                    <Link href="#" className="hover:underline">
                      Ajuda
                    </Link>
                    <span>·</span>
                    <Link href="#" className="hover:underline">
                      Termos
                    </Link>
                    <span>·</span>
                    <Link href="#" className="hover:underline">
                      Privacidade
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </aside>
          </div>
        </div>
      </main>
    </div>
  )
}
