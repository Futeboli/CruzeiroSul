"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useAuth, USER_TYPES } from "@/lib/auth-context"
import { getProjects } from "@/lib/projects-data"
import { Plus, Users, Heart, DollarSign, FolderOpen } from "lucide-react"
import Link from "next/link"
import { ProjectManagementTable } from "@/components/dashboard/project-management-table"
import { DashboardStats } from "@/components/dashboard/dashboard-stats"
import { DonationsChart } from "@/components/dashboard/donations-chart"
import { VolunteersTable } from "@/components/dashboard/volunteers-table"

export default function DashboardPage() {
  const router = useRouter()
  const { user, loading } = useAuth()
  const [projects, setProjects] = useState([])
  const [stats, setStats] = useState({
    totalProjects: 0,
    totalDonations: 0,
    totalVolunteers: 0,
    totalLikes: 0,
  })

  useEffect(() => {
    if (!loading && (!user || user.userType !== USER_TYPES.NGO_ADMIN)) {
      router.push("/")
      return
    }

    if (user) {
      const allProjects = getProjects()
      const userProjects = allProjects.filter((p) => p.ngoId === user.id || p.ngoName === user.organization)

      setProjects(userProjects)

      const totalDonations = userProjects.reduce((sum, p) => sum + p.donationsReceived, 0)
      const totalVolunteers = userProjects.reduce((sum, p) => sum + p.volunteers, 0)
      const totalLikes = userProjects.reduce((sum, p) => sum + p.likes, 0)

      setStats({
        totalProjects: userProjects.length,
        totalDonations,
        totalVolunteers,
        totalLikes,
      })
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

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 py-8 bg-muted/30">
        <div className="container px-4 max-w-7xl">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold mb-2">Dashboard Administrativo</h1>
              <p className="text-muted-foreground">Gerencie seus projetos e acompanhe o impacto da sua ONG</p>
            </div>
            <Button size="lg" asChild>
              <Link href="/dashboard/novo-projeto">
                <Plus className="h-5 w-5 mr-2" aria-hidden="true" />
                Novo Projeto
              </Link>
            </Button>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total de Projetos</CardTitle>
                <FolderOpen className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalProjects}</div>
                <p className="text-xs text-muted-foreground">Projetos ativos</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Doações Recebidas</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">R$ {stats.totalDonations.toLocaleString("pt-BR")}</div>
                <p className="text-xs text-muted-foreground">Total arrecadado</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Voluntários Ativos</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalVolunteers}</div>
                <p className="text-xs text-muted-foreground">Pessoas engajadas</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Engajamento</CardTitle>
                <Heart className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalLikes}</div>
                <p className="text-xs text-muted-foreground">Curtidas totais</p>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="projetos" className="space-y-6">
            <TabsList>
              <TabsTrigger value="projetos">Projetos</TabsTrigger>
              <TabsTrigger value="estatisticas">Estatísticas</TabsTrigger>
              <TabsTrigger value="voluntarios">Voluntários</TabsTrigger>
            </TabsList>

            <TabsContent value="projetos" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Gerenciar Projetos</CardTitle>
                  <CardDescription>Visualize e edite seus projetos publicados</CardDescription>
                </CardHeader>
                <CardContent>
                  <ProjectManagementTable projects={projects} />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="estatisticas" className="space-y-4">
              <div className="grid gap-6 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Doações por Mês</CardTitle>
                    <CardDescription>Acompanhe o crescimento das doações</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <DonationsChart />
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Impacto por Projeto</CardTitle>
                    <CardDescription>Métricas de cada projeto</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <DashboardStats projects={projects} />
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="voluntarios" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Voluntários Cadastrados</CardTitle>
                  <CardDescription>Gerencie os voluntários da sua ONG</CardDescription>
                </CardHeader>
                <CardContent>
                  <VolunteersTable />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}
