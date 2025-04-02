import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import { prisma } from "@/lib/prisma"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface CoursePageProps {
  params: {
    courseId: string
  }
}

type CourseWithLessons = {
  id: string
  title: string
  description: string
  category: string
  introUrl: string
  createdAt: Date
  lessons: Array<{
    id: string
    title: string
    videoUrl: string
    notes: string | null
    order: number
  }>
}

export default async function CoursePage({ params }: CoursePageProps) {
  const session = await auth()

  if (!session?.user || session.user.role !== "coach") {
    redirect("/")
  }

  const course = await prisma.course.findUnique({
    where: {
      id: params.courseId,
      coachId: session.user.id,
    },
    include: {
      lessons: true,
    },
  }) as CourseWithLessons | null

  if (!course) {
    redirect("/dashboard/coach/courses")
  }

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">{course.title}</h1>
          <p className="text-muted-foreground">Created on {course.createdAt.toLocaleDateString()}</p>
        </div>
        <div className="space-x-2">
          <Button asChild variant="outline">
            <Link href="/dashboard/coach/courses">
              Back to Courses
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link href={`/dashboard/coach/courses/${course.id}/edit`}>
              Edit Course
            </Link>
          </Button>
        </div>
      </div>

      <Card className="mb-8">
        <div className="p-6">
          <div className="flex items-center gap-4 mb-4">
            <Badge>{course.category}</Badge>
            <Badge variant="outline">{course.lessons.length} Lessons</Badge>
          </div>
          <p className="text-lg mb-4">{course.description}</p>
          <div className="aspect-video relative rounded-lg overflow-hidden">
            <img
              src={course.introUrl}
              alt={`${course.title} intro video thumbnail`}
              className="object-cover w-full h-full"
            />
          </div>
        </div>
      </Card>

      <div>
        <h2 className="text-2xl font-semibold mb-4">Lessons</h2>
        <div className="space-y-4">
          {course.lessons.map((lesson, index) => (
            <Card key={lesson.id}>
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-medium">
                    {index + 1}. {lesson.title}
                  </h3>
                  <Badge variant="outline">{lesson.order}</Badge>
                </div>
                <p className="text-muted-foreground">{lesson.notes || "No notes available"}</p>
              </div>
              <hr className="border-t border-border" />
              <div className="p-4">
                <div className="aspect-video relative rounded-lg overflow-hidden">
                  <img
                    src={lesson.videoUrl}
                    alt={`${lesson.title} video thumbnail`}
                    className="object-cover w-full h-full"
                  />
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
} 