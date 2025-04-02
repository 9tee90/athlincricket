import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Link from "next/link"
import { notFound } from "next/navigation"

interface LessonPageProps {
  params: {
    courseId: string
    lessonId: string
  }
}

export default async function LessonPage({ params }: LessonPageProps) {
  const session = await auth()
  if (!session?.user) {
    return null
  }

  const lesson = await prisma.lesson.findUnique({
    where: {
      id: params.lessonId,
    },
    include: {
      course: true,
    },
  })

  if (!lesson || lesson.course.coachId !== session.user.id) {
    notFound()
  }

  return (
    <div className="container mx-auto py-8">
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <Link
            href={`/dashboard/coach/courses/${lesson.courseId}`}
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            ← Back to Course
          </Link>
          <Button asChild variant="outline">
            <Link href={`/dashboard/coach/courses/${lesson.courseId}/lessons/${lesson.id}/edit`}>
              Edit Lesson
            </Link>
          </Button>
        </div>
        <h1 className="text-3xl font-bold mb-2">{lesson.title}</h1>
        {lesson.notes && (
          <p className="text-muted-foreground">{lesson.notes}</p>
        )}
      </div>

      <Card className="p-6">
        <div className="aspect-video mb-6">
          <video
            src={lesson.videoUrl}
            controls
            className="w-full h-full rounded-lg"
          />
        </div>

        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-medium text-muted-foreground">
              Lesson Order
            </h3>
            <p>Lesson {lesson.order}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-muted-foreground">
              Created
            </h3>
            <p>{new Date(lesson.createdAt).toLocaleDateString()}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-muted-foreground">
              Last Updated
            </h3>
            <p>{new Date(lesson.updatedAt).toLocaleDateString()}</p>
          </div>
        </div>
      </Card>
    </div>
  )
} 