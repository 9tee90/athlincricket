import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Link from "next/link"

export default async function CoursesPage() {
  const session = await auth()
  if (!session?.user) {
    return null
  }

  const courses = await prisma.course.findMany({
    where: {
      coachId: session.user.id,
    },
    orderBy: {
      createdAt: "desc",
    },
  })

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Your Courses</h1>
          <p className="text-muted-foreground">
            Manage and create cricket training courses.
          </p>
        </div>
        <Button asChild>
          <Link href="/dashboard/coach/create-course">Create New Course</Link>
        </Button>
      </div>

      {courses.length === 0 ? (
        <Card className="p-6 text-center">
          <h2 className="text-xl font-semibold mb-2">No Courses Yet</h2>
          <p className="text-muted-foreground mb-4">
            Create your first cricket training course to get started.
          </p>
          <Button asChild>
            <Link href="/dashboard/coach/create-course">Create Your First Course</Link>
          </Button>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <Card key={course.id} className="flex flex-col">
              {course.bannerUrl && (
                <div className="relative aspect-video">
                  <img
                    src={course.bannerUrl}
                    alt={course.title}
                    className="object-cover w-full h-full rounded-t-lg"
                  />
                </div>
              )}
              <div className="p-6 flex-1">
                <h3 className="text-xl font-semibold mb-2">{course.title}</h3>
                <p className="text-muted-foreground mb-4 line-clamp-2">
                  {course.description}
                </p>
                <div className="flex justify-between items-center mt-auto">
                  <span className="text-sm font-medium px-2 py-1 bg-muted rounded-md">
                    {course.category}
                  </span>
                  <Button asChild variant="outline">
                    <Link href={`/dashboard/coach/courses/${course.id}`}>
                      View Course
                    </Link>
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
} 