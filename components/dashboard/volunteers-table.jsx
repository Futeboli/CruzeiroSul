"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Mail, Phone } from "lucide-react"

const mockVolunteers = [
  {
    id: "1",
    name: "Maria Silva",
    email: "maria@email.com",
    phone: "(11) 98765-4321",
    skills: ["Educação", "Comunicação"],
    projects: 3,
    hoursContributed: 45,
    avatar: "/portrait-Maria.png",
  },
  {
    id: "2",
    name: "João Santos",
    email: "joao@email.com",
    phone: "(21) 97654-3210",
    skills: ["Tecnologia", "Design"],
    projects: 2,
    hoursContributed: 32,
    avatar: "/joao-portrait.png",
  },
  {
    id: "3",
    name: "Ana Costa",
    email: "ana@email.com",
    phone: "(31) 96543-2109",
    skills: ["Saúde", "Psicologia"],
    projects: 4,
    hoursContributed: 58,
    avatar: "/ana-portrait.png",
  },
  {
    id: "4",
    name: "Pedro Oliveira",
    email: "pedro@email.com",
    phone: "(41) 95432-1098",
    skills: ["Marketing", "Eventos"],
    projects: 1,
    hoursContributed: 18,
    avatar: "/portrait-of-pedro.png",
  },
]

export function VolunteersTable() {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b">
            <th className="text-left py-3 px-4 font-medium">Voluntário</th>
            <th className="text-left py-3 px-4 font-medium">Habilidades</th>
            <th className="text-left py-3 px-4 font-medium">Projetos</th>
            <th className="text-left py-3 px-4 font-medium">Horas</th>
            <th className="text-right py-3 px-4 font-medium">Contato</th>
          </tr>
        </thead>
        <tbody>
          {mockVolunteers.map((volunteer) => (
            <tr key={volunteer.id} className="border-b hover:bg-muted/50">
              <td className="py-4 px-4">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={volunteer.avatar || "/placeholder.svg"} alt={volunteer.name} />
                    <AvatarFallback>{volunteer.name[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{volunteer.name}</p>
                    <p className="text-sm text-muted-foreground">{volunteer.email}</p>
                  </div>
                </div>
              </td>
              <td className="py-4 px-4">
                <div className="flex flex-wrap gap-1">
                  {volunteer.skills.map((skill) => (
                    <Badge key={skill} variant="secondary" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </td>
              <td className="py-4 px-4">
                <span className="font-medium">{volunteer.projects}</span>
              </td>
              <td className="py-4 px-4">
                <span className="font-medium">{volunteer.hoursContributed}h</span>
              </td>
              <td className="py-4 px-4">
                <div className="flex items-center justify-end gap-2">
                  <Button variant="ghost" size="sm" asChild>
                    <a href={`mailto:${volunteer.email}`} aria-label="Enviar email">
                      <Mail className="h-4 w-4" aria-hidden="true" />
                    </a>
                  </Button>
                  <Button variant="ghost" size="sm" asChild>
                    <a href={`tel:${volunteer.phone}`} aria-label="Ligar">
                      <Phone className="h-4 w-4" aria-hidden="true" />
                    </a>
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
