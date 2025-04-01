import { prisma } from "@/lib/prisma"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ChallengeStatus } from "@prisma/client"

interface SelectWinnersFormProps {
  challengeId: string
  submissions: {
    id: string
    userId: string
    user: {
      name: string | null
    }
  }[]
}

export async function SelectWinnersForm({ challengeId, submissions }: SelectWinnersFormProps) {
  async function selectWinners(formData: FormData) {
    "use server"
    
    const firstPlace = formData.get("firstPlace") as string
    const secondPlace = formData.get("secondPlace") as string
    const thirdPlace = formData.get("thirdPlace") as string

    // Update the challenge status to closed
    await prisma.challenge.update({
      where: { id: challengeId },
      data: {
        status: ChallengeStatus.closed,
      },
    })

    // Mark the winning submissions
    await prisma.submission.updateMany({
      where: {
        id: {
          in: [firstPlace, secondPlace, thirdPlace],
        },
      },
      data: {
        winner: true,
      },
    })
  }

  return (
    <form action={selectWinners} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="firstPlace">First Place</Label>
        <Select name="firstPlace" required>
          <SelectTrigger>
            <SelectValue placeholder="Select first place" />
          </SelectTrigger>
          <SelectContent>
            {submissions.map((submission) => (
              <SelectItem key={submission.id} value={submission.id}>
                {submission.user.name || 'Anonymous'}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="secondPlace">Second Place</Label>
        <Select name="secondPlace" required>
          <SelectTrigger>
            <SelectValue placeholder="Select second place" />
          </SelectTrigger>
          <SelectContent>
            {submissions.map((submission) => (
              <SelectItem key={submission.id} value={submission.id}>
                {submission.user.name || 'Anonymous'}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="thirdPlace">Third Place</Label>
        <Select name="thirdPlace" required>
          <SelectTrigger>
            <SelectValue placeholder="Select third place" />
          </SelectTrigger>
          <SelectContent>
            {submissions.map((submission) => (
              <SelectItem key={submission.id} value={submission.id}>
                {submission.user.name || 'Anonymous'}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Button type="submit">Select Winners</Button>
    </form>
  )
} 