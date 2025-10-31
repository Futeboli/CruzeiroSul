"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts"

const mockData = [
  { month: "Jan", value: 4500 },
  { month: "Fev", value: 6200 },
  { month: "Mar", value: 5800 },
  { month: "Abr", value: 7100 },
  { month: "Mai", value: 8400 },
  { month: "Jun", value: 9200 },
]

export function DonationsChart() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={mockData}>
        <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
        <XAxis dataKey="month" className="text-xs" />
        <YAxis className="text-xs" />
        <Tooltip
          contentStyle={{
            backgroundColor: "hsl(var(--card))",
            border: "1px solid hsl(var(--border))",
            borderRadius: "var(--radius)",
          }}
          formatter={(value) => [`R$ ${value.toLocaleString("pt-BR")}`, "Doações"]}
        />
        <Bar dataKey="value" fill="hsl(var(--primary))" radius={[8, 8, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}
