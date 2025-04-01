import { prisma } from "@/lib/prisma"
import { notFound } from "next/navigation"
import { SelectWinnersForm } from "./select-winners-form"

export default async function JudgingPage({
  params,
}: {
  params: { challengeId: string }
}) {
  const challenge = await prisma.challenge.findUnique({
    where: { id: params.challengeId },
    include: {
      submissions: {
        include: {
          user: true,
        },
      },
    },
  })

  if (!challenge) {
    notFound()
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">Select Winners</h1>
      <SelectWinnersForm challengeId={challenge.id} submissions={challenge.submissions} />
    </div>
  )
} 