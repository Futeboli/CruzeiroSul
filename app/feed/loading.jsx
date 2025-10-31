import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export default function FeedLoading() {
  return (
    <div className="min-h-screen flex flex-col bg-muted/30">
      <div className="flex-1 py-6">
        <div className="container px-4">
          <div className="grid lg:grid-cols-[1fr_350px] gap-8 max-w-6xl mx-auto">
            <div className="space-y-6">
              {[1, 2, 3].map((i) => (
                <Card key={i}>
                  <CardHeader className="flex flex-row items-center gap-4 pb-3">
                    <Skeleton className="h-10 w-10 rounded-full" />
                    <div className="flex-1 space-y-2">
                      <Skeleton className="h-4 w-32" />
                      <Skeleton className="h-3 w-24" />
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3 px-0 pb-0">
                    <Skeleton className="w-full h-[400px]" />
                    <div className="px-6 space-y-3 pb-6">
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-3/4" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
