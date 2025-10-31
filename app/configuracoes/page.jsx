"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { useAuth } from "@/lib/auth-context"
import { Bell, Lock, Globe, Eye } from "lucide-react"

export default function SettingsPage() {
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

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 py-8 bg-muted/30">
        <div className="container px-4 max-w-3xl">
          <h1 className="text-3xl font-bold mb-8">Configurações</h1>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Bell className="h-5 w-5" aria-hidden="true" />
                  <CardTitle>Notificações</CardTitle>
                </div>
                <CardDescription>Gerencie como você recebe notificações</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="email-notifications">Notificações por email</Label>
                    <p className="text-sm text-muted-foreground">Receba atualizações sobre projetos e doações</p>
                  </div>
                  <Switch id="email-notifications" defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="project-updates">Atualizações de projetos</Label>
                    <p className="text-sm text-muted-foreground">Notificações sobre projetos que você segue</p>
                  </div>
                  <Switch id="project-updates" defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="volunteer-opportunities">Oportunidades de voluntariado</Label>
                    <p className="text-sm text-muted-foreground">Receba sugestões de voluntariado</p>
                  </div>
                  <Switch id="volunteer-opportunities" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Eye className="h-5 w-5" aria-hidden="true" />
                  <CardTitle>Privacidade</CardTitle>
                </div>
                <CardDescription>Controle quem pode ver suas informações</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="public-profile">Perfil público</Label>
                    <p className="text-sm text-muted-foreground">Permitir que outros vejam seu perfil</p>
                  </div>
                  <Switch id="public-profile" defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="show-donations">Mostrar doações</Label>
                    <p className="text-sm text-muted-foreground">Exibir suas doações no perfil</p>
                  </div>
                  <Switch id="show-donations" />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="show-volunteer">Mostrar voluntariados</Label>
                    <p className="text-sm text-muted-foreground">Exibir seus voluntariados no perfil</p>
                  </div>
                  <Switch id="show-volunteer" defaultChecked />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Lock className="h-5 w-5" aria-hidden="true" />
                  <CardTitle>Segurança</CardTitle>
                </div>
                <CardDescription>Mantenha sua conta segura</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  Alterar senha
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  Autenticação de dois fatores
                </Button>
                <Button variant="outline" className="w-full justify-start text-destructive bg-transparent">
                  Excluir conta
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Globe className="h-5 w-5" aria-hidden="true" />
                  <CardTitle>Preferências</CardTitle>
                </div>
                <CardDescription>Personalize sua experiência</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="dark-mode">Modo escuro</Label>
                    <p className="text-sm text-muted-foreground">Ativar tema escuro</p>
                  </div>
                  <Switch id="dark-mode" />
                </div>

                <div className="space-y-2">
                  <Label>Idioma</Label>
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    Português (Brasil)
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
