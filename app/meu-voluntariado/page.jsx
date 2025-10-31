"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useAuth } from "@/lib/auth-context"
import { getVolunteerEnrollments, getVolunteerStats } from "@/lib/volunteer-data"
import { Users, Clock, Award, TrendingUp, Calendar } from "lucide-react"

export default function MyVolunteerPage() {
  const router = useRouter()
  const { user, loading } = useAuth()
  const [enrollments, setEnrollments] = useState([])
  const [stats, setStats] = useState({
    total: 0,
    active: 0,
    completed: 0,
    totalHours: 0,
  })

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login")
      return
    }

    if (user) {
      const userEnrollments = getVolunteerEnrollments(user.id)
      setEnrollments(userEnrollments)
      setStats(getVolunteerStats(user.id))
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

  const pendingEnrollments = enrollments.filter((e) => e.status === "pending")
  const activeEnrollments = enrollments.filter((e) => e.status === "active")
  const completedEnrollments = enrollments.filter((e) => e.status === "completed")

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 py-8 bg-muted/30">
        <div className="container px-4 max-w-6xl">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Meu Voluntariado</h1>
            <p className="text-muted-foreground">Acompanhe suas inscrições e contribuições</p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total de Inscrições</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.total}</div>
                <p className="text-xs text-muted-foreground">Oportunidades</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Voluntariados Ativos</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.active}</div>
                <p className="text-xs text-muted-foreground">Em andamento</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Horas Contribuídas</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalHours}h</div>
                <p className="text-xs text-muted-foreground">Total acumulado</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Concluídos</CardTitle>
                <Award className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.completed}</div>
                <p className="text-xs text-muted-foreground">Certificados disponíveis</p>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="all" className="space-y-6">
            <TabsList>
              <TabsTrigger value="all">Todos ({enrollments.length})</TabsTrigger>
              <TabsTrigger value="pending">Pendentes ({pendingEnrollments.length})</TabsTrigger>
              <TabsTrigger value="active">Ativos ({activeEnrollments.length})</TabsTrigger>
              <TabsTrigger value="completed">Concluídos ({completedEnrollments.length})</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-4">
              <EnrollmentsList enrollments={enrollments} />
            </TabsContent>

            <TabsContent value="pending" className="space-y-4">
              <EnrollmentsList enrollments={pendingEnrollments} />
            </TabsContent>

            <TabsContent value="active" className="space-y-4">
              <EnrollmentsList enrollments={activeEnrollments} />
            </TabsContent>

            <TabsContent value="completed" className="space-y-4">
              <EnrollmentsList enrollments={completedEnrollments} />
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}

function EnrollmentsList({ enrollments }) {
  if (enrollments.length === 0) {
    return (
      <Card>
        <CardContent className="py-12 text-center">
          <Users className="h-12 w-12 mx-auto mb-4 text-muted-foreground" aria-hidden="true" />
          <p className="text-muted-foreground mb-4">Você ainda não se inscreveu em nenhuma oportunidade</p>
          <Button asChild>
            <Link href="/voluntariado">Explorar oportunidades</Link>
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      {enrollments.map((enrollment) => (
        <Card key={enrollment.id}>
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex-1 space-y-2">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="font-semibold">{enrollment.opportunityTitle}</h3>
                  <Badge
                    variant={
                      enrollment.status === "active"
                        ? "default"
                        : enrollment.status === "completed"
                          ? "secondary"
                          : "outline"
                    }
                  >
                    {enrollment.status === "pending"
                      ? "Pendente"
                      : enrollment.status === "active"
                        ? "Ativo"
                        : "Concluído"}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">{enrollment.ngoName}</p>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" aria-hidden="true" />
                    Inscrito em {new Date(enrollment.enrolledAt).toLocaleDateString("pt-BR")}
                  </span>
                  {enrollment.hoursCompleted > 0 && (
                    <span className="flex items-center gap-1">
                      <Clock className="h-4 w-4" aria-hidden="true" />
                      {enrollment.hoursCompleted}h contribuídas
                    </span>
                  )}
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <Button variant="outline" size="sm" asChild>
                  <Link href={`/voluntariado/${enrollment.opportunityId}`}>Ver detalhes</Link>
                </Button>
                {enrollment.status === "completed" && (
                  <Button variant="ghost" size="sm">
                    <Award className="h-4 w-4 mr-2" aria-hidden="true" />
                    Certificado
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
