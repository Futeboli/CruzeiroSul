export const MOCK_FEED_POSTS = [
  {
    id: "post1",
    ngoId: "ngo1",
    ngoName: "Instituto Alimentar",
    ngoAvatar: "/food-institute-logo.jpg",
    type: "photo",
    content:
      "Hoje distribuímos 150 cestas básicas para famílias da comunidade Vila Nova! Ver o sorriso de gratidão em cada rosto nos motiva a continuar. Juntos somos mais fortes! 💚",
    images: ["/community-food-distribution-volunteers.jpg"],
    likes: 234,
    comments: 18,
    shares: 12,
    createdAt: "2025-01-30T14:30:00Z",
    location: "Vila Nova, São Paulo - SP",
  },
  {
    id: "post2",
    ngoId: "ngo2",
    ngoName: "TechFuturo",
    ngoAvatar: "/tech-education-logo.jpg",
    type: "photo",
    content:
      "Parabéns aos nossos alunos que concluíram o curso de Desenvolvimento Web! 🎉 Agora eles estão prontos para conquistar o mercado de tecnologia. #EducaçãoTransforma",
    images: ["/young-people-learning-programming-computers.jpg"],
    likes: 456,
    comments: 32,
    shares: 28,
    createdAt: "2025-01-30T10:15:00Z",
    location: "Rio de Janeiro - RJ",
  },
  {
    id: "post3",
    ngoId: "ngo4",
    ngoName: "Patinhas Felizes",
    ngoAvatar: "/paw-print-logo.png",
    type: "photo",
    content:
      "Conheça o Thor! Ele foi resgatado das ruas há 2 meses e agora está pronto para adoção. É um cachorro dócil, carinhoso e adora crianças. Quem quer dar um lar para esse amor? 🐕❤️",
    images: ["/animal-shelter-dogs-cats-volunteers.jpg"],
    likes: 892,
    comments: 67,
    shares: 45,
    createdAt: "2025-01-29T16:45:00Z",
    location: "Belo Horizonte - MG",
  },
  {
    id: "post4",
    ngoId: "ngo3",
    ngoName: "Verde Vivo",
    ngoAvatar: "/green-forest-logo.jpg",
    type: "photo",
    content:
      "Mutirão de plantio neste sábado! Plantamos 500 mudas de árvores nativas com a ajuda de 45 voluntários incríveis. A Mata Atlântica agradece! 🌳🌿",
    images: ["/atlantic-forest-reforestation-planting-trees.jpg"],
    likes: 678,
    comments: 41,
    shares: 56,
    createdAt: "2025-01-29T11:20:00Z",
    location: "Curitiba - PR",
  },
  {
    id: "post5",
    ngoId: "ngo5",
    ngoName: "Rede de Apoio Feminino",
    ngoAvatar: "/women-support-logo.jpg",
    type: "text",
    content:
      "Hoje realizamos mais uma oficina de empoderamento feminino. Ver mulheres redescobrindo sua força e autoestima é o que nos move. Você não está sozinha! 💜 #JuntasSomosMaisFortes",
    images: ["/women-empowerment-support-group.jpg"],
    likes: 543,
    comments: 38,
    shares: 34,
    createdAt: "2025-01-28T15:30:00Z",
    location: "Salvador - BA",
  },
  {
    id: "post6",
    ngoId: "ngo6",
    ngoName: "Esporte para Todos",
    ngoAvatar: "/sports-ball-logo.jpg",
    type: "photo",
    content:
      "Final do campeonato de futebol! As crianças deram um show de talento e fair play. O esporte transforma vidas! ⚽🏆",
    images: ["/children-playing-sports-soccer-community.jpg"],
    likes: 321,
    comments: 24,
    shares: 19,
    createdAt: "2025-01-28T09:00:00Z",
    location: "Recife - PE",
  },
  {
    id: "post7",
    ngoId: "ngo1",
    ngoName: "Instituto Alimentar",
    ngoAvatar: "/food-institute-logo.jpg",
    type: "text",
    content:
      "Precisamos de voluntários para o mutirão de distribuição deste sábado! Se você tem algumas horas disponíveis e quer fazer a diferença, entre em contato. Cada ajuda conta! 🙏",
    images: [],
    likes: 167,
    comments: 29,
    shares: 41,
    createdAt: "2025-01-27T13:45:00Z",
    location: "São Paulo - SP",
  },
  {
    id: "post8",
    ngoId: "ngo2",
    ngoName: "TechFuturo",
    ngoAvatar: "/tech-education-logo.jpg",
    type: "photo",
    content:
      "Aula prática de desenvolvimento de apps! Nossos alunos estão criando soluções incríveis para problemas reais da comunidade. 📱💡",
    images: ["/students-learning-technology.png"],
    likes: 412,
    comments: 26,
    shares: 22,
    createdAt: "2025-01-27T10:30:00Z",
    location: "Rio de Janeiro - RJ",
  },
  {
    id: "post9",
    ngoId: "ngo4",
    ngoName: "Patinhas Felizes",
    ngoAvatar: "/paw-print-logo.png",
    type: "text",
    content:
      "Campanha de castração gratuita neste fim de semana! Vagas limitadas. Ajude a controlar a população de animais de rua de forma responsável. 🐾",
    images: [],
    likes: 445,
    comments: 52,
    shares: 67,
    createdAt: "2025-01-26T14:00:00Z",
    location: "Belo Horizonte - MG",
  },
  {
    id: "post10",
    ngoId: "ngo3",
    ngoName: "Verde Vivo",
    ngoAvatar: "/green-forest-logo.jpg",
    type: "photo",
    content:
      "As mudas plantadas há 6 meses já estão crescendo fortes! É emocionante ver a natureza se recuperando. 🌱✨",
    images: ["/forest-conservation-nature.jpg"],
    likes: 589,
    comments: 33,
    shares: 28,
    createdAt: "2025-01-26T08:15:00Z",
    location: "Curitiba - PR",
  },
]

export function getFeedPosts() {
  const stored = localStorage.getItem("ngo_hub_feed_posts")
  if (stored) {
    try {
      return JSON.parse(stored)
    } catch (error) {
      console.error("[v0] Erro ao carregar posts do feed:", error)
    }
  }
  localStorage.setItem("ngo_hub_feed_posts", JSON.stringify(MOCK_FEED_POSTS))
  return MOCK_FEED_POSTS
}

export function getPostById(id) {
  const posts = getFeedPosts()
  return posts.find((p) => p.id === id)
}

export function getPostsByNGO(ngoId) {
  const posts = getFeedPosts()
  return posts.filter((p) => p.ngoId === ngoId)
}

export function likeFeedPost(postId, userId) {
  const posts = getFeedPosts()
  const postIndex = posts.findIndex((p) => p.id === postId)

  if (postIndex !== -1) {
    const likes = JSON.parse(localStorage.getItem("ngo_hub_feed_likes") || "{}")
    const userLikes = likes[userId] || []

    if (userLikes.includes(postId)) {
      likes[userId] = userLikes.filter((id) => id !== postId)
      posts[postIndex].likes -= 1
    } else {
      likes[userId] = [...userLikes, postId]
      posts[postIndex].likes += 1
    }

    localStorage.setItem("ngo_hub_feed_likes", JSON.stringify(likes))
    localStorage.setItem("ngo_hub_feed_posts", JSON.stringify(posts))

    return posts[postIndex]
  }

  return null
}

export function hasUserLikedPost(postId, userId) {
  const likes = JSON.parse(localStorage.getItem("ngo_hub_feed_likes") || "{}")
  const userLikes = likes[userId] || []
  return userLikes.includes(postId)
}

export function addFeedComment(postId, userId, userName, text) {
  const comments = JSON.parse(localStorage.getItem("ngo_hub_feed_comments") || "{}")
  const postComments = comments[postId] || []

  const newComment = {
    id: Date.now().toString(),
    userId,
    userName,
    text,
    createdAt: new Date().toISOString(),
  }

  comments[postId] = [...postComments, newComment]
  localStorage.setItem("ngo_hub_feed_comments", JSON.stringify(comments))

  const posts = getFeedPosts()
  const postIndex = posts.findIndex((p) => p.id === postId)
  if (postIndex !== -1) {
    posts[postIndex].comments += 1
    localStorage.setItem("ngo_hub_feed_posts", JSON.stringify(posts))
  }

  return newComment
}

export function getFeedComments(postId) {
  const comments = JSON.parse(localStorage.getItem("ngo_hub_feed_comments") || "{}")
  return comments[postId] || []
}
