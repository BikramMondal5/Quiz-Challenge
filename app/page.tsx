import PujoQuizChallenge from "../quiz-challenge"
import { Suspense } from "react"
import { Loader2 } from "lucide-react"

export default function Page() {
  return (
    <main className="relative">
      <Suspense fallback={
        <div className="flex items-center justify-center min-h-screen">
          <div className="flex flex-col items-center gap-4">
            <Loader2 className="h-12 w-12 animate-spin text-blue-600" />
            <h2 className="text-xl font-medium">Loading Pujo Quiz Challenge...</h2>
          </div>
        </div>
      }>
        <PujoQuizChallenge />
      </Suspense>
    </main>
  )
}

