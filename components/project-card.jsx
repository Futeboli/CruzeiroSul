"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Heart, MessageCircle, Share2, MapPin } from "lucide-react"
import { useAuth } from "@/lib/auth-context"
import { likeProject, hasUserLiked } from "@/lib/projects-data"

export function ProjectCard({ project }) {
  const { user } = useAuth()
  const [liked, setLiked] = useState(user ? hasUserLiked(project.id, user.id) : false)
  const [likesCount, setLikesCount] = useState(project.likes)

  const handleLike = (e) => {
    e.preventDefault()
    if (!user) {
      window.location.href = "/login"
      return
    }

    const updatedProject = likeProject(project.id, user.id)
    if (updatedProject) {
      setLiked(!liked)
      setLikesCount(updatedProject.likes)
    }
  }

  const donationProgress = (project.donationsReceived / project.donationGoal) * 100

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <Link href={`/projetos/${project.id}`}>
        <div className="aspect-square relative overflow-hidden bg-muted">
          <img
            src={project.image || "/placeholder.svg"}
            alt={project.title}
            className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
          />
        </div>
      </Link>

      <CardContent className="p-4 space-y-3">
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10">
            <AvatarImage src={project.ngoAvatar || "/placeholder.svg"} alt={project.ngoName} />
            <AvatarFallback>{project.ngoName[0]}</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <Link href={`/ongs/${project.ngoId}`} className="font-semibold hover:underline block truncate">
              {project.ngoName}
            </Link>
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <MapPin className="h-3 w-3" aria-hidden="true" />
              {project.location}
            </p>
          </div>
          <Badge variant="secondary">{project.category}</Badge>
        </div>

        <Link href={`/projetos/${project.id}`}>
          <h3 className="font-semibold text-lg leading-tight hover:text-primary transition-colors text-balance">
            {project.title}
          </h3>
          <p className="text-sm text-muted-foreground mt-1 line-clamp-2 text-pretty leading-relaxed">
            {project.description}
          </p>
        </Link>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Arrecadado</span>
            <span className="font-semibold">
              R$ {project.donationsReceived.toLocaleString("pt-BR")} de R${" "}
              {project.donationGoal.toLocaleString("pt-BR")}
            </span>
          </div>
          <Progress value={donationProgress} className="h-2" />
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0 flex items-center justify-between border-t">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            className={`gap-2 ${liked ? "text-red-500" : ""}`}
            onClick={handleLike}
            aria-label={liked ? "Remover curtida" : "Curtir projeto"}
          >
            <Heart className={`h-5 w-5 ${liked ? "fill-current" : ""}`} aria-hidden="true" />
            <span>{likesCount}</span>
          </Button>

          <Button variant="ghost" size="sm" className="gap-2" asChild>
            <Link href={`/projetos/${project.id}#comentarios`} aria-label="Ver comentários">
              <MessageCircle className="h-5 w-5" aria-hidden="true" />
              <span>{project.comments}</span>
            </Link>
          </Button>

          <Button variant="ghost" size="sm" className="gap-2" aria-label="Compartilhar projeto">
            <Share2 className="h-5 w-5" aria-hidden="true" />
            <span>{project.shares}</span>
          </Button>
        </div>

        <Button size="sm" asChild>
          <Link href={`/projetos/${project.id}`}>Apoiar</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
