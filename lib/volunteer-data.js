export const VOLUNTEER_OPPORTUNITIES = [
  {
    id: "vol1",
    projectId: "1",
    projectTitle: "Alimentação para Comunidades Carentes",
    ngoName: "Instituto Alimentar",
    ngoId: "ngo1",
    title: "Voluntário para Distribuição de Alimentos",
    description: "Ajude na organização e distribuição de cestas básicas para famílias em situação de vulnerabilidade.",
    requirements: ["Disponibilidade aos sábados", "Maior de 18 anos", "Disposição física"],
    skills: ["Organização", "Trabalho em equipe", "Empatia"],
    location: "São Paulo, SP",
    schedule: "Sábados, 8h às 12h",
    vacancies: 10,
    enrolled: 7,
    duration: "Contínuo",
    category: "Alimentação",
    image: "/volunteer-food-distribution.jpg",
    createdAt: "2025-01-15T10:30:00Z",
  },
  {
    id: "vol2",
    projectId: "2",
    projectTitle: "Educação Digital para Jovens",
    ngoName: "TechFuturo",
    ngoId: "ngo2",
    title: "Mentor de Programação",
    description: "Ensine programação e desenvolvimento web para jovens em cursos gratuitos.",
    requirements: ["Conhecimento em programação", "Experiência com ensino (desejável)", "Paciência"],
    skills: ["Programação", "Ensino", "Comunicação"],
    location: "Rio de Janeiro, RJ",
    schedule: "Terças e quintas, 19h às 21h",
    vacancies: 5,
    enrolled: 3,
    duration: "3 meses",
    category: "Educação",
    image: "/volunteer-teaching-programming.jpg",
    createdAt: "2025-01-10T14:20:00Z",
  },
  {
    id: "vol3",
    projectId: "3",
    projectTitle: "Reflorestamento da Mata Atlântica",
    ngoName: "Verde Vivo",
    ngoId: "ngo3",
    title: "Voluntário de Plantio de Árvores",
    description: "Participe de mutirões de plantio de mudas nativas da Mata Atlântica.",
    requirements: ["Disposição física", "Amor pela natureza", "Disponibilidade aos finais de semana"],
    skills: ["Trabalho em equipe", "Resistência física", "Consciência ambiental"],
    location: "Curitiba, PR",
    schedule: "Domingos, 7h às 13h",
    vacancies: 20,
    enrolled: 15,
    duration: "Contínuo",
    category: "Meio Ambiente",
    image: "/volunteer-tree-planting.jpg",
    createdAt: "2025-01-05T09:15:00Z",
  },
  {
    id: "vol4",
    projectId: "4",
    projectTitle: "Abrigo para Animais Abandonados",
    ngoName: "Patinhas Felizes",
    ngoId: "ngo4",
    title: "Cuidador de Animais",
    description: "Ajude nos cuidados diários com cães e gatos resgatados, incluindo alimentação e higiene.",
    requirements: ["Amor por animais", "Disponibilidade de 4h semanais", "Maior de 16 anos"],
    skills: ["Cuidado animal", "Paciência", "Responsabilidade"],
    location: "Belo Horizonte, MG",
    schedule: "Flexível, turnos manhã/tarde",
    vacancies: 15,
    enrolled: 12,
    duration: "Mínimo 6 meses",
    category: "Animais",
    image: "/volunteer-animal-care.jpg",
    createdAt: "2025-01-20T16:45:00Z",
  },
  {
    id: "vol5",
    projectId: "5",
    projectTitle: "Apoio a Mulheres Vítimas de Violência",
    ngoName: "Rede de Apoio Feminino",
    ngoId: "ngo5",
    title: "Psicólogo Voluntário",
    description: "Ofereça atendimento psicológico para mulheres em situação de violência doméstica.",
    requirements: ["Formação em Psicologia", "CRP ativo", "Experiência com trauma"],
    skills: ["Psicologia", "Escuta ativa", "Empatia"],
    location: "Salvador, BA",
    schedule: "A combinar",
    vacancies: 3,
    enrolled: 2,
    duration: "Mínimo 1 ano",
    category: "Direitos Humanos",
    image: "/volunteer-counseling-support.jpg",
    createdAt: "2025-01-12T11:30:00Z",
  },
  {
    id: "vol6",
    projectId: "6",
    projectTitle: "Esporte e Inclusão para Crianças",
    ngoName: "Esporte para Todos",
    ngoId: "ngo6",
    title: "Professor de Esportes",
    description: "Ensine modalidades esportivas para crianças de comunidades carentes.",
    requirements: ["Experiência com esportes", "Habilidade com crianças", "Disponibilidade semanal"],
    skills: ["Esportes", "Pedagogia", "Liderança"],
    location: "Recife, PE",
    schedule: "Segundas, quartas e sextas, 16h às 18h",
    vacancies: 8,
    enrolled: 5,
    duration: "Mínimo 6 meses",
    category: "Esporte",
    image: "/volunteer-sports-coaching.jpg",
    createdAt: "2025-01-18T13:00:00Z",
  },
]

export function getVolunteerOpportunities() {
  const stored = localStorage.getItem("ngo_hub_volunteer_opportunities")
  if (stored) {
    try {
      return JSON.parse(stored)
    } catch (error) {
      console.error("[v0] Erro ao carregar oportunidades:", error)
    }
  }
  localStorage.setItem("ngo_hub_volunteer_opportunities", JSON.stringify(VOLUNTEER_OPPORTUNITIES))
  return VOLUNTEER_OPPORTUNITIES
}

export function getVolunteerOpportunityById(id) {
  const opportunities = getVolunteerOpportunities()
  return opportunities.find((o) => o.id === id)
}

export function enrollVolunteer(opportunityId, volunteerData) {
  const enrollments = JSON.parse(localStorage.getItem("ngo_hub_volunteer_enrollments") || "[]")

  const existingEnrollment = enrollments.find(
    (e) => e.opportunityId === opportunityId && e.userId === volunteerData.userId,
  )

  if (existingEnrollment) {
    return { success: false, error: "Você já está inscrito nesta oportunidade" }
  }

  const newEnrollment = {
    id: Date.now().toString(),
    opportunityId,
    ...volunteerData,
    status: "pending",
    enrolledAt: new Date().toISOString(),
    hoursCompleted: 0,
  }

  enrollments.push(newEnrollment)
  localStorage.setItem("ngo_hub_volunteer_enrollments", JSON.stringify(enrollments))

  const opportunities = getVolunteerOpportunities()
  const oppIndex = opportunities.findIndex((o) => o.id === opportunityId)
  if (oppIndex !== -1) {
    opportunities[oppIndex].enrolled += 1
    localStorage.setItem("ngo_hub_volunteer_opportunities", JSON.stringify(opportunities))
  }

  return { success: true, enrollment: newEnrollment }
}

export function getVolunteerEnrollments(userId) {
  const enrollments = JSON.parse(localStorage.getItem("ngo_hub_volunteer_enrollments") || "[]")
  if (userId) {
    return enrollments.filter((e) => e.userId === userId)
  }
  return enrollments
}

export function getVolunteerStats(userId) {
  const enrollments = getVolunteerEnrollments(userId)
  return {
    total: enrollments.length,
    active: enrollments.filter((e) => e.status === "active").length,
    completed: enrollments.filter((e) => e.status === "completed").length,
    totalHours: enrollments.reduce((sum, e) => sum + e.hoursCompleted, 0),
  }
}
