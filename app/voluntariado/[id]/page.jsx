"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useAuth } from "@/lib/auth-context"
import { getVolunteerOpportunityById, enrollVolunteer } from "@/lib/volunteer-data"
import { ArrowLeft, MapPin, Clock, Calendar, Users, Check, AlertCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function VolunteerDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { user } = useAuth()
  const [opportunity, setOpportunity] = useState(null)
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    motivation: "",
    experience: "",
    availability: "",
  })
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    const oppData = getVolunteerOpportunityById(params.id)
    if (!oppData) {
      router.push("/voluntariado")
      return
    }
    setOpportunity(oppData)
  }, [params.id, router])

  if (!opportunity) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <p className="text-muted-foreground">Carregando...</p>
        </main>
      </div>
    )
  }

  const handleEnroll = () => {
    if (!user) {
      router.push("/login")
      return
    }
    setShowForm(true)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setError("")
    setSubmitting(true)

    setTimeout(() => {
      const result = enrollVolunteer(opportunity.id, {
        userId: user.id,
        userName: user.name,
        userEmail: user.email,
        opportunityTitle: opportunity.title,
        ngoName: opportunity.ngoName,
        ...formData,
      })

      if (result.success) {
        setSuccess(true)
        setTimeout(() => {
          router.push("/meu-voluntariado")
        }, 2000)
      } else {
        setError(result.error)
      }

      setSubmitting(false)
    }, 1000)
  }

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  if (success) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center p-4 bg-muted/30">
          <Card className="w-full max-w-md text-center">
            <CardContent className="pt-12 pb-8 space-y-6">
              <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                <Check className="h-8 w-8 text-primary" aria-hidden="true" />
              </div>
              <div className="space-y-2">
                <h2 className="text-2xl font-bold">Inscrição realizada com sucesso!</h2>
                <p className="text-muted-foreground">
                  A ONG {opportunity.ngoName} entrará em contato em breve para confirmar sua participação.
                </p>
              </div>
              <Button asChild className="w-full">
                <Link href="/meu-voluntariado">Ver minhas inscrições</Link>
              </Button>
            </CardContent>
          </Card>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 py-8 bg-muted/30">
        <div className="container px-4 max-w-5xl">
          <Button variant="ghost" className="mb-6" asChild>
            <Link href="/voluntariado">
              <ArrowLeft className="h-4 w-4 mr-2" aria-hidden="true" />
              Voltar para oportunidades
            </Link>
          </Button>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <div className="aspect-video relative overflow-hidden bg-muted">
                  <img
                    src={opportunity.image || "/placeholder.svg"}
                    alt={opportunity.title}
                    className="object-cover w-full h-full"
                  />
                </div>

                <CardContent className="p-6 space-y-6">
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <Badge variant="secondary">{opportunity.category}</Badge>
                      <Badge variant={opportunity.enrolled >= opportunity.vacancies ? "destructive" : "outline"}>
                        {opportunity.vacancies - opportunity.enrolled} vagas disponíveis
                      </Badge>
                    </div>
                    <h1 className="text-3xl font-bold mb-2 text-balance">{opportunity.title}</h1>
                    <Link href={`/ongs/${opportunity.ngoId}`} className="text-lg text-primary hover:underline">
                      {opportunity.ngoName}
                    </Link>
                  </div>

                  <Separator />

                  <div>
                    <h2 className="text-xl font-semibold mb-3">Sobre a oportunidade</h2>
                    <p className="text-muted-foreground leading-relaxed">{opportunity.description}</p>
                  </div>

                  <div>
                    <h2 className="text-xl font-semibold mb-3">Requisitos</h2>
                    <ul className="space-y-2">
                      {opportunity.requirements.map((req, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" aria-hidden="true" />
                          <span className="text-muted-foreground">{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h2 className="text-xl font-semibold mb-3">Habilidades desejadas</h2>
                    <div className="flex flex-wrap gap-2">
                      {opportunity.skills.map((skill) => (
                        <Badge key={skill} variant="outline">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {showForm && (
                    <>
                      <Separator />
                      <div>
                        <h2 className="text-xl font-semibold mb-4">Formulário de Inscrição</h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                          {error && (
                            <Alert variant="destructive">
                              <AlertCircle className="h-4 w-4" aria-hidden="true" />
                              <AlertDescription>{error}</AlertDescription>
                            </Alert>
                          )}

                          <div className="space-y-2">
                            <Label htmlFor="motivation">Por que você quer ser voluntário neste projeto?</Label>
                            <Textarea
                              id="motivation"
                              name="motivation"
                              placeholder="Conte-nos sua motivação..."
                              value={formData.motivation}
                              onChange={handleChange}
                              rows={4}
                              required
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="experience">Experiência relevante (opcional)</Label>
                            <Textarea
                              id="experience"
                              name="experience"
                              placeholder="Descreva experiências anteriores relacionadas..."
                              value={formData.experience}
                              onChange={handleChange}
                              rows={3}
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="availability">Disponibilidade</Label>
                            <Input
                              id="availability"
                              name="availability"
                              placeholder="Ex: Sábados pela manhã"
                              value={formData.availability}
                              onChange={handleChange}
                              required
                            />
                          </div>

                          <div className="flex gap-3">
                            <Button type="submit" className="flex-1" disabled={submitting}>
                              {submitting ? "Enviando..." : "Enviar inscrição"}
                            </Button>
                            <Button type="button" variant="outline" onClick={() => setShowForm(false)}>
                              Cancelar
                            </Button>
                          </div>
                        </form>
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Informações</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-muted-foreground flex-shrink-0" aria-hidden="true" />
                    <div>
                      <p className="font-medium text-sm">Localização</p>
                      <p className="text-sm text-muted-foreground">{opportunity.location}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Clock className="h-5 w-5 text-muted-foreground flex-shrink-0" aria-hidden="true" />
                    <div>
                      <p className="font-medium text-sm">Horário</p>
                      <p className="text-sm text-muted-foreground">{opportunity.schedule}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Calendar className="h-5 w-5 text-muted-foreground flex-shrink-0" aria-hidden="true" />
                    <div>
                      <p className="font-medium text-sm">Duração</p>
                      <p className="text-sm text-muted-foreground">{opportunity.duration}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Users className="h-5 w-5 text-muted-foreground flex-shrink-0" aria-hidden="true" />
                    <div>
                      <p className="font-medium text-sm">Vagas</p>
                      <p className="text-sm text-muted-foreground">
                        {opportunity.enrolled} de {opportunity.vacancies} preenchidas
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {!showForm && (
                <Button
                  className="w-full"
                  size="lg"
                  onClick={handleEnroll}
                  disabled={opportunity.enrolled >= opportunity.vacancies}
                >
                  {opportunity.enrolled >= opportunity.vacancies ? "Vagas esgotadas" : "Inscrever-se"}
                </Button>
              )}

              <Card>
                <CardHeader>
                  <CardTitle>Benefícios</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Check className="h-4 w-4 text-primary" aria-hidden="true" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">Certificado</p>
                      <p className="text-xs text-muted-foreground">Receba certificado de participação</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Check className="h-4 w-4 text-primary" aria-hidden="true" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">Experiência</p>
                      <p className="text-xs text-muted-foreground">Desenvolva novas habilidades</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Check className="h-4 w-4 text-primary" aria-hidden="true" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">Impacto</p>
                      <p className="text-xs text-muted-foreground">Faça a diferença na comunidade</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
