"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useAuth, USER_TYPES } from "@/lib/auth-context"
import { getProjects } from "@/lib/projects-data"
import { ArrowLeft, Upload } from "lucide-react"
import Link from "next/link"

const CATEGORIES = [
  "Alimentação",
  "Educação",
  "Meio Ambiente",
  "Animais",
  "Direitos Humanos",
  "Esporte",
  "Saúde",
  "Cultura",
  "Tecnologia",
]

export default function NewProjectPage() {
  const router = useRouter()
  const { user, loading } = useAuth()
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    fullDescription: "",
    category: "",
    location: "",
    donationGoal: "",
    tags: "",
  })
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    if (!loading && (!user || user.userType !== USER_TYPES.NGO_ADMIN)) {
      router.push("/")
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

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const handleSelectChange = (value) => {
    setFormData((prev) => ({
      ...prev,
      category: value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitting(true)

    const projects = getProjects()
    const newProject = {
      id: Date.now().toString(),
      title: formData.title,
      description: formData.description,
      fullDescription: formData.fullDescription,
      category: formData.category,
      location: formData.location,
      donationGoal: Number.parseInt(formData.donationGoal),
      tags: formData.tags.split(",").map((tag) => tag.trim()),
      ngoName: user.organization,
      ngoId: user.id,
      ngoAvatar: user.avatar,
      image: `/placeholder.svg?height=600&width=800&query=${encodeURIComponent(formData.title)}`,
      likes: 0,
      comments: 0,
      shares: 0,
      volunteers: 0,
      donationsReceived: 0,
      impactMetrics: {
        beneficiaries: 0,
        activities: 0,
        volunteers: 0,
      },
      createdAt: new Date().toISOString(),
    }

    projects.push(newProject)
    localStorage.setItem("ngo_hub_projects", JSON.stringify(projects))

    setTimeout(() => {
      router.push("/dashboard")
    }, 500)
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 py-8 bg-muted/30">
        <div className="container px-4 max-w-3xl">
          <Button variant="ghost" className="mb-6" asChild>
            <Link href="/dashboard">
              <ArrowLeft className="h-4 w-4 mr-2" aria-hidden="true" />
              Voltar para dashboard
            </Link>
          </Button>

          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Criar Novo Projeto</CardTitle>
              <CardDescription>Preencha as informações do seu projeto para publicá-lo na plataforma</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="title">Título do Projeto</Label>
                  <Input
                    id="title"
                    name="title"
                    placeholder="Ex: Alimentação para Comunidades Carentes"
                    value={formData.title}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Descrição Curta</Label>
                  <Textarea
                    id="description"
                    name="description"
                    placeholder="Breve descrição do projeto (máximo 200 caracteres)"
                    value={formData.description}
                    onChange={handleChange}
                    maxLength={200}
                    rows={3}
                    required
                  />
                  <p className="text-xs text-muted-foreground">{formData.description.length}/200 caracteres</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="fullDescription">Descrição Completa</Label>
                  <Textarea
                    id="fullDescription"
                    name="fullDescription"
                    placeholder="Descreva detalhadamente o projeto, seus objetivos e impacto esperado"
                    value={formData.fullDescription}
                    onChange={handleChange}
                    rows={6}
                    required
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="category">Categoria</Label>
                    <Select value={formData.category} onValueChange={handleSelectChange} required>
                      <SelectTrigger id="category">
                        <SelectValue placeholder="Selecione uma categoria" />
                      </SelectTrigger>
                      <SelectContent>
                        {CATEGORIES.map((cat) => (
                          <SelectItem key={cat} value={cat}>
                            {cat}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="location">Localização</Label>
                    <Input
                      id="location"
                      name="location"
                      placeholder="Ex: São Paulo, SP"
                      value={formData.location}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="donationGoal">Meta de Doação (R$)</Label>
                  <Input
                    id="donationGoal"
                    name="donationGoal"
                    type="number"
                    placeholder="Ex: 25000"
                    value={formData.donationGoal}
                    onChange={handleChange}
                    min="1"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tags">Tags (separadas por vírgula)</Label>
                  <Input
                    id="tags"
                    name="tags"
                    placeholder="Ex: alimentação, comunidade, vulnerabilidade social"
                    value={formData.tags}
                    onChange={handleChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Imagem do Projeto</Label>
                  <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary transition-colors cursor-pointer">
                    <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" aria-hidden="true" />
                    <p className="text-sm text-muted-foreground">Clique para fazer upload ou arraste uma imagem</p>
                    <p className="text-xs text-muted-foreground mt-1">PNG, JPG até 5MB</p>
                  </div>
                </div>

                <div className="flex gap-4 pt-4">
                  <Button type="submit" className="flex-1" disabled={submitting}>
                    {submitting ? "Publicando..." : "Publicar Projeto"}
                  </Button>
                  <Button type="button" variant="outline" asChild>
                    <Link href="/dashboard">Cancelar</Link>
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
