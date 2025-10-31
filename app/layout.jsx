import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Providers } from "@/lib/providers"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata = {
  title: "NGO Hub - Plataforma de Impacto Social",
  description: "Conectando ONGs, voluntários e doadores para transformar o mundo",
  generator: "v0.app",
  keywords: "ONG, voluntariado, doações, impacto social, projetos sociais",
  authors: [{ name: "NGO Hub" }],
  openGraph: {
    title: "NGO Hub - Plataforma de Impacto Social",
    description: "Conectando ONGs, voluntários e doadores para transformar o mundo",
    type: "website",
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body className="font-sans antialiased">
        <Providers>{children}</Providers>
        <Analytics />
      </body>
    </html>
  )
}
