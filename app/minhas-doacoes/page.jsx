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
import { getDonations, getDonationStats } from "@/lib/donations-data"
import { Heart, Calendar, TrendingUp, Download, RefreshCw } from "lucide-react"

export default function MyDonationsPage() {
  const router = useRouter()
  const { user, loading } = useAuth()
  const [donations, setDonations] = useState([])
  const [stats, setStats] = useState({
    total: 0,
    totalAmount: 0,
    recurring: 0,
    projectsSupported: 0,
  })

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login")
      return
    }

    if (user) {
      const userDonations = getDonations(user.id)
      setDonations(userDonations)
      setStats(getDonationStats(user.id))
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

  const recurringDonations = donations.filter((d) => d.recurring)
  const oneTimeDonations = donations.filter((d) => !d.recurring)

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 py-8 bg-muted/30">
        <div className="container px-4 max-w-6xl">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Minhas Doações</h1>
            <p className="text-muted-foreground">Acompanhe suas contribuições e o impacto gerado</p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Doado</CardTitle>
                <Heart className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">R$ {stats.totalAmount.toLocaleString("pt-BR")}</div>
                <p className="text-xs text-muted-foreground">Desde o início</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Doações Realizadas</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.total}</div>
                <p className="text-xs text-muted-foreground">Total de contribuições</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Projetos Apoiados</CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.projectsSupported}</div>
                <p className="text-xs text-muted-foreground">Diferentes causas</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Doações Recorrentes</CardTitle>
                <RefreshCw className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.recurring}</div>
                <p className="text-xs text-muted-foreground">Ativas no momento</p>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="all" className="space-y-6">
            <TabsList>
              <TabsTrigger value="all">Todas ({donations.length})</TabsTrigger>
              <TabsTrigger value="recurring">Recorrentes ({recurringDonations.length})</TabsTrigger>
              <TabsTrigger value="onetime">Únicas ({oneTimeDonations.length})</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-4">
              <DonationsList donations={donations} />
            </TabsContent>

            <TabsContent value="recurring" className="space-y-4">
              <DonationsList donations={recurringDonations} />
            </TabsContent>

            <TabsContent value="onetime" className="space-y-4">
              <DonationsList donations={oneTimeDonations} />
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}

function DonationsList({ donations }) {
  if (donations.length === 0) {
    return (
      <Card>
        <CardContent className="py-12 text-center">
          <Heart className="h-12 w-12 mx-auto mb-4 text-muted-foreground" aria-hidden="true" />
          <p className="text-muted-foreground mb-4">Você ainda não fez nenhuma doação</p>
          <Button asChild>
            <Link href="/projetos">Explorar projetos</Link>
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      {donations.map((donation) => (
        <Card key={donation.id}>
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex-1 space-y-2">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="font-semibold">{donation.projectTitle}</h3>
                  {donation.recurring && (
                    <Badge variant="secondary">
                      <RefreshCw className="h-3 w-3 mr-1" aria-hidden="true" />
                      Recorrente
                    </Badge>
                  )}
                  {donation.anonymous && <Badge variant="outline">Anônima</Badge>}
                </div>
                <p className="text-sm text-muted-foreground">{donation.ngoName}</p>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" aria-hidden="true" />
                    {new Date(donation.createdAt).toLocaleDateString("pt-BR")}
                  </span>
                  <span className="capitalize">
                    {donation.paymentMethod === "credit"
                      ? "Cartão de Crédito"
                      : donation.paymentMethod === "pix"
                        ? "PIX"
                        : "Boleto"}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="text-2xl font-bold text-primary">R$ {donation.amount.toLocaleString("pt-BR")}</p>
                  <Badge variant="outline" className="mt-1">
                    {donation.status === "completed" ? "Concluída" : "Pendente"}
                  </Badge>
                </div>

                <div className="flex flex-col gap-2">
                  <Button variant="outline" size="sm" asChild>
                    <Link href={`/projetos/${donation.projectId}`}>Ver projeto</Link>
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Download className="h-4 w-4 mr-2" aria-hidden="true" />
                    Recibo
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
