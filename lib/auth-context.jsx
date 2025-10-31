"use client"

import { createContext, useContext, useState, useEffect } from "react"

const AuthContext = createContext(null)

export const USER_TYPES = {
  VISITOR: "visitor",
  DONOR: "donor",
  VOLUNTEER: "volunteer",
  NGO_ADMIN: "ngo_admin",
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const storedUser = localStorage.getItem("ngo_hub_user")
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser))
      } catch (error) {
        console.error("[v0] Erro ao carregar usuário:", error)
        localStorage.removeItem("ngo_hub_user")
      }
    }
    setLoading(false)
  }, [])

  const login = async (email, password) => {
    const users = JSON.parse(localStorage.getItem("ngo_hub_users") || "[]")
    const foundUser = users.find((u) => u.email === email && u.password === password)

    if (foundUser) {
      const userWithoutPassword = { ...foundUser }
      delete userWithoutPassword.password
      setUser(userWithoutPassword)
      localStorage.setItem("ngo_hub_user", JSON.stringify(userWithoutPassword))
      return { success: true }
    }

    return { success: false, error: "Email ou senha incorretos" }
  }

  const register = async (userData) => {
    const users = JSON.parse(localStorage.getItem("ngo_hub_users") || "[]")

    if (users.find((u) => u.email === userData.email)) {
      return { success: false, error: "Email já cadastrado" }
    }

    const newUser = {
      id: Date.now().toString(),
      ...userData,
      createdAt: new Date().toISOString(),
      avatar: `/placeholder.svg?height=100&width=100&query=${encodeURIComponent(userData.name)}`,
      verified: userData.userType === USER_TYPES.NGO_ADMIN ? false : true,
    }

    users.push(newUser)
    localStorage.setItem("ngo_hub_users", JSON.stringify(users))

    const userWithoutPassword = { ...newUser }
    delete userWithoutPassword.password
    setUser(userWithoutPassword)
    localStorage.setItem("ngo_hub_user", JSON.stringify(userWithoutPassword))

    return { success: true }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("ngo_hub_user")
  }

  const updateProfile = (updates) => {
    const updatedUser = { ...user, ...updates }
    setUser(updatedUser)
    localStorage.setItem("ngo_hub_user", JSON.stringify(updatedUser))

    const users = JSON.parse(localStorage.getItem("ngo_hub_users") || "[]")
    const userIndex = users.findIndex((u) => u.id === user.id)
    if (userIndex !== -1) {
      users[userIndex] = { ...users[userIndex], ...updates }
      localStorage.setItem("ngo_hub_users", JSON.stringify(users))
    }
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider")
  }
  return context
}
