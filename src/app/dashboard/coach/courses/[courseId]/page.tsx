import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Link from "next/link"
import { notFound } from "next/navigation"

interface CoursePageProps {
  params: {
    courseId: string
  }
}

export default async function CoursePage({ params }: CoursePageProps) {
  const session = await auth()
  if (!session?.user) {
    return null
  }

  const course = await prisma.course.findUnique({
    where: {
      id: params.courseId,
    },
    include: {
      lessons: {
        orderBy: {
          order: "asc",
        },
      },
    },
  })

  if (!course || course.coachId !== session.user.id) {
    notFound()
  }

  return (
    <div className="container mx-auto py-8">
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <Link
            href="/dashboard/coach/courses"
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            ← Back to Courses
          </Link>
          <Button asChild variant="outline">
            <Link href={`/dashboard/coach/courses/${course.id}/edit`}>
              Edit Course
            </Link>
          </Button>
        </div>
        <h1 className="text-3xl font-bold mb-2">{course.title}</h1>
        <p className="text-muted-foreground">{course.description}</p>
      </div>

      {course.bannerUrl && (
        <div className="relative aspect-video mb-8">
          <img
            src={course.bannerUrl}
            alt={course.title}
            className="object-cover w-full h-full rounded-lg"
          />
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Course Content</h2>
            <div className="space-y-4">
              {course.lessons.map((lesson) => (
                <Card key={lesson.id} className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">{lesson.title}</h3>
                      {lesson.notes && (
                        <p className="text-sm text-muted-foreground mt-1">
                          {lesson.notes}
                        </p>
                      )}
                    </div>
                    <Button asChild variant="outline" size="sm">
                      <Link href={`/dashboard/coach/courses/${course.id}/lessons/${lesson.id}`}>
                        View Lesson
                      </Link>
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </Card>
        </div>

        <div>
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Course Overview</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">
                  Category
                </h3>
                <p>{course.category}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">
                  Total Lessons
                </h3>
                <p>{course.lessons.length}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">
                  Created
                </h3>
                <p>{new Date(course.createdAt).toLocaleDateString()}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">
                  Last Updated
                </h3>
                <p>{new Date(course.updatedAt).toLocaleDateString()}</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
} 