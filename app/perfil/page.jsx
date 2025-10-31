"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { useAuth, USER_TYPES } from "@/lib/auth-context"
import { Mail, Calendar, Building, Shield, Heart, Users } from "lucide-react"

export default function ProfilePage() {
  const router = useRouter()
  const { user, loading } = useAuth()

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login")
    }
  }, [user, loading, router])

  if (loading || !user) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <p className="text-muted-foreground">Carregando...</p>
        </main>
      </div>
    )
  }

  const getInitials = (name) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2)
  }

  const getUserTypeLabel = (type) => {
    const labels = {
      [USER_TYPES.VISITOR]: "Visitante",
      [USER_TYPES.DONOR]: "Doador/Apoiador",
      [USER_TYPES.VOLUNTEER]: "Voluntário",
      [USER_TYPES.NGO_ADMIN]: "Administrador de ONG",
    }
    return labels[type] || type
  }

  const getUserTypeIcon = (type) => {
    const icons = {
      [USER_TYPES.DONOR]: Heart,
      [USER_TYPES.VOLUNTEER]: Users,
      [USER_TYPES.NGO_ADMIN]: Building,
    }
    const Icon = icons[type] || Shield
    return <Icon className="h-4 w-4" aria-hidden="true" />
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 py-8 bg-muted/30">
        <div className="container px-4 max-w-4xl">
          <Card>
            <CardHeader>
              <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
                <Avatar className="h-24 w-24">
                  <AvatarImage src={user.avatar || "/placeholder.svg"} alt={`Foto de perfil de ${user.name}`} />
                  <AvatarFallback className="text-2xl">{getInitials(user.name)}</AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-2">
                  <div className="flex flex-col md:flex-row md:items-center gap-3">
                    <CardTitle className="text-3xl">{user.name}</CardTitle>
                    <Badge variant="secondary" className="w-fit">
                      {getUserTypeIcon(user.userType)}
                      <span className="ml-1">{getUserTypeLabel(user.userType)}</span>
                    </Badge>
                  </div>
                  {user.organization && (
                    <CardDescription className="flex items-center gap-2 text-base">
                      <Building className="h-4 w-4" aria-hidden="true" />
                      {user.organization}
                    </CardDescription>
                  )}
                </div>
                <Button variant="outline">Editar perfil</Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4">
                <div className="flex items-center gap-3 text-muted-foreground">
                  <Mail className="h-5 w-5" aria-hidden="true" />
                  <span>{user.email}</span>
                </div>
                <div className="flex items-center gap-3 text-muted-foreground">
                  <Calendar className="h-5 w-5" aria-hidden="true" />
                  <span>Membro desde {new Date(user.createdAt).toLocaleDateString("pt-BR")}</span>
                </div>
                {user.userType === USER_TYPES.NGO_ADMIN && !user.verified && (
                  <div className="flex items-center gap-3 text-amber-600">
                    <Shield className="h-5 w-5" aria-hidden="true" />
                    <span>Aguardando verificação da organização</span>
                  </div>
                )}
              </div>

              <div className="pt-6 border-t">
                <h3 className="font-semibold text-lg mb-4">Estatísticas</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Card>
                    <CardContent className="pt-6 text-center">
                      <p className="text-3xl font-bold text-primary">0</p>
                      <p className="text-sm text-muted-foreground mt-1">Projetos</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-6 text-center">
                      <p className="text-3xl font-bold text-secondary">0</p>
                      <p className="text-sm text-muted-foreground mt-1">Doações</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-6 text-center">
                      <p className="text-3xl font-bold text-accent">0</p>
                      <p className="text-sm text-muted-foreground mt-1">Voluntariados</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-6 text-center">
                      <p className="text-3xl font-bold text-primary">0</p>
                      <p className="text-sm text-muted-foreground mt-1">Impacto</p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
