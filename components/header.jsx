"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useAuth, USER_TYPES } from "@/lib/auth-context"
import { Heart, Users, Home, LayoutDashboard, LogOut, User, Settings, HandHeart, Rss } from "lucide-react"

export function Header() {
  const { user, logout } = useAuth()
  const pathname = usePathname()

  const isActive = (path) => pathname === path

  const getInitials = (name) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2)
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl">
            <Heart className="h-6 w-6 text-primary fill-primary" aria-hidden="true" />
            <span className="text-balance">NGO Hub</span>
          </Link>

          <nav className="hidden md:flex items-center gap-6" role="navigation" aria-label="Navegação principal">
            <Link
              href="/"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActive("/") ? "text-primary" : "text-muted-foreground"
              }`}
              aria-current={isActive("/") ? "page" : undefined}
            >
              <span className="flex items-center gap-2">
                <Home className="h-4 w-4" aria-hidden="true" />
                Início
              </span>
            </Link>
            <Link
              href="/feed"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActive("/feed") ? "text-primary" : "text-muted-foreground"
              }`}
              aria-current={isActive("/feed") ? "page" : undefined}
            >
              <span className="flex items-center gap-2">
                <Rss className="h-4 w-4" aria-hidden="true" />
                Feed
              </span>
            </Link>
            <Link
              href="/projetos"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActive("/projetos") ? "text-primary" : "text-muted-foreground"
              }`}
              aria-current={isActive("/projetos") ? "page" : undefined}
            >
              <span className="flex items-center gap-2">
                <LayoutDashboard className="h-4 w-4" aria-hidden="true" />
                Projetos
              </span>
            </Link>
            <Link
              href="/ongs"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActive("/ongs") ? "text-primary" : "text-muted-foreground"
              }`}
              aria-current={isActive("/ongs") ? "page" : undefined}
            >
              <span className="flex items-center gap-2">
                <Users className="h-4 w-4" aria-hidden="true" />
                ONGs
              </span>
            </Link>
            <Link
              href="/voluntariado"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActive("/voluntariado") ? "text-primary" : "text-muted-foreground"
              }`}
              aria-current={isActive("/voluntariado") ? "page" : undefined}
            >
              <span className="flex items-center gap-2">
                <HandHeart className="h-4 w-4" aria-hidden="true" />
                Voluntariado
              </span>
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          {user ? (
            <>
              {user.userType === USER_TYPES.NGO_ADMIN && (
                <Button asChild variant="outline" size="sm">
                  <Link href="/dashboard">
                    <LayoutDashboard className="h-4 w-4 mr-2" aria-hidden="true" />
                    Dashboard
                  </Link>
                </Button>
              )}

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-10 w-10 rounded-full" aria-label="Menu do usuário">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={user.avatar || "/placeholder.svg"} alt={`Foto de perfil de ${user.name}`} />
                      <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end">
                  <DropdownMenuLabel>
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{user.name}</p>
                      <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/perfil" className="cursor-pointer">
                      <User className="mr-2 h-4 w-4" aria-hidden="true" />
                      Perfil
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/minhas-doacoes" className="cursor-pointer">
                      <Heart className="mr-2 h-4 w-4" aria-hidden="true" />
                      Minhas Doações
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/meu-voluntariado" className="cursor-pointer">
                      <HandHeart className="mr-2 h-4 w-4" aria-hidden="true" />
                      Meu Voluntariado
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/configuracoes" className="cursor-pointer">
                      <Settings className="mr-2 h-4 w-4" aria-hidden="true" />
                      Configurações
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logout} className="cursor-pointer text-destructive">
                    <LogOut className="mr-2 h-4 w-4" aria-hidden="true" />
                    Sair
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <>
              <Button asChild variant="ghost" size="sm">
                <Link href="/login">Entrar</Link>
              </Button>
              <Button asChild size="sm">
                <Link href="/registro">Cadastrar</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  )
}
