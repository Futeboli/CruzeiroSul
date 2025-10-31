"use client"

import { Progress } from "@/components/ui/progress"

export function DashboardStats({ projects }) {
  if (projects.length === 0) {
    return <p className="text-center text-muted-foreground py-8">Nenhum projeto para exibir estatísticas</p>
  }

  return (
    <div className="space-y-6">
      {projects.map((project) => {
        const progress = (project.donationsReceived / project.donationGoal) * 100
        return (
          <div key={project.id} className="space-y-2">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <p className="font-medium text-sm">{project.title}</p>
                <p className="text-xs text-muted-foreground">{project.category}</p>
              </div>
              <span className="text-sm font-semibold">{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-2" />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>R$ {project.donationsReceived.toLocaleString("pt-BR")}</span>
              <span>Meta: R$ {project.donationGoal.toLocaleString("pt-BR")}</span>
            </div>
          </div>
        )
      })}
    </div>
  )
}
