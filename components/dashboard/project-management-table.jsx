"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Edit, Eye, Trash2 } from "lucide-react"

export function ProjectManagementTable({ projects }) {
  if (projects.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground mb-4">Você ainda não criou nenhum projeto</p>
        <Button asChild>
          <Link href="/dashboard/novo-projeto">Criar primeiro projeto</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b">
            <th className="text-left py-3 px-4 font-medium">Projeto</th>
            <th className="text-left py-3 px-4 font-medium">Categoria</th>
            <th className="text-left py-3 px-4 font-medium">Status</th>
            <th className="text-left py-3 px-4 font-medium">Arrecadado</th>
            <th className="text-left py-3 px-4 font-medium">Engajamento</th>
            <th className="text-right py-3 px-4 font-medium">Ações</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((project) => {
            const progress = (project.donationsReceived / project.donationGoal) * 100
            return (
              <tr key={project.id} className="border-b hover:bg-muted/50">
                <td className="py-4 px-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      className="h-12 w-12 rounded object-cover"
                    />
                    <div>
                      <p className="font-medium">{project.title}</p>
                      <p className="text-sm text-muted-foreground">{project.location}</p>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-4">
                  <Badge variant="secondary">{project.category}</Badge>
                </td>
                <td className="py-4 px-4">
                  <Badge variant={progress >= 100 ? "default" : "outline"}>
                    {progress >= 100 ? "Concluído" : "Ativo"}
                  </Badge>
                </td>
                <td className="py-4 px-4">
                  <div>
                    <p className="font-medium">R$ {project.donationsReceived.toLocaleString("pt-BR")}</p>
                    <p className="text-sm text-muted-foreground">{Math.round(progress)}% da meta</p>
                  </div>
                </td>
                <td className="py-4 px-4">
                  <div className="text-sm">
                    <p>{project.likes} curtidas</p>
                    <p className="text-muted-foreground">{project.comments} comentários</p>
                  </div>
                </td>
                <td className="py-4 px-4">
                  <div className="flex items-center justify-end gap-2">
                    <Button variant="ghost" size="sm" asChild>
                      <Link href={`/projetos/${project.id}`} aria-label="Ver projeto">
                        <Eye className="h-4 w-4" aria-hidden="true" />
                      </Link>
                    </Button>
                    <Button variant="ghost" size="sm" asChild>
                      <Link href={`/dashboard/editar/${project.id}`} aria-label="Editar projeto">
                        <Edit className="h-4 w-4" aria-hidden="true" />
                      </Link>
                    </Button>
                    <Button variant="ghost" size="sm" aria-label="Excluir projeto">
                      <Trash2 className="h-4 w-4 text-destructive" aria-hidden="true" />
                    </Button>
                  </div>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
