"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/lib/auth-context"
import { getProjectById } from "@/lib/projects-data"
import { addDonation } from "@/lib/donations-data"
import { Heart, CreditCard, Smartphone, Building, ArrowLeft, Check } from "lucide-react"
import Link from "next/link"

const SUGGESTED_AMOUNTS = [50, 100, 250, 500, 1000]

const PAYMENT_METHODS = [
  { id: "credit", name: "Cartão de Crédito", icon: CreditCard },
  { id: "pix", name: "PIX", icon: Smartphone },
  { id: "boleto", name: "Boleto Bancário", icon: Building },
]

export default function DonatePage() {
  const params = useParams()
  const router = useRouter()
  const { user } = useAuth()
  const [project, setProject] = useState(null)
  const [amount, setAmount] = useState("")
  const [customAmount, setCustomAmount] = useState("")
  const [paymentMethod, setPaymentMethod] = useState("credit")
  const [recurring, setRecurring] = useState(false)
  const [anonymous, setAnonymous] = useState(false)
  const [processing, setProcessing] = useState(false)
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    const projectData = getProjectById(params.projectId)
    if (!projectData) {
      router.push("/projetos")
      return
    }
    setProject(projectData)
  }, [params.projectId, router])

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <p className="text-muted-foreground">Carregando...</p>
        </main>
      </div>
    )
  }

  const handleAmountSelect = (value) => {
    setAmount(value.toString())
    setCustomAmount("")
  }

  const handleCustomAmountChange = (e) => {
    setCustomAmount(e.target.value)
    setAmount("")
  }

  const getFinalAmount = () => {
    return customAmount ? Number.parseFloat(customAmount) : Number.parseFloat(amount)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!user) {
      router.push("/login")
      return
    }

    const finalAmount = getFinalAmount()
    if (!finalAmount || finalAmount <= 0) {
      return
    }

    setProcessing(true)

    setTimeout(() => {
      addDonation({
        userId: user.id,
        userName: anonymous ? "Anônimo" : user.name,
        projectId: project.id,
        projectTitle: project.title,
        ngoName: project.ngoName,
        amount: finalAmount,
        paymentMethod,
        recurring,
        anonymous,
      })

      setProcessing(false)
      setSuccess(true)

      setTimeout(() => {
        router.push("/minhas-doacoes")
      }, 2000)
    }, 1500)
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
                <h2 className="text-2xl font-bold">Doação realizada com sucesso!</h2>
                <p className="text-muted-foreground">
                  Obrigado por apoiar {project.ngoName}. Sua contribuição fará a diferença!
                </p>
              </div>
              <div className="bg-muted rounded-lg p-4">
                <p className="text-sm text-muted-foreground mb-1">Valor doado</p>
                <p className="text-3xl font-bold text-primary">R$ {getFinalAmount().toLocaleString("pt-BR")}</p>
              </div>
              <Button asChild className="w-full">
                <Link href="/minhas-doacoes">Ver minhas doações</Link>
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
        <div className="container px-4 max-w-4xl">
          <Button variant="ghost" className="mb-6" asChild>
            <Link href={`/projetos/${project.id}`}>
              <ArrowLeft className="h-4 w-4 mr-2" aria-hidden="true" />
              Voltar para o projeto
            </Link>
          </Button>

          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center gap-2">
                    <Heart className="h-6 w-6 text-primary fill-primary" aria-hidden="true" />
                    Fazer uma doação
                  </CardTitle>
                  <CardDescription>Sua contribuição ajuda a transformar vidas</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-3">
                      <Label>Escolha o valor da doação</Label>
                      <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
                        {SUGGESTED_AMOUNTS.map((value) => (
                          <Button
                            key={value}
                            type="button"
                            variant={amount === value.toString() ? "default" : "outline"}
                            className="h-16"
                            onClick={() => handleAmountSelect(value)}
                          >
                            R$ {value}
                          </Button>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="customAmount">Ou digite outro valor</Label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">R$</span>
                        <Input
                          id="customAmount"
                          type="number"
                          placeholder="0,00"
                          className="pl-10"
                          value={customAmount}
                          onChange={handleCustomAmountChange}
                          min="1"
                          step="0.01"
                        />
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-3">
                      <Label>Método de pagamento</Label>
                      <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                        {PAYMENT_METHODS.map((method) => {
                          const Icon = method.icon
                          return (
                            <div key={method.id} className="flex items-center space-x-3">
                              <RadioGroupItem value={method.id} id={method.id} />
                              <Label htmlFor={method.id} className="flex items-center gap-2 cursor-pointer flex-1">
                                <Icon className="h-4 w-4" aria-hidden="true" />
                                {method.name}
                              </Label>
                            </div>
                          )
                        })}
                      </RadioGroup>
                    </div>

                    <Separator />

                    <div className="space-y-4">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="recurring" checked={recurring} onCheckedChange={setRecurring} />
                        <Label htmlFor="recurring" className="cursor-pointer">
                          <span className="font-medium">Tornar doação recorrente</span>
                          <p className="text-sm text-muted-foreground">Doe mensalmente e amplifique seu impacto</p>
                        </Label>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Checkbox id="anonymous" checked={anonymous} onCheckedChange={setAnonymous} />
                        <Label htmlFor="anonymous" className="cursor-pointer">
                          <span className="font-medium">Doação anônima</span>
                          <p className="text-sm text-muted-foreground">Seu nome não será exibido publicamente</p>
                        </Label>
                      </div>
                    </div>

                    <Button
                      type="submit"
                      className="w-full"
                      size="lg"
                      disabled={processing || (!amount && !customAmount)}
                    >
                      {processing ? "Processando..." : `Doar R$ ${getFinalAmount().toLocaleString("pt-BR") || "0,00"}`}
                    </Button>

                    <p className="text-xs text-center text-muted-foreground">
                      Ao continuar, você concorda com nossos termos de uso e política de privacidade
                    </p>
                  </form>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Sobre o projeto</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="aspect-video relative overflow-hidden rounded-lg bg-muted">
                    <img
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">{project.title}</h3>
                    <p className="text-sm text-muted-foreground mb-2">{project.ngoName}</p>
                    <Badge variant="secondary">{project.category}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{project.description}</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Impacto da doação</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Check className="h-4 w-4 text-primary" aria-hidden="true" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">100% transparente</p>
                      <p className="text-xs text-muted-foreground">Acompanhe como sua doação é utilizada</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Check className="h-4 w-4 text-primary" aria-hidden="true" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">Impacto direto</p>
                      <p className="text-xs text-muted-foreground">Sua contribuição vai direto para o projeto</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Check className="h-4 w-4 text-primary" aria-hidden="true" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">Recibo fiscal</p>
                      <p className="text-xs text-muted-foreground">Receba comprovante para declaração</p>
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
