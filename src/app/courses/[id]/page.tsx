import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { notFound } from "next/navigation"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CourseHeader } from "@/components/courses/CourseHeader"
import { LessonCard } from "@/components/courses/LessonCard"
import { CoachBadge } from "@/components/courses/CoachBadge"
import { Course, User, Lesson } from "@/types/prisma"
import { PurchaseButton } from "@/components/courses/PurchaseButton"

interface CoursePageProps {
  params: {
    id: string
  }
  searchParams: {
    success?: string
    canceled?: string
  }
}

export default async function CoursePage({ params, searchParams }: CoursePageProps) {
  const session = await auth()
  
  const course = await prisma.course.findUnique({
    where: {
      id: params.id,
    },
    include: {
      coach: true,
      lessons: {
        orderBy: {
          order: 'asc',
        },
      },
      buyers: {
        include: {
          purchasedCourses: true
        }
      },
    },
  }) as Course | null

  if (!course) {
    notFound()
  }

  // User has access if they are the coach or have purchased the course
  const hasAccess = session?.user?.id === course.coachId || 
    course.buyers.some((buyer: User) => buyer.id === session?.user?.id)

  return (
    <div className="container mx-auto py-8">
      <CourseHeader 
        title={course.title}
        category={course.category}
        coach={course.coach}
        hasAccess={hasAccess}
      />

      {searchParams.success && (
        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-6">
          Thank you for your purchase! You now have access to all lessons.
        </div>
      )}

      {searchParams.canceled && (
        <div className="bg-yellow-50 border border-yellow-200 text-yellow-700 px-4 py-3 rounded-lg mb-6">
          Your purchase was canceled. No charges were made.
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Intro Video */}
          <Card className="overflow-hidden">
            <div className="aspect-video">
              <video
                src={course.introUrl}
                controls
                className="w-full h-full"
              />
            </div>
          </Card>

          {/* Description */}
          <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-4">About This Course</h2>
            <p className="text-muted-foreground whitespace-pre-wrap">
              {course.description}
            </p>
          </Card>

          {/* Lessons */}
          <div>
            <h2 className="text-2xl font-semibold mb-4">Course Lessons</h2>
            <div className="space-y-4">
              {course.lessons.map((lesson: Lesson) => (
                <LessonCard
                  key={lesson.id}
                  lesson={lesson}
                  hasAccess={hasAccess}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Coach Info */}
          <CoachBadge coach={course.coach} />

          {/* Course Stats */}
          <Card className="p-6">
            <h3 className="font-semibold mb-4">Course Details</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Total Lessons</span>
                <span>{course.lessons.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Category</span>
                <Badge variant="outline">{course.category}</Badge>
              </div>
            </div>
          </Card>

          {/* CTA */}
          {!hasAccess && (
            <Card className="p-6">
              <h3 className="font-semibold mb-4">Get Full Access</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Unlock all lessons and get lifetime access to this course.
              </p>
              <PurchaseButton courseId={course.id} />
            </Card>
          )}
        </div>
      </div>
    </div>
  )
} 