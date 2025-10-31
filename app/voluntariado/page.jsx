"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { getVolunteerOpportunities } from "@/lib/volunteer-data"
import { Search, Filter, MapPin, Clock, Users, Calendar } from "lucide-react"

export default function VolunteerPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [locationFilter, setLocationFilter] = useState("all")

  const opportunities = getVolunteerOpportunities()

  const categories = ["all", ...new Set(opportunities.map((o) => o.category))]
  const locations = ["all", ...new Set(opportunities.map((o) => o.location))]

  const filteredOpportunities = useMemo(() => {
    let filtered = opportunities

    if (searchQuery) {
      filtered = filtered.filter(
        (o) =>
          o.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          o.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          o.ngoName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          o.skills.some((skill) => skill.toLowerCase().includes(searchQuery.toLowerCase())),
      )
    }

    if (categoryFilter !== "all") {
      filtered = filtered.filter((o) => o.category === categoryFilter)
    }

    if (locationFilter !== "all") {
      filtered = filtered.filter((o) => o.location === locationFilter)
    }

    return filtered
  }, [opportunities, searchQuery, categoryFilter, locationFilter])

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 py-8 bg-muted/30">
        <div className="container px-4">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Oportunidades de Voluntariado</h1>
            <p className="text-muted-foreground text-pretty leading-relaxed">
              Encontre oportunidades para usar suas habilidades e fazer a diferença
            </p>
          </div>

          <div className="mb-8 space-y-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search
                  className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground"
                  aria-hidden="true"
                />
                <Input
                  type="search"
                  placeholder="Buscar por título, ONG ou habilidades..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  aria-label="Buscar oportunidades"
                />
              </div>

              <div className="flex gap-2">
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger className="w-[180px]" aria-label="Filtrar por categoria">
                    <Filter className="h-4 w-4 mr-2" aria-hidden="true" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas categorias</SelectItem>
                    {categories
                      .filter((c) => c !== "all")
                      .map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>

                <Select value={locationFilter} onValueChange={setLocationFilter}>
                  <SelectTrigger className="w-[180px]" aria-label="Filtrar por localização">
                    <MapPin className="h-4 w-4 mr-2" aria-hidden="true" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas localizações</SelectItem>
                    {locations
                      .filter((l) => l !== "all")
                      .map((location) => (
                        <SelectItem key={location} value={location}>
                          {location}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                {filteredOpportunities.length}{" "}
                {filteredOpportunities.length === 1 ? "oportunidade encontrada" : "oportunidades encontradas"}
              </p>
              {(searchQuery || categoryFilter !== "all" || locationFilter !== "all") && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setSearchQuery("")
                    setCategoryFilter("all")
                    setLocationFilter("all")
                  }}
                >
                  Limpar filtros
                </Button>
              )}
            </div>
          </div>

          {filteredOpportunities.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredOpportunities.map((opportunity) => (
                <Card key={opportunity.id} className="flex flex-col hover:shadow-lg transition-shadow">
                  <div className="aspect-video relative overflow-hidden bg-muted">
                    <img
                      src={opportunity.image || "/placeholder.svg"}
                      alt={opportunity.title}
                      className="object-cover w-full h-full"
                    />
                  </div>

                  <CardHeader>
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <Badge variant="secondary">{opportunity.category}</Badge>
                      <Badge variant={opportunity.enrolled >= opportunity.vacancies ? "destructive" : "outline"}>
                        {opportunity.vacancies - opportunity.enrolled} vagas
                      </Badge>
                    </div>
                    <CardTitle className="text-lg text-balance">{opportunity.title}</CardTitle>
                    <p className="text-sm text-muted-foreground">{opportunity.ngoName}</p>
                  </CardHeader>

                  <CardContent className="flex-1 space-y-3">
                    <p className="text-sm text-muted-foreground line-clamp-2 text-pretty leading-relaxed">
                      {opportunity.description}
                    </p>

                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <MapPin className="h-4 w-4" aria-hidden="true" />
                        <span>{opportunity.location}</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Clock className="h-4 w-4" aria-hidden="true" />
                        <span>{opportunity.schedule}</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Calendar className="h-4 w-4" aria-hidden="true" />
                        <span>{opportunity.duration}</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Users className="h-4 w-4" aria-hidden="true" />
                        <span>
                          {opportunity.enrolled}/{opportunity.vacancies} inscritos
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1 pt-2">
                      {opportunity.skills.slice(0, 3).map((skill) => (
                        <Badge key={skill} variant="outline" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>

                  <CardFooter>
                    <Button className="w-full" asChild disabled={opportunity.enrolled >= opportunity.vacancies}>
                      <Link href={`/voluntariado/${opportunity.id}`}>
                        {opportunity.enrolled >= opportunity.vacancies ? "Vagas esgotadas" : "Ver detalhes"}
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-lg text-muted-foreground mb-4">Nenhuma oportunidade encontrada</p>
              <Button
                variant="outline"
                onClick={() => {
                  setSearchQuery("")
                  setCategoryFilter("all")
                  setLocationFilter("all")
                }}
              >
                Ver todas as oportunidades
              </Button>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
