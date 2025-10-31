export const MOCK_PROJECTS = [
  {
    id: "1",
    title: "Alimentação para Comunidades Carentes",
    description:
      "Projeto de distribuição de cestas básicas e refeições para famílias em situação de vulnerabilidade social. Atendemos mais de 500 famílias mensalmente.",
    fullDescription:
      "Nosso projeto visa combater a fome e a insegurança alimentar em comunidades carentes. Através de parcerias com supermercados e doações, conseguimos montar cestas básicas completas e preparar refeições nutritivas. Além disso, oferecemos oficinas de educação nutricional e aproveitamento integral dos alimentos.",
    image: "/community-food-distribution-volunteers.jpg",
    ngoName: "Instituto Alimentar",
    ngoId: "ngo1",
    ngoAvatar: "/food-institute-logo.jpg",
    category: "Alimentação",
    location: "São Paulo, SP",
    likes: 342,
    comments: 28,
    shares: 45,
    volunteers: 23,
    donationsReceived: 15420,
    donationGoal: 25000,
    impactMetrics: {
      familiesHelped: 523,
      mealsDistributed: 12450,
      volunteersActive: 23,
    },
    createdAt: "2025-01-15T10:30:00Z",
    tags: ["alimentação", "comunidade", "vulnerabilidade social"],
  },
  {
    id: "2",
    title: "Educação Digital para Jovens",
    description:
      "Capacitação em tecnologia e programação para jovens de baixa renda, preparando-os para o mercado de trabalho digital.",
    fullDescription:
      "Oferecemos cursos gratuitos de programação, design e marketing digital para jovens entre 15 e 25 anos. Nosso objetivo é democratizar o acesso à educação tecnológica e criar oportunidades de emprego na área de TI. Já formamos mais de 200 alunos, com 85% de empregabilidade.",
    image: "/young-people-learning-programming-computers.jpg",
    ngoName: "TechFuturo",
    ngoId: "ngo2",
    ngoAvatar: "/tech-education-logo.jpg",
    category: "Educação",
    location: "Rio de Janeiro, RJ",
    likes: 567,
    comments: 42,
    shares: 89,
    volunteers: 15,
    donationsReceived: 32100,
    donationGoal: 50000,
    impactMetrics: {
      studentsEnrolled: 234,
      coursesCompleted: 189,
      employmentRate: 85,
    },
    createdAt: "2025-01-10T14:20:00Z",
    tags: ["educação", "tecnologia", "jovens", "empregabilidade"],
  },
  {
    id: "3",
    title: "Reflorestamento da Mata Atlântica",
    description:
      "Plantio de árvores nativas e recuperação de áreas degradadas na Mata Atlântica, envolvendo comunidades locais.",
    fullDescription:
      "Trabalhamos na recuperação de áreas degradadas da Mata Atlântica através do plantio de espécies nativas. Envolvemos comunidades locais em todo o processo, desde a coleta de sementes até o monitoramento das mudas. Já plantamos mais de 50 mil árvores em 3 anos.",
    image: "/atlantic-forest-reforestation-planting-trees.jpg",
    ngoName: "Verde Vivo",
    ngoId: "ngo3",
    ngoAvatar: "/green-forest-logo.jpg",
    category: "Meio Ambiente",
    location: "Curitiba, PR",
    likes: 892,
    comments: 67,
    shares: 134,
    volunteers: 45,
    donationsReceived: 48750,
    donationGoal: 60000,
    impactMetrics: {
      treesPlanted: 52340,
      areaRecovered: 125,
      speciesPreserved: 87,
    },
    createdAt: "2025-01-05T09:15:00Z",
    tags: ["meio ambiente", "reflorestamento", "sustentabilidade"],
  },
  {
    id: "4",
    title: "Abrigo para Animais Abandonados",
    description:
      "Resgate, tratamento e adoção responsável de animais abandonados. Promovemos também campanhas de castração.",
    fullDescription:
      "Nosso abrigo acolhe cães e gatos abandonados, oferecendo tratamento veterinário, alimentação e carinho até encontrarem um lar definitivo. Realizamos feiras de adoção mensais e campanhas de castração gratuita para controle populacional.",
    image: "/animal-shelter-dogs-cats-volunteers.jpg",
    ngoName: "Patinhas Felizes",
    ngoId: "ngo4",
    ngoAvatar: "/paw-print-logo.png",
    category: "Animais",
    location: "Belo Horizonte, MG",
    likes: 1243,
    comments: 156,
    shares: 234,
    volunteers: 38,
    donationsReceived: 28900,
    donationGoal: 40000,
    impactMetrics: {
      animalsRescued: 342,
      adoptionsCompleted: 267,
      castrationsPerformed: 523,
    },
    createdAt: "2025-01-20T16:45:00Z",
    tags: ["animais", "adoção", "bem-estar animal"],
  },
  {
    id: "5",
    title: "Apoio a Mulheres Vítimas de Violência",
    description: "Acolhimento, apoio psicológico e jurídico para mulheres em situação de violência doméstica.",
    fullDescription:
      "Oferecemos um espaço seguro de acolhimento para mulheres vítimas de violência, com atendimento psicológico, jurídico e social. Trabalhamos na reconstrução da autoestima e autonomia financeira através de cursos profissionalizantes.",
    image: "/women-empowerment-support-group.jpg",
    ngoName: "Rede de Apoio Feminino",
    ngoId: "ngo5",
    ngoAvatar: "/women-support-logo.jpg",
    category: "Direitos Humanos",
    location: "Salvador, BA",
    likes: 678,
    comments: 89,
    shares: 156,
    volunteers: 28,
    donationsReceived: 41200,
    donationGoal: 55000,
    impactMetrics: {
      womenAssisted: 234,
      legalCasesSupported: 156,
      workshopsHeld: 45,
    },
    createdAt: "2025-01-12T11:30:00Z",
    tags: ["direitos humanos", "mulheres", "violência doméstica"],
  },
  {
    id: "6",
    title: "Esporte e Inclusão para Crianças",
    description:
      "Aulas gratuitas de esportes para crianças em comunidades, promovendo saúde, disciplina e inclusão social.",
    fullDescription:
      "Oferecemos aulas gratuitas de futebol, vôlei, basquete e outras modalidades esportivas para crianças de 6 a 14 anos. Além do esporte, trabalhamos valores como respeito, trabalho em equipe e disciplina. Atendemos mais de 300 crianças semanalmente.",
    image: "/children-playing-sports-soccer-community.jpg",
    ngoName: "Esporte para Todos",
    ngoId: "ngo6",
    ngoAvatar: "/sports-ball-logo.jpg",
    category: "Esporte",
    location: "Recife, PE",
    likes: 445,
    comments: 34,
    shares: 67,
    volunteers: 19,
    donationsReceived: 18600,
    donationGoal: 30000,
    impactMetrics: {
      childrenEnrolled: 312,
      classesPerWeek: 24,
      tournamentsOrganized: 8,
    },
    createdAt: "2025-01-18T13:00:00Z",
    tags: ["esporte", "crianças", "inclusão social"],
  },
]

export function getProjects() {
  const stored = localStorage.getItem("ngo_hub_projects")
  if (stored) {
    try {
      return JSON.parse(stored)
    } catch (error) {
      console.error("[v0] Erro ao carregar projetos:", error)
    }
  }
  localStorage.setItem("ngo_hub_projects", JSON.stringify(MOCK_PROJECTS))
  return MOCK_PROJECTS
}

export function getProjectById(id) {
  const projects = getProjects()
  return projects.find((p) => p.id === id)
}

export function likeProject(projectId, userId) {
  const projects = getProjects()
  const projectIndex = projects.findIndex((p) => p.id === projectId)

  if (projectIndex !== -1) {
    const likes = JSON.parse(localStorage.getItem("ngo_hub_likes") || "{}")
    const userLikes = likes[userId] || []

    if (userLikes.includes(projectId)) {
      likes[userId] = userLikes.filter((id) => id !== projectId)
      projects[projectIndex].likes -= 1
    } else {
      likes[userId] = [...userLikes, projectId]
      projects[projectIndex].likes += 1
    }

    localStorage.setItem("ngo_hub_likes", JSON.stringify(likes))
    localStorage.setItem("ngo_hub_projects", JSON.stringify(projects))

    return projects[projectIndex]
  }

  return null
}

export function hasUserLiked(projectId, userId) {
  const likes = JSON.parse(localStorage.getItem("ngo_hub_likes") || "{}")
  const userLikes = likes[userId] || []
  return userLikes.includes(projectId)
}

export function addComment(projectId, userId, userName, text) {
  const comments = JSON.parse(localStorage.getItem("ngo_hub_comments") || "{}")
  const projectComments = comments[projectId] || []

  const newComment = {
    id: Date.now().toString(),
    userId,
    userName,
    text,
    createdAt: new Date().toISOString(),
  }

  comments[projectId] = [...projectComments, newComment]
  localStorage.setItem("ngo_hub_comments", JSON.stringify(comments))

  const projects = getProjects()
  const projectIndex = projects.findIndex((p) => p.id === projectId)
  if (projectIndex !== -1) {
    projects[projectIndex].comments += 1
    localStorage.setItem("ngo_hub_projects", JSON.stringify(projects))
  }

  return newComment
}

export function getComments(projectId) {
  const comments = JSON.parse(localStorage.getItem("ngo_hub_comments") || "{}")
  return comments[projectId] || []
}
