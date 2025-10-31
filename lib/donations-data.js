export function getDonations(userId) {
  const donations = JSON.parse(localStorage.getItem("ngo_hub_donations") || "[]")
  if (userId) {
    return donations.filter((d) => d.userId === userId)
  }
  return donations
}

export function addDonation(donationData) {
  const donations = getDonations()
  const newDonation = {
    id: Date.now().toString(),
    ...donationData,
    createdAt: new Date().toISOString(),
    status: "completed",
  }

  donations.push(newDonation)
  localStorage.setItem("ngo_hub_donations", JSON.stringify(donations))

  const projects = JSON.parse(localStorage.getItem("ngo_hub_projects") || "[]")
  const projectIndex = projects.findIndex((p) => p.id === donationData.projectId)
  if (projectIndex !== -1) {
    projects[projectIndex].donationsReceived += donationData.amount
    localStorage.setItem("ngo_hub_projects", JSON.stringify(projects))
  }

  return newDonation
}

export function getDonationsByProject(projectId) {
  const donations = getDonations()
  return donations.filter((d) => d.projectId === projectId)
}

export function getTotalDonated(userId) {
  const donations = getDonations(userId)
  return donations.reduce((sum, d) => sum + d.amount, 0)
}

export function getDonationStats(userId) {
  const donations = getDonations(userId)
  return {
    total: donations.length,
    totalAmount: donations.reduce((sum, d) => sum + d.amount, 0),
    recurring: donations.filter((d) => d.recurring).length,
    projectsSupported: new Set(donations.map((d) => d.projectId)).size,
  }
}
