"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { useAuth } from "@/lib/auth-context"
import { getProjectById, likeProject, hasUserLiked, addComment, getComments } from "@/lib/projects-data"
import { Heart, MessageCircle, Share2, MapPin, Users, TrendingUp, Calendar, ArrowLeft } from "lucide-react"

export default function ProjectDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { user } = useAuth()
  const [project, setProject] = useState(null)
  const [liked, setLiked] = useState(false)
  const [comments, setComments] = useState([])
  const [commentText, setCommentText] = useState("")

  useEffect(() => {
    const projectData = getProjectById(params.id)
    if (!projectData) {
      router.push("/projetos")
      return
    }
    setProject(projectData)
    setLiked(user ? hasUserLiked(params.id, user.id) : false)
    setComments(getComments(params.id))
  }, [params.id, user, router])

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <p className="text-muted-foreground">Carregando...</p>
        </main>
      </div>
    )
  }

  const handleLike = () => {
    if (!user) {
      router.push("/login")
      return
    }

    const updatedProject = likeProject(project.id, user.id)
    if (updatedProject) {
      setProject(updatedProject)
      setLiked(!liked)
    }
  }

  const handleComment = (e) => {
    e.preventDefault()
    if (!user) {
      router.push("/login")
      return
    }

    if (commentText.trim()) {
      const newComment = addComment(project.id, user.id, user.name, commentText)
      setComments([...comments, newComment])
      setCommentText("")
      setProject({ ...project, comments: project.comments + 1 })
    }
  }

  const donationProgress = (project.donationsReceived / project.donationGoal) * 100

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 py-8 bg-muted/30">
        <div className="container px-4 max-w-6xl">
          <Button variant="ghost" className="mb-6" asChild>
            <Link href="/projetos">
              <ArrowLeft className="h-4 w-4 mr-2" aria-hidden="true" />
              Voltar para projetos
            </Link>
          </Button>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <div className="aspect-video relative overflow-hidden bg-muted">
                  <img
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    className="object-cover w-full h-full"
                  />
                </div>

                <CardContent className="p-6 space-y-6">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center gap-2 flex-wrap">
                        <Badge variant="secondary">{project.category}</Badge>
                        <span className="text-sm text-muted-foreground flex items-center gap-1">
                          <MapPin className="h-3 w-3" aria-hidden="true" />
                          {project.location}
                        </span>
                      </div>
                      <h1 className="text-3xl font-bold text-balance">{project.title}</h1>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 pb-4 border-b">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={project.ngoAvatar || "/placeholder.svg"} alt={project.ngoName} />
                      <AvatarFallback>{project.ngoName[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <Link href={`/ongs/${project.ngoId}`} className="font-semibold hover:underline block">
                        {project.ngoName}
                      </Link>
                      <p className="text-sm text-muted-foreground">
                        Publicado em {new Date(project.createdAt).toLocaleDateString("pt-BR")}
                      </p>
                    </div>
                    <Button variant="outline">Seguir</Button>
                  </div>

                  <div className="flex items-center gap-6 py-4 border-b">
                    <Button
                      variant="ghost"
                      size="lg"
                      className={`gap-2 ${liked ? "text-red-500" : ""}`}
                      onClick={handleLike}
                    >
                      <Heart className={`h-6 w-6 ${liked ? "fill-current" : ""}`} aria-hidden="true" />
                      <span className="font-semibold">{project.likes}</span>
                    </Button>

                    <Button variant="ghost" size="lg" className="gap-2" asChild>
                      <a href="#comentarios">
                        <MessageCircle className="h-6 w-6" aria-hidden="true" />
                        <span className="font-semibold">{project.comments}</span>
                      </a>
                    </Button>

                    <Button variant="ghost" size="lg" className="gap-2">
                      <Share2 className="h-6 w-6" aria-hidden="true" />
                      <span className="font-semibold">{project.shares}</span>
                    </Button>
                  </div>

                  <div className="prose prose-sm max-w-none">
                    <h2 className="text-xl font-semibold mb-3">Sobre o projeto</h2>
                    <p className="text-muted-foreground leading-relaxed">{project.fullDescription}</p>
                  </div>

                  <div>
                    <h2 className="text-xl font-semibold mb-4">Métricas de impacto</h2>
                    <div className="grid sm:grid-cols-3 gap-4">
                      {Object.entries(project.impactMetrics).map(([key, value]) => (
                        <Card key={key}>
                          <CardContent className="pt-6 text-center">
                            <p className="text-3xl font-bold text-primary">{value.toLocaleString("pt-BR")}</p>
                            <p className="text-sm text-muted-foreground mt-1 capitalize">
                              {key.replace(/([A-Z])/g, " $1").toLowerCase()}
                            </p>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h2 className="text-xl font-semibold mb-3">Tags</h2>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <Badge key={tag} variant="outline">
                          #{tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card id="comentarios">
                <CardHeader>
                  <CardTitle>Comentários ({comments.length})</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {user ? (
                    <form onSubmit={handleComment} className="flex gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                        <AvatarFallback>{user.name[0]}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 flex gap-2">
                        <Input
                          placeholder="Adicione um comentário..."
                          value={commentText}
                          onChange={(e) => setCommentText(e.target.value)}
                          aria-label="Escrever comentário"
                        />
                        <Button type="submit" disabled={!commentText.trim()}>
                          Enviar
                        </Button>
                      </div>
                    </form>
                  ) : (
                    <div className="text-center py-4 bg-muted rounded-lg">
                      <p className="text-muted-foreground mb-3">Faça login para comentar</p>
                      <Button asChild size="sm">
                        <Link href="/login">Entrar</Link>
                      </Button>
                    </div>
                  )}

                  <Separator />

                  <div className="space-y-4">
                    {comments.length > 0 ? (
                      comments.map((comment) => (
                        <div key={comment.id} className="flex gap-3">
                          <Avatar className="h-10 w-10">
                            <AvatarFallback>{comment.userName[0]}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1 space-y-1">
                            <div className="flex items-center gap-2">
                              <span className="font-semibold text-sm">{comment.userName}</span>
                              <span className="text-xs text-muted-foreground">
                                {new Date(comment.createdAt).toLocaleDateString("pt-BR")}
                              </span>
                            </div>
                            <p className="text-sm text-muted-foreground leading-relaxed">{comment.text}</p>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-center text-muted-foreground py-8">
                        Nenhum comentário ainda. Seja o primeiro a comentar!
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Apoie este projeto</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Arrecadado</span>
                      <span className="font-semibold">R$ {project.donationsReceived.toLocaleString("pt-BR")}</span>
                    </div>
                    <Progress value={donationProgress} className="h-3" />
                    <p className="text-sm text-muted-foreground">
                      Meta: R$ {project.donationGoal.toLocaleString("pt-BR")}
                    </p>
                  </div>

                  <Separator />

                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-sm">
                      <Users className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
                      <span>
                        <strong>{project.volunteers}</strong> voluntários ativos
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <TrendingUp className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
                      <span>
                        <strong>{Math.round(donationProgress)}%</strong> da meta alcançada
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
                      <span>Ativo desde {new Date(project.createdAt).toLocaleDateString("pt-BR")}</span>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <Button className="w-full" size="lg" asChild>
                      <Link href={`/doar/${project.id}`}>Fazer doação</Link>
                    </Button>
                    <Button variant="outline" className="w-full bg-transparent">
                      Ser voluntário
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Compartilhar</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    Copiar link
                  </Button>
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    Compartilhar no WhatsApp
                  </Button>
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    Compartilhar no Facebook
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
